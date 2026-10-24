import { useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const NEED = 6

export function BusSvg({ running = false }) {
  const play = { animationPlayState: running ? 'running' : 'paused' }
  return (
    <svg viewBox="0 0 220 96" className="block w-[220px]" role="img" aria-label="Bus">
      <rect x="4" y="14" width="212" height="62" rx="12" fill="#9a7fd8" />
      <rect x="4" y="50" width="212" height="8" fill="#6a4cb4" />
      {[14, 54, 94, 134].map((x) => (
        <rect key={x} x={x} y="22" width="32" height="22" rx="4" fill="#fff3d9" />
      ))}
      <path d="M176 22H206Q214 22 214 32V44H176Z" fill="#cfe6f8" />
      <circle cx="212" cy="62" r="4" fill="#ffe27a" />
      <rect x="150" y="60" width="44" height="12" rx="3" fill="#7a5cc4" />
      {[48, 168].map((cx) => (
        <g key={cx} className="wheel" style={play}>
          <circle cx={cx} cy="78" r="16" fill="#2a1f45" />
          <circle cx={cx} cy="78" r="6" fill="#b9a3d4" />
          <path d={`M${cx - 14} 78H${cx + 14}M${cx} 64V92`} stroke="#b9a3d4" strokeWidth="1.4" />
        </g>
      ))}
    </svg>
  )
}

export default function BusBreak({ D, onAgain }) {
  const bx = useMotionValue(70)
  const [n, setN] = useState(0)
  const [go, setGo] = useState(false)
  const [show, setShow] = useState(false)
  const tapped = useRef(0)

  const push = () => {
    if (go) return
    const m = ++tapped.current
    setN(m)
    navigator.vibrate?.(12)
    if (m >= NEED) {
      setGo(true)
      navigator.vibrate?.([40, 30, 80])
      animate(bx, 520, { duration: 2.4, ease: 'easeIn', delay: 0.6 })
      setTimeout(() => setShow(true), 3400)
    } else animate(bx, 70 + (m / NEED) * 80, { type: 'spring', damping: 14 })
  }

  return (
    <div onPointerDown={push} className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#5a3f8f] via-[#d6788f] to-[#f6b36a]" style={{ touchAction: 'manipulation' }}>
      <div className="pointer-events-none absolute right-10 top-[110px] h-[70px] w-[70px] rounded-full" style={{ background: 'radial-gradient(circle,#fff3c4 30%,rgba(255,170,100,0) 72%)' }} />
      <p className="pointer-events-none absolute inset-x-0 top-4 text-center font-display text-3xl font-extrabold text-white">{go ? D.go : 'Maghrib'}</p>
      <p className="pointer-events-none absolute inset-x-0 top-[58px] text-center text-sm font-semibold text-white/90">{go ? '' : `${D.hint} (${n}/${NEED})`}</p>

      <div className="absolute inset-x-0 bottom-0 h-[190px] bg-gradient-to-b from-[#3d3552] to-[#27213a]" />
      <div className="absolute inset-x-0 bottom-[86px] h-1 opacity-60" style={{ backgroundImage: 'linear-gradient(90deg,#fff 0 24px,transparent 24px 48px)', backgroundSize: '48px 100%' }} />

      <motion.div className="absolute left-0 z-[2]" style={{ x: bx, bottom: 98 }}>
        <div className="relative">
          <div className="absolute -left-[64px] bottom-0"><Koala size={56} /></div>
          <div className="absolute -left-[118px] bottom-0"><Cat size={56} /></div>
          <BusSvg running={go} />
          {!go && (
            <>
              <span className="blink absolute left-1 top-[58px] h-3 w-3 rounded-full bg-[#ffb02e]" style={{ boxShadow: '0 0 12px 4px rgba(255,176,46,.8)' }} />
              <span className="blink absolute right-1 top-[58px] h-3 w-3 rounded-full bg-[#ffb02e]" style={{ boxShadow: '0 0 12px 4px rgba(255,176,46,.8)' }} />
              {[0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  className="absolute h-9 w-9 rounded-full bg-[#d9d4e4] blur-md"
                  style={{ left: 150 + k * 6, top: -6 }}
                  animate={{ y: [0, -70], opacity: [0, 0.9, 0], scale: [0.5, 1.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: k * 0.7 }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>

      {show && <ZoneResult title={D.go} story={D.story} items={D.media} label="bus mogok" onAgain={onAgain} />}
    </div>
  )
}