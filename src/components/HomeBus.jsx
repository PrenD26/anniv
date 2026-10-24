import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import { BusSvg } from './BusBreak.jsx'
import ZoneResult from './ZoneResult.jsx'

const TILE = 520
const Skyline = (
  <svg width={TILE} height="150" viewBox="0 0 520 150" className="block" aria-hidden="true">
    {[[0, 56, 70], [64, 44, 104], [116, 66, 82], [190, 40, 120], [238, 60, 76], [306, 50, 108], [364, 70, 86], [442, 62, 98]].map(([x, w, h]) => (
      <g key={x}>
        <rect x={x} y={150 - h} width={w} height={h} fill="#c9a3c4" opacity=".75" />
        {[0, 1, 2].map((r) => (
          <rect key={r} x={x + 8} y={150 - h + 12 + r * 22} width={w - 18} height="6" fill="#fff3d0" opacity=".6" />
        ))}
      </g>
    ))}
  </svg>
)

export default function HomeBus({ D, onAgain }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!inView || show) return
    const t = setTimeout(() => setShow(true), 3400)
    return () => clearTimeout(t)
  }, [inView, show])

  return (
    <div ref={ref} className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#ffd9a0] via-[#f7b8a0] to-[#c9a3e0]">
      <div className="pointer-events-none absolute right-10 top-12 h-[80px] w-[80px] rounded-full" style={{ background: 'radial-gradient(circle,#fff6c9 35%,rgba(255,190,110,0) 72%)' }} />
      <p className="pointer-events-none absolute inset-x-0 top-4 z-[3] text-center font-display text-4xl font-extrabold tabular-nums text-[#3b2a63]">08:00</p>
      <div className="drift absolute bottom-[150px] left-0 flex" style={{ width: TILE * 3, animationDuration: '14s' }}>
        {[0, 1, 2].map((k) => (
          <div key={k} className="shrink-0" style={{ width: TILE }}>{Skyline}</div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-b from-[#5a4a70] to-[#2d2840]" />
      <div className="absolute inset-x-0 bottom-[70px] h-1 opacity-60" style={{ backgroundImage: 'linear-gradient(90deg,#fff 0 24px,transparent 24px 48px)', backgroundSize: '48px 100%' }} />
      <motion.div className="absolute left-1/2 z-[2] -ml-[110px]" style={{ bottom: 82 }} animate={{ y: [0, -2, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>
        <div className="absolute -top-[48px] left-10"><Koala size={52} /></div>
        <div className="absolute -top-[48px] left-[104px]"><Cat size={52} /></div>
        <BusSvg running />
      </motion.div>
      {show && <ZoneResult title={D.done} story={D.story} items={D.media} label="pulang" onAgain={onAgain} againLabel="Ulangi" />}
    </div>
  )
}