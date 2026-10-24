import { useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Koala } from './Characters.jsx'
import { Img } from './Photo.jsx'
import ZoneResult from './ZoneResult.jsx'

const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const SPARK = 'M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z'

/* ---------- Tahap 1: tirai kertas buket, foto asli di baliknya ---------- */
function Reveal({ D, onNext }) {
  const photo = D.media[0]
  const x = useMotionValue(0)
  const left = useTransform(x, (v) => -Math.abs(v) * 1.4)
  const right = useTransform(x, (v) => Math.abs(v) * 1.4)
  const handleOpacity = useTransform(x, [-120, -60, 0, 60, 120], [0, 0.7, 1, 0.7, 0])
  const [open, setOpen] = useState(false)

  const reveal = (dir = 1) => {
    if (open) return
    setOpen(true)
    navigator.vibrate?.(20)
    animate(x, dir * 170, { duration: 0.8, ease: 'easeOut' })
  }

  return (
    <>
      <p className="absolute inset-x-0 top-4 z-10 px-6 text-center text-sm font-semibold">{open ? D.peeked : D.hintPeek}</p>

      <motion.div className="absolute left-1/2 top-[50px] -ml-[134px] w-[268px] bg-white p-2 pb-2 shadow-2xl" style={{ rotate: -1.5 }}>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e8def8]">
          <Img p={photo} label="foto menerima bunga" className="absolute inset-0 h-full w-full" />

          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ x: left, background: 'linear-gradient(100deg,#bba6f2,#a58de6)', borderRight: '3px solid #e6c15a' }}
          >
            <span className="absolute left-3 top-4 text-lg text-white/70">✦</span>
            <span className="absolute bottom-6 left-5 text-sm text-white/60">✦</span>
          </motion.div>
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ x: right, background: 'linear-gradient(260deg,#bba6f2,#a58de6)', borderLeft: '3px solid #e6c15a' }}
          >
            <span className="absolute right-4 top-10 text-sm text-white/60">✦</span>
            <span className="absolute bottom-5 right-3 text-lg text-white/70">✦</span>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -ml-[26px] -mt-[26px] z-10 flex h-[52px] w-[52px] cursor-grab items-center justify-center rounded-full border-4 border-[#e6c15a] bg-white text-base font-bold text-[#7a5cc4] shadow-xl"
            style={{ x, opacity: handleOpacity, touchAction: 'pan-y' }}
            drag={open ? false : 'x'}
            dragConstraints={{ left: -120, right: 120 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={() => (Math.abs(x.get()) > 60 ? reveal(Math.sign(x.get()) || 1) : animate(x, 0, { type: 'spring', damping: 18 }))}
            onTap={() => !open && reveal(1)}
            animate={open ? {} : { scale: [1, 1.12, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            role="button"
            tabIndex={0}
            aria-label="Geser tirai kertas"
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && reveal(1)}
          >
            ‹ ›
          </motion.div>

          {open &&
            [0, 1, 2, 3, 4].map((i) => (
              <motion.svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 40 40"
                className="pointer-events-none absolute z-[5]"
                style={{ left: `${18 + i * 17}%`, bottom: 8 }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -120 }}
                transition={{ duration: 2.4, delay: 0.5 + i * 0.25, repeat: Infinity, repeatDelay: 1 }}
                aria-hidden="true"
              >
                <path d={HEART} fill="#ff6f9c" />
              </motion.svg>
            ))}
        </div>
        <p className="mt-1.5 h-8 text-center font-['Dancing_Script',cursive] text-xl leading-8 text-[#3b2a63]">{open ? photo.caption : ''}</p>
      </motion.div>

      {open && (
        <motion.div
          className="pointer-events-none absolute z-10"
          style={{ left: 'calc(50% + 58px)', top: 372 }}
          initial={{ y: 40, opacity: 0, rotate: 10 }}
          animate={{ y: 0, opacity: 1, rotate: -8 }}
          transition={{ type: 'spring', damping: 12, delay: 0.6 }}
        >
          <Koala size={52} />
        </motion.div>
      )}

      {open && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-3 left-1/2 z-10 h-12 w-52 -translate-x-1/2 rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] font-semibold text-white shadow-lg"
        >
          {D.next}
        </motion.button>
      )}
    </>
  )
}

/* ---------- Tahap 2: kotak cincin ---------- */
function Ring() {
  const id = useId().replace(/:/g, '')
  return (
    <svg width="96" height="108" viewBox="0 0 96 108" role="img" aria-label="Cincin emas berukir bunga">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe3a6" />
          <stop offset=".5" stopColor="#e7b866" />
          <stop offset="1" stopColor="#f2a9a0" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="57" rx="32" ry="40" fill="none" stroke="#b8823a" strokeWidth="11" opacity=".35" />
      <ellipse cx="48" cy="54" rx="32" ry="40" fill="none" stroke={`url(#${id})`} strokeWidth="10" />
      <ellipse cx="46" cy="52" rx="32" ry="40" fill="none" stroke="#fff3cf" strokeWidth="2" opacity=".7" />
      <ellipse cx="48" cy="54" rx="32" ry="40" fill="none" stroke="#ef9a8f" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" />
      <path d="M26 30Q34 18 48 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".75" />
    </svg>
  )
}

