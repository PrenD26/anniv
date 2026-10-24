import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue } from 'framer-motion'
import { Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const LEN = 3000 // panjang seluncuran
const SPEED = 250 // px per detik, sekitar 12 detik
const TRACK = 150 // lebar jalur
const NEON = ['#ff4fd8', '#ffe94f', '#4fd8ff', '#8dff6b']
const CONF = ['#ffffff', '#6a3fd0', '#c6cdd8']
const wave = (s, w) => w / 2 + 62 * Math.sin(s / 120) + 24 * Math.sin(s / 53)
const DOTS = Array.from({ length: 30 }, (_, i) => ({ d: 260 + i * 90, ox: (((i * 37) % 5) - 2) * 22 }))

export default function NeonSlide({ D, onAgain }) {
  const wrap = useRef(null)
  const cvs = useRef(null)
  const kx = useMotionValue(0)
  const sim = useRef({ scroll: 0, x: 0, tx: 0, got: new Set(), run: false })
  const vis = useRef(false)
  const inView = useInView(wrap, { amount: 0.2 })
  const [phase, setPhase] = useState('idle') // idle | run | splash
  const [score, setScore] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    vis.current = inView
  }, [inView])

  useEffect(() => {
    const c = cvs.current
    const w = c.clientWidth
    const h = c.clientHeight
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = w * dpr
    c.height = h * dpr
    const g = c.getContext('2d')
    g.scale(dpr, dpr)
    const KY = h * 0.76
    const st = sim.current
    st.x = w / 2
    st.tx = w / 2
    kx.set(st.x - 28)

    const draw = () => {
      const s0 = st.scroll
      const bg = g.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, '#1a0d3f')
      bg.addColorStop(1, '#3e1a72')
      g.fillStyle = bg
      g.fillRect(0, 0, w, h)

      const pts = []
      for (let y = -10; y <= h + 10; y += 10) pts.push([wave(s0 + KY - y, w), y])

      g.beginPath()
      pts.forEach(([x, y], i) => (i ? g.lineTo(x - TRACK / 2, y) : g.moveTo(x - TRACK / 2, y)))
      for (let i = pts.length - 1; i >= 0; i--) g.lineTo(pts[i][0] + TRACK / 2, pts[i][1])
      g.closePath()
      const tg = g.createLinearGradient(0, 0, 0, h)
      tg.addColorStop(0, '#5b2a9a')
      tg.addColorStop(1, '#8a3fc0')
      g.fillStyle = tg
      g.fill()

      ;[-0.38, -0.13, 0.13, 0.38].forEach((f, k) => {
        g.strokeStyle = NEON[k]
        g.lineWidth = 3
        g.shadowColor = NEON[k]
        g.shadowBlur = 10
        g.setLineDash([22, 18])
        g.lineDashOffset = -s0
        g.beginPath()
        pts.forEach(([x, y], i) => (i ? g.lineTo(x + f * TRACK, y) : g.moveTo(x + f * TRACK, y)))
        g.stroke()
      })
      g.setLineDash([])

      DOTS.forEach((dot, i) => {
        if (st.got.has(i)) return
        const sy = KY - (dot.d - s0)
        if (sy < -20 || sy > h + 20) return
        g.fillStyle = '#fff6c9'
        g.shadowColor = '#ffe94f'
        g.shadowBlur = 14
        g.beginPath()
        g.arc(wave(dot.d, w) + dot.ox, sy, 7, 0, 7)
        g.fill()
      })
      g.shadowBlur = 0
    }

    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!vis.current) {
        raf = requestAnimationFrame(loop)
        return
      }
      if (st.run) {
        st.scroll += SPEED * dt
        for (let i = 0; i < DOTS.length; i++) {
          if (st.got.has(i)) continue
          const rel = DOTS[i].d - st.scroll
          if (Math.abs(rel) < 20 && Math.abs(wave(DOTS[i].d, w) + DOTS[i].ox - st.x) < 30) {
            st.got.add(i)
            setScore(st.got.size)
            navigator.vibrate?.(10)
          }
        }
        if (st.scroll >= LEN) {
          st.run = false
          setPhase('splash')
          navigator.vibrate?.([30, 40, 60])
          setTimeout(() => setShow(true), 2300)
        }
      }
      st.x += (st.tx - st.x) * Math.min(1, dt * 10)
      kx.set(st.x - 28)
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [kx])

  const aim = (e) => {
    const r = wrap.current.getBoundingClientRect()
    sim.current.tx = Math.min(r.width - 30, Math.max(30, e.clientX - r.left))
  }

  return (
    <div
      ref={wrap}
      onPointerDown={aim}
      onPointerMove={aim}
      className="relative h-full w-full select-none overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      <canvas ref={cvs} className="absolute inset-0 h-full w-full" />
      <motion.div className="pointer-events-none absolute left-0 z-[5]" style={{ x: kx, top: 'calc(76% - 28px)' }}>
        <Koala size={56} />
      </motion.div>

      {phase === 'run' && (
        <p className="pointer-events-none absolute inset-x-0 top-5 text-center text-sm font-semibold text-white">
          ★ {score} / {DOTS.length}
        </p>
      )}

      {phase === 'idle' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 text-white">
          <p className="px-8 text-center text-sm font-semibold">{D.hint}</p>
          <button
            type="button"
            onClick={() => {
              sim.current.run = true
              setPhase('run')
            }}
            className="mt-4 h-12 w-44 rounded-full bg-[#ff4fd8] font-extrabold text-white shadow-lg"
          >
            {D.start}
          </button>
        </div>
      )}

      {phase === 'splash' && (
        <>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute z-20 h-5 w-5 rounded-full"
              style={{ left: '50%', top: '76%', background: CONF[i % 3] }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: ((i % 8) - 3.5) * 34, y: -70 - (i % 5) * 38, opacity: 0 }}
              transition={{ duration: 1.5, delay: (i % 4) * 0.05, ease: 'easeOut' }}
            />
          ))}
          <motion.p
            className="pointer-events-none absolute inset-x-0 top-[30%] z-20 text-center font-display text-5xl font-extrabold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.5 }}
          >
            {D.win}
          </motion.p>
        </>
      )}

      {show && (
        <ZoneResult
          title={D.win}
          extra={`${score} / ${DOTS.length} ${D.scoreLabel}`}
          story={D.story}
          item={D.photo}
          label="seluncuran neon"
          onAgain={onAgain}
          delay={0.2}
        />
      )}
    </div>
  )
}