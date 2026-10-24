import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import MediaFrame from './Media.jsx'
import { Img } from './Photo.jsx'

const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const POS = [
  { left: 8, top: 4, r: -5 },
  { left: 188, top: 20, r: 4 },
  { left: 98, top: 150, r: -1.5 },
]

function Scene() {
  return (
    <svg viewBox="0 0 320 310" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="slgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fcdf2" />
          <stop offset="1" stopColor="#e8f3fb" />
        </linearGradient>
      </defs>
      <rect width="320" height="310" fill="url(#slgSky)" />
      <ellipse cx="58" cy="50" rx="38" ry="11" fill="#fff" opacity=".8" />
      <ellipse cx="272" cy="82" rx="30" ry="9" fill="#fff" opacity=".7" />
      <rect x="58" y="40" width="204" height="14" fill="#8a7035" />
      <rect x="76" y="54" width="168" height="40" fill="#9a7f3d" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={86 + i * 13.2} y="62" width="7" height="14" fill="#5d4a22" />
      ))}
      <rect x="46" y="94" width="228" height="16" fill="#aa8e48" />
      <rect x="58" y="110" width="204" height="26" fill="#9a7f3d" />
      <rect x="66" y="136" width="64" height="108" fill="#8d7338" />
      <rect x="190" y="136" width="64" height="108" fill="#8d7338" />
      <rect x="76" y="148" width="44" height="34" fill="#efe4cc" />
      <rect x="200" y="148" width="44" height="34" fill="#efe4cc" />
      <path d="M130 244V178Q160 140 190 178V244Z" fill="#f2e8d0" />
      <path d="M142 244V184Q160 160 178 184V244Z" fill="#cfe6f5" />
      <rect x="60" y="238" width="76" height="8" fill="#5f4d28" />
      <rect x="184" y="238" width="76" height="8" fill="#5f4d28" />
      <polygon points="0,244 320,244 320,310 0,310" fill="#dcdce2" />
      <path d="M160 244L30 310M160 244L95 310M160 244V310M160 244L225 310M160 244L290 310M0 262H320M0 282H320M0 304H320" stroke="#b9b9c6" strokeWidth="2" fill="none" />
      {[16, 300].map((x) => (
        <g key={x}>
          <rect x={x} y="208" width="4" height="36" fill="#6b4a34" />
          <ellipse cx={x + 2} cy="206" rx="20" ry="9" fill="#4f8f4a" />
          <ellipse cx={x + 2} cy="214" rx="14" ry="7" fill="#5fa05a" />
        </g>
      ))}
    </svg>
  )
}

