import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { SEPTEMBER } from '../data/september.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import { CatBody, KoalaBody } from './Characters.jsx'
import StoryDialog from './StoryDialog.jsx'
import ChatOverlay from './ChatOverlay.jsx'
import { setVolume } from '../audio/player.js'

/* ---------- ukuran dunia (satuan desain, diskalakan ke layar) ---------- */
const WORLD = 1100
const WORLD_H = 560
const GROUND = 482 // garis kaki
const TOP = 452 // permukaan meja dan kasir
const BW = 72
const BH = 90
const HALF = 36
const KX = -70 // koala = pusat pasangan + KX
const TX = -2 // kucing = pusat pasangan + TX
const PACK_CX = 88 // koala dan kucing berdiri di ujung kiri meja packing
const PACK_ZONE = 190 // tengah area kerja packing (kamera diarahkan ke sini)
const CASH_CX = 608
const CASH_ZONE = 708 // tengah area kerja kasir
const SCAN_X = 860
const SCRIPT = "font-['Dancing_Script',cursive]"
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const TINT = [0, 0.06, 0.16, 0.38]
const SKY = [
  'linear-gradient(180deg,#ffcfa3,#ffe4cc 60%,#fff1e0)',
  'linear-gradient(180deg,#7fbcf2,#cfe6f8)',
  'linear-gradient(180deg,#6fa8e8,#ffc08a 70%,#ff9f6b)',
  'linear-gradient(180deg,#14103a,#3a2d73)',
]
const SUN = [{ x: 18, y: 112, o: 1 }, { x: 62, y: 20, o: 1 }, { x: 104, y: 108, o: 1 }, { x: 104, y: 190, o: 0 }]

const stepped = (t) => Math.floor(t * 26) / 26 // gerak patah-patah ala printer
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const hop = (mv, to, peak = 36, dur = 0.5) => {
  const from = mv.get()
  return animate(mv, [from, Math.max(from, to) + peak, to], { duration: dur, times: [0, 0.5, 1], ease: ['easeOut', 'easeIn'] })
}

/* ---------- barang belanjaan ---------- */
const ICONS = {
  milk: (<><rect x="9" y="8" width="14" height="20" rx="2" fill="#fff" stroke="#8fb4e8" strokeWidth="2" /><path d="M9 8l4-5h6l4 5z" fill="#cfe0fa" stroke="#8fb4e8" strokeWidth="2" strokeLinejoin="round" /><rect x="12" y="15" width="8" height="6" rx="1" fill="#8fb4e8" /></>),
  can: (<><rect x="8" y="7" width="16" height="21" rx="3" fill="#ff8f8f" stroke="#d64f4f" strokeWidth="2" /><rect x="8" y="13" width="16" height="7" fill="#fff" opacity=".9" /><ellipse cx="16" cy="7" rx="8" ry="2.4" fill="#e6e6ee" stroke="#d64f4f" strokeWidth="1.5" /></>),
  bread: (<><path d="M5 16Q5 8 16 8Q27 8 27 16V26H5Z" fill="#f0c27a" stroke="#c98a3a" strokeWidth="2" strokeLinejoin="round" /><path d="M11 13l2 4M17 12l2 4M23 13l-1 3" stroke="#c98a3a" strokeWidth="1.8" strokeLinecap="round" /></>),
  eggs: (<><rect x="4" y="14" width="24" height="12" rx="3" fill="#e5d3b8" stroke="#b79a70" strokeWidth="2" /><ellipse cx="10" cy="12" rx="4" ry="5" fill="#fffaf0" stroke="#d9c9a8" strokeWidth="1.5" /><ellipse cx="22" cy="12" rx="4" ry="5" fill="#fffaf0" stroke="#d9c9a8" strokeWidth="1.5" /></>),
  apple: (<><circle cx="16" cy="18" r="9" fill="#ff6f7f" stroke="#d63f55" strokeWidth="2" /><path d="M16 9V5M16 7q5-3 7 0q-3 3-7 0z" stroke="#4f9a5a" strokeWidth="2" fill="#7fc47a" /></>),
  chips: (<><path d="M7 6H25L24 28H8Z" fill="#ffd966" stroke="#d6a61f" strokeWidth="2" strokeLinejoin="round" /><circle cx="16" cy="16" r="5" fill="#ff8f6b" /></>),
}
const Icon = ({ k, s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" aria-hidden="true">{ICONS[k]}</svg>
)
// seluruh area kerja (karakter + barang + kantong/pemindai) harus muat dalam ±350 satuan supaya terlihat di ponsel
const PACK_ITEMS = [{ k: 'milk', x: 186 }, { k: 'can', x: 213 }, { k: 'bread', x: 240 }, { k: 'eggs', x: 267 }, { k: 'apple', x: 294 }]
const BELT_ITEMS = [{ k: 'milk', x: 702 }, { k: 'bread', x: 727 }, { k: 'apple', x: 752 }, { k: 'can', x: 777 }, { k: 'chips', x: 802 }]
const BAG = { x: 316, y: 388 }
const SLOTS = [[4, 38], [22, 38], [6, 22], [24, 24], [14, 8]]

/* ---------- latar toko ---------- */
const COLORS = ['#ff9db5', '#c9b2ff', '#ffd27a', '#a8e6cf', '#9ec9ff', '#ffb07a']

function Rack({ x, w, y, rows = 4 }) {
  const n = Math.floor(w / 24)
  return (
    <g>
      <rect x={x - 4} y={y - 8} width={w + 8} height={rows * 62 + 12} rx="6" fill="#d8caf0" />
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          {Array.from({ length: n }, (_, c) => {
            const h = 26 + ((c * 7 + r * 3) % 4) * 6
            return <rect key={c} x={x + 4 + c * 24} y={y + r * 62 + 50 - h} width="18" height={h} rx="3" fill={COLORS[(c + r * 2) % 6]} />
          })}
          <rect x={x - 4} y={y + r * 62 + 50} width={w + 8} height="6" fill="#a98ae6" />
        </g>
      ))}
    </g>
  )
}

