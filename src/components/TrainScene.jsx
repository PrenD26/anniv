import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TILE = 520
const COPIES = 6
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

// Satu lapisan latar yang diulang dan bergeser; beda durasi = efek kedalaman (parallax)
function Layer({ duration, running, className, children }) {
  return (
    <div
      className={`drift absolute left-0 flex ${className}`}
      style={{ width: TILE * COPIES, animationDuration: `${duration}s`, animationPlayState: running ? 'running' : 'paused' }}
    >
      {Array.from({ length: COPIES }, (_, i) => (
        <div key={i} className="shrink-0" style={{ width: TILE }}>
          {children}
        </div>
      ))}
    </div>
  )
}

const Hills = (
  <svg width={TILE} height="96" viewBox="0 0 520 96" className="block" aria-hidden="true">
    <path d="M0 70Q70 14 140 56T270 50T400 58T520 70V96H0Z" fill="#cdbde4" />
    <ellipse cx="60" cy="90" rx="30" ry="14" fill="#a48ed0" />
    <ellipse cx="96" cy="92" rx="20" ry="11" fill="#8f78c0" />
    <ellipse cx="300" cy="91" rx="34" ry="13" fill="#a48ed0" />
    <ellipse cx="340" cy="92" rx="22" ry="10" fill="#8f78c0" />
  </svg>
)

const Poles = (
  <svg width={TILE} height="110" viewBox="0 0 520 110" style={{ overflow: 'visible' }} className="block" aria-hidden="true">
    {[8, 268].map((x) => (
      <g key={x}>
        <rect x={x} y="16" width="4" height="94" fill="#4b3a78" />
        <rect x={x - 8} y="22" width="20" height="3" rx="1.5" fill="#4b3a78" />
      </g>
    ))}
    <path d="M10 26Q140 52 270 26Q400 52 530 26" stroke="#4b3a78" strokeWidth="1.4" fill="none" />
  </svg>
)

const Track = (
  <svg width={TILE} height="34" viewBox="0 0 520 34" className="block" aria-hidden="true">
    <rect width="520" height="5" fill="#4b3a78" />
    <rect y="5" width="520" height="2" fill="#d9cbe8" opacity=".6" />
    <rect y="7" width="520" height="27" fill="#4b3a78" />
    {Array.from({ length: 13 }, (_, i) => (
      <rect key={i} x={i * 40 + 4} y="13" width="18" height="5" rx="1" fill="#2a1f45" />
    ))}
    {Array.from({ length: 26 }, (_, i) => (
      <circle key={i} cx={i * 20 + 8} cy={26 + (i % 2) * 4} r="1.2" fill="#8a76b8" />
    ))}
  </svg>
)

const WHEELS = [30, 50, 130, 150, 202, 222, 302, 322, 374, 394, 470, 490]

// Kereta dari proyek lama: lokomotif + 2 gerbong
function TrainBody({ running }) {
  return (
    <svg viewBox="0 0 520 103" className="block w-full" aria-label="Kereta api">
      {[8, 180].map((x) => (
        <g key={x}>
          <rect x={x} y="26" width="164" height="64" rx="7" fill="#C8A2C8" />
          <rect x={x} y="62" width="164" height="8" fill="#7A5AA6" />
          {[12, 46, 80, 114].map((o) => (
            <rect key={o} x={x + o} y="38" width="26" height="18" rx="3" fill="#FFF6E5" />
          ))}
          <text x={x + 12} y="84" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="500" fill="#2B2140">
            SURABAYA
          </text>
        </g>
      ))}
      <rect x="172" y="72" width="8" height="4" fill="#2B2140" />
      <rect x="344" y="72" width="8" height="4" fill="#2B2140" />
      <rect x="352" y="34" width="150" height="56" rx="6" fill="#3B2A62" />
      <polygon points="502,34 518,52 518,90 502,90" fill="#3B2A62" />
      <rect x="352" y="60" width="166" height="7" fill="#C8A2C8" />
      <rect x="364" y="42" width="22" height="14" rx="3" fill="#E9DDF5" />
      <rect x="486" y="42" width="22" height="12" rx="3" fill="#E9DDF5" />
      <circle cx="514" cy="72" r="3" fill="#FFE9A8" />
      <rect x="400" y="28" width="30" height="6" rx="2" fill="#2B2140" />
      <rect x="440" y="28" width="30" height="6" rx="2" fill="#2B2140" />
      <rect x="8" y="90" width="494" height="4" fill="#2B2140" />
      {WHEELS.map((cx) => (
        <g key={cx} transform={`translate(${cx} 96)`}>
          <g className="wheel" style={{ animationPlayState: running ? 'running' : 'paused' }}>
            <circle r="7" fill="#2B2140" />
            <circle r="2" fill="#B9A3D4" />
            <path d="M-6 0H6M0-6V6" stroke="#B9A3D4" strokeWidth="1.2" />
          </g>
        </g>
      ))}
    </svg>
  )
}

export default function TrainScene({ running }) {
  const [puffs, setPuffs] = useState([])
  const id = useRef(0)

  const honk = () => {
    const k = ++id.current
    setPuffs((p) => [...p, k])
    navigator.vibrate?.(15)
    setTimeout(() => setPuffs((p) => p.filter((v) => v !== k)), 1700)
  }

  return (
    <div className="relative h-[210px] w-full overflow-hidden">
      <Layer duration={40} running={running} className="bottom-[34px]">{Hills}</Layer>
      <Layer duration={6} running={running} className="bottom-[34px]">{Poles}</Layer>

               <motion.div
        className="absolute bottom-[33px] left-1/2"
        style={{ width: 'min(98vw, 460px)', marginLeft: 'calc(min(98vw, 460px) / -2)' }}
        animate={running ? { y: [0, -1.5, 0] } : { y: 0 }}
        transition={running ? { duration: 0.55, repeat: Infinity } : { duration: 0.3 }}
      >
        <TrainBody running={running} />

        {/* ketuk lokomotif: asap berbentuk hati dari cerobong */}
        <button type="button" onClick={honk} aria-label="Bunyikan klakson" className="absolute right-0 top-0 h-full w-[35%]" />
        {puffs.map((k) => (
          <motion.svg
            key={k}
            width="26"
            height="26"
            viewBox="0 0 40 40"
            className="pointer-events-none absolute"
            style={{ left: '84%', top: 0 }}
            initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -90, x: ((k % 3) - 1) * 20, scale: 1.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <path d={HEART} fill="#ff8fb1" />
          </motion.svg>
        ))}
      </motion.div>

      <Layer duration={5} running={running} className="bottom-0">{Track}</Layer>
    </div>
  )
}