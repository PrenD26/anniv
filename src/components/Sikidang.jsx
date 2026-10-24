import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const CLOCK = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00']
const CARS = [{ w: 62, c: '#ff8fb1' }, { w: 104, c: '#9a7fd8' }, { w: 58, c: '#ffd27a' }, { w: 74, c: '#8fd0f2' }, { w: 56, c: '#a8e6cf' }]
const VENTS = [{ x: 56, d: 0 }, { x: 160, d: 0.8 }, { x: 262, d: 1.6 }]

function Masked({ on, children }) {
  return (
    <div className="relative">
      {children}
      {on && <span className="absolute rounded-md border border-[#c9c3d8] bg-white/95" style={{ left: '30%', top: '58%', width: '40%', height: '24%' }} />}
    </div>
  )
}

export default function Sikidang({ D, onAgain }) {
  const [i, setI] = useState(0)
  const [horns, setHorns] = useState([])
  const [masked, setMasked] = useState(false)
  const [show, setShow] = useState(false)
  const id = useRef(0)
  const crater = i >= CLOCK.length - 1

  const honk = () => {
    if (crater) return
    const k = id.current++
    setHorns((h) => [...h, { k, x: 20 + ((k * 53) % 240), word: D.horns[k % D.horns.length] }])
    setTimeout(() => setHorns((h) => h.filter((v) => v.k !== k)), 1100)
    navigator.vibrate?.(12)
    setI((n) => n + 1)
  }
  const mask = () => {
    if (masked) return
    setMasked(true)
    navigator.vibrate?.(20)
    setTimeout(() => setShow(true), 2200)
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {!crater ? (
          <motion.div
            key="macet"
            className="absolute inset-0 bg-gradient-to-b from-[#a9c4e8] to-[#e8ddd0]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onPointerDown={honk}
            style={{ touchAction: 'manipulation' }}
          >
            <p className="pointer-events-none absolute inset-x-0 top-4 text-center font-display text-4xl font-extrabold tabular-nums text-[#3b2a63]">{CLOCK[i]}</p>
            <p className="pointer-events-none absolute inset-x-0 top-[62px] text-center text-sm font-semibold text-[#3b2a63]">{D.hintJam}</p>
            <div className="absolute inset-x-5 top-[100px] h-3 overflow-hidden rounded-full bg-white/60">
              <motion.div className="h-full bg-[#7a5cc4]" animate={{ width: `${(i / (CLOCK.length - 1)) * 100}%` }} />
            </div>
            <svg viewBox="0 0 360 80" className="absolute inset-x-0 top-[150px] h-[80px] w-full" aria-hidden="true">
              <path d="M0 80L50 30L110 62L170 18L240 56L300 28L360 60V80Z" fill="#7a8fb8" opacity=".55" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-b from-[#4a4358] to-[#2d2840]" />
            <motion.div key={i} className="absolute bottom-[96px] left-3 flex items-end gap-2" animate={{ x: [0, -3, 3, 0] }} transition={{ duration: 0.3 }}>
              {CARS.map((c, k) => (
                <div key={k} className="relative">
                  <div className="rounded-xl" style={{ width: c.w, height: 44, background: c.c }} />
                  <span className="absolute -bottom-2 left-2 h-4 w-4 rounded-full bg-[#1d1830]" />
                  <span className="absolute -bottom-2 right-2 h-4 w-4 rounded-full bg-[#1d1830]" />
                </div>
              ))}
            </motion.div>
            <div className="pointer-events-none absolute bottom-[160px] left-4"><Koala size={52} /></div>
            <div className="pointer-events-none absolute bottom-[160px] left-[74px]"><Cat size={52} /></div>
            {horns.map((h) => (
              <motion.span
                key={h.k}
                className="pointer-events-none absolute bottom-[170px] text-sm font-extrabold text-[#d6453a]"
                style={{ left: h.x }}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -46, scale: 1.2 }}
                transition={{ duration: 1 }}
              >
                {h.word}
              </motion.span>
            ))}
          </motion.div>
        ) : (
          <motion.div key="kawah" className="absolute inset-0 bg-gradient-to-b from-[#c9d6e8] via-[#e4d9c8] to-[#9a8168]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <p className="absolute inset-x-0 top-4 z-[5] px-6 text-center text-sm font-semibold text-[#3b2a63]">{masked ? D.maskOn : D.hintMask}</p>
            <svg viewBox="0 0 360 120" preserveAspectRatio="none" className="absolute inset-x-0 top-[60px] h-[120px] w-full" aria-hidden="true">
              <path d="M0 120L40 50L110 84L190 30L270 78L330 44L360 76V120Z" fill="#8a7a6a" opacity=".55" />
            </svg>
            {VENTS.map((v) => (
              <div key={v.x} className="absolute bottom-[196px]" style={{ left: v.x }}>
                {[0, 1].map((n) => (
                  <motion.span
                    key={n}
                    className="absolute h-10 w-10 rounded-full bg-white blur-md"
                    style={{ left: -14 + n * 8 }}
                    animate={{ y: [0, -90], opacity: [0, masked ? 0.5 : 0.85, 0], scale: [0.5, 1.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: v.d + n * 1.4 }}
                  />
                ))}
                <span className="block h-3 w-10 -translate-x-3 rounded-full bg-[#5d4a3c]" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-[196px] bg-gradient-to-b from-[#b49a7c] to-[#7a6248]">
              <div className="absolute inset-x-0 top-[30px] h-[52px]" style={{ background: 'repeating-linear-gradient(90deg,#c9a672 0 34px,#b8935e 34px 38px)' }} />
              <div className="absolute inset-x-0 top-[24px] h-[6px] bg-[#8a6a44]" />
              <div className="absolute right-4 top-[96px] rounded bg-[#ffd27a] px-2 py-1 text-[10px] font-bold text-[#6b3a1a]">80-90°C</div>
            </div>
            <button type="button" onClick={mask} aria-label="Pasang masker" className="absolute bottom-[96px] left-1/2 flex -translate-x-1/2 gap-6">
              <Masked on={masked}><Koala size={84} /></Masked>
              <Masked on={masked}><Cat size={84} /></Masked>
            </button>
            {!masked && (
              <motion.span className="pointer-events-none absolute bottom-[196px] left-1/2 text-xs font-bold text-[#d6453a]" animate={{ opacity: [0, 1, 0], y: [0, -10] }} transition={{ duration: 2, repeat: Infinity }}>
                uhuk!
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {show && <ZoneResult title={D.done} story={D.story} items={D.media} label="Sikidang" onAgain={onAgain} />}
    </div>
  )
}