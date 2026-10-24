import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import { CatBody, KoalaBody } from './Characters.jsx'
import MediaFrame from './Media.jsx'

/* ---------- ukuran dunia (satuan desain, diskalakan ke layar) ---------- */
const WORLD = 1080
const WORLD_H = 620
const GROUND = 455 // garis kaki
const BW = 72 // lebar karakter
const BH = 90 // tinggi karakter
const HALF = 36
const KX = -70 // koala = pusat pasangan + KX
const TX = -2 // kucing = pusat pasangan + TX
const SW = { x: 190, pivot: 200, rope: 132 } // ayunan
const ROCK_X = 560
const SAND = '#f3dfb9'
const SCRIPT = "font-['Dancing_Script',cursive]"
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const SHORE = 'M0 292Q90 282 180 290T360 290T540 292T720 294Q900 330 1080 420V620H0Z'
const FOAM = 'M0 292Q90 282 180 290T360 290T540 292T720 294Q900 330 1080 420'
const WASH = 'M700 296Q900 332 1080 424V480Q900 388 700 344Z'
const WAVE = 'M0 28Q30 8 60 28T120 28T180 28T240 28T300 28T360 28T420 28T480 28T540 28T600 28T660 28T720 28V56H0Z'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
// lompatan kecil: naik sedikit lalu mendarat di 'to'
const hop = (mv, to, peak = 36, dur = 0.5) => {
  const from = mv.get()
  return animate(mv, [from, Math.max(from, to) + peak, to], { duration: dur, times: [0, 0.5, 1], ease: ['easeOut', 'easeIn'] })
}

/* ---------- komponen dekor ---------- */
function Band({ color, op = 1, dur, top, delay = 0 }) {
  return (
    <div className="pointer-events-none absolute left-0 overflow-hidden" style={{ top, width: WORLD, height: 56 }} aria-hidden="true">
      <motion.svg viewBox="0 0 720 56" preserveAspectRatio="none" className="absolute left-0 top-0 h-full w-[200%]" style={{ opacity: op }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}>
        <path d={WAVE} fill={color} />
      </motion.svg>
    </div>
  )
}

function Palm({ x, h = 190, flip = false }) {
  return (
    <motion.svg
      className="pointer-events-none absolute"
      style={{ left: x - 50, top: GROUND - h, transformOrigin: '50% 100%', overflow: 'visible', scaleX: flip ? -1 : 1 }}
      width="100"
      height={h}
      viewBox="0 0 100 190"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <path d="M52 190Q56 130 46 74" stroke="#9a6a3a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M46 74Q16 46 -8 62Q22 50 46 74Z" fill="#4fa05a" />
      <path d="M46 74Q30 40 8 34Q38 36 46 74Z" fill="#5fb06a" />
      <path d="M46 74Q54 38 76 30Q58 44 46 74Z" fill="#4fa05a" />
      <path d="M46 74Q78 48 104 62Q72 52 46 74Z" fill="#5fb06a" />
      <path d="M46 74Q60 100 86 104Q60 86 46 74Z" fill="#46944f" />
      <path d="M46 74Q32 100 8 104Q32 86 46 74Z" fill="#46944f" />
      <circle cx="42" cy="80" r="5" fill="#7a5230" />
      <circle cx="51" cy="82" r="5" fill="#7a5230" />
    </motion.svg>
  )
}

function Crab() {
  return (
    <svg width="40" height="30" viewBox="0 0 46 34" aria-hidden="true">
      <path d="M10 22l-6 6M14 25l-4 7M32 25l4 7M36 22l6 6M18 13V9M28 13V9" stroke="#d9573f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="23" cy="20" rx="14" ry="9" fill="#f26b4f" />
      <circle cx="6" cy="10" r="5" fill="#f26b4f" />
      <circle cx="40" cy="10" r="5" fill="#f26b4f" />
      <circle cx="18" cy="9" r="2.5" fill="#fff" />
      <circle cx="28" cy="9" r="2.5" fill="#fff" />
      <circle cx="18" cy="9" r="1.2" fill="#2a1f45" />
      <circle cx="28" cy="9" r="1.2" fill="#2a1f45" />
    </svg>
  )
}

