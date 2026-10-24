import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { JANUARY } from '../data/january.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'
import PhotoFrame from './Photo.jsx'

const PER = 3 // foto per strip
const EASE = [0.22, 1, 0.36, 1]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/* ---------- hiasan strip ---------- */
const Sparkle = ({ s, fill = '#d3d8ee', stroke = '#aab1d4' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z" fill={fill} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
  </svg>
)

const Pin = () => (
  <svg width="38" height="44" viewBox="0 0 38 44" aria-hidden="true" style={{ transform: 'rotate(32deg)' }}>
    <rect x="9" y="2" width="20" height="14" rx="5" fill="#eab6c6" />
    <rect x="5" y="14" width="28" height="7" rx="3.5" fill="#f1c8d4" />
    <path d="M13 21h12l-3 8h-6z" fill="#e1a4b7" />
    <path d="M19 29v13" stroke="#b9b3c4" strokeWidth="2" strokeLinecap="round" />
    <rect x="12" y="5" width="5" height="8" rx="2.5" fill="#fff" opacity=".5" />
  </svg>
)

const FlowerBtn = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
    <g fill="#f4c6d0">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx="23" cy="9" r="8" transform={`rotate(${a} 23 23)`} />
      ))}
    </g>
    <circle cx="23" cy="23" r="12" fill="#f4c6d0" />
    <circle cx="23" cy="23" r="8" fill="#e58a9a" />
    <circle cx="20" cy="20" r="2.4" fill="#fff" opacity=".6" />
  </svg>
)

