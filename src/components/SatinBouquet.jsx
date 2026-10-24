import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ZoneResult from './ZoneResult.jsx'

const SLOTS = [
  { x: 150, y: 150, s: 72 },
  { x: 150, y: 92, s: 64 }, { x: 203, y: 121, s: 64 }, { x: 203, y: 179, s: 64 },
  { x: 150, y: 208, s: 64 }, { x: 97, y: 179, s: 64 }, { x: 97, y: 121, s: 64 },
  { x: 150, y: 40, s: 54 }, { x: 255, y: 150, s: 54 }, { x: 45, y: 150, s: 54 },
]
const PAL = {
  lilac: { base: '#c4acf0', mid: '#a98ae6', light: '#e6dafb', edge: '#8f70d4' },
  white: { base: '#ffffff', mid: '#e9e5f3', light: '#ffffff', edge: '#cfc8e0' },
}

function Rose({ s, k }) {
  const P = PAL[k]
  return (
    <g transform={`scale(${s / 60})`}>
      <circle r="29" fill={P.base} stroke={P.edge} strokeWidth="1.4" />
      <path d="M-23 -6Q-14 -26 6 -24Q24 -20 24 -2Q23 18 4 24Q-18 26 -24 6Z" fill={P.mid} opacity=".55" />
      <path d="M-16 -3Q-8 -18 7 -15Q19 -10 16 3Q12 16 -1 17Q-14 16 -16 -3Z" fill={P.light} stroke={P.edge} strokeWidth="1" />
      <path d="M-4 0a4 4 0 1 1 4 4a8 8 0 1 1-8-8a12 12 0 1 1 12 12" fill="none" stroke={P.edge} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="-12" cy="-16" rx="9" ry="4" transform="rotate(-35 -12 -16)" fill="#fff" opacity=".6" />
    </g>
  )
}

function Roll({ k, onTap, label }) {
  const P = PAL[k]
  return (
    <button type="button" onClick={onTap} aria-label={label} className="relative h-[84px] w-[84px] active:scale-90" style={{ touchAction: 'manipulation' }}>
      <svg viewBox="0 0 84 84" className="h-full w-full" aria-hidden="true">
        <ellipse cx="42" cy="68" rx="30" ry="8" fill="rgba(0,0,0,.2)" />
        <rect x="14" y="26" width="56" height="40" rx="8" fill={P.base} stroke={P.edge} strokeWidth="2.5" />
        <ellipse cx="42" cy="26" rx="28" ry="10" fill={P.light} stroke={P.edge} strokeWidth="2.5" />
        <ellipse cx="42" cy="26" rx="9" ry="3.6" fill="#7a5a44" />
        <path d="M16 40h52M16 52h52" stroke={P.mid} strokeWidth="2" opacity=".8" />
        <path d="M68 54q10 4 10 14" fill="none" stroke={P.edge} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export default function SatinBouquet({ D, onAgain }) {
  const [placed, setPlaced] = useState([])
  const [show, setShow] = useState(false)
  const timers = useRef([])
  const done = placed.length >= D.fill

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const add = (k) => {
    if (done) return
    const slot = placed.length
    setPlaced((p) => [...p, { slot, k }])
    navigator.vibrate?.(10)
    if (slot + 1 >= D.fill) timers.current.push(setTimeout(() => setShow(true), 2600))
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#f1e6ff] to-[#d9c8f5] text-[#3b2a63]">
      <p className="absolute inset-x-0 top-3 text-center text-xs font-semibold opacity-80">
        {placed.length}/{D.fill} {D.unit}
      </p>

      <div className="absolute left-1/2 top-7 h-[330px] w-[300px] -translate-x-1/2">
        <svg viewBox="0 0 300 330" className="h-full w-full" role="img" aria-label="Buket mawar satin lilac dan putih yang belum jadi">
          {[-56, -28, 0, 28, 56].map((dx) => (
            <path key={dx} d={`M${150 + dx * 0.3} 250L${150 + dx} 196`} stroke="#5f9f6a" strokeWidth="5" strokeLinecap="round" />
          ))}
          <path d="M64 226Q150 262 236 226L172 322Q150 330 128 322Z" fill="#fffdf8" stroke="#e3dcee" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M150 326L112 244M150 326L190 244" stroke="#e3dcee" strokeWidth="1.2" fill="none" />
          <path d="M104 262Q150 276 196 262L194 276Q150 290 106 276Z" fill="#c4acf0" />
          <path d="M150 276C132 262 118 266 124 278C128 288 144 282 150 276ZM150 276C168 262 182 266 176 278C172 288 156 282 150 276Z" fill="#a98ae6" />
          <circle cx="150" cy="276" r="4" fill="#8f70d4" />

          {SLOTS.map((sl, i) =>
            i >= placed.length ? (
              <circle key={`e${i}`} cx={sl.x} cy={sl.y} r={sl.s / 2} fill="none" stroke="#b9a3dc" strokeWidth="2" strokeDasharray="4 5" opacity={i >= D.fill ? 0.55 : 0.95} />
            ) : null,
          )}

          {placed
            .slice()
            .sort((a, b) => b.slot - a.slot)
            .map(({ slot, k }) => (
              <g key={slot} transform={`translate(${SLOTS[slot].x} ${SLOTS[slot].y})`}>
                <motion.g
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: ((slot * 37) % 21) - 10 }}
                  transition={{ type: 'spring', damping: 11, stiffness: 160 }}
                >
                  <Rose s={SLOTS[slot].s} k={k} />
                </motion.g>
              </g>
            ))}
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[168px] bg-gradient-to-b from-[#b88a62] to-[#8a6240]">
        <svg width="40" height="40" viewBox="-30 -30 60 60" className="absolute bottom-[12px] left-3" aria-hidden="true">
          <Rose s={56} k="lilac" />
        </svg>
        <svg width="36" height="36" viewBox="-30 -30 60 60" className="absolute bottom-[8px] right-4" aria-hidden="true">
          <Rose s={52} k="white" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-[46px] z-[2] flex justify-center gap-10">
        <Roll k="lilac" onTap={() => add('lilac')} label="Gulungan pita lilac" />
        <Roll k="white" onTap={() => add('white')} label="Gulungan pita putih" />
      </div>
      <p className="absolute inset-x-0 bottom-3 z-[2] text-center text-sm font-semibold text-white">{done ? D.unfinished : D.hint}</p>

      {show && <ZoneResult title={D.unfinished} story={D.story} item={D.photo} label="buket satin" onAgain={onAgain} againLabel="Rangkai lagi" />}
    </div>
  )
}