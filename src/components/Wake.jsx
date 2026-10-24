import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'

const MASK = 'linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)'
const NEED = 1100 // total jarak usapan (px) sampai koala bangun
const ST = { fill: 'none', stroke: '#2a1f45', strokeWidth: 3, strokeLinecap: 'round' }
const FACES = {
  sleep: (<><path d="M23 42q5 5 11 0M46 42q5 5 11 0" {...ST} /><ellipse cx="40" cy="55" rx="4" ry="6" fill="#2a1f45" /></>),
  yawn: (<><path d="M24 41q5-4 10 0M46 41q5-4 10 0" {...ST} /><ellipse cx="40" cy="55" rx="6" ry="9" fill="#2a1f45" /></>),
  awake: (<><circle cx="29" cy="42" r="3.5" fill="#2a1f45" /><circle cx="51" cy="42" r="3.5" fill="#2a1f45" /><ellipse cx="40" cy="53" rx="6" ry="7" fill="#4a3a6b" /><path d="M34 60q6 6 12 0" fill="#f4a6c4" /></>),
}

function Head({ stage }) {
  return (
    <svg width="150" height="150" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="16" cy="22" r="13" fill="#bdb5dd" />
      <circle cx="64" cy="22" r="13" fill="#bdb5dd" />
      <circle cx="16" cy="22" r="7" fill="#f6e9f6" />
      <circle cx="64" cy="22" r="7" fill="#f6e9f6" />
      <circle cx="40" cy="44" r="28" fill="#bdb5dd" />
      <circle cx="22" cy="52" r="4" fill="#f4a6c4" opacity=".7" />
      <circle cx="58" cy="52" r="4" fill="#f4a6c4" opacity=".7" />
      {FACES[stage]}
    </svg>
  )
}