function Terrain() {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={WORLD} height={WORLD_H} viewBox={`0 0 ${WORLD} ${WORLD_H}`} aria-hidden="true">
      <defs>
        <pattern id="mlDots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1" fill="#e3c896" />
        </pattern>
      </defs>
      <path d={SHORE} fill={SAND} />
      <path d={SHORE} fill="url(#mlDots)" />
      <path d={FOAM} fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".9" />
      <path d="M262 492L266 502L277 503L269 510L271 521L262 515L253 521L255 510L247 503L258 502Z" fill="#f59a7b" stroke="#e07a58" strokeWidth="1.2" />
      <path d="M452 505L440 490Q443 480 452 479Q461 480 464 490Z" fill="#f7c9d8" stroke="#e59ab5" strokeWidth="1.2" />
      <path d="M118 500Q116 490 128 488Q140 488 142 500Z" fill="#b7aab6" />
      <path d="M700 488Q698 480 708 478Q718 478 720 488Z" fill="#b7aab6" />
      <path d="M835 505L825 492Q828 484 835 483Q842 484 845 492Z" fill="#e8d2f4" stroke="#b996d6" strokeWidth="1.2" />
      {/* rumput laut dan batu kecil di bagian bawah */}
      {[60, 430, 800].map((x) => (
        <g key={x}>
          <path d={`M${x} 618Q${x - 4} 590 ${x + 6} 570Q${x + 10} 594 ${x + 16} 618Z`} fill="#8fbf86" />
          <path d={`M${x + 14} 618Q${x + 22} 586 ${x + 38} 574Q${x + 34} 598 ${x + 32} 618Z`} fill="#7fae7a" />
          <path d={`M${x + 28} 618Q${x + 26} 596 ${x + 20} 582Q${x + 34} 596 ${x + 44} 618Z`} fill="#9ccb92" />
        </g>
      ))}
      <ellipse cx="260" cy="600" rx="16" ry="8" fill="#b7aab6" />
      <ellipse cx="282" cy="606" rx="10" ry="6" fill="#c9bec8" />
      <ellipse cx="640" cy="604" rx="14" ry="7" fill="#b7aab6" />
      <ellipse cx="960" cy="598" rx="15" ry="8" fill="#b7aab6" />
      <path d="M560 585L553 575L545 583L550 592L545 600L553 598Z" fill="#f59a7b" />
    </svg>
  )
}

