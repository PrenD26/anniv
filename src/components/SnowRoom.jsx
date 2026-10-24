import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Result from './Result.jsx'

const FLAKES = Array.from({ length: 16 }, (_, i) => ({
  l: (i * 29 + 7) % 96,
  s: 3 + (i % 4),
  d: 3 + (i % 5) * 0.7,
  dl: (i * 0.43) % 3,
  sx: (i % 2 ? 1 : -1) * (10 + (i % 3) * 8),
}))

const BRR_POS = [
  { left: '-40%', top: '14%', size: 'text-lg' },
  { left: '88%', top: '30%', size: 'text-base' },
  { left: '-34%', top: '58%', size: 'text-sm' },
  { left: '92%', top: '70%', size: 'text-lg' },
]

function Snowman({ words }) {
  return (
    <motion.div
      className="relative"
      style={{ width: 170 }}
      initial={{ scale: 0, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 140, delay: 0.7 }}
    >
      <motion.svg
        viewBox="0 0 120 160"
        width="170"
        height="227"
        role="img"
        aria-label="Boneka salju kedinginan"
        animate={{ x: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 0.16, repeat: Infinity }}
      >
        <circle cx="60" cy="128" r="32" fill="#fff" stroke="#cfe4f5" strokeWidth="2" />
        <circle cx="60" cy="84" r="28" fill="#fff" stroke="#cfe4f5" strokeWidth="2" />
        <path d="M34 80L10 66M16 69L10 60M86 80L110 66M104 69L110 60" stroke="#7a5a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="42" r="21" fill="#fff" stroke="#cfe4f5" strokeWidth="2" />
        <rect x="38" y="19" width="44" height="5" rx="2.5" fill="#5b3f9e" />
        <rect x="46" y="3" width="28" height="17" rx="3" fill="#5b3f9e" />
        <rect x="46" y="13" width="28" height="4" fill="#c9a2d8" />
        <circle cx="53" cy="40" r="2.2" fill="#2a1f45" />
        <circle cx="67" cy="40" r="2.2" fill="#2a1f45" />
        <polygon points="60,45 77,48 60,51" fill="#ff9a3c" />
        <path d="M52 54Q60 60 68 54" stroke="#2a1f45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="48" r="3" fill="#ffb3cc" opacity=".6" />
        <circle cx="73" cy="48" r="3" fill="#ffb3cc" opacity=".6" />
        <rect x="38" y="60" width="44" height="9" rx="4.5" fill="#c9a2d8" />
        <rect x="66" y="64" width="9" height="22" rx="3" fill="#b88be8" />
        {[80, 92, 104].map((cy) => (
          <circle key={cy} cx="60" cy={cy} r="2.6" fill="#2a1f45" />
        ))}
      </motion.svg>
      {BRR_POS.map((b, i) => (
        <motion.span
          key={i}
          className={`absolute font-bold text-[#2c5d8f] ${b.size}`}
          style={{ left: b.left, top: b.top }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [-2.5, 2.5, -2.5], rotate: [-5, 5, -5] }}
          transition={{ opacity: { delay: 1.4 + i * 0.15 }, x: { duration: 0.17, repeat: Infinity }, rotate: { duration: 0.17, repeat: Infinity } }}
        >
          {words[i % words.length]}
        </motion.span>
      ))}
    </motion.div>
  )
}
export default function SnowRoom({ D, onDone, onAgain }) {
  const cvs = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const c = cvs.current
    const w = c.clientWidth
    const h = c.clientHeight
    c.width = w
    c.height = h
    const g = c.getContext('2d')
    const grad = g.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, '#eaf6ff')
    grad.addColorStop(1, '#c3e2f6')
    g.fillStyle = grad
    g.fillRect(0, 0, w, h)
    for (let i = 0; i < 260; i++) {
      g.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.5})`
      g.beginPath()
      g.arc(Math.random() * w, Math.random() * h, Math.random() * 2.6 + 0.6, 0, 7)
      g.fill()
    }
  }, [])

  const pos = (e) => {
    const r = cvs.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const wipe = (a, b) => {
    const g = cvs.current.getContext('2d')
    g.globalCompositeOperation = 'destination-out'
    g.lineCap = 'round'
    g.lineJoin = 'round'
    g.lineWidth = 76
    g.beginPath()
    g.moveTo(a.x, a.y)
    g.lineTo(b.x, b.y)
    g.stroke()
  }
  const check = () => {
    if (done) return
    const c = cvs.current
    const g = c.getContext('2d')
    let clear = 0
    let total = 0
    for (let x = 8; x < c.width; x += 22) {
      for (let y = 8; y < c.height; y += 22) {
        total++
        if (g.getImageData(x, y, 1, 1).data[3] < 40) clear++
      }
    }
    if (clear / total > 0.5) {
      setDone(true)
      navigator.vibrate?.(30)
      onDone()
    }
  }
  const down = (e) => {
    drawing.current = true
    cvs.current.setPointerCapture?.(e.pointerId)
    const p = pos(e)
    last.current = p
    wipe(p, p)
    setStarted(true)
  }
  const move = (e) => {
    if (!drawing.current) return
    const p = pos(e)
    wipe(last.current, p)
    last.current = p
  }
  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    check()
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#7fc4ee] to-[#e8f6ff]">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          className="flake"
          style={{ left: `${f.l}%`, width: f.s, height: f.s, animationDuration: `${f.d}s`, animationDelay: `${f.dl}s`, '--sx': `${f.sx}px` }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[84px] rounded-t-[50%] bg-white" />
      <motion.p
        className="absolute inset-x-0 top-[9%] text-center font-display text-4xl font-extrabold text-[#1f4a7a]"
        animate={done ? { x: [-3, 3, -3, 3, 0] } : { x: 0 }}
        transition={done ? { duration: 0.5, repeat: Infinity } : undefined}
      >
        {D.reveal}
      </motion.p>

      {done && (
        <div className="absolute inset-x-0 bottom-[46px] flex justify-center">
          <Snowman words={D.brr || ['brrr...']} />
        </div>
      )}

      <canvas
        ref={cvs}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: 'pan-y', opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto', transition: 'opacity 1s' }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      <motion.p
        className="pointer-events-none absolute inset-x-0 top-[44%] px-8 text-center text-base font-semibold text-[#3b5d80]"
        animate={{ opacity: started ? 0 : 1 }}
      >
        {D.hint}
      </motion.p>
      {done && <Result D={D} title={D.reveal} onAgain={onAgain} delay={4.6} />}
    </div>
  )
}