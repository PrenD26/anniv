import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const COLS = 9
const BALL = 36
const STEP = 28
const MAXLVL = 6
const COLORS = ['#ffffff', '#6a3fd0', '#c6cdd8']

export default function BallPit({ D, onAgain }) {
  const box = useRef(null)
  const heights = useRef(Array(COLS).fill(0))
  const count = useRef(0)
  const [balls, setBalls] = useState([])
  const [pop, setPop] = useState(false)
  const [show, setShow] = useState(false)
  const done = balls.length >= D.goal

  const toss = (e) => {
    if (done) return
    const r = box.current.getBoundingClientRect()
    let col = Math.min(COLS - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * COLS)))
    if (heights.current[col] >= MAXLVL) col = heights.current.indexOf(Math.min(...heights.current))
    const lvl = heights.current[col]++
    const n = count.current++
    setBalls((b) => [...b, { n, col, lvl, c: COLORS[n % 3], dx: ((n * 7) % 11) - 5 }])
    navigator.vibrate?.(8)
    if (n + 1 >= D.goal) {
      setTimeout(() => setPop(true), 1300)
      setTimeout(() => setShow(true), 3800)
    }
  }

  return (
    <div
      ref={box}
      onPointerDown={toss}
      className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#241046] via-[#3a1d72] to-[#5a35a8]"
      style={{ touchAction: 'manipulation' }}
    >
      <span className="neon absolute inset-x-0 top-0 h-2 bg-[#ff4fd8]" style={{ boxShadow: '0 0 22px 6px rgba(255,79,216,.8)' }} />
      <div className="pointer-events-none absolute inset-x-0 top-6 text-center text-white">
        <p className="text-sm font-semibold">{D.hint}</p>
        <p className="mt-1 text-xs opacity-80">
          {Math.min(balls.length, D.goal)} / {D.goal} bola
        </p>
      </div>

      {pop && (
        <div className="pointer-events-none absolute inset-x-0 z-[5] flex justify-center" style={{ bottom: 116 }}>
          <motion.div className="flex gap-1" initial={{ y: 150 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 10, stiffness: 80 }}>
            <Koala size={86} />
            <Cat size={86} />
          </motion.div>
        </div>
      )}

      {balls.map((b) => {
        const start = -(470 - b.lvl * STEP)
        return (
          <motion.span
            key={b.n}
            className="pointer-events-none absolute z-10 rounded-full"
            style={{
              left: `calc(${b.col} * (100% / ${COLS}) + (100% / ${COLS} - ${BALL}px) / 2 + ${b.dx}px)`,
              bottom: 6 + b.lvl * STEP,
              width: BALL,
              height: BALL,
              background: b.c,
              boxShadow: 'inset -4px -5px 8px rgba(0,0,0,.18), inset 3px 3px 6px rgba(255,255,255,.45)',
            }}
            initial={{ y: start }}
            animate={{ y: [start, 0, -24, 0, -8, 0] }}
            transition={{ duration: 1.1, times: [0, 0.45, 0.62, 0.78, 0.9, 1], ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
          />
        )
      })}

      {show && <ZoneResult title={D.win} story={D.story} item={D.photo} label="foto kolam bola" onAgain={onAgain} />}
    </div>
  )
}