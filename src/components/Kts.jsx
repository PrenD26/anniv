import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const W = 128
const GAP = 40
const SHOPS = ['cup', 'bag', 'shoe', 'gift', 'book', 'cake']

const ICONS = {
  cup: (
    <>
      <path d="M12 14h28l-3 30H15z" fill="#fffdf8" stroke="#8a6a50" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 20h5a7 7 0 0 1 0 14h-6" fill="none" stroke="#8a6a50" strokeWidth="2.5" />
      <path d="M18 24h16" stroke="#c98a5a" strokeWidth="5" />
      <path d="M20 6q-3 4 0 8M28 4q-3 4 0 8" stroke="#b9a3dc" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  bag: (
    <>
      <path d="M10 18h36l4 30H6z" fill="#ffb3cc" stroke="#d6457a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 18v-4a10 10 0 0 1 20 0v4" fill="none" stroke="#d6457a" strokeWidth="2.5" />
    </>
  ),
  shoe: (
    <>
      <path d="M6 36q12 0 16-10l6 4q6 4 20 4q6 0 6 8v4H6z" fill="#9ec9ff" stroke="#4b7be0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M6 46h50" stroke="#fff" strokeWidth="4" />
    </>
  ),
  gift: (
    <>
      <rect x="8" y="22" width="40" height="28" rx="3" fill="#c9b2ff" stroke="#7a5cc4" strokeWidth="2.5" />
      <rect x="24" y="22" width="8" height="28" fill="#ff8fb1" />
      <rect x="6" y="14" width="44" height="10" rx="3" fill="#ddd0ff" stroke="#7a5cc4" strokeWidth="2.5" />
      <path d="M28 14c-8-10-18-4-10 0M28 14c8-10 18-4 10 0" fill="none" stroke="#ff8fb1" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <rect x="10" y="8" width="36" height="44" rx="3" fill="#a8e6cf" stroke="#4aa17f" strokeWidth="2.5" />
      <path d="M18 8v44M24 20h16M24 28h12" stroke="#4aa17f" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  cake: (
    <>
      <path d="M8 34h40v14H8z" fill="#ffe3ee" stroke="#d6457a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M8 34q5 6 10 0t10 0t10 0t10 0" fill="#fff" stroke="#d6457a" strokeWidth="2.5" />
      <circle cx="28" cy="22" r="6" fill="#ff5a7a" />
      <path d="M28 16v-5" stroke="#5f9f6a" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
}

export default function Kts({ D, onAgain }) {
  const sc = useRef(null)
  const doneRef = useRef(false)
  const moveT = useRef(null)
  const timers = useRef([])
  const [lit, setLit] = useState([])
  const [moving, setMoving] = useState(false)
  const [started, setStarted] = useState(false)
  const [show, setShow] = useState(false)

  const onScroll = () => {
    const el = sc.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    const mid = el.scrollLeft + el.clientWidth / 2
    const pad = el.clientWidth / 2 - W / 2
    SHOPS.forEach((_, i) => {
      const cx = pad + i * (W + GAP) + W / 2
      if (Math.abs(cx - mid) < 70) setLit((l) => (l.includes(i) ? l : [...l, i]))
    })
    if (el.scrollLeft > 4) {
      setStarted(true)
      setMoving(true)
      clearTimeout(moveT.current)
      moveT.current = setTimeout(() => setMoving(false), 160)
    }
    if (p >= 0.97 && !doneRef.current) {
      doneRef.current = true
      navigator.vibrate?.([30, 40, 60])
      timers.current.push(setTimeout(() => setShow(true), 1200))
    }
  }

  useEffect(() => {
    onScroll()
    return () => {
      clearTimeout(moveT.current)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#fbf3ff] to-[#e9dcf7]">
      <div ref={sc} onScroll={onScroll} className="no-scrollbar absolute inset-0 overflow-x-auto overflow-y-hidden">
        <div
          className="relative flex h-full w-max items-center"
          style={{ gap: GAP, paddingLeft: `calc(50% - ${W / 2}px)`, paddingRight: `calc(50% - ${W / 2}px)` }}
        >
          <div className="absolute inset-x-0 top-0 h-7 bg-[#e3d8f2]" />
          <div
            className="absolute inset-x-0 bottom-0 h-[96px]"
            style={{ background: 'conic-gradient(#efe9f7 25%, #ffffff 0 50%, #efe9f7 0 75%, #ffffff 0) 0 0 / 48px 48px' }}
          />
          {SHOPS.map((id, i) => {
            const on = lit.includes(i)
            return (
              <div
                key={id}
                className={`relative z-[1] flex h-[170px] shrink-0 items-center justify-center rounded-t-3xl border-4 transition-all duration-700 ${
                  on ? 'border-[#e8b44c] bg-[#fff2c4] shadow-[0_0_30px_rgba(255,214,120,.8)]' : 'border-[#a79fb8] bg-[#d9d2e6]'
                }`}
                style={{ width: W, marginBottom: 40 }}
              >
                <span className="absolute -top-3 left-1/2 h-3 w-10 -translate-x-1/2 rounded-b-full" style={{ background: on ? '#ffd27a' : '#8f87a3' }} />
                <svg viewBox="0 0 56 56" className="h-16 w-16 transition-opacity duration-700" style={{ opacity: on ? 1 : 0.45 }} aria-hidden="true">
                  {ICONS[id]}
                </svg>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[34px] z-10 flex justify-center gap-1">
        <motion.div animate={moving ? { y: [0, -6, 0] } : { y: 0 }} transition={moving ? { duration: 0.35, repeat: Infinity } : { duration: 0.2 }}>
          <Koala size={72} />
        </motion.div>
        <motion.div animate={moving ? { y: [0, -6, 0] } : { y: 0 }} transition={moving ? { duration: 0.35, repeat: Infinity, delay: 0.17 } : { duration: 0.2 }}>
          <Cat size={72} />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-10 z-10 text-center text-sm font-semibold text-[#3b2a63]">
        <p>{D.hint}</p>
        {!started && (
          <motion.p className="mt-1 text-2xl" animate={{ x: [-8, 8, -8] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ‹ ›
          </motion.p>
        )}
      </div>

      {show && <ZoneResult title={D.done} story={D.story} item={D.video} label="kenangan KTS" onAgain={onAgain} />}
    </div>
  )
}