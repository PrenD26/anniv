import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Result from './Result.jsx'

const ITEMS = [
  { id: 'bat', x: 16, y: 44 },
  { id: 'pumpkin', x: 50, y: 56 },
  { id: 'skull', x: 84, y: 48 },
]

const ART = {
  bat: (
    <svg width="64" height="40" viewBox="0 0 60 36" aria-hidden="true">
      <path d="M30 10Q20 0 2 6Q10 14 14 24Q22 16 30 24Q38 16 46 24Q50 14 58 6Q40 0 30 10Z" fill="#7a65c0" />
      <circle cx="26" cy="12" r="1.8" fill="#ffe27a" />
      <circle cx="34" cy="12" r="1.8" fill="#ffe27a" />
    </svg>
  ),
  pumpkin: (
    <svg width="60" height="54" viewBox="0 0 60 54" aria-hidden="true">
      <ellipse cx="30" cy="30" rx="26" ry="22" fill="#f5993a" />
      <rect x="28" y="4" width="5" height="9" rx="2" fill="#5f9f6a" />
      <polygon points="18,24 26,24 22,32" fill="#2a1f45" />
      <polygon points="34,24 42,24 38,32" fill="#2a1f45" />
      <path d="M18 40L23 36L28 41L33 36L38 41L42 38" stroke="#2a1f45" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  skull: (
    <svg width="52" height="58" viewBox="0 0 52 58" aria-hidden="true">
      <path d="M6 26Q6 4 26 4Q46 4 46 26Q46 36 38 40V50H14V40Q6 36 6 26Z" fill="#e8e2f0" />
      <ellipse cx="18" cy="26" rx="6" ry="7" fill="#2a1f45" />
      <ellipse cx="34" cy="26" rx="6" ry="7" fill="#2a1f45" />
      <path d="M22 50V42M26 50V42M30 50V42" stroke="#2a1f45" strokeWidth="2" />
    </svg>
  ),
}

export default function Haunted({ D, onDone, onAgain }) {
  const box = useRef(null)
  const px = useMotionValue(-300)
  const [found, setFound] = useState([])
  const [boo, setBoo] = useState(false)
  const [show, setShow] = useState(false)
  const mask = useMotionTemplate`radial-gradient(circle 96px at ${px}px 50%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 45%, rgba(6,4,18,0.97) 100%)`

  useEffect(() => {
    px.set(box.current.clientWidth / 2)
  }, [px])

  const aim = (e) => {
    const r = box.current.getBoundingClientRect()
    const x = Math.min(r.width, Math.max(0, e.clientX - r.left))
    px.set(x)
    setFound((f) => {
      const add = ITEMS.filter((i) => !f.includes(i.id) && Math.abs(x - (i.x / 100) * r.width) < 52).map((i) => i.id)
      return add.length ? [...f, ...add] : f
    })
  }

  useEffect(() => {
    if (found.length < ITEMS.length) return
    const t1 = setTimeout(() => {
      setBoo(true)
      navigator.vibrate?.([90, 40, 180])
    }, 700)
    const t2 = setTimeout(() => {
      setShow(true)
      onDone()
    }, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [found.length])

  return (
    <div
      ref={box}
      onPointerMove={aim}
      onPointerDown={aim}
      className="relative h-full w-full select-none overflow-hidden bg-[#1a1138]"
      style={{ touchAction: 'pan-y', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 2px, transparent 2px 38px)' }}
    >
      {ITEMS.map((i) => (
        <motion.div
          key={i.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${i.x}%`, top: `${i.y}%` }}
          animate={{ scale: found.includes(i.id) ? 1.2 : 1 }}
        >
          {ART[i.id]}
        </motion.div>
      ))}
      <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: mask }} />
      <div className="pointer-events-none absolute inset-x-0 top-5 z-20 text-center text-sm font-semibold text-lilac-100">
        <p>{D.hint}</p>
        <p className="mt-1 text-xs opacity-80">
          {D.found} {found.length}/{ITEMS.length}
        </p>
      </div>

      {boo && (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#2a0f2e]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.svg
            viewBox="0 0 100 120"
            width="190"
            height="228"
            initial={{ scale: 0.2, y: 60 }}
            animate={{ scale: [0.2, 1.25, 1], y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Hantu"
          >
            <path d="M10 110V50Q10 8 50 8Q90 8 90 50V110L76 98L63 110L50 98L37 110L24 98Z" fill="#fffdf8" />
            <ellipse cx="36" cy="46" rx="7" ry="9" fill="#2a1f45" />
            <ellipse cx="64" cy="46" rx="7" ry="9" fill="#2a1f45" />
            <ellipse cx="50" cy="72" rx="10" ry="13" fill="#2a1f45" />
          </motion.svg>
          <motion.p
            className="mt-2 font-display text-6xl font-extrabold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {D.boo}
          </motion.p>
        </motion.div>
      )}
      {show && <Result D={D} title={D.boo} onAgain={onAgain} delay={0.1} />}
    </div>
  )
}