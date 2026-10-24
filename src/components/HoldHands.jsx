import { useContext, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'

const HOLD_MS = 2400 // lama menahan sampai bergandengan
const DECAY_MS = 5000 // seberapa cepat mereka menjauh lagi kalau dilepas
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

function Body({ fill, hand, edge, flip }) {
  return (
    <svg
      width="112"
      height="72"
      viewBox="0 0 112 72"
      aria-hidden="true"
      className="absolute left-0 top-[74px]"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <ellipse cx="30" cy="66" rx="13" ry="6" fill={fill} />
      <ellipse cx="56" cy="66" rx="13" ry="6" fill={fill} />
      <ellipse cx="42" cy="40" rx="30" ry="28" fill={fill} />
      <rect x="58" y="26" width="38" height="13" rx="6.5" fill={fill} />
      <circle cx="96" cy="32" r="8" fill={hand} stroke={edge} strokeWidth="2" />
    </svg>
  )
}

function Walker({ koala, x }) {
  return (
    <motion.div className="absolute bottom-[34px] left-1/2" style={{ x, marginLeft: koala ? -102 : -10 }}>
      <motion.div
        className="relative h-[150px] w-[112px]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: koala ? 0 : 0.35 }}
      >
               <Body
          fill={koala ? '#bdb5dd' : '#f5993a'}
          hand={koala ? '#f6e9f6' : '#fffdf8'}
          edge={koala ? '#bdb5dd' : '#e0a56b'}
          flip={!koala}
        />
        <div className="absolute top-0" style={{ left: koala ? 0 : 28 }}>
          {koala ? <Koala size={84} /> : <Cat size={84} />}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HoldHands() {
  const N = NOVEMBER.hold
    const ink = '#5a4630'
  const p = useMotionValue(0)
  const gap = useTransform(p, [0, 1], [66, 0])
  const koalaX = useTransform(gap, (v) => -v)
  const holding = useRef(false)
  const finished = useRef(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (t) => {
      const dt = t - last
      last = t
      const cur = p.get()
      const next = holding.current ? Math.min(1, cur + dt / HOLD_MS) : Math.max(0, cur - dt / DECAY_MS)
      if (next !== cur) p.set(next)
      if (next >= 1) {
        finished.current = true
        setDone(true)
        navigator.vibrate?.(40)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [p])

  const press = (e) => {
    holding.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const release = () => {
    holding.current = false
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div
        onPointerDown={press}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onContextMenu={(e) => e.preventDefault()}
        className="relative h-[250px] w-full max-w-[390px] select-none"
        style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
      >
        <div className="absolute inset-x-2 bottom-0 h-[44px] rounded-3xl bg-[#e6cb98]/80" />
        <Walker koala x={koalaX} />
        <Walker x={gap} />
        {done && (
          <motion.svg
            width="44"
            height="44"
            viewBox="0 0 40 40"
            className="absolute left-1/2 top-[104px] -ml-[22px]"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: [0, 1.3, 1], y: 0 }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            <path d={HEART} fill="#ff6f9c" />
          </motion.svg>
        )}
      </div>

      {!done ? (
        <div className="mt-3 flex flex-col items-center">
          <p style={{ color: ink }} className="text-sm">{N.hint}</p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-black/10">
            <motion.div className="h-full origin-left bg-[#ff8fb1]" style={{ scaleX: p }} />
          </div>
        </div>
      ) : (
        <div className="mt-3 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ color: ink }}
            className="font-['Dancing_Script',cursive] text-[1.9rem] leading-tight"
          >
            {N.line}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: [0.4, 1.25, 1] }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ color: ink }}
            className="mt-1 text-2xl font-bold"
          >
            {N.blush}
          </motion.p>
        </div>
      )}
    </div>
  )
}