function Backdrop({ name, labels }) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={WORLD} height={WORLD_H} viewBox={`0 0 ${WORLD} ${WORLD_H}`} aria-hidden="true">
      <defs>
        <linearGradient id="swWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe6fb" />
          <stop offset="1" stopColor="#e2d6f4" />
        </linearGradient>
        <pattern id="swTile" width="56" height="56" patternUnits="userSpaceOnUse">
          <rect width="56" height="56" fill="#f6f1ea" />
          <rect width="28" height="28" fill="#ece5d9" />
          <rect x="28" y="28" width="28" height="28" fill="#ece5d9" />
        </pattern>
      </defs>
      <rect width={WORLD} height="440" fill="url(#swWall)" />
      <rect y="434" width={WORLD} height="10" fill="#cdbfe6" />
      <rect y="444" width={WORLD} height={WORLD_H - 444} fill="url(#swTile)" />
      <rect x="30" y="140" width="300" height="52" rx="10" fill="#7a5cc4" />
      <text x="180" y="176" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="800" fontSize="24" fill="#f5c451">{name}</text>
      <Rack x={372} w={144} y={196} />
      <Rack x={600} w={288} y={168} />
      <path d="M130 262V296M210 262V296" stroke="#6b5a85" strokeWidth="2" />
      <rect x="90" y="296" width="160" height="30" rx="6" fill="#ffd27a" />
      <text x="170" y="317" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="800" fontSize="15" fill="#6b3a1a">{labels.packing.toUpperCase()}</text>
      <rect x="700" y="96" width="120" height="30" rx="6" fill="#ffd27a" />
      <text x="760" y="117" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="800" fontSize="15" fill="#6b3a1a">{labels.kasir.toUpperCase()}</text>
      <rect x="910" y="328" width="180" height="10" rx="4" fill="#cdbfe6" />
    </svg>
  )
}

function ShopWindow({ phase, closed, S }) {
  return (
    <div className="absolute overflow-hidden rounded-t-[10px] border-[8px] border-[#8f78c9]" style={{ left: 920, top: 130, width: 160, height: 190 }}>
      {SKY.map((bg, i) => (
        <motion.div key={i} className="absolute inset-0" style={{ background: bg }} animate={{ opacity: phase === i ? 1 : 0 }} transition={{ duration: 1.6 }} />
      ))}
      <motion.div className="absolute inset-0" animate={{ opacity: phase === 3 ? 1 : 0 }} transition={{ duration: 1.8 }}>
        {[[16, 20], [44, 52], [92, 24], [124, 60], [30, 92], [110, 100], [70, 70]].map(([x, y], i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-white" style={{ left: x, top: y }} />
        ))}
        <svg width="26" height="26" viewBox="20 10 160 160" className="absolute" style={{ left: 104, top: 22 }} aria-hidden="true">
          <path d="M44.5 32.4A80 80 0 1 0 155.5 32.4A62 62 0 1 1 44.5 32.4Z" fill="#fff1c6" />
        </svg>
      </motion.div>
      <motion.div className="absolute left-0 top-0 h-10 w-10 rounded-full" style={{ background: 'radial-gradient(circle,#fff6c9 40%,rgba(255,190,110,0) 72%)' }} animate={{ x: SUN[phase].x, y: SUN[phase].y, opacity: SUN[phase].o }} transition={{ duration: 1.6 }} />
      <span className="absolute inset-y-0 left-1/2 -ml-[2px] w-1 bg-[#8f78c9]" />
      <span className="absolute inset-x-0 top-[58%] h-1 bg-[#8f78c9]" />
      <div className="absolute left-1/2 top-[30px] -translate-x-1/2" style={{ perspective: 300 }}>
        <span className="mx-auto block h-3 w-[2px] bg-[#6b5a85]" />
        <motion.div className="relative h-[34px] w-[84px]" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: closed ? 180 : 0 }} transition={{ type: 'spring', damping: 14, stiffness: 90 }}>
          <div className="absolute inset-0 flex items-center justify-center rounded bg-[#e9fff3] text-sm font-extrabold tracking-wider text-[#2f9f6b] shadow" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>{S.store.open}</div>
          <div className="absolute inset-0 flex items-center justify-center rounded bg-[#ffecec] text-sm font-extrabold tracking-wider text-[#d6455a] shadow" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>{S.store.closed}</div>
        </motion.div>
      </div>
    </div>
  )
}

