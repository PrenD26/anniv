import { Cat, Koala } from './Characters.jsx'

export default function Motorbike({ running = true, bags = null }) {
  const play = { animationPlayState: running ? 'running' : 'paused' }
  return (
    <div className="relative" style={{ width: 170, height: 118 }}>
      <svg viewBox="0 0 170 118" width="170" height="118" className="absolute inset-0" role="img" aria-label="Koala dan kucing naik motor">
        <ellipse cx="52" cy="58" rx="20" ry="22" fill="#bdb5dd" />
        <ellipse cx="108" cy="58" rx="18" ry="22" fill="#f5993a" />
        <path d="M30 98L56 74H128L140 98" stroke="#3b2a63" strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M22 78Q60 70 92 76L120 76L120 86H30Z" fill="#7a5cc4" />
        <rect x="40" y="70" width="58" height="8" rx="4" fill="#2a1f45" />
        <path d="M128 74L136 52H148" stroke="#3b2a63" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M120 58L142 56" stroke="#f5993a" strokeWidth="7" strokeLinecap="round" />
        <circle cx="154" cy="68" r="5" fill="#ffe27a" />
        {[30, 140].map((cx) => (
          <g key={cx} className="wheel" style={play}>
            <circle cx={cx} cy="98" r="18" fill="#2a1f45" />
            <circle cx={cx} cy="98" r="9" fill="#b9a3d4" />
            <path d={`M${cx - 16} 98H${cx + 16}M${cx} 82V114`} stroke="#b9a3d4" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="absolute" style={{ left: 24, top: 0 }}><Koala size={48} /></div>
      <div className="absolute" style={{ left: 84, top: 0 }}><Cat size={48} /></div>
      {bags}
    </div>
  )
}