import { useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import Result from './Result.jsx'

const STEPS = 24

export default function WaterBike({ D, onDone, onAgain }) {
  const p = useMotionValue(0)
  const tilt = useMotionValue(0)
  const left = useTransform(p, (v) => `calc(6px + ${v} * (100% - 128px))`)
  const last = useRef(null)
  const prog = useRef(0)
  const [won, setWon] = useState(false)
  const [msg, setMsg] = useState(D.hint)

  const pedal = (side) => {
    if (won) return
    if (last.current === side) {
      setMsg(D.wobble)
      animate(tilt, [0, -9, 9, -6, 0], { duration: 0.45 })
      return
    }
    last.current = side
    setMsg(D.hint)
    prog.current = Math.min(1, prog.current + 1 / STEPS)
    animate(p, prog.current, { duration: 0.2 })
    if (prog.current >= 1) {
      setWon(true)
      navigator.vibrate?.(40)
      onDone()
    }
  }

  const pads = [
    ['left', 'Kiri'],
    ['right', 'Kanan'],
  ]

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#bfe6f7] to-[#4fa8d6]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border-2 border-white/60"
          style={{ left: `${18 + i * 30}%`, top: `${58 + (i % 2) * 14}%`, width: 40, height: 40 }}
          animate={{ scale: [0.4, 2.6], opacity: [0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.9 }}
        />
      ))}
      <p className="absolute inset-x-0 top-6 text-center text-sm font-semibold text-[#1f4160]">{msg}</p>

      <svg width="34" height="60" viewBox="0 0 34 60" className="absolute right-3 top-[156px]" aria-hidden="true">
        <rect x="16" y="4" width="3" height="52" fill="#6b5a85" />
        <path d="M19 6L32 14L19 22Z" fill="#ff8fb1" />
      </svg>

      <motion.div
        className="absolute w-[116px]"
        style={{ left, top: 150, rotate: tilt }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <div className="absolute -top-8 left-3 flex gap-1">
          <Koala size={38} />
          <Cat size={38} />
        </div>
        <svg viewBox="0 0 116 64" className="block w-full" aria-label="Sepeda air bentuk angsa">
          <path d="M96 30Q112 28 110 14Q108 6 100 8" stroke="#fffdf8" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="100" cy="9" r="7" fill="#fffdf8" />
          <polygon points="105,9 114,11 105,14" fill="#ffb36b" />
          <ellipse cx="54" cy="40" rx="52" ry="20" fill="#fffdf8" />
          <ellipse cx="54" cy="46" rx="52" ry="14" fill="#d9e8f5" opacity=".7" />
          <rect x="22" y="26" width="64" height="8" rx="4" fill="#ff8fb1" />
        </svg>
      </motion.div>

      <div className="absolute inset-x-0 bottom-7 flex justify-around px-6">
        {pads.map(([side, label]) => (
          <button
            key={side}
            type="button"
            onPointerDown={() => pedal(side)}
            aria-label={`Kayuh ${label}`}
            className={`h-24 w-24 rounded-full text-lg font-extrabold text-white shadow-lg active:scale-90 ${side === 'left' ? 'bg-[#9a7fd8]' : 'bg-[#f5993a]'}`}
            style={{ touchAction: 'manipulation' }}
          >
            {label}
          </button>
        ))}
      </div>
      {won && <Result D={D} title={D.win} onAgain={onAgain} />}
    </div>
  )
}