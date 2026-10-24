import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import ZoneResult from './ZoneResult.jsx'

const LETTERS = 'ILOVEYOUKYLA'.split('')
const GROUPS = [[0], [1, 2, 3, 4], [5, 6, 7], [8, 9, 10, 11]]
const PERM = [7, 2, 10, 4, 11, 0, 8, 5, 1, 9, 3, 6] // huruf diacak di tiap posisi balon
const COLORS = ['#ff9fc0', '#c8a2f0', '#fffdf8', '#ffb36b', '#8fd0f2', '#ff6f9c']
const BAL = PERM.map((idx, i) => ({
  i: idx,
  ch: LETTERS[idx],
  c: COLORS[i % 6],
  x: 17 + (i % 4) * 22 + (Math.floor(i / 4) % 2 ? 7 : -3),
  y: 25 + Math.floor(i / 4) * 17 + (i % 2 ? 4 : 0),
}))

export default function BalloonCannon({ D, onAgain }) {
  const box = useRef(null)
  const rot = useMotionValue(0)
  const ang = useRef(0)
  const cool = useRef(false)
  const sid = useRef(0)
  const target = useRef(new Set())
  const [popped, setPopped] = useState(() => new Set())
  const [shots, setShots] = useState([])
  const [show, setShow] = useState(false)
  const done = popped.size === BAL.length

  useEffect(() => {
    let raf
    const t0 = performance.now()
    const loop = (now) => {
      const a = 56 * Math.sin(((now - t0) / 1000) * 1.15)
      ang.current = a
      rot.set(a)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [rot])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(t)
  }, [done])

  const fire = () => {
    if (cool.current || done) return
    const el = box.current
    const W = el.clientWidth
    const H = el.clientHeight
    const th = (ang.current * Math.PI) / 180
    const dx = Math.sin(th)
    const dy = -Math.cos(th)
    const bx = W / 2
    const by = H - 34
    let hit = null
    let best = 1e9
    BAL.forEach((b) => {
      if (popped.has(b.i) || target.current.has(b.i)) return
      const vx = (b.x / 100) * W - bx
      const vy = (b.y / 100) * H - by
      const proj = vx * dx + vy * dy
      if (proj <= 0) return
      const perp = Math.abs(vx * dy - vy * dx)
      if (perp < 30 && proj < best) {
        best = proj
        hit = b
      }
    })
    const len = hit ? best : (by + 20) / Math.cos(th)
    if (hit) target.current.add(hit.i)
    cool.current = true
    setTimeout(() => (cool.current = false), 420)
    navigator.vibrate?.(10)
    setShots((a) => [
      ...a,
      { id: sid.current++, x1: bx + dx * 56, y1: by + dy * 56, x2: bx + dx * len, y2: by + dy * len, dur: Math.max(0.18, len / 1000), hit: hit ? hit.i : null },
    ])
  }

  const land = (s) => {
    setShots((a) => a.filter((v) => v.id !== s.id))
    if (s.hit !== null) {
      setPopped((p) => new Set(p).add(s.hit))
      navigator.vibrate?.(15)
    }
  }

  return (
    <div
      ref={box}
      onPointerDown={fire}
      className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#7fc4ee] via-[#a9c9f2] to-[#e6f1fb]"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-4 z-10 text-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {GROUPS.map((g, gi) => (
            <span key={gi} className="flex gap-1">
              {g.map((ix) => (
                <span
                  key={ix}
                  className="w-5 text-center font-display text-xl font-extrabold"
                  style={popped.has(ix) ? { color: '#d6457a', textShadow: '0 0 10px rgba(255,111,156,.6)' } : { color: 'rgba(31,74,122,.45)' }}
                >
                  {popped.has(ix) ? LETTERS[ix] : '·'}
                </span>
              ))}
            </span>
          ))}
        </div>
        <p className="mt-1 text-xs font-semibold text-[#1f4a7a]">{D.hint}</p>
      </div>

      {BAL.map((b) => {
        const gone = popped.has(b.i)
        return (
          <motion.div
            key={b.i}
            className="pointer-events-none absolute -ml-[22px] -mt-[26px] h-[62px] w-[44px]"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            animate={gone ? { scale: [1, 1.35, 0], opacity: [1, 1, 0] } : { y: [0, -6, 0] }}
            transition={gone ? { duration: 0.35 } : { duration: 2.4 + (b.i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 44 62" className="h-full w-full" aria-hidden="true">
              <ellipse cx="22" cy="22" rx="20" ry="22" fill={b.c} />
              <ellipse cx="14" cy="13" rx="5" ry="7" fill="#fff" opacity=".4" />
              <path d="M22 44L18 50H26Z" fill={b.c} />
              <path d="M22 50Q16 56 22 62" stroke="#8a7a9a" strokeWidth="1.2" fill="none" />
            </svg>
            <span className="absolute inset-x-0 top-[9px] text-center font-display text-lg font-extrabold text-[#3b2a63]">{b.ch}</span>
            {gone &&
              Array.from({ length: 6 }).map((_, k) => (
                <motion.span
                  key={k}
                  className="absolute left-1/2 top-[22px] h-2 w-2 rounded-full"
                  style={{ background: b.c }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: Math.cos(k * 1.05) * 34, y: Math.sin(k * 1.05) * 34, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              ))}
          </motion.div>
        )
      })}

      {shots.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute left-0 top-0 z-10 h-3 w-3 rounded-full bg-[#fff6c9]"
          style={{ boxShadow: '0 0 10px 3px rgba(255,236,170,.9)' }}
          initial={{ x: s.x1 - 6, y: s.y1 - 6 }}
          animate={{ x: s.x2 - 6, y: s.y2 - 6 }}
          transition={{ duration: s.dur, ease: 'linear' }}
          onAnimationComplete={() => land(s)}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute left-1/2 -ml-[9px] h-[58px] w-[18px] rounded-t-md bg-[#8a62b0]"
        style={{ bottom: 34, rotate: rot, originX: 0.5, originY: 1 }}
      >
        <span className="absolute inset-x-0 top-1 h-1.5 bg-[#c9a2d8]" />
      </motion.div>
      <div className="pointer-events-none absolute bottom-[8px] left-1/2 -ml-[34px] h-[34px] w-[68px] rounded-t-full bg-[#6a4cb4]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -ml-[44px] h-3 w-[88px] rounded bg-[#4b3a78]" />

      {show && <ZoneResult title={D.win} story={D.story} item={D.photo} label="meriam balon" onAgain={onAgain} />}
    </div>
  )
}