function Strip({ photos, title, slogan }) {
  return (
    <div
      className="relative mx-auto w-[200px] overflow-hidden pb-6 pt-3 shadow-2xl"
      style={{ background: 'conic-gradient(#f2dfe7 25%, #ffffff 0 50%, #f2dfe7 0 75%, #ffffff 0) 0 0 / 50px 50px' }}
    >
      <span className="absolute inset-y-0 left-1 border-l-2 border-dotted border-[#cdbfd0]" aria-hidden="true" />
      <p
        className="text-center font-['Fredoka',sans-serif] text-[2rem] font-semibold leading-none tracking-wide text-[#c48ba5]"
        style={{ textShadow: '0 2px 0 #f7e4ec, 0 0 8px rgba(255,255,255,.9)' }}
      >
        {title}
      </p>
      <div className="mt-3 flex flex-col items-center gap-[14px]">
        {photos.map((p, i) => (
          <PhotoFrame
            key={p.src}
            photo={p}
            label={`foto photobooth ${i + 1}`}
            frameClass="block w-[156px] overflow-hidden !bg-transparent shadow-md"
            imgClass="aspect-square w-full"
            style={{ borderRadius: '50%' }}
          />
        ))}
      </div>

      {/* hiasan: tidak menghalangi ketukan */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        <span className="absolute right-2 top-1"><Sparkle s={14} fill="#c898ae" stroke="#a87590" /></span>
        <span className="absolute right-6 top-4"><Sparkle s={10} fill="#c898ae" stroke="#a87590" /></span>
        <span className="absolute left-1 top-[214px]"><Sparkle s={22} /></span>
        <span className="absolute left-5 top-[236px]"><Sparkle s={16} /></span>
        <span className="absolute left-0 top-[250px]"><Sparkle s={18} /></span>
        <p className="absolute right-2 top-[204px] whitespace-pre-line text-right font-['Dancing_Script',cursive] text-[16px] font-semibold leading-[1.05] text-[#b07c97]">
          {slogan}
        </p>
        <span className="absolute right-0 top-[372px]"><Pin /></span>
        <span className="absolute bottom-3 left-2"><FlowerBtn /></span>
      </div>
    </div>
  )
}

/* ---------- bilik photobooth ---------- */
export default function Photobooth({ data, Skin }) {
  const B = data || JANUARY.booth
  const { ink } = useContext(SkyContext)
  const rounds = Math.max(1, Math.floor(B.photos.length / PER))
  const [phase, setPhase] = useState('idle') // idle | shooting | done
  const [round, setRound] = useState(0) // strip mana yang sedang ditampilkan
  const [run, setRun] = useState(0) // putaran ke berapa
  const [count, setCount] = useState(0)
  const [flash, setFlash] = useState(0)
  const busy = useRef(false)
  const shots = useRef(0)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  const shooting = phase === 'shooting'
  const done = phase === 'done'
  const set = B.photos.slice(round * PER, round * PER + PER)

  const shoot = async () => {
    if (busy.current) return
    busy.current = true
    setRun((r) => r + 1)
    setCount(0)
    setFlash(0)
    setPhase('shooting')
    await wait(900)
    if (!alive.current) return
    setRound(shots.current % rounds) // foto berbeda di tiap putaran, frame tetap sama
    shots.current += 1
    for (let n = 3; n >= 1; n--) {
      setCount(n)
      await wait(700)
      if (!alive.current) return
    }
    setCount(0)
    for (let k = 0; k < PER; k++) {
      setFlash((f) => f + 1)
      navigator.vibrate?.(20)
      await wait(650)
      if (!alive.current) return
    }
    await wait(300)
    busy.current = false
    setPhase('done')
  }

  const retake = async () => {
    if (busy.current) return
    setPhase('idle') // strip masuk lagi ke slot
    await wait(650)
    if (alive.current) shoot()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[250px]">
        <div className="rounded-t-2xl bg-[#ff8fb1] py-1.5 text-center text-sm font-bold leading-6 tracking-[0.2em] text-white">PHOTOBOOTH</div>
        <div className="relative h-[270px] overflow-hidden border-x-[10px] border-[#6a4cb4] bg-[#2a1f45]">
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            <Koala size={64} />
            <Cat size={64} />
          </div>
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-b from-[#c9a2d8] to-[#8a62b0]"
            animate={{ width: shooting ? '50%' : '22%' }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-b from-[#c9a2d8] to-[#8a62b0]"
            animate={{ width: shooting ? '50%' : '22%' }}
            transition={{ duration: 0.7 }}
          />
          {count > 0 && (
            <motion.span
              key={`${run}-${count}`}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center font-display text-8xl font-extrabold text-white"
            >
              {count}
            </motion.span>
          )}
          {flash > 0 && (
            <motion.div
              key={`${run}-${flash}`}
              className="pointer-events-none absolute inset-0 z-30 bg-white"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
        <div className="h-3 rounded-b-md bg-[#6a4cb4]" />
      </div>

      <div className="mt-3 h-2.5 w-[200px] rounded-full bg-[#150e2e]" />

      {/* strip: tingginya 0 sampai foto jadi, lalu meluncur keluar dari slot */}
      <motion.div
        className="w-[210px] overflow-hidden"
        initial={false}
        animate={{ height: done ? 'auto' : 0 }}
        transition={{ duration: done ? 2.4 : 0.5, ease: EASE }}
      >
        <motion.div
          initial={false}
          animate={{ y: done ? '0%' : '-100%' }}
          transition={{ duration: done ? 2.4 : 0.5, ease: EASE }}
        >
                 {Skin ? <Skin key={run} photos={set} B={B} /> : <Strip photos={set} title={B.stripTitle} slogan={B.slogan} />}
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-5 flex flex-col items-center px-6 text-center">
        {done && (
          <>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} style={{ color: ink }} className="max-w-[290px] leading-relaxed">
              {B.story}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} style={{ color: ink }} className="mt-2 text-xs opacity-80">
              {B.zoomHint}
              {rounds > 1 && ` · Strip ${round + 1} dari ${rounds}`}
            </motion.p>
          </>
        )}
        <button
          type="button"
          onClick={done ? retake : shoot}
          disabled={shooting}
          className="mt-4 h-14 w-48 rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] text-lg font-semibold text-white shadow-[0_0_24px_rgba(178,132,255,.45)] disabled:opacity-50"
        >
          {run > 0 ? B.again : B.button}
        </button>
        {!done && <motion.p style={{ color: ink }} className="mt-3 text-sm">{B.hint}</motion.p>}
      </div>
    </div>
  )
}