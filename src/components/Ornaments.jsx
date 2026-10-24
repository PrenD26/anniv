import { motion } from 'framer-motion'

export function Lantern({ len = 40, c = '#e8a33d', s = 1 }) {
  const h = len + 64
  return (
    <motion.div
      style={{ width: 34 * s, transformOrigin: '50% 0' }}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 3.6 + len / 30, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={34 * s} height={h * s} viewBox={`0 0 34 ${h}`} aria-hidden="true">
        <line x1="17" y1="0" x2="17" y2={len} stroke="#6b5a3a" strokeWidth="1.5" />
        <rect x="12" y={len} width="10" height="6" rx="2" fill="#7a5c2a" />
        <path d={`M17 ${len + 6}L5 ${len + 17}H29Z`} fill={c} />
        <rect x="5" y={len + 17} width="24" height="28" rx="4" fill={c} />
        <rect x="9" y={len + 21} width="16" height="20" rx="7" fill="#fff3c4" style={{ filter: 'drop-shadow(0 0 6px #ffe27a)' }} />
        <path d={`M17 ${len + 21}V${len + 41}M9 ${len + 31}H25`} stroke={c} strokeWidth="1.4" />
        <path d={`M5 ${len + 45}H29L24 ${len + 53}H10Z`} fill={c} />
        <path d={`M17 ${len + 53}V${len + 61}`} stroke="#7a5c2a" strokeWidth="2" />
        <circle cx="17" cy={len + 62} r="2.5" fill="#7a5c2a" />
      </svg>
    </motion.div>
  )
}

export function Crescent({ s = 60 }) {
  return (
    <motion.svg
      width={s}
      height={s}
      viewBox="20 10 160 160"
      aria-hidden="true"
      animate={{ opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{ filter: 'drop-shadow(0 0 10px rgba(255,241,198,.8))' }}
    >
      <path d="M44.5 32.4A80 80 0 1 0 155.5 32.4A62 62 0 1 1 44.5 32.4Z" fill="#fff1c6" />
      <path d="M158 52l2.6 6.2 6.4.5-4.9 4.2 1.5 6.3-5.6-3.4-5.6 3.4 1.5-6.3-4.9-4.2 6.4-.5z" fill="#ffe27a" />
    </motion.svg>
  )
}

export function Ketupat({ s = 26 }) {
  return (
    <svg width={s} height={s * 1.5} viewBox="0 0 26 39" aria-hidden="true">
      <line x1="13" y1="0" x2="13" y2="6" stroke="#6b5a3a" strokeWidth="1.5" />
      <path d="M13 6L25 19L13 32L1 19Z" fill="#6fb35a" stroke="#3f7d3a" strokeWidth="1.2" />
      <path d="M13 6V32M1 19H25M7 12.5L19 25.5M19 12.5L7 25.5" stroke="#3f7d3a" strokeWidth="1" />
      <path d="M13 32L9 39M13 32V39M13 32L17 39" stroke="#e6c04a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Hiasan gantung di judul bulan Maret
export function RamadanHang() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden="true">
      <div className="absolute left-[7%] top-0"><Lantern len={34} c="#e8a33d" /></div>
      <div className="absolute left-[25%] top-0"><Lantern len={10} c="#d96fa0" s={0.8} /></div>
      <div className="absolute right-[24%] top-0"><Lantern len={46} c="#7a5cc4" s={0.9} /></div>
      <div className="absolute right-[6%] top-0"><Lantern len={20} c="#e8a33d" s={0.85} /></div>
      <div className="absolute left-[47%] top-[30px]"><Crescent s={44} /></div>
    </div>
  )
}