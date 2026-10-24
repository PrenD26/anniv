import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const FAR = 120
const MID = 420
const NEAR = 900
const SHOPS = [[10, 90, 74], [110, 96, 104], [214, 84, 82], [306, 100, 96], [414, 92, 110], [514, 96, 78], [618, 100, 100], [722, 90, 86]]
const LAMPS = [50, 250, 450, 650, 850, 1050]

function Lamp() {
  return (
    <svg width="34" height="150" viewBox="0 0 34 150" aria-hidden="true">
      <rect x="15" y="40" width="4" height="110" fill="#1b1530" />
      <path d="M8 36H26L22 14H12Z" fill="#1b1530" />
      <rect x="11" y="16" width="12" height="18" fill="#ffd98a" />
      <circle cx="17" cy="26" r="22" fill="rgba(255,217,138,.3)" />
    </svg>
  )
}

function Becak({ running }) {
  return (
    <div className="relative" style={{ width: 210, height: 100 }}>
      <svg viewBox="0 0 210 100" width="210" height="100" role="img" aria-label="Becak">
        <path d="M100 44Q140 4 190 44Z" fill="#f5c451" />
        <rect x="104" y="44" width="80" height="26" rx="6" fill="#7a5cc4" />
        <path d="M36 76L100 60" stroke="#2a1f45" strokeWidth="4" strokeLinecap="round" />
        <circle cx="46" cy="30" r="9" fill="#e8b48a" />
        <path d="M36 25Q46 14 56 25Z" fill="#2a1f45" />
        <path d="M46 40L52 62" stroke="#3c7a89" strokeWidth="10" strokeLinecap="round" />
        {[36, 150].map((cx) => (
          <g key={cx} className="wheel" style={{ animationPlayState: running ? 'running' : 'paused' }}>
            <circle cx={cx} cy="78" r="18" fill="none" stroke="#2a1f45" strokeWidth="4" />
            <path d={`M${cx - 16} 78H${cx + 16}M${cx} 62V94`} stroke="#8a7a9a" strokeWidth="1.4" />
          </g>
        ))}
      </svg>
      <div className="absolute" style={{ left: 108, top: 8 }}><Koala size={42} /></div>
      <div className="absolute" style={{ left: 146, top: 8 }}><Cat size={42} /></div>
    </div>
  )
}

export default function Malioboro({ D, progress }) {
  const far = useTransform(progress, [0, 1], [0, -FAR])
  const mid = useTransform(progress, [0, 1], [0, -MID])
  const near = useTransform(progress, [0, 1], [0, -NEAR])
  const [moving, setMoving] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useRef(null)

  useMotionValueEvent(progress, 'change', (v) => {
    setMoving(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setMoving(false), 180)
    setArrived((a) => (a === v >= 0.97 ? a : v >= 0.97))
  })
  useEffect(() => () => clearTimeout(t.current), [])

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#0d0a2a] via-[#241b4a] to-[#4a3a78]">
      <motion.div style={{ x: far, width: 360 + FAR }} className="absolute left-0 top-0 h-full" aria-hidden="true">
        {[[12, 20], [28, 40], [46, 14], [64, 34], [82, 18], [94, 46], [38, 64]].map(([x, y], k) => (
          <span key={k} className="absolute h-1 w-1 rounded-full bg-white/80" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </motion.div>

      <motion.div style={{ x: mid, width: 360 + MID, bottom: 130 }} className="absolute left-0 h-[130px]" aria-hidden="true">
        {SHOPS.map(([x, w, h]) => (
          <div key={x} className="absolute bottom-0 bg-[#2b2150]" style={{ left: x, width: w, height: h }}>
            <span className="absolute inset-x-2 top-2 h-3 rounded-sm bg-[#ffd98a] opacity-70" />
            {[0, 1].map((r) => (
              <span key={r} className="absolute h-4 w-5 bg-[#ffd98a] opacity-50" style={{ left: 8 + r * 34, top: 26 }} />
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: near, width: 360 + NEAR }} className="absolute bottom-0 left-0 h-full" aria-hidden="true">
        {LAMPS.map((x) => (
          <div key={x} className="absolute" style={{ left: x, bottom: 128 }}><Lamp /></div>
        ))}
        {[140, 540, 940].map((x) => (
          <div key={x} className="absolute h-[14px] w-[70px] rounded bg-[#3a3260]" style={{ left: x, bottom: 128 }} />
        ))}
        <div className="absolute inset-x-0 bottom-[96px] h-[34px]" style={{ background: 'repeating-linear-gradient(90deg,#4a4170 0 38px,#3d3560 38px 40px)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[96px] bg-gradient-to-b from-[#2a2540] to-[#17132b]" />
      </motion.div>

      <div className="absolute left-3 top-3 rounded bg-[#2f7d4f] px-2.5 py-1 text-[11px] font-bold tracking-wider text-white">JL. MALIOBORO</div>
      <p className="pointer-events-none absolute right-4 top-3 font-display text-2xl font-extrabold tabular-nums text-[#ffe9b0]">01:00</p>
      <p className="pointer-events-none absolute inset-x-0 top-[52px] px-8 text-center text-xs font-semibold text-lilac-200">{arrived ? D.arrive : D.hint}</p>

      <button
        type="button"
        onClick={() => arrived && setOpen(true)}
        disabled={!arrived}
        aria-label="Buka cerita Malioboro"
        className="absolute left-[70px] z-[3]"
        style={{ bottom: 70 }}
      >
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
          <Becak running={moving} />
        </motion.div>
      </button>

      {open && <ZoneResult title={D.title} story={D.story} items={D.media} label="Malioboro" onClose={() => setOpen(false)} delay={0.1} />}
    </div>
  )
}