export default function Slg({ D, onAgain }) {
  const N = D.photos.length
  const [phase, setPhase] = useState('shoot') // shoot | sheet | fav
  const [shots, setShots] = useState(0)
  const [flash, setFlash] = useState(0)
  const [dev, setDev] = useState(null)
  const [favs, setFavs] = useState([])
  const cool = useRef(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const shoot = () => {
    if (cool.current || shots >= N) return
    cool.current = true
    later(() => {
      cool.current = false
    }, 420)
    const i = shots
    setShots(i + 1)
    setFlash((f) => f + 1)
    setDev(i)
    navigator.vibrate?.(18)
    later(() => setDev((d) => (d === i ? null : d)), 1500)
    if (i + 1 >= N) later(() => setPhase('sheet'), 2000)
  }

  const toggle = (i) => setFavs((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f.slice(-2), i]))

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#ffe4cf] via-[#f3d5ee] to-[#d9c8f5] text-[#3b2a63]">
      {phase === 'shoot' && (
        <div className="absolute inset-0 px-4 pt-4">
          <div className="relative h-[310px] overflow-hidden rounded-2xl border-4 border-[#3b2a63] bg-[#9fcdf2] shadow-xl">
            <Scene />
            <span className="pointer-events-none absolute left-3 top-3 z-10 h-5 w-5 border-l-2 border-t-2 border-white/90" />
            <span className="pointer-events-none absolute right-3 top-3 z-10 h-5 w-5 border-r-2 border-t-2 border-white/90" />
            <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-5 w-5 border-b-2 border-l-2 border-white/90" />
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-5 w-5 border-b-2 border-r-2 border-white/90" />
            <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white">
              <span className="blink h-2 w-2 rounded-full bg-[#ff4d6d]" />
              {shots}/{N}
            </div>
            <motion.div key={`k${flash}`} className="absolute bottom-2 left-5 z-10" animate={flash ? { y: [0, -12, 0] } : {}} transition={{ duration: 0.4 }}>
              <Koala size={62} />
            </motion.div>
            <motion.div key={`c${flash}`} className="absolute bottom-2 right-5 z-10" animate={flash ? { y: [0, -12, 0] } : {}} transition={{ duration: 0.4, delay: 0.06 }}>
              <Cat size={62} />
            </motion.div>

            <AnimatePresence>
              {dev !== null && (
                <motion.div key={dev} className="absolute inset-0 z-20 flex items-center justify-center bg-black/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div
                    className="w-[170px] bg-white p-2 pb-8 shadow-2xl"
                    initial={{ scale: 0.6, y: 50, rotate: -8, filter: 'blur(10px)' }}
                    animate={{ scale: 1, y: 0, rotate: 3, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                  >
                    <Img p={D.photos[dev]} label={`foto ${dev + 1}`} className="aspect-square w-full" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {flash > 0 && (
              <motion.div key={`f${flash}`} className="pointer-events-none absolute inset-0 z-30 bg-white" initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} transition={{ duration: 0.45 }} />
            )}
          </div>

          <p className="mt-3 text-center text-sm font-semibold">{D.hint}</p>
          <div className="mt-3 flex justify-center gap-1.5">
            {Array.from({ length: N }, (_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: i < shots ? '#7a5cc4' : 'rgba(59,42,99,.2)' }} />
            ))}
          </div>
          <button
            type="button"
            onPointerDown={shoot}
            disabled={shots >= N}
            aria-label="Tombol rana"
            className="mx-auto mt-4 flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-[#7a5cc4] bg-[#7a5cc4]/20 active:scale-90 disabled:opacity-40"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="h-[54px] w-[54px] rounded-full bg-white shadow-lg" />
          </button>
        </div>
      )}

      {phase === 'sheet' && (
        <motion.div className="absolute inset-0 px-4 pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-center font-display text-xl font-extrabold">{D.sheetTitle}</p>
          <p className="mt-1 text-center text-xs opacity-80">
            {D.sheetHint} · {favs.length}/3
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {D.photos.map((p, i) => {
              const on = favs.includes(i)
              return (
                <div key={p.src} className="relative">
                  <MediaFrame item={p} label={`foto ${i + 1}`} frameClass="block w-full p-1 shadow" imgClass="aspect-square w-full" />
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-label={`Favorit foto ${i + 1}`}
                    aria-pressed={on}
                    className="absolute right-0 top-0 z-10 flex h-9 w-9 items-center justify-center"
                  >
                    <svg width="22" height="22" viewBox="0 0 40 40" aria-hidden="true">
                      <path d={HEART} fill={on ? '#ff3f7f' : 'rgba(255,255,255,.85)'} stroke={on ? '#ff3f7f' : '#b9a3dc'} strokeWidth="2.5" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
          <button
            type="button"
            disabled={favs.length < 3}
            onClick={() => setPhase('fav')}
            className="mx-auto mt-4 block h-12 w-48 rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] font-semibold text-white shadow-lg disabled:opacity-40"
          >
            {D.showFavs}
          </button>
        </motion.div>
      )}

      {phase === 'fav' && (
        <motion.div className="absolute inset-0 px-3 pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-center font-display text-xl font-extrabold">{D.favTitle}</p>
          <div className="relative mx-auto mt-3 h-[290px] w-[336px]">
            {favs.map((idx, k) => (
              <motion.div
                key={idx}
                className="absolute w-[132px]"
                style={{ left: POS[k].left, top: POS[k].top }}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: POS[k].r }}
                transition={{ type: 'spring', damping: 14, delay: k * 0.18 }}
              >
                <MediaFrame item={D.photos[idx]} label={`favorit ${k + 1}`} frameClass="block w-full p-1.5 pb-7 shadow-xl" imgClass="aspect-square w-full" />
              </motion.div>
            ))}
          </div>
          <p className="mx-auto max-w-[290px] text-center text-sm leading-relaxed">{D.story}</p>
          <div className="mt-3 flex justify-center gap-3">
            <button type="button" onClick={() => setPhase('sheet')} className="rounded-full bg-white/60 px-5 py-2 text-sm font-semibold">
              {D.pickAgain}
            </button>
            <button type="button" onClick={onAgain} className="rounded-full bg-white/60 px-5 py-2 text-sm font-semibold">
              {D.again}
            </button>
          </div>
          <div className="pointer-events-none absolute bottom-2 left-3"><Koala size={46} /></div>
          <div className="pointer-events-none absolute bottom-2 right-3"><Cat size={46} /></div>
        </motion.div>
      )}
    </div>
  )
}