export default function Wake() {
  const D = JUNE.wake
  const pv = useMotionValue(0)
  const ps = useSpring(pv, { stiffness: 70, damping: 20 })
  const rotT = useMotionValue(0)
  const rot = useSpring(rotT, { stiffness: 220, damping: 12 })
  const rub = useRef(0)
  const acc = useRef(0)
  const drag = useRef(false)
  const last = useRef(null)
  const hid = useRef(0)
  const [stage, setStage] = useState('sleep')
  const [started, setStarted] = useState(false)
  const [hearts, setHearts] = useState([])

  const top = useTransform(ps, [0, 0.6, 1], ['#241a48', '#8a74c4', '#ffe9dc'])
  const bottom = useTransform(ps, [0, 0.6, 1], ['#3b2d6e', '#d6b2e6', '#fff3e8'])
  const bg = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`
  const wTop = useTransform(ps, [0, 0.6, 1], ['#1a1f4a', '#f08a5a', '#9ac7ee'])
  const wBottom = useTransform(ps, [0, 0.6, 1], ['#3a3f7a', '#ffd08a', '#e3f2fb'])
  const wBg = useMotionTemplate`linear-gradient(180deg, ${wTop}, ${wBottom})`
  const sunY = useTransform(ps, [0.1, 0.95], ['96px', '22px'])
  const armOp = useTransform(ps, [0.7, 0.9], [0, 1])

  const down = (e) => {
    drag.current = true
    last.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = (e) => {
    if (!drag.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    rotT.set(Math.max(-9, Math.min(9, dx * 0.9)))
    if (rub.current >= NEED) return
    const d = Math.hypot(dx, dy)
    rub.current += d
    acc.current += d
    setStarted(true)
    const v = Math.min(1, rub.current / NEED)
    pv.set(v)
    const s = v < 0.34 ? 'sleep' : v < 0.7 ? 'yawn' : 'awake'
    setStage((x) => (x === s ? x : s))
    if (acc.current > 90) {
      acc.current = 0
      const id = hid.current++
      setHearts((h) => [...h, { id, x: 50 + Math.random() * 80 }])
      setTimeout(() => setHearts((h) => h.filter((v2) => v2.id !== id)), 1500)
    }
    if (v >= 1) navigator.vibrate?.(25)
  }
  const up = () => {
    drag.current = false
    rotT.set(0)
  }

  const awake = stage === 'awake'
  const ink = awake ? '#5a2d4a' : '#ffffff'

  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4" style={{ minHeight: `${H['jun-bangun']}svh` }}>
      {/* hanya latarnya yang memudar di tepi, kontennya tidak ikut terpotong */}
      <motion.div className="absolute inset-0" style={{ background: bg, WebkitMaskImage: MASK, maskImage: MASK }} />

      <p className="relative z-[3] mb-4 mt-[9svh] text-sm font-semibold" style={{ color: ink }}>{D.hint}</p>

      <div className="relative z-[1] h-[150px] w-[130px] overflow-hidden rounded-t-[65px] border-[8px] border-[#6b4a8a]">
        <motion.div className="absolute inset-0" style={{ background: wBg }} />
        <motion.div className="absolute left-1/2 -ml-[24px] h-12 w-12 rounded-full" style={{ top: sunY, background: 'radial-gradient(circle,#fff6c9 40%,rgba(255,190,110,0) 72%)' }} />
        <span className="absolute inset-y-0 left-1/2 -ml-[2px] w-1 bg-[#6b4a8a]" />
        <span className="absolute inset-x-0 top-[58%] h-1 bg-[#6b4a8a]" />
      </div>

      <div className="relative z-[2] mt-8 h-[210px] w-[300px]">
        <div className="absolute inset-x-0 bottom-0 h-[120px] rounded-3xl bg-[#6b4a8a]" />
        <div className="absolute left-5 top-[56px] h-[84px] w-[260px] rounded-[50%] bg-[#fffdf8] shadow-md" />

        <motion.div className="absolute left-[75px] top-0" style={{ rotate: rot }}>
          <motion.div
            animate={stage === 'sleep' ? { y: [0, 2, 0] } : stage === 'yawn' ? { scale: [1, 1.05, 1] } : { y: [0, -3, 0] }}
            transition={{ duration: stage === 'sleep' ? 3 : 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Head stage={stage} />
          </motion.div>
        </motion.div>

        {[['left-[34px]', -40], ['right-[34px]', 40]].map(([cls, r]) => (
          <motion.span
            key={cls}
            className={`absolute ${cls} top-[104px] h-[34px] w-[34px] rounded-full bg-[#bdb5dd] shadow`}
            style={{ opacity: armOp, rotate: r }}
            animate={awake ? { y: [-34, -46, -34] } : { y: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ))}

        <div className="absolute inset-x-3 bottom-0 h-[100px] rounded-3xl" style={{ background: 'linear-gradient(180deg,#b9a2e6,#9a7fd8)', boxShadow: '0 -6px 14px rgba(0,0,0,.15)' }}>
          <span className="absolute inset-x-0 top-4 h-3 bg-white/25" />
          <span className="absolute inset-x-0 top-9 h-1 bg-white/15" />
        </div>

        {stage === 'sleep' &&
          ['z', 'Z', 'z'].map((z, i) => (
            <motion.span key={i} className="pointer-events-none absolute font-display text-2xl font-extrabold text-lilac-100" style={{ left: 232 + i * 14, top: 8 }} animate={{ y: [0, -34], opacity: [0, 1, 0] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8 }}>
              {z}
            </motion.span>
          ))}

        {hearts.map((h) => (
          <motion.svg key={h.id} width="22" height="22" viewBox="0 0 40 40" className="pointer-events-none absolute z-[5]" style={{ left: 60 + h.x, top: 20 }} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -70, scale: 1.2 }} transition={{ duration: 1.4 }} aria-hidden="true">
            <path d="M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z" fill="#ff6f9c" />
          </motion.svg>
        ))}

        {/* area usap: hanya area ini yang menahan geseran halaman */}
        <div
          className="absolute z-[6] cursor-grab"
          style={{ left: 60, top: -12, width: 190, height: 170, touchAction: 'none' }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          role="button"
          tabIndex={0}
          aria-label="Usap kepala koala"
        >
          {!started && (
            <motion.span className="pointer-events-none absolute left-1/2 top-[40px] -ml-[18px] h-9 w-9 rounded-full bg-white/70 shadow-lg" animate={{ x: [-34, 34, -34] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
          )}
        </div>
      </div>

      <div className="relative z-[3] mb-[9svh] mt-6 flex h-14 flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.p key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-['Dancing_Script',cursive] text-[2rem] leading-none" style={{ color: ink, textShadow: awake ? 'none' : '0 2px 10px rgba(0,0,0,.35)' }}>
            {D[stage]}
          </motion.p>
        </AnimatePresence>
        {awake && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 5, 0] }} transition={{ delay: 0.8, y: { duration: 1.6, repeat: Infinity } }} className="mt-2 text-sm font-semibold" style={{ color: ink }}>
            {D.next}
          </motion.p>
        )}
      </div>
    </section>
  )
}