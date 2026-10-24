import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const TILE = 520
const NEED = 6
const DROPS = Array.from({ length: 34 }, (_, i) => ({ l: (i * 29 + 5) % 100, h: 16 + (i % 4) * 8, d: 0.7 + (i % 5) * 0.18, dl: (i * 0.23) % 1.5 }))
const PUDDLES = [{ x: 20, w: 76 }, { x: 52, w: 96 }, { x: 82, w: 72 }]

function Lamps({ on }) {
  return (
    <svg width={TILE} height="250" viewBox="0 0 520 250" className="block" aria-hidden="true">
      {[90, 350].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="5" height="210" fill="#2a2f4a" />
          <rect x={x - 10} y="36" width="26" height="6" rx="3" fill="#2a2f4a" />
          <ellipse cx={x + 2.5} cy="47" rx="9" ry="5" fill={on ? '#ffd27a' : '#8f97b5'} style={on ? { filter: 'drop-shadow(0 0 10px #ffd27a)' } : undefined} />
        </g>
      ))}
    </svg>
  )
}

function Jacket() {
  return (
    <svg width="210" height="70" viewBox="0 0 210 70" style={{ overflow: 'visible' }} aria-hidden="true">
      <rect x="-4" y="30" width="22" height="36" rx="10" fill="#35548f" />
      <rect x="192" y="30" width="22" height="36" rx="10" fill="#35548f" />
      <path d="M8 60Q4 20 40 12Q105 0 170 12Q206 20 202 60Z" fill="#3f63a8" />
      <path d="M105 6V60" stroke="#2e4a86" strokeWidth="3" strokeDasharray="3 3" />
      <path d="M88 8Q105 -2 122 8V18Q105 24 88 18Z" fill="#35548f" />
    </svg>
  )
}

export default function Rain({ D, onAgain }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  const sid = useRef(0)
  const [flash, setFlash] = useState(0)
  const [splashes, setSplashes] = useState([])
  const [n, setN] = useState(0)
  const [show, setShow] = useState(false)
  const clear = n >= NEED

  // kilat sesekali, hanya saat terlihat dan hujan belum reda
  useEffect(() => {
    if (!inView || clear) return
    let t
    const next = () => {
      t = setTimeout(() => {
        setFlash((f) => f + 1)
        navigator.vibrate?.([60, 50, 140])
        next()
      }, 3500 + Math.random() * 3500)
    }
    next()
    return () => clearTimeout(t)
  }, [inView, clear])

  useEffect(() => {
    if (!clear) return
    const t = setTimeout(() => setShow(true), 3400)
    return () => clearTimeout(t)
  }, [clear])

  const splash = (p) => {
    if (clear) return
    const k = sid.current++
    setSplashes((s) => [...s, { k, p, word: D.splashes[k % D.splashes.length] }])
    setTimeout(() => setSplashes((s) => s.filter((v) => v.k !== k)), 1400)
    navigator.vibrate?.(15)
    setN((c) => c + 1)
  }

  return (
    <div ref={ref} className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#9fb4e8] via-[#f3b8a4] to-[#ffd9a0]">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-[#4e5877] to-[#7b86a6]" animate={{ opacity: clear ? 0 : 1 }} transition={{ duration: 3 }} />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 80%, rgba(255,214,140,.7), transparent 65%)' }} animate={{ opacity: clear ? 0.6 : 0 }} transition={{ duration: 3 }} />

      <motion.div className="pointer-events-none absolute inset-0 z-[4]" animate={{ opacity: clear ? 0 : 1 }} transition={{ duration: 2.5 }}>
        {DROPS.map((d, i) => (
          <span key={i} className="rain" style={{ left: `${d.l}%`, height: d.h, animationDuration: `${d.d}s`, animationDelay: `${d.dl}s` }} />
        ))}
      </motion.div>

      <div className="drift absolute left-0 z-[1] flex" style={{ bottom: 92, width: TILE * 3, animationDuration: '9s', animationPlayState: clear ? 'paused' : 'running' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="shrink-0" style={{ width: TILE }}>
            <Lamps on={clear} />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] h-[100px] bg-gradient-to-b from-[#2d3352] to-[#1b2038]">
        <div className="absolute inset-x-0 top-1/2 h-0.5 opacity-40" style={{ backgroundImage: 'linear-gradient(90deg,#fff 0 22px,transparent 22px 44px)', backgroundSize: '44px 100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 z-[3] flex justify-center" style={{ bottom: 70 }}>
        <div className="relative h-[150px] w-[210px]">
          <div className="absolute left-0 top-0 z-[2]">
            <Jacket />
          </div>
          <motion.div className="absolute bottom-0 left-2" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: clear ? 0 : Infinity }}>
            <Koala size={84} />
          </motion.div>
          <motion.div className="absolute bottom-0 right-2" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: clear ? 0 : Infinity, delay: 0.25 }}>
            <Cat size={84} />
          </motion.div>
        </div>
      </div>

      {PUDDLES.map((p) => (
        <button
          key={p.x}
          type="button"
          onClick={() => splash(p)}
          aria-label="Genangan air"
          className="absolute z-[5] rounded-[50%] bg-gradient-to-b from-[#8fa3d6]/70 to-[#c9d6f5]/80"
          style={{ left: `${p.x}%`, bottom: 14, width: p.w, height: 26, marginLeft: -p.w / 2 }}
        />
      ))}

      {splashes.map(({ k, p, word }) => (
        <div key={k} className="pointer-events-none absolute z-[6]" style={{ left: `${p.x}%`, bottom: 30 }}>
          {[0, 1].map((r) => (
            <motion.span
              key={r}
              className="absolute -ml-6 h-4 w-12 rounded-full border-2 border-white/80"
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: [0.3, 2.2], opacity: [0.9, 0] }}
              transition={{ duration: 0.9, delay: r * 0.18 }}
            />
          ))}
          <motion.span className="absolute -ml-8 w-16 text-center text-sm font-bold text-white" initial={{ y: 0, opacity: 1 }} animate={{ y: -58, opacity: 0 }} transition={{ duration: 1.2 }}>
            {word}
          </motion.span>
        </div>
      ))}

      <p className="pointer-events-none absolute inset-x-0 top-5 z-10 text-center text-sm font-semibold text-white">{clear ? D.clear : D.hint}</p>

      {flash > 0 && (
        <motion.div key={flash} className="pointer-events-none absolute inset-0 z-20 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.85, 0, 0.6, 0] }} transition={{ duration: 0.7 }} />
      )}
      {show && <ZoneResult title={D.clear} story={D.story} item={D.photo} label="foto pulang kehujanan" onAgain={onAgain} />}
    </div>
  )
}