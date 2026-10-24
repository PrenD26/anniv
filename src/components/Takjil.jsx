import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Motorbike from './Motorbike.jsx'
import { Crescent, Lantern } from './Ornaments.jsx'
import ZoneResult from './ZoneResult.jsx'

const START = { x: 150, y: 408 }
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const CITY = [[0, 34, 70], [30, 26, 104], [54, 40, 82], [92, 30, 118], [120, 44, 76], [162, 28, 98], [188, 40, 124], [226, 32, 84], [256, 46, 108], [300, 30, 90], [328, 38, 74]]

function City() {
  return (
    <svg width="360" height="140" viewBox="0 0 360 140" className="absolute left-0" style={{ bottom: 170 }} aria-hidden="true">
      {CITY.map(([x, w, h]) => (
        <g key={x}>
          <rect x={x} y={140 - h} width={w} height={h} fill="#5b3f78" opacity=".85" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x + 6} y={140 - h + 10 + r * 20} width={w - 14} height="6" fill="#ffd98a" opacity=".55" />
          ))}
        </g>
      ))}
    </svg>
  )
}

function Becak() {
  return (
    <svg width="108" height="80" viewBox="0 0 108 80" aria-hidden="true">
      <path d="M2 34Q6 8 30 8Q56 8 60 34Z" fill="#f5c451" />
      <rect x="4" y="32" width="54" height="22" rx="6" fill="#e0495a" />
      <rect x="10" y="38" width="40" height="8" rx="3" fill="#b8323f" />
      <path d="M32 64L62 44L88 64" stroke="#2a1f45" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {[32, 88].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="64" r="14" fill="none" stroke="#2a1f45" strokeWidth="4" />
          <path d={`M${cx - 12} 64H${cx + 12}M${cx} 52V76`} stroke="#8a7a9a" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="62" y="40" width="16" height="5" rx="2.5" fill="#2a1f45" />
      <circle cx="72" cy="20" r="7" fill="#e8b48a" />
      <path d="M64 15Q72 6 80 15Z" fill="#2b6cb0" />
      <path d="M72 27L68 42" stroke="#3c7a89" strokeWidth="9" strokeLinecap="round" />
      <path d="M72 30L90 46" stroke="#3c7a89" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const Cup = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <path d="M4 8H18L16 20H6Z" fill="#fffdf8" stroke="#d9cbb0" strokeWidth="1" />
    <path d="M3 6Q11 1 19 6V9H3Z" fill="#f5c451" />
    <circle cx="11" cy="14" r="2.2" fill="#ff8fb1" />
  </svg>
)

const Bag = () => (
  <svg width="40" height="50" viewBox="0 0 40 50" aria-hidden="true">
    <path d="M10 12Q10 2 20 2Q30 2 30 12" fill="none" stroke="#e8e8f0" strokeWidth="2" />
    <path d="M6 12H34L38 46Q20 50 2 46Z" fill="rgba(255,255,255,.75)" stroke="#fff" strokeWidth="1" />
    <circle cx="14" cy="32" r="4" fill="#f5c451" opacity=".85" />
    <circle cx="26" cy="36" r="4" fill="#f5c451" opacity=".85" />
  </svg>
)

export default function Takjil({ D, onAgain }) {
  const NEED = Math.round(D.total / D.perTap)
  const box = useRef(null)
  const inView = useInView(box, { amount: 0.4 })
  const next = useRef(0)
  const nRef = useRef(0)
  const cupId = useRef(0)
  const [becaks, setBecaks] = useState([])
  const [cups, setCups] = useState([])
  const [n, setN] = useState(0)
  const [show, setShow] = useState(false)
  const done = n >= NEED
  const left = Math.max(0, D.total - n * D.perTap)

  useEffect(() => {
    if (!inView || done) return
    const t = setInterval(() => {
      const id = next.current++
      setBecaks((b) => [...b, { id, lane: id % 2, served: false, word: D.thanks[id % D.thanks.length] }])
    }, 1250)
    return () => clearInterval(t)
  }, [inView, done])

  const give = (b, e) => {
    if (b.served || done) return
    const r = box.current.getBoundingClientRect()
    const t = e.currentTarget.getBoundingClientRect()
    const ex = t.left - r.left + 10 // sedikit di depan karena becak terus berjalan
    const ey = t.top - r.top + 30
    const k = cupId.current++
    setCups((c) => [...c, { k, ex, ey }])
    setBecaks((arr) => arr.map((x) => (x.id === b.id ? { ...x, served: true } : x)))
    navigator.vibrate?.(12)
    const m = nRef.current + 1
    nRef.current = m
    setN(m)
    if (m >= NEED) setTimeout(() => setShow(true), 2200)
  }

  return (
    <div
      ref={box}
      className="relative h-full w-full select-none overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#ffd9a0 0%,#f6a56c 40%,#c9688f 72%,#6b4a8a 100%)', touchAction: 'manipulation' }}
    >
      <div className="pointer-events-none absolute right-[60px] top-[170px] h-[70px] w-[70px] rounded-full" style={{ background: 'radial-gradient(circle,#fff3c4 30%,rgba(255,200,120,0) 72%)' }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden="true">
        <div className="absolute left-[3%] top-0"><Lantern len={26} c="#e8a33d" s={0.9} /></div>
        <div className="absolute left-[20%] top-0"><Lantern len={8} c="#d96fa0" s={0.75} /></div>
        <div className="absolute right-[20%] top-0"><Lantern len={40} c="#7a5cc4" s={0.85} /></div>
        <div className="absolute right-[3%] top-0"><Lantern len={14} c="#e8a33d" s={0.9} /></div>
        <div className="absolute left-[50%] top-[50px]"><Crescent s={40} /></div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 top-[100px] z-[2] px-10 text-center text-sm font-semibold text-white">{D.hint}</p>
      <p className="pointer-events-none absolute left-1/2 top-[128px] z-[2] -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white">
        {left > 0 ? `${D.leftLabel} ${left} ${D.unit}` : D.emptyChip}
      </p>

      <City />
      <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-b from-[#3d3552] to-[#27213a]" />
      <div
        className="lane absolute inset-x-0 bottom-[78px] h-1 opacity-70"
        style={{ backgroundImage: 'linear-gradient(90deg,#fff 0 24px,transparent 24px 48px)', backgroundSize: '48px 100%' }}
      />

      {becaks.map((b) => (
        <motion.div
          key={b.id}
          className="absolute left-0"
          style={{ top: b.lane ? 340 : 298, zIndex: b.lane ? 4 : 3 }}
          initial={{ x: 380 }}
          animate={{ x: -130 }}
          transition={{ duration: 7, ease: 'linear' }}
          onAnimationComplete={() => setBecaks((arr) => arr.filter((x) => x.id !== b.id))}
        >
          <button type="button" onPointerDown={(e) => give(b, e)} aria-label="Beri nasi ke bapak becak" className="relative block h-[80px] w-[108px]">
            <Becak />
            {b.served && (
              <>
                <motion.span
                  className="absolute left-1/2 -top-5 -ml-14 w-28 text-center text-xs font-bold text-white"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {b.word}
                </motion.span>
                <motion.svg
                  width="22"
                  height="22"
                  viewBox="0 0 40 40"
                  className="absolute left-1/2 top-3 -ml-[11px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  aria-hidden="true"
                >
                  <path d={HEART} fill="#ff6f9c" />
                </motion.svg>
              </>
            )}
          </button>
        </motion.div>
      ))}

      <div className="absolute left-2 z-[10]" style={{ bottom: 52 }}>
        <Motorbike
          bags={
            <>
              <div className="absolute" style={{ left: 134, top: 54 }}><Bag /></div>
              <div className="absolute" style={{ left: 146, top: 62 }}><Bag /></div>
            </>
          }
        />
      </div>

      {cups.map(({ k, ex, ey }) => (
        <motion.span
          key={k}
          className="pointer-events-none absolute left-0 top-0 z-20"
          initial={{ x: START.x, y: START.y, scale: 1, opacity: 1 }}
          animate={{
            x: [START.x, (START.x + ex) / 2, ex],
            y: [START.y, Math.min(START.y, ey) - 70, ey],
            scale: [1, 1.15, 0.8],
            opacity: [1, 1, 0.9],
          }}
          transition={{ duration: 0.6, ease: 'easeOut', times: [0, 0.5, 1] }}
          onAnimationComplete={() => setCups((c) => c.filter((v) => v.k !== k))}
        >
          <Cup />
        </motion.span>
      ))}

      {show && <ZoneResult title={D.win} story={D.story} items={D.media} label="takjil" onAgain={onAgain} />}
    </div>
  )
}