function Furniture({ moving, laser }) {
  const Slab = ({ left, w }) => (
    <div className="absolute" style={{ left, top: TOP, width: w, height: 60, zIndex: 6 }}>
      <div className="absolute inset-x-0 top-0 h-[9px] rounded-t-md bg-[#f7f2fb] shadow" />
      <div className="absolute inset-x-1 bottom-0 top-[9px] rounded-b-md" style={{ background: 'linear-gradient(180deg,#b9a2e6,#9a7fd8)' }}>
        <span className="absolute inset-x-3 top-3 h-1 rounded bg-white/30" />
      </div>
    </div>
  )
  return (
    <>
      <Slab left={10} w={380} />
      <Slab left={520} w={380} />
      <div className="absolute overflow-hidden rounded-sm" style={{ left: 686, top: TOP - 10, width: 150, height: 10, zIndex: 6 }}>
        <div className="lane h-full w-full" style={{ backgroundImage: 'linear-gradient(90deg,#3d3550 0 24px,#574d6e 24px 48px)', backgroundSize: '48px 100%', animationPlayState: moving ? 'running' : 'paused' }} />
      </div>
      <div className="absolute rounded-md bg-[#3b3550]" style={{ left: 842, top: TOP - 54, width: 36, height: 54, zIndex: 6 }}>
        <span className="absolute inset-x-1 top-1 h-4 rounded-sm bg-[#8fe3c4]" />
        <span className="absolute inset-x-2 top-7 grid grid-cols-3 gap-0.5">
          {Array.from({ length: 6 }, (_, i) => <i key={i} className="h-1.5 rounded-sm bg-[#8a7fa8]" />)}
        </span>
        <span className="absolute bottom-1 left-[-6px] h-4 w-2 rounded-l bg-[#ff4d6d]" style={{ boxShadow: '0 0 8px 2px rgba(255,77,109,.7)' }} />
      </div>
      {laser > 0 && (
        <motion.span key={laser} className="absolute rounded bg-[#ff3b5c]" style={{ left: SCAN_X - 4, top: TOP - 36, width: 3, height: 30, zIndex: 8, boxShadow: '0 0 10px 3px rgba(255,59,92,.8)' }} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.4 }} />
      )}
    </>
  )
}

/* ---------- nota ---------- */
const BARS = Array.from({ length: 44 }, (_, i) => ({ w: 1 + ((i * 7 + 3) % 4), g: 1 + ((i * 5) % 3) }))
const ZIG = 'polygon(0 0,100% 0,' + Array.from({ length: 21 }, (_, i) => `${100 - i * 5}% ${i % 2 ? '96%' : '100%'}`).join(',') + ')'