function Wash() {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={WORLD} height={WORLD_H} viewBox={`0 0 ${WORLD} ${WORLD_H}`} aria-hidden="true">
      <defs>
        <linearGradient id="mlWash" gradientUnits="userSpaceOnUse" x1="620" y1="0" x2="900" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".75" />
        </linearGradient>
      </defs>
      <g style={{ filter: 'blur(1.5px)' }}>
        <motion.path d="M640 292Q900 332 1080 422" stroke="url(#mlWash)" strokeWidth="16" strokeLinecap="round" fill="none" animate={{ y: [0, 34, 0], opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.path d="M640 292Q900 332 1080 422" stroke="url(#mlWash)" strokeWidth="10" strokeLinecap="round" fill="none" animate={{ y: [0, 56, 0], opacity: [0.1, 0.7, 0.1] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }} />
      </g>
    </svg>
  )
}

function Rocks() {
  return (
    <svg className="pointer-events-none absolute" style={{ left: ROCK_X - 120, top: 290 }} width="240" height="175" viewBox="0 0 240 175" aria-hidden="true">
      <ellipse cx="130" cy="168" rx="116" ry="8" fill="rgba(90,70,48,.25)" />
      <path d="M48 165Q40 118 82 104Q122 96 142 122Q158 165 158 165Z" fill="#9a8f9f" />
      <path d="M100 165Q96 90 148 68Q196 58 216 100Q232 165 232 165Z" fill="#8a7f91" />
      <path d="M154 100Q160 40 196 22Q228 18 238 50Q246 90 232 120Z" fill="#a89eae" />
      <path d="M62 120Q80 108 104 110M120 86Q146 70 178 72M176 44Q198 30 222 36" stroke="#c9c1cf" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".8" />
      <path d="M120 150L128 126M196 96L206 70" stroke="#6f6578" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="88" cy="112" rx="14" ry="5" fill="#7fae7a" opacity=".7" />
      <ellipse cx="190" cy="68" rx="12" ry="4" fill="#7fae7a" opacity=".6" />
    </svg>
  )
}

function SwingFrame() {
  const h = GROUND - SW.pivot + 14
  return (
    <svg className="pointer-events-none absolute" style={{ left: SW.x - 130, top: SW.pivot - 14 }} width="260" height={h + 8} viewBox={`0 0 260 ${h + 8}`} aria-hidden="true">
      <ellipse cx="130" cy={h + 2} rx="120" ry="7" fill="rgba(90,70,48,.22)" />
      <path d={`M40 14L12 ${h}M40 14L68 ${h}M220 14L192 ${h}M220 14L248 ${h}`} stroke="#8a5a34" strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="28" y="8" width="204" height="12" rx="6" fill="#a8723f" />
    </svg>
  )
}

/* ---------- album (terkunci sampai ketiga tempat selesai) ---------- */
const AW = 230
const AG = 18

function Album({ D, open, count, ink }) {
  const sc = useRef(null)
  const [i, setI] = useState(0)
 // SESUDAH:
const A = D.beach.album
  const onScroll = () => {
    const el = sc.current
    if (el) setI(Math.min(A.media.length - 1, Math.max(0, Math.round(el.scrollLeft / (AW + AG)))))
  }
  return (
    <section className="relative px-4 pb-[8svh] pt-[8svh] text-center" style={{ minHeight: `${H['jun-galeri']}svh` }}>
      <h2 style={{ color: ink }} className="font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none">{A.title}</h2>
      {!open ? (
        <div className="mx-auto mt-8 flex max-w-[300px] flex-col items-center rounded-3xl bg-white/70 px-6 py-8 shadow-xl backdrop-blur-sm">
          <svg width="46" height="52" viewBox="0 0 46 52" aria-hidden="true">
            <rect x="6" y="22" width="34" height="26" rx="6" fill="#9a7fd8" />
            <path d="M14 22V14a9 9 0 0 1 18 0v8" fill="none" stroke="#9a7fd8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="23" cy="35" r="4" fill="#fff" />
          </svg>
          <p className="mt-3 text-sm font-semibold text-[#3b2a63]">{A.locked}</p>
          <p className="mt-1 text-xs text-[#3b2a63]/70">{count}/3</p>
        </div>
      ) : (
        <>
          <p style={{ color: ink }} className="mt-2 text-sm font-semibold">{A.hint}</p>
          <div ref={sc} onScroll={onScroll} className="no-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto py-5" style={{ gap: AG, paddingLeft: `calc(50% - ${AW / 2}px)`, paddingRight: `calc(50% - ${AW / 2}px)` }}>
            {A.media.map((m, k) => (
              <div key={m.src} className="shrink-0 snap-center" style={{ width: AW }}>
                <MediaFrame item={m} label={`foto pantai ${k + 1}`} frameClass="w-full p-2 pb-8 shadow-xl" imgClass="aspect-[4/5] w-full" style={{ rotate: k % 2 ? 2 : -2 }} />
                <p style={{ color: ink }} className="mt-2 text-center text-xs">{m.caption}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-1.5">
            {A.media.map((_, k) => (
              <span key={k} className="h-2 w-2 rounded-full" style={{ background: k === i ? '#7a5cc4' : 'rgba(90,70,48,.25)' }} />
            ))}
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.2 }} style={{ color: ink }} className={`mx-auto mt-10 max-w-[300px] text-[1.9rem] leading-snug ${SCRIPT}`}>
            {D.closing}
          </motion.p>
        </>
      )}
    </section>
  )
}

/* ---------- bagian utama ---------- */
export default function Molang() {
  const B = JUNE.beach
  const { ink } = useContext(SkyContext)
  const need = Math.max(1, Math.min(3, B.swing.media.length || 3))

  // skala mengikuti lebar di ponsel (terlihat ±360 satuan), mengikuti tinggi di layar lebar
  const wrap = useRef(null)
  const [dim, setDim] = useState({ k: 1, w: 360, h: WORLD_H })
  const vwRef = useRef(360)
  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      if (!width || !height) return
      const sc = Math.max(width / WORLD, Math.min(width / 360, height / WORLD_H))
      setDim({ k: sc, w: width / sc, h: height / sc })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const { k, w: VW, h: VH } = dim
  vwRef.current = VW
  const camAt = (c) => Math.min(Math.max(0, WORLD - vwRef.current), Math.max(0, c - vwRef.current / 2))

  // posisi koala dan kucing
  const cx = useMotionValue(380)
  const kx = useMotionValue(380 + KX)
  const tx = useMotionValue(380 + TX)
  const ky = useMotionValue(0)
  const ty = useMotionValue(0)
  const kyN = useTransform(ky, (v) => -v)
  const tyN = useTransform(ty, (v) => -v)

  // kamera otomatis
  const camT = useMotionValue(0)
  const cam = useSpring(camT, { stiffness: 70, damping: 20 })
  const worldX = useTransform(cam, (v) => -v)
  const skyX = useTransform(cam, (v) => -v * 0.5)
  const follow = useRef(true)
  const started = useRef(false)
  useMotionValueEvent(cx, 'change', (v) => {
    if (follow.current) camT.set(camAt(v))
  })
  useEffect(() => {
    if (!follow.current) return
    const v = camAt(cx.get())
    camT.set(v)
    if (!started.current) cam.jump(v)
  }, [VW])

  const ang = useMotionValue(0)
  const swingRef = useRef({ th: 0, om: 0, last: 0, lvl: 0 })
  const busyRef = useRef(false)
  const fxId = useRef(0)

  const [active, setActive] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState('idle')
  const [walking, setWalking] = useState(false)
  const [fast, setFast] = useState(false)
  const [laugh, setLaugh] = useState(false)
  const [onSwing, setOnSwing] = useState(false)
  const [swingOn, setSwingOn] = useState(false)
  const [lvl, setLvl] = useState(0)
  const [photo, setPhoto] = useState('')
  const [holding, setHolding] = useState(false)
  const [shown, setShown] = useState(null)
  const [done, setDone] = useState([])
  const [flash, setFlash] = useState(0)
  const [running, setRunning] = useState(false)
  const [fx, setFx] = useState([])

  const markDone = (id) => setDone((d) => (d.includes(id) ? d : [...d, id]))
  const release = () => {
    busyRef.current = false
    setBusy(false)
    setMode('idle')
  }
  const addFx = (type, x, y, text = '') => {
    const id = fxId.current++
    setFx((f) => [...f, { id, type, x, y, text }])
    setTimeout(() => setFx((f) => f.filter((v) => v.id !== id)), 1500)
  }
  const syncCx = () => cx.set(((kx.get() - KX) + (tx.get() - TX)) / 2)

  /* ----- gerak dasar ----- */
  const walkTo = async (to, speed = 120) => {
    const dur = Math.max(0.35, Math.abs(to - cx.get()) / speed)
    setFast(false)
    setWalking(true)
    await Promise.all([
      animate(cx, to, { duration: dur, ease: 'easeInOut' }),
      animate(kx, to + KX, { duration: dur, ease: 'easeInOut' }),
      animate(tx, to + TX, { duration: dur, ease: 'easeInOut' }),
    ])
    setWalking(false)
  }

  const activate = async () => {
    if (active) return
    started.current = true
    setActive(true)
    setLaugh(true)
    navigator.vibrate?.(20)
    addFx('heart', kx.get() + HALF, GROUND - 110)
    addFx('heart', tx.get() + HALF - 10, GROUND - 110)
    await Promise.all([hop(ky, 0, 30, 0.5), hop(ty, 0, 30, 0.5)])
    setLaugh(false)
  }

  /* ----- AYUNAN ----- */
  const doSwing = async () => {
    setShown(null)
    setMode('swing')
    setLvl(0)
        animate(ang, 0, { duration: 0.8, ease: 'easeOut' })
    swingRef.current = { th: 0.1, om: 0.4, last: 0, lvl: 0 }
    await walkTo(SW.x, 120)
    await Promise.all([hop(ky, 120, 40, 0.7), hop(ty, 120, 40, 0.7)])
    setOnSwing(true)
    ky.set(0)
    ty.set(0)
    setSwingOn(true)
  }
  const leaveSwing = async () => {
    setSwingOn(false)
    await animate(ang, 0, { duration: 0.4, ease: 'easeOut' })
    setOnSwing(false)
    ky.set(120)
    ty.set(120)
    await Promise.all([animate(ky, 0, { duration: 0.55, ease: 'easeIn' }), animate(ty, 0, { duration: 0.55, ease: 'easeIn' })])
    release()
  }
  const push = () => {
    const s = swingRef.current
    s.om += (Math.abs(s.om) > 0.3 ? Math.sign(s.om) : 1) * 1.1
    navigator.vibrate?.(8)
  }
  useEffect(() => {
    if (!swingOn) return undefined
    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const s = swingRef.current
      s.om += (-16 * Math.sin(s.th) - 0.28 * s.om) * dt
      s.th += s.om * dt
      if (Math.abs(s.th) > 1.05) {
        s.th = Math.sign(s.th) * 1.05
        s.om *= 0.6
      }
      if (s.last * s.om < 0) {
        const a = (Math.abs(s.th) * 180) / Math.PI
        const nl = a > 50 ? 3 : a > 36 ? 2 : a > 20 ? 1 : 0
        if (nl > s.lvl) {
          s.lvl = nl
          setLvl(nl)
          navigator.vibrate?.(20)
        }
      }
      s.last = s.om
      ang.set((s.th * 180) / Math.PI)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [swingOn])
  // ayunan kosong bergoyang pelan, berhenti saat karakter menuju ayunan
  useEffect(() => {
    if (swingOn || onSwing || mode === 'swing') return undefined
    const c = animate(ang, [0, 3, 0, -3, 0], { duration: 6, repeat: Infinity, ease: 'easeInOut' })
    return () => c.stop()
  }, [swingOn, onSwing, mode])
  useEffect(() => {
    if (swingOn && lvl >= 1) {
      setShown('swing')
      if (lvl >= need) markDone('swing')
    }
  }, [lvl, swingOn])

   const doRock = async () => {
    setShown(null)
    setMode('rock')
    setPhoto('')
    await walkTo(400, 110)
    follow.current = false
    camT.set(camAt(550)) // kamera memuat kucing di bawah dan koala di puncak
    setHolding(true)
    setWalking(true)
    // koala melompati kucing menuju batu
    await Promise.all([
      animate(kx, 500, { duration: 1.2, ease: 'easeInOut' }),
      hop(ky, 0, 70, 1.2),
      animate(tx, 404, { duration: 0.6, ease: 'easeOut' }),
    ])
    setWalking(false)
    await Promise.all([animate(kx, 532, { duration: 0.5, ease: 'easeOut' }), hop(ky, 63, 30, 0.5)])
    await Promise.all([animate(kx, 582, { duration: 0.5, ease: 'easeOut' }), hop(ky, 103, 30, 0.5)])
    await Promise.all([animate(kx, 626, { duration: 0.55, ease: 'easeOut' }), hop(ky, 140, 30, 0.55)])
    setPhoto('ready')
  }
  const shoot = async () => {
    if (photo !== 'ready') return
    setPhoto('shot')
    setFlash((f) => f + 1)
    navigator.vibrate?.(20)
    await wait(900)
    setShown('rock')
    markDone('rock')
    await wait(1800)
    await Promise.all([animate(kx, 582, { duration: 0.45, ease: 'easeIn' }), hop(ky, 103, 12, 0.45)])
    await Promise.all([animate(kx, 532, { duration: 0.45, ease: 'easeIn' }), hop(ky, 63, 12, 0.45)])
    await Promise.all([animate(kx, 500, { duration: 0.45, ease: 'easeIn' }), hop(ky, 0, 12, 0.45)])
    setHolding(false)
    setPhoto('')
    // kucing melompati koala supaya formasi kembali (koala kiri, kucing kanan)
    await Promise.all([animate(tx, 568, { duration: 0.9, ease: 'easeInOut' }), hop(ty, 0, 80, 0.9)])
    syncCx()
    follow.current = true
    camT.set(camAt(cx.get()))
    release()
  }

  /* ----- BIBIR PANTAI: kejar-kejaran sambil tertawa ----- */
  const runTo = async (to) => {
    const dur = Math.max(0.4, Math.abs(to - cx.get()) / 250)
    setFast(true)
    setWalking(true)
    await Promise.all([
      animate(cx, to, { duration: dur, ease: 'easeInOut' }),
      animate(kx, to + KX, { duration: dur, ease: 'easeInOut' }),
      animate(tx, to + TX, { duration: dur, ease: 'easeInOut' }),
    ])
  }
  const doShore = async () => {
    setShown(null)
    setMode('shore')
    await walkTo(830, 130)
    follow.current = false
    camT.set(Math.max(0, WORLD - vwRef.current))
    setLaugh(true)
    setRunning(true)
    for (const to of [1010, 850, 1010, 850]) {
      // eslint-disable-next-line no-await-in-loop
      await runTo(to)
    }
    setRunning(false)
    setFast(false)
    setWalking(false)
    await walkTo(900, 100)
    addFx('word', 900, 330, B.shore.brr)
    await Promise.all([hop(ky, 0, 40, 0.45), hop(ty, 0, 40, 0.45)])
    await wait(900)
    setLaugh(false)
    setShown('shore')
    markDone('shore')
    follow.current = true
    release()
  }
  useEffect(() => {
    if (!running) return undefined
    let n = 0
    const id = setInterval(() => {
      n += 1
      const x = kx.get() + HALF
      addFx('splash', x, GROUND - 6)
           if (n % 4 === 0) addFx('word', x, GROUND - 130, n % 8 === 0 ? 'hihi' : 'haha')
    }, 240)
    return () => clearInterval(id)
  }, [running])

  const start = (id) => {
    if (!active || busyRef.current) return
    busyRef.current = true
    setBusy(true)
    follow.current = true
    if (id === 'swing') doSwing()
    else if (id === 'rock') doRock()
    else doShore()
  }

  const stagePointerDown = () => {
    if (swingOn) push()
    else if (mode === 'shore' && running) addFx('heart', kx.get() + HALF, GROUND - 120)
  }

  /* ----- teks bantuan dan nampan kenangan ----- */
  let hint = ''
  if (!active) hint = B.start
  else if (mode === 'idle') hint = done.length >= 3 ? B.done : B.pick
  else if (mode === 'swing') hint = swingOn ? (lvl === 0 ? B.swing.hint : B.swing.levels[Math.min(lvl, B.swing.levels.length) - 1]) : ''
  else if (mode === 'rock') hint = photo === 'ready' ? B.rock.ready : photo === 'shot' ? '' : B.rock.hint
  else if (mode === 'shore') hint = B.shore.hint

  const memory =
    shown === 'swing'
      ? { items: B.swing.media.slice(0, lvl), text: lvl >= need ? B.swing.story : '' }
      : shown === 'rock'
        ? { items: [B.rock.photo], text: B.rock.story }
        : shown === 'shore'
          ? { items: [B.shore.photo], text: B.shore.story }
          : null

  const spots = [
    ['swing', SW.x, 160],
    ['rock', 650, 262],
    ['shore', 905, 300],
  ]
  const gait = fast ? 'run' : walking ? 'walk' : 'idle'
  const mood = laugh ? 'laugh' : 'happy'
  const bob = fast ? { y: [0, -9, 0] } : walking ? { y: [0, -4, 0] } : { y: 0 }
  const bobT = fast ? { duration: 0.34, repeat: Infinity } : walking ? { duration: 0.6, repeat: Infinity } : { duration: 0.2 }
  const showTitle = !memory && mode === 'idle'
  const actionLabel = photo === 'ready' ? B.rock.shoot : swingOn && lvl >= need ? B.swing.down : ''
  const big = memory && memory.items.length === 1

  return (
    <>
      <section className="relative" style={{ minHeight: `${H['jun-pantai']}svh` }}>
        <div ref={wrap} className="relative w-full" style={{ height: '100svh' }}>
          {/* adegan: tepi atas berbentuk kubah, tepi bawah melengkung seperti pantai November */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: '#ffd0b8',
              borderTopLeftRadius: '50% 52px',
              borderTopRightRadius: '50% 52px',
              borderBottomLeftRadius: '50% 64px',
              borderBottomRightRadius: '50% 64px',
              boxShadow: '0 -10px 30px -12px rgba(255,200,160,.7), 0 22px 34px -12px rgba(0,0,0,.28)',
            }}
          >
            <div className="absolute left-0 top-0 overflow-hidden" style={{ width: VW, height: VH, transform: `scale(${k})`, transformOrigin: '0 0', background: '#ffd0b8' }} onPointerDown={stagePointerDown}>
              {/* awan di langit tambahan (di atas dunia) */}
              <motion.div className="pointer-events-none absolute h-8 w-28 rounded-full bg-white/70 blur-md" style={{ left: 30, top: 30 }} animate={{ x: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="pointer-events-none absolute h-7 w-24 rounded-full bg-white/60 blur-md" style={{ right: 20, top: 74 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />

              <div className="absolute left-0" style={{ top: VH - WORLD_H, width: VW, height: WORLD_H }}>
                {/* langit: bergeser lebih lambat (parallax) */}
                <motion.div className="absolute left-0 top-0" style={{ width: Math.max(720, (VW + WORLD) / 2 + 20), height: 240, x: skyX, background: 'linear-gradient(180deg,#ffd0b8 0%,#fbe3d6 45%,#d4eef5 100%)' }}>
                  <div className="absolute h-20 w-20 rounded-full" style={{ left: 330, top: 40, background: 'radial-gradient(circle,#fff6d8 35%,rgba(255,190,140,0) 72%)' }} />
                  <motion.div className="absolute h-9 w-32 rounded-full bg-white/70 blur-md" style={{ left: 40, top: 60 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
                  <motion.div className="absolute h-7 w-24 rounded-full bg-white/60 blur-md" style={{ left: 450, top: 96 }} animate={{ x: [0, -34, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
                  <motion.div className="absolute h-8 w-28 rounded-full bg-white/60 blur-md" style={{ left: 220, top: 30 }} animate={{ x: [0, 30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }} />
                  {[0, 1, 2, 3].map((g) => (
                    <motion.svg key={g} width="26" height="12" viewBox="0 0 26 12" className="absolute" style={{ left: 60 + g * 150, top: 70 + (g % 2) * 28 }} animate={{ x: [0, 60, 0], y: [0, -6, 0] }} transition={{ duration: 9 + g * 2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                      <path d="M1 8Q7 0 13 7Q19 0 25 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </motion.svg>
                  ))}
                </motion.div>

                {/* dunia */}
                <motion.div className="absolute left-0 top-0" style={{ width: WORLD, height: WORLD_H, x: worldX, willChange: 'transform' }}>
                  <div className="absolute left-0" style={{ top: 168, bottom: 0, width: WORLD, background: 'linear-gradient(180deg,#c3e9f1 0%,#8fd3e0 35%,#4fb3c9 100%)' }} />
                  <Band color="#a9e3ea" op={0.8} dur={15} top={178} />
                  <Band color="#8fd6e2" op={0.8} dur={12} top={214} delay={-4} />
                  <Band color="#ffffff" op={0.5} dur={9} top={252} delay={-2} />
                  <Band color="#7fd0dc" op={0.6} dur={11} top={300} delay={-5} />
                  <Band color="#9fdce8" op={0.6} dur={13} top={344} delay={-7} />

                  {[[140, 168], [650, 172], [930, 176]].map(([x, y], i) => (
                    <motion.svg key={x} width="52" height="44" viewBox="0 0 64 54" className="absolute" style={{ left: x, top: y }} animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                      <path d="M32 2V30" stroke="#6b4a34" strokeWidth="2" />
                      <path d="M33 4L52 28H33Z" fill={i % 2 ? '#c9b2ff' : '#ffe3ee'} />
                      <path d="M31 8L14 28H31Z" fill="#fff" opacity=".9" />
                      <path d="M8 32H56L48 46H16Z" fill="#8a5a3a" />
                    </motion.svg>
                  ))}
                  {[[60, 214], [200, 240], [330, 226], [480, 252], [620, 232], [790, 262], [880, 300], [1000, 330]].map(([x, y], i) => (
                    <motion.span key={i} className="absolute h-0.5 w-3 rounded bg-white" style={{ left: x, top: y }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }} />
                  ))}

                  <Terrain />
                  <Wash />
                  <motion.div className="pointer-events-none absolute" style={{ left: 250, top: 486 }} animate={{ x: [0, 210, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                    <Crab />
                  </motion.div>
                  <Palm x={330} h={200} />
                  <Palm x={760} h={170} flip />
                  <Rocks />
                  <SwingFrame />

                  {/* sorotan sebelum koala dan kucing diketuk */}
                  {!active && (
                    <motion.div className="pointer-events-none absolute rounded-full bg-white/50" style={{ left: 380 - 100, top: GROUND - 110, width: 200, height: 124 }} animate={{ scale: [1, 1.12, 1], opacity: [0.9, 0.35, 0.9] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  )}

                  {/* bayangan di tanah */}
                  <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 5, width: 52, height: 9, x: kx, marginLeft: 10, opacity: onSwing ? 0 : 1 }} />
                  <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 5, width: 52, height: 9, x: tx, marginLeft: -1, opacity: onSwing ? 0 : 1 }} />

                  {/* koala dan kucing (desain baru) */}
                  <motion.div className="absolute" style={{ left: 0, top: GROUND - BH, x: kx, y: kyN, opacity: onSwing ? 0 : 1, cursor: active ? 'default' : 'pointer' }} onClick={() => !active && activate()} role={active ? undefined : 'button'} tabIndex={active ? -1 : 0} aria-label={active ? undefined : 'Ketuk koala'}>
                    <motion.div animate={bob} transition={bobT}>
                      <KoalaBody size={BW} mood={mood} gait={gait} wave={!walking && !fast} />
                    </motion.div>
                  </motion.div>
                  <motion.div className="absolute" style={{ left: 0, top: GROUND - BH, x: tx, y: tyN, opacity: onSwing ? 0 : 1, cursor: active ? 'default' : 'pointer' }} onClick={() => !active && activate()} role={active ? undefined : 'button'} tabIndex={active ? -1 : 0} aria-label={active ? undefined : 'Ketuk kucing'}>
                    <motion.div animate={bob} transition={bobT}>
                      <CatBody size={BW} mood={mood} gait={gait} wave={!walking && !fast} camera={holding} />
                    </motion.div>
                  </motion.div>

                                 {/* ayunan: tali, dudukan, dan yang duduk di atasnya */}
                  <motion.div className="pointer-events-none absolute" style={{ left: SW.x, top: SW.pivot, width: 0, height: 0, rotate: ang, transformOrigin: '0px 0px' }}>
                    <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: -66, top: 0, height: SW.rope }} />
                    <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: 63, top: 0, height: SW.rope }} />
                    <div className="absolute rounded bg-[#c9965a]" style={{ left: -74, top: SW.rope, width: 148, height: 12 }} />
                    {onSwing && (
                      <>
                        <div className="absolute" style={{ left: KX, top: SW.rope - BH + 3 }}><KoalaBody size={BW} mood={lvl >= 1 ? 'laugh' : 'happy'} wave={false} /></div>
                        <div className="absolute" style={{ left: TX, top: SW.rope - BH + 3 }}><CatBody size={BW} mood={lvl >= 1 ? 'laugh' : 'happy'} wave={false} /></div>
                      </>
                    )}
                  </motion.div>

                  {/* bingkai bidik kamera */}
                  {photo === 'ready' && (
                    <motion.div className="pointer-events-none absolute" style={{ left: 609, top: 217, width: 102, height: 108 }} initial={{ opacity: 0, scale: 1.3 }} animate={{ opacity: 1, scale: 1 }}>
                      <span className="absolute left-0 top-0 h-5 w-5 border-l-[3px] border-t-[3px] border-white" />
                      <span className="absolute right-0 top-0 h-5 w-5 border-r-[3px] border-t-[3px] border-white" />
                      <span className="absolute bottom-0 left-0 h-5 w-5 border-b-[3px] border-l-[3px] border-white" />
                      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-[3px] border-r-[3px] border-white" />
                    </motion.div>
                  )}

                  {fx.map((f) =>
                    f.type === 'heart' ? (
                      <motion.svg key={f.id} width="20" height="20" viewBox="0 0 40 40" className="pointer-events-none absolute z-[9]" style={{ left: f.x - 10, top: f.y }} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -60, scale: 1.2 }} transition={{ duration: 1.3 }} aria-hidden="true">
                        <path d={HEART} fill="#ff6f9c" />
                      </motion.svg>
                    ) : f.type === 'splash' ? (
                      <motion.span key={f.id} className="pointer-events-none absolute z-[9] h-2 w-6 rounded-full border border-white/90" style={{ left: f.x - 12, top: f.y }} initial={{ opacity: 0.9, scale: 0.4 }} animate={{ opacity: 0, scale: 1.8, y: -8 }} transition={{ duration: 0.7 }} />
                    ) : (
                      <motion.span key={f.id} className="pointer-events-none absolute z-[9] -ml-8 w-16 text-center text-base font-extrabold text-[#1f6a8a]" style={{ left: f.x, top: f.y }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -50 }} transition={{ duration: 1.4 }}>
                        {f.text}
                      </motion.span>
                    ),
                  )}

                  {/* petunjuk langsung ke tempat yang bisa diketuk */}
                  {active && mode === 'idle' && !busy &&
                    spots.map(([id, x, y]) => (
                      <div key={id} className="absolute z-[8]" style={{ left: x - 48, top: y, width: 96 }}>
                        <motion.button type="button" onClick={() => start(id)} aria-label={B.chips[id]} className="flex w-full flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                          <span className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-lg ${done.includes(id) ? 'bg-[#a8e6cf] text-[#1f5a45]' : 'bg-white text-[#5a2d4a]'}`}>
                            {done.includes(id) ? '✓ ' : ''}{B.chips[id]}
                          </span>
                          <span className="mt-0.5 h-3 w-3 rotate-45 bg-white shadow" />
                        </motion.button>
                      </div>
                    ))}
                </motion.div>
              </div>
            </div>

            {/* awan lembut di tepi atas, pasir basah di tepi bawah */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[100px]" style={{ background: 'linear-gradient(to bottom, rgba(255,243,232,.95), rgba(255,243,232,0))' }} />
            <div className="pointer-events-none absolute -top-4 left-[6%] h-12 w-44 rounded-full bg-white/85 blur-lg" />
            <div className="pointer-events-none absolute -top-5 right-[8%] h-12 w-52 rounded-full bg-white/80 blur-lg" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]" style={{ background: 'linear-gradient(to top, rgba(150,112,64,.38), rgba(150,112,64,0))' }} />
            {flash > 0 && <motion.div key={flash} className="pointer-events-none absolute inset-0 bg-white" initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} />}
          </div>

          {/* UI dalam ukuran asli layar (tidak ikut di-zoom) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center px-4 pt-6">
            <motion.div
              initial={false}
              animate={{ opacity: showTitle ? 1 : 0, height: showTitle ? 'auto' : 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden px-2 text-center"
              style={{ textShadow: '0 1px 12px rgba(255,255,255,.9)' }}
            >
              <h2 className="font-display text-[clamp(2.2rem,10vw,3.2rem)] font-extrabold leading-none" style={{ color: '#5a2d4a' }}>{B.title}</h2>
              <p className={`mt-1 text-2xl ${SCRIPT}`} style={{ color: '#7a4560' }}>{B.subtitle}</p>
              <p className="text-sm" style={{ color: '#7a4560' }}>{B.date}</p>
            </motion.div>

            {hint && <p className="mt-2 max-w-[340px] rounded-full bg-white/90 px-3.5 py-1.5 text-center text-xs font-bold text-[#5a2d4a] shadow">{hint}</p>}

            <AnimatePresence>
              {memory && (
                <motion.div
                  key={shown}
                  className="pointer-events-auto relative mt-3 w-full max-w-[380px] rounded-2xl bg-white/95 p-3 pr-8 text-[#3b2a63] shadow-xl"
                  initial={{ opacity: 0, y: -14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 220 }}
                >
                  <div className="flex flex-wrap items-start justify-center gap-2">
                    {memory.items.map((m, i) => (
                      <MediaFrame key={m.src} item={m} label={`kenangan ${i + 1}`} frameClass={big ? 'w-[112px] p-1.5 pb-5 shadow' : 'w-[78px] p-1 pb-3 shadow'} imgClass="aspect-square w-full" />
                    ))}
                  </div>
                  {memory.text && <p className="mt-2 max-h-[22svh] overflow-y-auto text-center text-xs leading-relaxed">{memory.text}</p>}
                  <button type="button" onClick={() => setShown(null)} aria-label="Tutup kenangan" className="absolute right-1 top-1 h-8 w-8 text-xl leading-none text-[#3b2a63]/60">×</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* tombol bawah: tersusun vertikal, di bawah kaki karakter */}
          <div className="pointer-events-none absolute inset-x-0 bottom-9 z-30 flex flex-col items-center gap-2 px-3">
            <AnimatePresence>
              {actionLabel && (
                <motion.button key="act" type="button" onClick={photo === 'ready' ? shoot : leaveSwing} className="pointer-events-auto h-11 min-w-[150px] rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] px-6 font-semibold text-white shadow-lg" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {actionLabel}
                </motion.button>
              )}
            </AnimatePresence>
            <div className="pointer-events-auto flex flex-wrap justify-center gap-1.5">
              {['swing', 'rock', 'shore'].map((id) => (
                <button key={id} type="button" disabled={!active || busy} onClick={() => start(id)} className={`rounded-full px-3 py-1.5 text-[11px] font-bold shadow transition-opacity ${active && !busy ? 'bg-white/95 text-[#5a2d4a]' : 'bg-white/55 text-[#5a2d4a]/60'}`}>
                  {done.includes(id) ? '✓ ' : ''}{B.chips[id]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Album D={JUNE} open={done.length >= 3} count={done.length} ink={ink} />
    </>
  )
}