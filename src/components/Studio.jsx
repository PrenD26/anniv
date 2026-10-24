import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const POSES = [
  { k: -6, c: 6, ky: 0, cy: 0 },
  { k: -14, c: 12, ky: -8, cy: -4 },
  { k: -3, c: 3, ky: -14, cy: -14 },
]

const Cube = ({ left }) => (
  <div
    className="absolute h-[112px] w-[86px] bg-[#fbfbfd] shadow-md"
    style={{ bottom: 98, left, borderRight: '5px solid #e1e1ea', borderBottom: '5px solid #e1e1ea' }}
  />
)

const Softbox = ({ side }) => (
  <div className="absolute top-14" style={{ [side]: 14 }}>
    <div className="h-[92px] w-[32px] rounded bg-white" style={{ boxShadow: '0 0 34px 10px rgba(255,255,255,.95)' }} />
    <div className="mx-auto h-[120px] w-[3px] bg-[#b9b9c8]" />
  </div>
)

export default function Studio({ D, onAgain }) {
  const [n, setN] = useState(0)
  const [flash, setFlash] = useState(0)
  const [show, setShow] = useState(false)
  const cool = useRef(false)
  const P = POSES[n % POSES.length]

  const tap = () => {
    if (cool.current || n >= D.poses) return
    cool.current = true
    setTimeout(() => (cool.current = false), 520)
    setFlash((f) => f + 1)
    navigator.vibrate?.(15)
    const m = n + 1
    setN(m)
    if (m >= D.poses) setTimeout(() => setShow(true), 1500)
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#f6f6fb] via-[#e9e9f2] to-[#d6d6e4] text-[#3b2a63]">
      <Softbox side="left" />
      <Softbox side="right" />
      <p className="absolute inset-x-0 top-4 z-[3] text-center text-sm font-semibold">{D.hint}</p>
      <div className="absolute inset-x-0 bottom-[96px] h-[2px] bg-[#cfcfdd]" />

      <Cube left="calc(50% - 100px)" />
      <Cube left="calc(50% + 14px)" />

      <motion.div
        className="absolute"
        style={{ bottom: 206, left: 'calc(50% - 116px)' }}
        animate={{ rotate: P.k, y: P.ky }}
        transition={{ type: 'spring', damping: 12, stiffness: 140 }}
      >
        <Koala size={84} />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ bottom: 206, left: 'calc(50% + 4px)' }}
        animate={{ rotate: P.c, y: P.cy }}
        transition={{ type: 'spring', damping: 12, stiffness: 140 }}
      >
        <Cat size={84} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-[78px] flex justify-center gap-1.5">
        {Array.from({ length: D.poses }, (_, i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: i < n ? '#7a5cc4' : 'rgba(59,42,99,.2)' }} />
        ))}
      </div>
      <button
        type="button"
        onPointerDown={tap}
        disabled={n >= D.poses}
        aria-label="Tombol rana"
        className="absolute bottom-3 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#7a5cc4] bg-white/70 active:scale-90 disabled:opacity-40"
        style={{ touchAction: 'manipulation' }}
      >
        <span className="h-[38px] w-[38px] rounded-full bg-[#7a5cc4]" />
      </button>

      {flash > 0 && (
        <motion.div key={flash} className="pointer-events-none absolute inset-0 z-20 bg-white" initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} />
      )}
      {show && <ZoneResult title={D.done} story={D.story} items={D.media} label="foto studio" onAgain={onAgain} againLabel="Berfoto lagi" />}
    </div>
  )
}