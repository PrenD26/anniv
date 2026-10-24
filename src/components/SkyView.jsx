import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const MIN0 = 300 // 05:00, jam target tiba
const MIN1 = 420 // 07:00
const SPAN = MIN1 - MIN0
const SUNRISE = 335 // 05:35, ubah kalau mau (harus antara 05:20 dan 06:00)
const ARRIVE = 390 // 06:30 kalian tiba, ubah kalau mau
const P_SUN = (SUNRISE - MIN0) / SPAN
const P_ARR = (ARRIVE - MIN0) / SPAN
const pc = (m) => ((m - MIN0) / SPAN) * 100
const fmt = (m) => {
  const t = Math.floor(m)
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

const STOPS = [0, 0.17, P_SUN, 0.5, P_ARR, 1]
const SKY_TOP = ['#1b2350', '#3b3a7a', '#f08a5a', '#f9b98a', '#9ac7ee', '#86bdf0']
const SKY_BOTTOM = ['#4a3f7e', '#c27a8a', '#ffd08a', '#ffe6c0', '#f1e2d0', '#d9ecf8']
const MTN = ['#161b42', '#2c2f66', '#6a5a8a', '#6f86b8', '#7b95c4', '#8aa2cc']

const QUEUE = [
  { x: -134, w: 54, c: '#ffd27a' },
  { x: -68, w: 58, c: '#8fd0f2' },
  { x: 8, w: 70, c: '#9a7fd8', me: true },
  { x: 92, w: 52, c: '#ff8fb1' },
  { x: 160, w: 62, c: '#a8e6cf' },
  { x: 234, w: 56, c: '#ffb36b' },
]
const STARS = [[10, 14], [24, 30], [38, 10], [52, 26], [66, 12], [80, 32], [92, 16], [18, 46], [74, 48]]

function Car({ car, arrived }) {
  return (
    <div className="absolute top-[20px]" style={{ left: car.x, width: car.w, opacity: car.me && arrived ? 0 : 1 }}>
      {car.me && (
        <div className="absolute -top-[26px] left-1 flex">
          <Koala size={32} />
          <Cat size={32} />
        </div>
      )}
      <div className="h-[30px] rounded-lg" style={{ background: car.c }}>
        <span className="absolute left-2 top-1.5 h-3 w-5 rounded-sm bg-white/70" />
        <span className="absolute right-2 top-1.5 h-3 w-5 rounded-sm bg-white/70" />
      </div>
      <span className="absolute -bottom-1.5 left-2 h-3.5 w-3.5 rounded-full bg-[#1d1830]" />
      <span className="absolute -bottom-1.5 right-2 h-3.5 w-3.5 rounded-full bg-[#1d1830]" />
    </div>
  )
}

export default function SkyView({ D, onAgain }) {
  const bar = useRef(null)
  const drag = useRef(false)
  const fin = useRef(false)
  const p = useMotionValue(0)
  const ps = useSpring(p, { stiffness: 120, damping: 22 })
  const [t, setT] = useState(MIN0)
  const [started, setStarted] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [show, setShow] = useState(false)

  const top = useTransform(ps, STOPS, SKY_TOP)
  const bottom = useTransform(ps, STOPS, SKY_BOTTOM)
  const sky = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`
  const mtn = useTransform(ps, STOPS, MTN)
  const starsOp = useTransform(ps, [0, 0.2], [1, 0])
  const sunTop = useTransform(ps, [0.15, 1], ['64%', '22%'])
  const fog = useTransform(ps, [0.2, 0.6, 1], [0.1, 0.7, 0.8])
  const carX = useTransform(ps, [0, P_ARR], [0, 190])
  const handle = useTransform(p, (v) => `${v * 100}%`)

  const caption = arrived ? D.missed : t >= SUNRISE ? D.sunrise : D.late

  const aim = (e) => {
    if (!drag.current || fin.current) return
    const r = bar.current.getBoundingClientRect()
    let v = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    setStarted(true)
    if (v >= P_ARR) {
      v = P_ARR
      fin.current = true
      setArrived(true)
      navigator.vibrate?.([30, 40, 60])
      setTimeout(() => setShow(true), 1800)
    }
    p.set(v)
    setT(MIN0 + v * SPAN)
  }
  const down = (e) => {
    drag.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    aim(e)
  }
  const up = () => {
    drag.current = false
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: sky }} />

      <motion.div className="pointer-events-none absolute inset-x-0 top-[100px] h-[140px]" style={{ opacity: starsOp }} aria-hidden="true">
        {STARS.map(([x, y], i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-white" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </motion.div>

      {/* matahari terbit dari balik gunung (digambar sebelum gunung) */}
      <motion.div
        className="absolute -ml-[40px] h-[80px] w-[80px] rounded-full"
        style={{ left: '78%', top: sunTop, background: 'radial-gradient(circle,#fff6c9 38%,rgba(255,190,110,0) 72%)' }}
      />

      <svg viewBox="0 0 360 160" preserveAspectRatio="none" className="absolute inset-x-0 top-[150px] h-[160px] w-full" aria-hidden="true">
        <path d="M0 160V96L50 70L110 100L170 60L240 96L300 76L360 100V160Z" fill="#fff" opacity=".18" />
        <motion.path d="M0 160V120L70 92L140 24L196 78L250 104L310 112L360 108V160Z" style={{ fill: mtn }} />
      </svg>
      <motion.div className="pointer-events-none absolute inset-x-0 top-[268px] h-[46px] bg-white blur-xl" style={{ opacity: fog }} />

      {/* balon udara statis */}
      <motion.svg width="42" height="62" viewBox="0 0 42 62" className="absolute right-[44px] top-[150px]" animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
        <ellipse cx="21" cy="19" rx="17" ry="19" fill="#ff8fa3" />
        <ellipse cx="21" cy="19" rx="7" ry="19" fill="#fff" opacity=".65" />
        <path d="M9 32L17 47M33 32L25 47" stroke="#6b4a34" strokeWidth="1.2" />
        <rect x="15" y="47" width="12" height="10" rx="2" fill="#8a6240" />
      </motion.svg>

      {/* pigura besar */}
      <div className="absolute left-[18px] top-[218px] h-[88px] w-[58px] border-[6px] border-[#f4ead2]" style={{ boxShadow: '0 0 12px rgba(255,255,255,.45)' }} />

      {/* jembatan merah */}
      <svg width="92" height="52" viewBox="0 0 92 52" className="absolute right-[10px] top-[262px]" aria-hidden="true">
        <path d="M4 50Q46 -8 88 50" fill="none" stroke="#d6453a" strokeWidth="7" strokeLinecap="round" />
        <path d="M18 40V50M32 28V50M46 22V50M60 28V50M74 40V50" stroke="#b8352c" strokeWidth="3" />
      </svg>

      {/* pagar dan lantai dek */}
      <div className="absolute inset-x-0 top-[286px] h-[5px] bg-[#e9dcc0]" />
      <div className="absolute inset-x-0 top-[291px] h-[17px]" style={{ backgroundImage: 'repeating-linear-gradient(90deg,#e9dcc0 0 4px,transparent 4px 38px)' }} />
      <div className="absolute inset-x-0 top-[306px] h-[48px]" style={{ background: 'repeating-linear-gradient(90deg,#8f6642 0 46px,#7d5637 46px 48px)' }} />

      {/* meja untuk dua orang */}
      <div className="absolute left-1/2 top-[322px] h-[14px] w-[84px] -translate-x-1/2 rounded-full bg-[#ecdcb8]" />
      <div className="absolute left-1/2 top-[334px] h-[18px] w-[5px] -translate-x-1/2 bg-[#6b4a34]" />
      <div className="absolute top-[334px] h-[5px] w-[30px] bg-[#6b4a34]" style={{ left: 'calc(50% - 82px)' }} />
      <div className="absolute top-[334px] h-[5px] w-[30px] bg-[#6b4a34]" style={{ left: 'calc(50% + 52px)' }} />

      {arrived && (
        <>
          <motion.div className="absolute" style={{ left: 'calc(50% - 90px)', top: 286 }} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 12 }}>
            <Koala size={50} />
          </motion.div>
          <motion.div className="absolute" style={{ left: 'calc(50% + 40px)', top: 286 }} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 12, delay: 0.15 }}>
            <Cat size={50} />
          </motion.div>
        </>
      )}

      {/* jalan menuju Pintu Langit: tempat macetnya */}
      <div className="absolute inset-x-0 top-[354px] h-[64px] overflow-hidden bg-gradient-to-b from-[#4a4358] to-[#2d2840]">
        <div className="absolute inset-x-0 top-[56px] h-[3px] opacity-60" style={{ backgroundImage: 'linear-gradient(90deg,#fff 0 22px,transparent 22px 44px)', backgroundSize: '44px 100%' }} />
        <motion.div className="absolute inset-0" style={{ x: carX }}>
          {QUEUE.map((c) => (
            <Car key={c.x} car={c} arrived={arrived} />
          ))}
        </motion.div>
        {!arrived && <span className="absolute left-2 top-1 rounded bg-[#d6453a] px-1.5 text-[10px] font-bold text-white">MACET</span>}
        <span className="absolute right-2 top-1 text-[10px] font-bold text-white/80">ke Pintu Langit →</span>
      </div>

      {/* jam dan keterangan */}
      <div className="pointer-events-none absolute inset-x-0 top-3 text-center text-white">
        <p className="font-display text-4xl font-extrabold tabular-nums" style={{ textShadow: '0 2px 12px rgba(0,0,0,.4)' }}>{fmt(t)}</p>
        <p className="mx-auto mt-1 max-w-[290px] text-xs font-semibold" style={{ textShadow: '0 1px 6px rgba(0,0,0,.55)' }}>{caption}</p>
      </div>
      {!started && (
        <p className="pointer-events-none absolute inset-x-0 bottom-[62px] z-[2] text-center text-[11px] font-semibold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>
          {D.hint}
        </p>
      )}

      {/* penggeser jam */}
      <div ref={bar} onPointerDown={down} onPointerMove={aim} onPointerUp={up} onPointerCancel={up} className="absolute bottom-3 left-10 right-10 h-[46px]" style={{ touchAction: 'pan-y' }}>
        <div className="absolute inset-x-0 top-[10px] h-1.5 rounded-full bg-white/50" />
        {[[MIN0, '05:00 target'], [ARRIVE, '06:30 tiba']].map(([m, l]) => (
          <div key={m} className="absolute top-0" style={{ left: `${pc(m)}%`, transform: 'translateX(-50%)' }}>
            <span className="mx-auto block h-[22px] w-[2px] bg-white" />
            <span className="mt-0.5 block whitespace-nowrap text-[10px] font-bold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>{l}</span>
          </div>
        ))}
        <motion.span
          className="absolute top-[1px] -ml-[14px] h-7 w-7 rounded-full border-4 border-white bg-[#ff9a3c] shadow-lg"
          style={{ left: handle }}
          animate={started ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />
      </div>

      {show && <ZoneResult title={D.missed} story={D.story} items={D.media} label="Pintu Langit" onAgain={onAgain} againLabel="Ulangi" />}
    </div>
  )
}