const SPARKS = [[-68, -4], [72, 2], [-46, 52], [58, 56], [4, -56], [-84, 40], [86, 34]]

function RingBox({ D, onAgain }) {
  const x = useMotionValue(0)
  const lidOpacity = useTransform(x, [-320, -170, 0, 170, 320], [0, 0.4, 1, 0.4, 0])
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const openLid = (dir = 1) => {
    if (open) return
    setOpen(true)
    navigator.vibrate?.([30, 40, 60])
    animate(x, dir * 320, { duration: 0.7, ease: 'easeOut' })
    timers.current.push(setTimeout(() => setShow(true), 4600))
  }

  return (
    <>
      <p className="absolute inset-x-0 top-5 px-6 text-center text-sm font-semibold">{open ? '' : D.hintRing}</p>

      <div className="absolute left-1/2 top-[190px] -ml-[120px] h-[190px] w-[240px]">
        <div className="absolute -bottom-3 left-4 right-4 h-4 rounded-full bg-black/20 blur-md" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[-4px] -ml-[80px] h-[160px] w-[160px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,226,140,.95), rgba(255,226,140,0) 68%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? [0, 1, 0.7] : 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
        />

        <div className="absolute inset-x-0 bottom-[70px] h-[52px] rounded-t-[22px] bg-gradient-to-b from-[#7a2a52] to-[#a8406e]" />

        <motion.div
          className="absolute bottom-[66px] left-1/2 z-[2] -ml-[48px]"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={open ? { opacity: 1, y: -34, scale: 1.25 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 1.2, delay: open ? 0.5 : 0, ease: 'easeOut' }}
        >
          <motion.div animate={open ? { scaleX: [1, 0.35, 1] } : { scaleX: 1 }} transition={{ duration: 3.2, repeat: Infinity, delay: 1.8, ease: 'easeInOut' }}>
            <Ring />
          </motion.div>
        </motion.div>

        {open &&
          SPARKS.map(([dx, dy], i) => (
            <motion.svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute z-[2]"
              style={{ left: 120 + dx - 9, top: 44 + dy - 9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{ duration: 1.8, delay: 1 + i * 0.22, repeat: Infinity, repeatDelay: 0.6 }}
              aria-hidden="true"
            >
              <path d={SPARK} fill="#ffe27a" />
            </motion.svg>
          ))}

        <div className="absolute inset-x-0 bottom-0 z-[3] h-[84px] rounded-b-[22px] rounded-t-md bg-gradient-to-b from-[#ff8fb1] to-[#e0709a] shadow-lg">
          <span className="absolute inset-x-0 top-0 h-[4px] rounded-t-md bg-[#e6c15a]" />
          <svg width="26" height="26" viewBox="0 0 40 40" className="absolute left-1/2 top-[30px] -ml-[13px]" aria-hidden="true">
            <path d={HEART} fill="#ffe3ee" opacity=".85" />
          </svg>
        </div>

        <motion.div
          className="absolute bottom-[84px] left-0 z-[4] h-[84px] w-full cursor-grab rounded-t-[26px]"
          style={{ x, opacity: lidOpacity, touchAction: 'pan-y', pointerEvents: open ? 'none' : 'auto', background: 'linear-gradient(180deg,#ffd3e4,#ff9fc0)' }}
          drag={open ? false : 'x'}
          dragConstraints={{ left: -170, right: 170 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={() => (Math.abs(x.get()) > 70 ? openLid(Math.sign(x.get()) || 1) : animate(x, 0, { type: 'spring', damping: 18 }))}
          onTap={() => Math.abs(x.get()) < 6 && openLid(1)}
          role="button"
          tabIndex={0}
          aria-label="Geser tutup kotak cincin"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLid(1)}
        >
          <span className="absolute inset-x-0 bottom-0 h-[6px] bg-[#e6c15a]" />
          <svg width="30" height="30" viewBox="0 0 40 40" className="absolute left-1/2 top-[22px] -ml-[15px]" aria-hidden="true">
            <path d={HEART} fill="#e6c15a" />
          </svg>
          <motion.span className="absolute inset-x-0 top-[6px] text-center text-base font-bold text-white/90" animate={{ x: [-6, 6, -6] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ‹ ›
          </motion.span>
        </motion.div>
      </div>

      {open && (
        <motion.p
          className="absolute inset-x-0 top-[110px] px-6 text-center font-display text-3xl font-extrabold text-[#3b2a63]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {D.fitted}
        </motion.p>
      )}

      {show && <ZoneResult title={D.done} story={D.story} items={D.media.slice(1)} label="foto cincin" onAgain={onAgain} againLabel="Ulangi" />}
    </>
  )
}

export default function Birthday({ D, onAgain }) {
  const [stage, setStage] = useState('photo')
  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#ffeef4] via-[#f3e4ff] to-[#d9c8f5] text-[#3b2a63]">
      {stage === 'photo' ? <Reveal D={D} onNext={() => setStage('ring')} /> : <RingBox D={D} onAgain={onAgain} />}
    </div>
  )
}