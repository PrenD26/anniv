import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ZoneResult from './ZoneResult.jsx'

const STARS = [[18, 20], [40, 34], [64, 16], [82, 40], [28, 52], [72, 60], [50, 70], [90, 22]]
const timeAt = (v) => {
  const m = 15 + v * 47
  const h = m >= 60 ? 18 : 17
  return `${h}:${String(Math.floor(m % 60)).padStart(2, '0')}`
}

export default function Cafe({ D, onAgain }) {
  const win = useRef(null)
  const drag = useRef(false)
  const fin = useRef(false)
  const p = useMotionValue(0)
  const ps = useSpring(p, { stiffness: 110, damping: 22 })
  const [done, setDone] = useState(false)
  const [show, setShow] = useState(false)

  const top = useTransform(ps, [0, 0.55, 0.85, 1], ['#8fc5f5', '#f4a46a', '#5a3a8a', '#1f1445'])
  const bottom = useTransform(ps, [0, 0.55, 0.85, 1], ['#d6ecfb', '#ffc27a', '#c9628a', '#3b2466'])
  const sky = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`
  const sunX = useTransform(ps, (v) => `${6 + v * 88}%`)
  const sunY = useTransform(ps, (v) => `${10 + v * 66}%`)
  const sunC = useTransform(ps, [0, 0.6, 1], ['#fff3b0', '#ff9a3c', '#ff5e4d'])
  const sunBg = useMotionTemplate`radial-gradient(circle, ${sunC} 40%, rgba(255,200,120,0) 70%)`
  const night = useTransform(ps, [0.78, 1], [0, 1])
  const lamp = useTransform(ps, [0.3, 0.8], [0.2, 1])
  const arrow = useTransform(ps, [0, 0.1], [1, 0])
  const time = useTransform(ps, timeAt)

  const aim = (e) => {
    if (!drag.current || fin.current) return
    const r = win.current.getBoundingClientRect()
    const v = Math.min(1, Math.max(0, (e.clientX - r.left - 30) / (r.width - 60)))
    p.set(v)
    if (v >= 0.97) {
      fin.current = true
      p.set(1)
      setDone(true)
      navigator.vibrate?.([30, 40, 60])
      setTimeout(() => setShow(true), 2600)
    }
  }
  const down = (e) => {
    drag.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    aim(e)
  }
  const up = () => {
    drag.current = false
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#4a2f24] to-[#2d1c18]">
      <motion.div
        className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full border-2 px-4 py-1 font-display text-lg font-extrabold tracking-wider"
        style={{ opacity: lamp, color: '#ffd98a', borderColor: '#ffd98a', boxShadow: '0 0 18px rgba(255,217,138,.7)' }}
      >
        {D.name}
      </motion.div>

      {[52, 308].map((x) => (
        <div key={x} className="absolute top-0" style={{ left: x }}>
          <span className="absolute left-0 top-0 h-9 w-px bg-[#8a6a50]" />
          <motion.span className="absolute top-9 -ml-4 h-5 w-8 rounded-t-full bg-[#d9a05a]" style={{ opacity: lamp }} />
          <motion.span
            className="absolute top-6 -ml-10 h-20 w-20 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,214,140,.7), transparent 70%)', opacity: lamp }}
          />
        </div>
      ))}

      <div
        ref={win}
        onPointerDown={down}
        onPointerMove={aim}
        onPointerUp={up}
        onPointerCancel={up}
        className="absolute overflow-hidden border-[8px] border-[#6b4a34]"
        style={{ left: 24, top: 78, width: 312, height: 250, borderRadius: '140px 140px 10px 10px', touchAction: 'pan-y' }}
      >
        <motion.div className="absolute inset-0" style={{ background: sky }} />
        <motion.div className="absolute inset-0" style={{ opacity: night }}>
          {STARS.map(([x, y], i) => (
            <span key={i} className="absolute h-1 w-1 rounded-full bg-white" style={{ left: `${x}%`, top: `${y}%` }} />
          ))}
          <svg width="26" height="26" viewBox="20 10 160 160" className="absolute" style={{ left: '66%', top: '16%' }} aria-hidden="true">
            <path d="M44.5 32.4A80 80 0 1 0 155.5 32.4A62 62 0 1 1 44.5 32.4Z" fill="#fff1c6" />
          </svg>
        </motion.div>
        <motion.div className="absolute -ml-[30px] -mt-[30px] h-[60px] w-[60px] rounded-full" style={{ left: sunX, top: sunY, background: sunBg }} />
        <svg viewBox="0 0 296 70" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[70px] w-full" aria-hidden="true">
          <path d="M0 70V40L24 28L48 40L64 22L92 40L120 30L150 44L178 26L208 42L236 32L264 44L296 36V70Z" fill="#2d2147" />
        </svg>
        <span className="absolute inset-y-0 left-1/2 -ml-[2px] w-[5px] bg-[#6b4a34]" />
        <span className="absolute inset-x-0 top-[56%] h-[5px] bg-[#6b4a34]" />
        <motion.span className="absolute left-[24%] top-[14%] text-2xl font-bold text-white" style={{ opacity: arrow }} animate={{ x: [0, 10, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          →
        </motion.span>
        <div className="absolute right-3 top-[74px] rounded-full bg-black/35 px-2.5 py-0.5 text-xs font-bold tabular-nums text-white">
          <motion.span>{time}</motion.span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0" style={{ top: 338 }}>
        <div className="h-3 bg-[#a8764a]" />
        <div className="h-full bg-gradient-to-b from-[#7a4f32] to-[#4b2f20]" />
      </div>

      <svg width="150" height="70" viewBox="0 0 150 70" className="absolute" style={{ left: 100, top: 300 }} aria-label="Piring nasi goreng">
        <ellipse cx="75" cy="52" rx="64" ry="14" fill="#e8e2d8" />
        <ellipse cx="75" cy="48" rx="54" ry="11" fill="#fffdf8" />
        <path d="M32 46Q40 14 75 14Q110 14 118 46Q75 56 32 46Z" fill="#c9803a" />
        {[[52, 30], [66, 24], [82, 32], [60, 40], [92, 40], [74, 20]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#9a5a22" />
        ))}
        <ellipse cx="98" cy="28" rx="14" ry="9" fill="#fffdf8" />
        <circle cx="98" cy="28" r="5" fill="#ffc83d" />
        <circle cx="40" cy="52" r="6" fill="#9fd08a" stroke="#6faa5c" strokeWidth="1.5" />
        <circle cx="52" cy="56" r="6" fill="#ff8a6a" />
      </svg>

      <svg width="36" height="64" viewBox="0 0 36 64" className="absolute" style={{ left: 262, top: 298 }} aria-hidden="true">
        <path d="M4 4H32L28 60H8Z" fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth="1.5" />
        <path d="M6 22H30L28 58H8Z" fill="#f2a04a" opacity=".85" />
        <rect x="11" y="28" width="8" height="8" rx="2" fill="#fff" opacity=".6" />
        <rect x="19" y="36" width="8" height="8" rx="2" fill="#fff" opacity=".6" />
      </svg>

      <div className="absolute left-7 top-[352px] rounded-sm bg-[#fffdf8] px-2 py-1 text-center text-[10px] font-bold text-[#6b4a34] shadow">{D.menu}</div>

      {done &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-10 w-1.5 rounded-full bg-white/60 blur-[2px]"
            style={{ left: 142 + i * 18, top: 262 }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: -34 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

      <div className="absolute inset-x-0 bottom-[28px] px-6 text-center">
        {done ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-3xl font-extrabold text-[#ffe9b0]"
            style={{ textShadow: '0 0 20px rgba(255,217,138,.8)' }}
          >
            {D.done}
          </motion.p>
        ) : (
          <p className="text-sm font-semibold text-white/90">{D.hint}</p>
        )}
      </div>

      {show && <ZoneResult title={D.done} story={D.story} items={[D.photo]} label="kafe" onAgain={onAgain} />}
    </div>
  )
}