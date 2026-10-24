import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ZoneResult from './ZoneResult.jsx'

const PAL = {
  lilac: { base: '#c4acf0', mid: '#a98ae6', light: '#e6dafb', edge: '#8f70d4' },
  white: { base: '#ffffff', mid: '#e9e5f3', light: '#ffffff', edge: '#cfc8e0' },
}
const RING = Array.from({ length: 10 }, (_, i) => {
  const a = ((i * 36 - 90) * Math.PI) / 180
  return { x: 150 + 84 * Math.cos(a), y: 150 + 84 * Math.sin(a), k: i % 3 === 1 ? 'white' : 'lilac' }
})
const EMPTY = [2, 7]
const PETALS = Array.from({ length: 8 }, (_, i) => i * 45)

function RoseSvg({ s, k }) {
  const P = PAL[k]
  return (
    <g transform={`scale(${s / 60})`}>
      <circle r="29" fill={P.base} stroke={P.edge} strokeWidth="1.4" />
      <path d="M-23 -6Q-14 -26 6 -24Q24 -20 24 -2Q23 18 4 24Q-18 26 -24 6Z" fill={P.mid} opacity=".55" />
      <path d="M-16 -3Q-8 -18 7 -15Q19 -10 16 3Q12 16 -1 17Q-14 16 -16 -3Z" fill={P.light} stroke={P.edge} strokeWidth="1" />
      <path d="M-4 0a4 4 0 1 1 4 4a8 8 0 1 1-8-8a12 12 0 1 1 12 12" fill="none" stroke={P.edge} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  )
}

export default function BouquetWrap({ D, onAgain }) {
  const [filled, setFilled] = useState([])
  const [petals, setPetals] = useState(0)
  const [ribbon, setRibbon] = useState(false)
  const [show, setShow] = useState(false)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const phase = filled.length < EMPTY.length ? 'fill' : petals < PETALS.length ? 'wrap' : 'done'

  const fillSlot = (i) => {
    if (phase !== 'fill' || filled.includes(i)) return
    setFilled((f) => [...f, i])
    navigator.vibrate?.(10)
  }
  const wrap = () => {
    if (phase !== 'wrap') return
    const m = petals + 1
    setPetals(m)
    navigator.vibrate?.(10)
    if (m >= PETALS.length) {
      timers.current.push(setTimeout(() => setRibbon(true), 700))
      timers.current.push(setTimeout(() => setShow(true), 3800))
    }
  }

  return (
    <div onClick={wrap} className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#f1e6ff] to-[#d9c8f5] text-[#3b2a63]">
      <p className="absolute inset-x-0 top-4 text-center text-sm font-semibold">
        {phase === 'fill' ? D.hint1 : phase === 'wrap' ? D.hint2 : D.done}
      </p>
      <svg viewBox="0 0 300 300" className="absolute left-1/2 top-[54px] w-[340px] -translate-x-1/2" role="img" aria-label="Buket satin lilac dan putih">
        <circle cx="150" cy="150" r="118" fill="#fff" opacity=".55" />
        {RING.map((r, i) => {
          const empty = EMPTY.includes(i)
          if (empty && !filled.includes(i)) {
            return (
              <g key={i} transform={`translate(${r.x} ${r.y})`} onClick={(e) => { e.stopPropagation(); fillSlot(i) }} style={{ cursor: 'pointer' }}>
                <circle r="26" fill="rgba(255,255,255,.01)" stroke="#8f70d4" strokeWidth="2" strokeDasharray="4 5" />
              </g>
            )
          }
          return (
            <g key={i} transform={`translate(${r.x} ${r.y})`}>
              <motion.g initial={empty ? { scale: 0 } : false} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 11, stiffness: 160 }}>
                <RoseSvg s={50} k={r.k} />
              </motion.g>
            </g>
          )
        })}
        <g transform="translate(150 150)">
          <RoseSvg s={70} k="white" />
        </g>

        {PETALS.slice(0, petals).map((a) => (
          <g key={a} transform={`translate(150 150) rotate(${a})`}>
            <motion.path
              d="M-28 -98L-18 -150L0 -176L18 -150L28 -98Z"
              fill="#b9a3f0"
              stroke="#e6c15a"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 150 }}
            />
          </g>
        ))}

        {ribbon && (
          <motion.g initial={{ x: -380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
            <g transform="rotate(-18 150 150)">
              <rect x="-60" y="134" width="420" height="32" fill="#c9b4f4" stroke="#a98ae6" strokeWidth="1.5" />
              <text x="150" y="156" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Dancing Script, cursive" fontWeight="600">
                {D.ribbon}
              </text>
            </g>
          </motion.g>
        )}
      </svg>
      {show && <ZoneResult title={D.done} story={D.story} items={D.media} label="buket" onAgain={onAgain} againLabel="Rangkai lagi" />}
    </div>
  )
}