function NotaCard({ R, onOpen, onEgg }) {
  const Dash = () => <div className="my-1.5 border-t border-dashed border-[#9d96a8]" />
  return (
    <div className="mx-auto w-[210px] overflow-hidden">
      <motion.div initial={{ y: '-100%' }} animate={{ y: '0%' }} transition={{ duration: 2.4, ease: stepped }}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Buka cerita dari nota"
          onClick={onOpen}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
          className="cursor-pointer bg-[#fffdf8] px-3.5 pb-8 pt-3 font-mono text-[11px] leading-snug text-[#2d2638]"
          style={{ clipPath: ZIG }}
        >
          <p className="text-center text-[12px] font-bold tracking-wider">{R.store}</p>
          <p className="text-center">{R.city}</p>
          <Dash />
          <div className="flex justify-between"><span>Tanggal</span><span>{R.date}</span></div>
          <div className="flex justify-between"><span>Bagian</span><span>{R.part}</span></div>
          <Dash />
          {R.items.map(([n, q]) => (
            <div key={n} className="flex justify-between gap-2"><span>{n}</span><span>{q}</span></div>
          ))}
          <Dash />
          <div className="flex justify-between font-bold"><span>TOTAL</span><span>{R.total}</span></div>
          <p className="mt-1.5 text-center text-[10px] italic opacity-80">{R.note}</p>
          <button
            type="button"
            aria-label="Kode batang"
            onClick={(e) => {
              e.stopPropagation()
              onEgg()
            }}
            className="mt-2.5 flex h-9 w-full items-stretch justify-center"
          >
            {BARS.map((b, i) => <span key={i} className="bg-[#2d2638]" style={{ width: b.w, marginRight: b.g }} />)}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- bagian utama ---------- */
export default function Swalayan() {
  const S = SEPTEMBER
  const P = S.packing
  const K = S.kasir
  const T = S.talk
  const { ink: _ink } = useContext(SkyContext) // eslint-disable-line no-unused-vars

  // skala mengikuti lebar di ponsel (±360 satuan terlihat), mengikuti tinggi di layar lebar
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
  const cx = useMotionValue(430)
  const kx = useMotionValue(430 + KX)
  const tx = useMotionValue(430 + TX)
  const ky = useMotionValue(0)
  const ty = useMotionValue(0)
  const kyN = useTransform(ky, (v) => -v)
  const tyN = useTransform(ty, (v) => -v)
  const kr = useMotionValue(0)
  const tr = useMotionValue(0)
  // kamera
  const camT = useMotionValue(0)
  const cam = useSpring(camT, { stiffness: 70, damping: 20 })
  const worldX = useTransform(cam, (v) => -v)
  const follow = useRef(true)
  const started = useRef(false)
  const tourRef = useRef(false)
  useMotionValueEvent(cx, 'change', (v) => {
    if (follow.current) camT.set(camAt(v))
  })
  useEffect(() => {
    if (!follow.current) return
    const v = camAt(cx.get())
    camT.set(v)
    if (!started.current) cam.jump(v)
  }, [VW])

  const busyRef = useRef(false)
  const fxId = useRef(0)
  const packedRef = useRef([])
  const scanRef = useRef(0)

  const [active, setActive] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState('idle')
  const [walking, setWalking] = useState(false)
  const [laugh, setLaugh] = useState(false)
  const [done, setDone] = useState([])
  const [shown, setShown] = useState(null)
  const [fx, setFx] = useState([])
  const [night, setNight] = useState(false)
  const [packOn, setPackOn] = useState(false)
  const [packed, setPacked] = useState([])
  const [beltOn, setBeltOn] = useState(false)
  const [belt, setBelt] = useState(BELT_ITEMS.map(() => false))
  const [laser, setLaser] = useState(0)
  const [egg, setEgg] = useState('')
  const [story, setStory] = useState(false)
  const [talk, setTalk] = useState(null)
  const [typed, setTyped] = useState(0)
  const [paperGone, setPaperGone] = useState(false)
  const [chat, setChat] = useState(false)
  const [kFace, setKFace] = useState(null)
  const [tFace, setTFace] = useState(null)
  const pokeRef = useRef({ k: 0, t: 0, busy: false, total: 0 })
  const phase = night ? 3 : Math.min(2, done.length)
  const markDone = (id) => setDone((d) => (d.includes(id) ? d : [...d, id]))
  const release = () => {
    busyRef.current = false
    setBusy(false)
    setMode('idle')
    follow.current = true
    camT.set(camAt(cx.get()))
  }
  const addFx = (type, x, y, text = '') => {
    const id = fxId.current++
    setFx((f) => [...f, { id, type, x, y, text }])
    setTimeout(() => setFx((f) => f.filter((v) => v.id !== id)), 1600)
  }

  /* ----- gerak dasar ----- */
  const walkTo = async (to, speed = 120) => {
    const dur = Math.max(0.35, Math.abs(to - cx.get()) / speed)
    setWalking(true)
    await Promise.all([
      animate(cx, to, { duration: dur, ease: 'easeInOut' }),
      animate(kx, to + KX, { duration: dur, ease: 'easeInOut' }),
      animate(tx, to + TX, { duration: dur, ease: 'easeInOut' }),
    ])
    setWalking(false)
  }

  // kamera menyapu toko supaya Kyla tahu ada apa saja
  const tour = async () => {
    tourRef.current = true
    follow.current = false
    camT.set(0)
    await wait(1100)
    if (!tourRef.current) return
    camT.set(Math.max(0, WORLD - vwRef.current))
    await wait(1500)
    if (!tourRef.current) return
    follow.current = true
    camT.set(camAt(cx.get()))
    tourRef.current = false
  }
  // arahkan kamera ke tengah area kerja supaya barang dan kantong atau pemindai terlihat di ponsel
  const focusCam = (c) => {
    follow.current = false
    camT.set(camAt(c))
  }

  // colek koala atau kucing: reaksi kecil bergantian
  const poke = async (who) => {
    const p = pokeRef.current
    if (!active || busyRef.current || p.busy) return
    p.busy = true
    p.total += 1
    const koala = who === 'koala'
    const i = koala ? p.k++ % 4 : p.t++ % 4
    const x = (koala ? kx.get() : tx.get()) + HALF
    const y = koala ? ky : ty
    const rot = koala ? kr : tr
    const setFace = koala ? setKFace : setTFace
    navigator.vibrate?.(10)
    if (p.total % 8 === 0) {
      // kejutan: keduanya melompat bersama
      setKFace('laugh')
      setTFace('laugh')
      addFx('word', cx.get(), GROUND - 140, 'Gemes!')
      addFx('heart', kx.get() + HALF, GROUND - 100)
      addFx('heart', tx.get() + HALF, GROUND - 100)
      await Promise.all([hop(ky, 0, 54, 0.55), hop(ty, 0, 54, 0.55)])
      await Promise.all([hop(ky, 0, 34, 0.45), hop(ty, 0, 34, 0.45)])
      setKFace(null)
      setTFace(null)
    } else if (i === 0) {
      setFace('laugh')
      addFx('word', x, GROUND - 130, koala ? 'hihi' : 'hehe')
      await hop(y, 0, 46, 0.5)
      await hop(y, 0, 28, 0.4)
      setFace(null)
    } else if (i === 1) {
      if (koala) {
        setKFace('sleep')
        addFx('word', x, GROUND - 130, 'hoaam...')
        await wait(1200)
        setKFace(null)
      } else {
        setTFace('laugh')
        addFx('word', x, GROUND - 130, 'meong~')
        await hop(ty, 0, 22, 0.4)
        await wait(600)
        setTFace(null)
      }
    } else if (i === 2) {
      setFace('laugh')
      await Promise.all([animate(rot, 360, { duration: 0.7, ease: 'easeInOut' }), hop(y, 0, 52, 0.7)])
      rot.set(0)
      setFace(null)
    } else {
      addFx('heart', x - 12, GROUND - 110)
      addFx('heart', x + 12, GROUND - 124)
      setFace('laugh')
      await wait(900)
      setFace(null)
    }
    p.busy = false
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
    tour()
  }

  /* ----- MEJA PACKING ----- */
  const doPacking = async () => {
    setShown(null)
    setMode('packing')
    packedRef.current = []
    setPacked([])
     await walkTo(PACK_CX, 120)
    focusCam(PACK_ZONE)
    setPackOn(true)
  }
  const finishPacking = async () => {
    setPackOn(false)
    await wait(900)
    addFx('word', BAG.x + 23, BAG.y - 14, P.done)
    addFx('heart', BAG.x + 23, BAG.y - 30)
    setLaugh(true)
    await Promise.all([hop(ky, 0, 34, 0.5), hop(ty, 0, 34, 0.5)])
    setLaugh(false)
    markDone('packing')
    setShown('pack')
    release()
  }
  const putItem = (key, x) => {
    if (!packOn) return
    const p = packedRef.current
    if (p.includes(key)) return
    if ((key === 'bread' || key === 'eggs') && !(p.includes('milk') && p.includes('can'))) {
      addFx('word', x, TOP - 62, P.heavy)
      navigator.vibrate?.(30)
      return
    }
    packedRef.current = [...p, key]
    setPacked(packedRef.current)
    navigator.vibrate?.(10)
    if (packedRef.current.length >= PACK_ITEMS.length) finishPacking()
  }

  /* ----- KASIR ----- */
  const doKasir = async () => {
    setShown(null)
    setMode('kasir')
    setEgg('')
    scanRef.current = 0
    setBelt(BELT_ITEMS.map(() => false))
      await walkTo(CASH_CX, 120)
    focusCam(CASH_ZONE)
    setBeltOn(true)
  }
  const finishKasir = async () => {
    setBeltOn(false)
    await wait(900)
    addFx('word', SCAN_X - 20, TOP - 74, K.done)
    setLaugh(true)
    await wait(500)
    setLaugh(false)
    markDone('kasir')
    setShown('kasir')
    release()
  }
  const scan = (i) => {
    if (!beltOn || belt[i]) return
    setBelt((b) => b.map((g, j) => (j === i ? true : g)))
    setLaser((l) => l + 1)
    navigator.vibrate?.(12)
    addFx('word', BELT_ITEMS[i].x, TOP - 52, K.beep[i % K.beep.length])
    scanRef.current += 1
    if (scanRef.current >= BELT_ITEMS.length) finishKasir()
  }

  /* ----- NGOBROL DAN TUKAR KONTAK ----- */
  const doTalk = async () => {
    setShown(null)
    setMode('talk')
    setTyped(0)
    setPaperGone(false)
    await walkTo(CASH_CX, 110)
    setTalk({ step: 'say', i: 0 })
  }
  const nextLine = () => setTalk((t) => (t.i + 1 < T.lines.length ? { step: 'say', i: t.i + 1 } : { step: 'write' }))
  useEffect(() => {
    if (talk?.step !== 'write') return undefined
    const id = setInterval(() => setTyped((n) => Math.min(T.number.length, n + 1)), 110)
    return () => clearInterval(id)
  }, [talk?.step])
  useEffect(() => {
    if (talk?.step !== 'write' || typed < T.number.length) return undefined
    const t = setTimeout(() => setTalk({ step: 'give' }), 600)
    return () => clearTimeout(t)
  }, [typed, talk])
  const givePaper = async () => {
    setTalk({ step: 'given' })
    setPaperGone(true)
    navigator.vibrate?.(30)
    setLaugh(true)
    addFx('heart', tx.get() + HALF, GROUND - 110)
    addFx('heart', kx.get() + HALF, GROUND - 110)
    await wait(1500)
    setLaugh(false)
    setNight(true) // toko menutup: langit malam dan papan TUTUP
    follow.current = false
    camT.set(Math.max(0, WORLD - vwRef.current))
    await wait(2800)
    setTalk({ step: 'night' })
  }
  const openChat = () => {
    setChat(true)
    setVolume(0.3, 1200)
  }
  const closeChat = () => {
    setChat(false)
    setVolume(0.85, 1500)
    setTalk(null)
    follow.current = true
    camT.set(camAt(cx.get()))
    markDone('talk')
    setShown('talk')
    release()
  }

  const start = (id) => {
    if (!active || busyRef.current) return
    if (id === 'talk') {
      if (done.includes('talk')) {
        setShown('talk')
        return
      }
      if (!(done.includes('kasir') && done.includes('packing'))) {
        addFx('word', CASH_CX + HALF, 320, S.store.locked)
        return
      }
    }
    tourRef.current = false
    busyRef.current = true
    setBusy(true)
    follow.current = true
    if (id === 'packing') doPacking()
    else if (id === 'kasir') doKasir()
    else doTalk()
  }

  /* ----- teks bantuan dan tombol aksi ----- */
  const step = talk?.step
  let hint = ''
  if (!active) hint = S.store.start
  else if (mode === 'idle') hint = done.length >= 3 ? S.store.done : S.store.pick
  else if (mode === 'packing') hint = packOn ? P.hint : ''
  else if (mode === 'kasir') hint = beltOn ? K.hint : ''
  else if (mode === 'talk') hint = step === 'write' ? T.writing : step === 'give' ? T.giveHint : step === 'night' ? T.nightHint : ''
  const action =
    step === 'say' ? [T.next, nextLine] : step === 'give' ? [T.give, givePaper] : step === 'night' ? [T.chatBtn, openChat] : null

  const spots = [['packing', 190, 352], ['kasir', 760, 352], ['talk', CASH_CX, 322]]
  const unlocked = done.includes('kasir') && done.includes('packing')
  const gait = walking ? 'walk' : 'idle'
  const mood = laugh ? 'laugh' : 'happy'
  const bob = walking ? { y: [0, -4, 0] } : { y: 0 }
  const bobT = walking ? { duration: 0.6, repeat: Infinity } : { duration: 0.2 }
  const showTitle = !shown && mode === 'idle'
  const line = step === 'say' ? T.lines[talk.i] : null
  const showPack = mode === 'packing' || done.includes('packing')

  const Bubble = ({ text }) => (
    <motion.div
      key={text}
      className="pointer-events-none absolute bottom-full left-1/2 mb-1 w-[150px] -translate-x-1/2 rounded-2xl bg-white px-2.5 py-1.5 text-center text-[11px] font-semibold leading-snug text-[#3b2a63] shadow-lg"
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      {text}
    </motion.div>
  )

  return (
    <>
      <section className="relative" style={{ minHeight: `${H['sept-toko']}svh` }}>
        <div ref={wrap} className="relative w-full" style={{ height: '100svh' }}>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: '#efe6fb',
              borderTopLeftRadius: '50% 52px',
              borderTopRightRadius: '50% 52px',
              borderBottomLeftRadius: '50% 64px',
              borderBottomRightRadius: '50% 64px',
              boxShadow: '0 -10px 30px -12px rgba(239,230,251,.7), 0 22px 34px -12px rgba(0,0,0,.28)',
            }}
          >
            <div className="absolute left-0 top-0 overflow-hidden" style={{ width: VW, height: VH, transform: `scale(${k})`, transformOrigin: '0 0', background: '#efe6fb' }}>
              <div className="absolute left-0" style={{ top: VH - WORLD_H, width: VW, height: WORLD_H }}>
                <motion.div className="absolute left-0 top-0" style={{ width: WORLD, height: WORLD_H, x: worldX, willChange: 'transform' }}>
                  <Backdrop name={S.store.name} labels={S.store.chips} />
                  <ShopWindow phase={phase} closed={night} S={S} />

                  {/* bayangan */}
                  <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 5, width: 52, height: 9, x: kx, marginLeft: 10, zIndex: 4 }} />
                  <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 5, width: 52, height: 9, x: tx, marginLeft: -1, zIndex: 4 }} />

                  {/* sorotan sebelum diaktifkan */}
                  {!active && (
                    <motion.div className="pointer-events-none absolute rounded-full bg-white/60" style={{ left: 430 - 100, top: GROUND - 110, width: 200, height: 124, zIndex: 4 }} animate={{ scale: [1, 1.12, 1], opacity: [0.9, 0.35, 0.9] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  )}

                  {/* koala dan kucing */}
                                    <motion.div className="absolute" style={{ left: 0, top: GROUND - BH, x: kx, y: kyN, rotate: kr, transformOrigin: '50% 80%', zIndex: 5, cursor: 'pointer' }} onClick={() => (active ? poke('koala') : activate())} role="button" tabIndex={0} aria-label="Ketuk koala">
                    <motion.div animate={bob} transition={bobT}>
                      <KoalaBody size={BW} mood={kFace || mood} gait={gait} wave={!walking && !kFace} />
                    </motion.div>
                    {line && line.who === 'kyla' && <Bubble text={line.text} />}
                  </motion.div>
                  <motion.div className="absolute" style={{ left: 0, top: GROUND - BH, x: tx, y: tyN, rotate: tr, transformOrigin: '50% 80%', zIndex: 5, cursor: 'pointer' }} onClick={() => (active ? poke('cat') : activate())} role="button" tabIndex={0} aria-label="Ketuk kucing">
                    <motion.div animate={bob} transition={bobT}>
                      <CatBody size={BW} mood={tFace || mood} gait={gait} wave={!walking && !tFace} />
                    </motion.div>
                    {line && line.who === 'frend' && <Bubble text={line.text} />}
                  </motion.div>

                  {/* meja, kasir, ban berjalan (di depan karakter, jadi mereka berdiri di baliknya) */}
                  <Furniture moving={mode === 'kasir' && beltOn} laser={laser} />

                  {/* barang di meja packing dan kantongnya */}
                  {showPack && (
                    <>
                      {PACK_ITEMS.map((it) =>
                        packed.includes(it.k) ? null : (
                          <motion.button key={it.k} type="button" onClick={() => putItem(it.k, it.x)} disabled={!packOn} aria-label={`Masukkan ${it.k}`} className="absolute flex items-center justify-center" style={{ left: it.x - 13, top: TOP - 30, width: 26, height: 28, zIndex: 7 }} animate={packOn ? { y: [0, -3, 0] } : { y: 0 }} transition={packOn ? { duration: 1.4, repeat: Infinity, delay: (it.x % 5) * 0.12 } : undefined}>
                            <Icon k={it.k} s={24} />
                          </motion.button>
                        ),
                      )}
                      <div className="pointer-events-none absolute" style={{ left: BAG.x, top: BAG.y, width: 46, height: 64, zIndex: 7 }}>
                        <svg width="46" height="64" viewBox="0 0 46 64" className="absolute inset-0" aria-hidden="true">
                          <path d="M13 12Q13 2 23 2Q33 2 33 12" fill="none" stroke="#b88a4a" strokeWidth="2.5" />
                          <path d="M4 12H42L45 64H1Z" fill="#d9b27a" stroke="#b88a4a" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        {packed.map((key, n) => {
                          const it = PACK_ITEMS.find((p) => p.k === key)
                          const sl = SLOTS[n]
                          const dx = it.x - (BAG.x + sl[0] + 12)
                          const dy = TOP - 16 - (BAG.y + sl[1] + 12)
                          return (
                            <motion.div key={key} className="absolute" style={{ left: sl[0], top: sl[1] }} initial={{ x: dx, y: dy }} animate={{ x: 0, y: [dy, Math.min(dy, 0) - 46, 0] }} transition={{ duration: 0.65, ease: 'easeInOut', times: [0, 0.5, 1] }}>
                              <Icon k={key} s={24} />
                            </motion.div>
                          )
                        })}
                        <svg width="46" height="64" viewBox="0 0 46 64" className="absolute inset-0" aria-hidden="true">
                          <path d="M2 40H44L45 64H1Z" fill="#e6c48f" stroke="#b88a4a" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </>
                  )}

                  {/* barang di ban berjalan */}
                  {mode === 'kasir' &&
                    BELT_ITEMS.map((it, i) => (
                      <motion.button key={i} type="button" onClick={() => scan(i)} disabled={!beltOn || belt[i]} aria-label={`Pindai ${it.k}`} className="absolute flex items-center justify-center" style={{ left: it.x - 12, top: TOP - 38, width: 24, height: 28, zIndex: 7 }} animate={belt[i] ? { x: SCAN_X - it.x, y: -6, opacity: 0, scale: 0.5 } : { x: 0, y: beltOn ? [0, -3, 0] : 0, opacity: 1, scale: 1 }} transition={belt[i] ? { duration: 0.35, ease: 'easeIn' } : beltOn ? { duration: 1.4, repeat: Infinity, delay: i * 0.12 } : undefined}>
                        <Icon k={it.k} s={24} />
                      </motion.button>
                    ))}

                  {/* kertas nomor WA */}
                  {(step === 'write' || step === 'give' || step === 'given') && (
                    <motion.div
                      className="pointer-events-none absolute flex flex-col items-center justify-center rounded bg-[#fffdf8] px-2 shadow-xl"
                      style={{ left: CASH_CX - 62, top: 296, width: 124, height: 70, zIndex: 8, rotate: -3 }}
                      initial={{ opacity: 0, y: 14, scale: 0.9 }}
                      animate={paperGone ? { opacity: 0, x: 38, y: 36, scale: 0.3, rotate: 14 } : { opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: paperGone ? 0.9 : 0.5 }}
                    >
                      <span className="absolute inset-x-2 top-5 border-t border-[#d9d2e6]" />
                      <span className="absolute inset-x-2 top-[38px] border-t border-[#d9d2e6]" />
                      <span className={`relative text-[22px] leading-none text-[#2d2638] ${SCRIPT}`}>
                        {T.number.slice(0, typed)}
                        {step === 'write' && <span className="blink ml-px inline-block h-4 w-px bg-[#2d2638] align-middle" />}
                      </span>
                    </motion.div>
                  )}

                  {/* petunjuk tempat */}
                  {active && mode === 'idle' && !busy &&
                    spots.map(([id, x, y]) => {
                      const lock = id === 'talk' && !unlocked && !done.includes('talk')
                      return (
                        <div key={id} className="absolute" style={{ left: x - 48, top: y, width: 96, zIndex: 8 }}>
                          <motion.button type="button" onClick={() => start(id)} aria-label={S.store.chips[id]} className="flex w-full flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                            <span className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-lg ${done.includes(id) ? 'bg-[#a8e6cf] text-[#1f5a45]' : lock ? 'bg-white/70 text-[#5a2d4a]/60' : 'bg-white text-[#5a2d4a]'}`}>
                              {done.includes(id) ? '✓ ' : lock ? '🔒 ' : ''}{S.store.chips[id]}
                            </span>
                            <span className="mt-0.5 h-3 w-3 rotate-45 bg-white shadow" />
                          </motion.button>
                        </div>
                      )
                    })}

                  {fx.map((f) =>
                    f.type === 'heart' ? (
                      <motion.svg key={f.id} width="20" height="20" viewBox="0 0 40 40" className="pointer-events-none absolute" style={{ left: f.x - 10, top: f.y, zIndex: 9 }} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -60, scale: 1.2 }} transition={{ duration: 1.3 }} aria-hidden="true">
                        <path d={HEART} fill="#ff6f9c" />
                      </motion.svg>
                    ) : (
                      <motion.span key={f.id} className="pointer-events-none absolute -ml-16 w-32 text-center text-sm font-extrabold text-[#5a2d4a]" style={{ left: f.x, top: f.y, zIndex: 9, textShadow: '0 0 6px #fff, 0 0 10px #fff' }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -50 }} transition={{ duration: 1.5 }}>
                        {f.text}
                      </motion.span>
                    ),
                  )}
                </motion.div>
              </div>
            </div>

            {/* lampu langit-langit, redup saat malam */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[30px]" style={{ background: 'linear-gradient(#d9cdee,#e6dcf5)' }}>
              {[8, 28, 48, 68, 88].map((l) => (
                <span key={l} className="absolute top-2 h-2.5 w-[14%] -translate-x-1/2 rounded-full bg-white" style={{ left: `${l}%`, boxShadow: '0 6px 22px 6px rgba(255,248,225,.75)' }} />
              ))}
            </div>
            <motion.div className="pointer-events-none absolute inset-0 z-[3]" style={{ background: '#1a1040' }} animate={{ opacity: TINT[phase] }} transition={{ duration: 1.8 }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px]" style={{ background: 'linear-gradient(to top, rgba(110,80,160,.32), rgba(110,80,160,0))' }} />
          </div>

          {/* UI ukuran asli layar (tidak ikut di-zoom) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center px-4 pt-7">
            <motion.div initial={false} animate={{ opacity: showTitle ? 1 : 0, height: showTitle ? 'auto' : 0 }} transition={{ duration: 0.4 }} className="overflow-hidden px-2 pt-1 text-center" style={{ textShadow: '0 1px 12px rgba(255,255,255,.9)' }}>
              <h2 className="font-display text-[clamp(2.2rem,10vw,3.2rem)] font-extrabold leading-none text-[#3b2a63]">{S.title}</h2>
              <p className={`mt-1 text-2xl text-[#6a4cb4] ${SCRIPT}`}>{S.subtitle}</p>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#6a4cb4]">{S.store.name}</p>
            </motion.div>

            {hint && <p className="mt-2 max-w-[340px] rounded-full bg-white/90 px-3.5 py-1.5 text-center text-xs font-bold text-[#5a2d4a] shadow">{hint}</p>}

            <AnimatePresence>
              {shown && (
                <motion.div key={shown} className="pointer-events-auto relative mt-3 w-full max-w-[380px] rounded-2xl bg-white/95 p-3 pr-8 text-[#3b2a63] shadow-xl" initial={{ opacity: 0, y: -14, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 220 }}>
                  {shown === 'kasir' ? (
                    <>
                      <NotaCard R={K.receipt} onOpen={() => setStory(true)} onEgg={() => setEgg(K.receipt.egg)} />
                      <p className="mt-2 text-center text-xs font-semibold">{egg || K.receipt.hint}</p>
                    </>
                  ) : (
                    <p className="text-center text-xs leading-relaxed">{shown === 'pack' ? P.story : T.story}</p>
                  )}
                  <button type="button" onClick={() => setShown(null)} aria-label="Tutup" className="absolute right-1 top-1 h-8 w-8 text-xl leading-none text-[#3b2a63]/60">×</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* tombol bawah: tersusun vertikal, di bawah kaki karakter */}
          <div className="pointer-events-none absolute inset-x-0 bottom-9 z-30 flex flex-col items-center gap-2 px-3">
            <AnimatePresence>
              {action && (
                <motion.button key={step} type="button" onClick={action[1]} className="pointer-events-auto h-11 min-w-[160px] rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] px-6 font-semibold text-white shadow-lg" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {action[0]}
                </motion.button>
              )}
            </AnimatePresence>
            <div className="pointer-events-auto flex flex-wrap justify-center gap-1.5">
              {['packing', 'kasir', 'talk'].map((id) => {
                const lock = id === 'talk' && !unlocked && !done.includes('talk')
                return (
                  <button key={id} type="button" disabled={!active || busy} onClick={() => start(id)} className={`rounded-full px-3 py-1.5 text-[11px] font-bold shadow transition-opacity ${active && !busy ? 'bg-white/95 text-[#5a2d4a]' : 'bg-white/55 text-[#5a2d4a]/60'} ${lock ? 'opacity-70' : ''}`}>
                    {done.includes(id) ? '✓ ' : lock ? '🔒 ' : ''}{S.store.chips[id]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <StoryDialog open={story} onClose={() => setStory(false)} title={K.story.title} paragraphs={K.story.paragraphs} />
      <ChatOverlay open={chat} onClose={closeChat} chat={S.chat} />
    </>
  )
}

export function SwalayanClosing() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex items-center justify-center px-6 text-center" style={{ minHeight: `${H['sept-penutup']}svh` }}>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.2 }} style={{ color: ink }} className={`max-w-[300px] text-[1.9rem] leading-snug ${SCRIPT}`}>
        {SEPTEMBER.closing}
      </motion.p>
    </section>
  )
}