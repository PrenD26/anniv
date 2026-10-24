import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const NEED = 240 // panjang goresan (px) sebelum ombak boleh datang
const IDLE = 1800 // ms setelah jari diangkat sampai ombak datang
const DOTS = 'radial-gradient(#e3c78e 1px, transparent 1px)'

export default function Beach({ D, onAgain }) {
  const cvs = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const len = useRef(0)
  const rolled = useRef(false)
  const rollT = useRef(null)
  const timers = useRef([])
  const [started, setStarted] = useState(false)
  const [wave, setWave] = useState(false)
  const [fade, setFade] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const c = cvs.current
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = c.clientWidth * dpr
    c.height = c.clientHeight * dpr
    const g = c.getContext('2d')
    g.scale(dpr, dpr)
    g.lineCap = 'round'
    g.lineJoin = 'round'
    return () => {
      clearTimeout(rollT.current)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const pos = (e) => {
    const r = cvs.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const seg = (a, b) => {
    const g = cvs.current.getContext('2d')
    g.strokeStyle = '#a98449'
    g.lineWidth = 9
    g.shadowColor = 'rgba(255,246,214,.95)'
    g.shadowOffsetX = 1.5
    g.shadowOffsetY = 1.5
    g.beginPath()
    g.moveTo(a.x, a.y)
    g.lineTo(b.x, b.y)
    g.stroke()
  }

  const roll = () => {
    if (rolled.current) return
    rolled.current = true
    setWave(true)
    navigator.vibrate?.(30)
    timers.current.push(setTimeout(() => setFade(true), 1000))
    timers.current.push(setTimeout(() => setShow(true), 3400))
  }

  const down = (e) => {
    if (rolled.current) return
    clearTimeout(rollT.current)
    drawing.current = true
    cvs.current.setPointerCapture?.(e.pointerId)
    const p = pos(e)
    last.current = p
    seg(p, p)
    setStarted(true)
  }
  const move = (e) => {
    if (!drawing.current || rolled.current) return
    const p = pos(e)
    len.current += Math.hypot(p.x - last.current.x, p.y - last.current.y)
    seg(last.current, p)
    last.current = p
  }
  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    if (len.current >= NEED && !rolled.current) rollT.current = setTimeout(roll, IDLE)
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden" style={{ backgroundColor: '#f1dcab', backgroundImage: DOTS, backgroundSize: '14px 14px' }}>
      {/* laut */}
      <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-[#79b9ea] to-[#bde6f7]">
        <div className="absolute right-8 top-5 h-12 w-12 rounded-full bg-[#fff3c4]" style={{ boxShadow: '0 0 30px 12px rgba(255,236,170,.7)' }} />
        <motion.div className="absolute -left-8 top-8 h-6 w-24 rounded-full bg-white/70 blur-md" animate={{ x: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.svg viewBox="0 0 500 30" preserveAspectRatio="none" className="absolute -left-10 bottom-5 h-[26px] w-[calc(100%+80px)]" animate={{ x: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
          <path d="M0 14Q25 2 50 14T100 14T150 14T200 14T250 14T300 14T350 14T400 14T450 14T500 14V30H0Z" fill="#8cc8ee" />
        </motion.svg>
        <motion.svg viewBox="0 0 500 30" preserveAspectRatio="none" className="absolute -left-10 bottom-0 h-[26px] w-[calc(100%+80px)]" animate={{ x: [20, -20, 20] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
          <path d="M0 14Q25 2 50 14T100 14T150 14T200 14T250 14T300 14T350 14T400 14T450 14T500 14V30H0Z" fill="#fff" fillOpacity=".92" />
        </motion.svg>
      </div>

      {!started && (
        <p className="pointer-events-none absolute inset-x-0 top-[270px] z-[5] px-10 text-center text-base font-semibold text-[#8a6a3a]">{D.prompt}</p>
      )}

         <canvas
        ref={cvs}
        className="absolute left-3 z-[6]"
        style={{
          top: 134,
          width: 'calc(100% - 24px)',
          height: 'calc(100% - 196px)',
          touchAction: 'none',
          opacity: fade ? 0 : 1,
          transition: 'opacity 1.4s',
        }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />

      {wave && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-[8]"
          style={{ top: 134, height: 420, background: 'linear-gradient(to bottom, rgba(207,236,247,0), rgba(207,236,247,.9) 26%, rgba(255,255,255,.96))' }}
          initial={{ y: -420 }}
          animate={{ y: 340 }}
          transition={{ duration: 2.8, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 360 26" preserveAspectRatio="none" className="absolute -bottom-6 inset-x-0 h-7 w-full" aria-hidden="true">
            <path d="M0 0H360V12Q330 26 300 12T240 12T180 12T120 12T60 12T0 12Z" fill="#fff" fillOpacity=".96" />
          </svg>
        </motion.div>
      )}

      <div className="pointer-events-none absolute bottom-1 right-3 z-[7] flex gap-1">
        <Koala size={52} />
        <Cat size={52} />
      </div>
      <p className="pointer-events-none absolute bottom-4 left-4 right-[130px] z-[7] text-xs font-semibold text-[#6b5030]">{D.hint}</p>

      {show && <ZoneResult title={D.waveTitle} story={D.story} item={D.photo} label="pantai Pudak" onAgain={onAgain} againLabel="Tulis lagi" />}
    </div>
  )
}