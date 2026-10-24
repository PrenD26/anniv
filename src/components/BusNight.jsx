import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const STEPS = ['21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '04:30']
const TILE = 520

const Lights = (
  <svg width={TILE} height="120" viewBox="0 0 520 120" className="block" aria-hidden="true">
    {[40, 150, 290, 400, 480].map((x) => (
      <g key={x}>
        <rect x={x} y="52" width="3" height="68" fill="#0f0a24" />
        <circle cx={x + 1.5} cy="52" r="10" fill="rgba(255,217,138,.28)" />
        <circle cx={x + 1.5} cy="52" r="3.5" fill="#ffd98a" />
      </g>
    ))}
    <path d="M0 120V96Q40 70 90 96T200 92T330 98T460 90L520 96V120Z" fill="#0f0a24" />
  </svg>
)

export default function BusNight({ D, onAgain }) {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(false)
  const done = i >= STEPS.length - 1
  const dawn = Math.max(0, (i - 5) / 3)

  const tap = () => {
    if (done) return
    const m = i + 1
    setI(m)
    navigator.vibrate?.(10)
    if (m >= STEPS.length - 1) setTimeout(() => setShow(true), 3400)
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#1a1238] to-[#2b2050]">
      <div className="pointer-events-none absolute inset-x-0 top-5 z-[3] text-center">
        <p className="font-display text-4xl font-extrabold tabular-nums text-[#ffe9b0]">{STEPS[i]}</p>
        <p className="mt-1 text-xs text-lilac-200">{done ? D.stopLine : D.hint}</p>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Majukan jam"
        onPointerDown={tap}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && tap()}
        className="absolute inset-x-5 top-[104px] h-[230px] overflow-hidden rounded-[28px] border-[10px] border-[#4a3a78]"
        style={{ touchAction: 'manipulation', background: 'linear-gradient(180deg,#0d0a2a,#201a4a)' }}
      >
        {[[12, 14], [30, 30], [52, 10], [70, 24], [88, 12], [64, 40], [20, 46]].map(([x, y], k) => (
          <span key={k} className="absolute h-1 w-1 rounded-full bg-white/80" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#2c2f6b,#f08a6a 78%,#ffd9a0)' }} animate={{ opacity: dawn }} transition={{ duration: 1.6 }} />
        <div className="drift absolute bottom-0 left-0 flex" style={{ width: TILE * 3, animationDuration: '5s' }}>
          {[0, 1, 2].map((k) => (
            <div key={k} className="shrink-0" style={{ width: TILE }}>
              {Lights}
            </div>
          ))}
        </div>
        {done && (
          <motion.svg width="120" height="110" viewBox="0 0 120 110" className="absolute bottom-0 right-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} aria-label="Masjid">
            <path d="M20 110V64Q20 40 50 40Q80 40 80 64V110Z" fill="#171235" />
            <rect x="86" y="30" width="10" height="80" fill="#171235" />
            <path d="M84 30L91 10L98 30Z" fill="#171235" />
            <circle cx="50" cy="34" r="3" fill="#ffd98a" />
            <rect x="40" y="70" width="20" height="40" rx="10" fill="#ffd98a" opacity=".8" />
          </motion.svg>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-b from-[#352a62] to-[#241b45]">
        <div className="absolute bottom-0 left-8 h-[86px] w-[120px] rounded-t-3xl bg-[#4a3a78]" />
        <div className="absolute bottom-0 right-8 h-[86px] w-[120px] rounded-t-3xl bg-[#4a3a78]" />
        <div className="absolute bottom-[70px] left-9"><Koala size={64} /></div>
        <div className="absolute bottom-[70px] right-9"><Cat size={64} /></div>
        {['left-[118px]', 'right-[118px]'].map((c, k) => (
          <motion.span
            key={c}
            className={`absolute bottom-[130px] ${c} text-lg font-bold text-lilac-200`}
            animate={{ y: [0, -16], opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: k * 1.1 }}
          >
            z
          </motion.span>
        ))}
      </div>

      {show && <ZoneResult title={D.done} story={D.story} items={D.media} label="bus malam" onAgain={onAgain} />}
    </div>
  )
}