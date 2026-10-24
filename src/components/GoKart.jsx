import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Result from './Result.jsx'

const TAPS = 26

function Kart({ body, head }) {
  return (
    <svg width="60" height="38" viewBox="0 0 60 38" aria-hidden="true">
      <rect x="4" y="16" width="50" height="14" rx="6" fill={body} />
      <rect x="30" y="10" width="20" height="8" rx="3" fill={body} />
      <circle cx="22" cy="12" r="8" fill={head} />
      <rect x="48" y="14" width="10" height="4" rx="2" fill="#2a1f45" />
      {[14, 44].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="30" r="6" fill="#2a1f45" />
          <circle cx={cx} cy="30" r="2" fill="#b9a3d4" />
        </g>
      ))}
    </svg>
  )
}

export default function GoKart({ D, onDone, onAgain }) {
  const me = useMotionValue(0)
  const rival = useMotionValue(0)
  const started = useRef(false)
  const finished = useRef(false)
  const [state, setState] = useState('idle') // idle | racing | won
  const meLeft = useTransform(me, (v) => `calc(${v} * (100% - 64px))`)
  const rvLeft = useTransform(rival, (v) => `calc(${v} * (100% - 64px))`)

  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      if (started.current && !finished.current) {
        const m = me.get()
        const r = rival.get() + (2.5 * (m - 0.03 - rival.get()) + 0.04) * dt
        rival.set(Math.max(0, Math.min(r, 0.97))) // selalu menempel tepat di belakang Kyla
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [me, rival])

  const tap = () => {
    if (finished.current) return
    started.current = true
    setState((s) => (s === 'idle' ? 'racing' : s))
    const v = Math.min(1, me.get() + 1 / TAPS)
    me.set(v)
    if (v >= 1) {
      finished.current = true
      setState('won')
      navigator.vibrate?.(40)
      onDone()
    }
  }

  const lanes = [
    { name: 'Kyla', left: meLeft, body: '#9a7fd8', head: '#bdb5dd' },
    { name: 'Frend', left: rvLeft, body: '#f5993a', head: '#f5993a' },
  ]

  return (
    <div className="relative h-full w-full select-none bg-gradient-to-b from-[#9bd0f5] to-[#e6f3ff]">
      <p className="absolute inset-x-0 top-6 text-center text-sm font-semibold text-[#3b2a63]">{D.hint}</p>
      {lanes.map((l, i) => (
        <div key={l.name} className="absolute inset-x-3 rounded-2xl bg-[#5d5873]" style={{ top: 76 + i * 104, height: 84 }}>
          <div
            className="lane absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 opacity-70"
            style={{
              backgroundImage: 'linear-gradient(90deg,#fff 0 24px,transparent 24px 48px)',
              backgroundSize: '48px 100%',
              animationPlayState: state === 'racing' ? 'running' : 'paused',
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-4 rounded-r-2xl"
            style={{ background: 'repeating-conic-gradient(#fff 0 25%, #2a1f45 0 50%) 0 0 / 16px 16px' }}
          />
          <span className="absolute left-2 top-1 text-[11px] font-bold text-white/80">{l.name}</span>
          <motion.div className="absolute top-[26px]" style={{ left: l.left }}>
            <Kart body={l.body} head={l.head} />
          </motion.div>
        </div>
      ))}
      <button
        type="button"
        onPointerDown={tap}
        aria-label="Ketuk untuk memajukan gokart"
        className="absolute inset-x-8 bottom-8 h-20 rounded-full bg-[#7a5cc4] text-3xl font-extrabold text-white shadow-lg active:scale-95"
        style={{ touchAction: 'manipulation' }}
      >
        TAP!
      </button>
      {state === 'won' && <Result D={D} title={D.win} onAgain={onAgain} />}
    </div>
  )
}