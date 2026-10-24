import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import ZoneResult from './ZoneResult.jsx'

const DUR = 1.05 // detik per lompatan
const hMax = (p) => 70 + p * 54 // tinggi lompatan (px) di tingkat 1..5

export default function Trampoline({ D, onAgain }) {
  const yK = useMotionValue(0)
  const yC = useMotionValue(0)
  const s = useRef({ t: 0, who: 0, power: 1, tapped: false, done: false })
  const msgT = useRef(null)
  const [power, setPower] = useState(1)
  const [msg, setMsg] = useState(D.hint)
  const [won, setWon] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const st = s.current
      if (!st.done) {
        st.t += dt
        let p = st.t / DUR
        if (p >= 1) {
          if (st.tapped) st.power = Math.min(5, st.power + 1)
          else if (st.power > 1) st.power -= 1
          setPower(st.power)
          st.tapped = false
          st.t = 0
          st.who ^= 1
          p = 0
        }
        const y = -4 * p * (1 - p) * hMax(st.power)
        yK.set(st.who === 0 ? y : 0)
        yC.set(st.who === 1 ? y : 0)
        if (st.power >= 5 && p >= 0.5) {
          st.done = true
          setWon(true)
          navigator.vibrate?.([40, 30, 80])
          setTimeout(() => setShow(true), 1900)
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [yK, yC])

  const say = (t) => {
    setMsg(t)
    clearTimeout(msgT.current)
    msgT.current = setTimeout(() => setMsg(D.hint), 900)
  }

  const tap = () => {
    const st = s.current
    if (st.done) return
    if (st.t / DUR >= 0.5) {
      if (!st.tapped) say(D.good)
      st.tapped = true
    } else {
      say(D.early)
    }
  }

  return (
    <div
      onPointerDown={tap}
      className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#1d0f45] to-[#4a2a8a]"
      style={{ touchAction: 'manipulation' }}
    >
      <span className="neon absolute inset-x-0 top-0 h-3 bg-[#ff4fd8]" style={{ boxShadow: '0 0 26px 8px rgba(255,79,216,.8)' }} />
      <span className="neon absolute inset-x-6 top-6 h-1.5 bg-[#4fd8ff]" style={{ boxShadow: '0 0 18px 5px rgba(79,216,255,.7)', animationDelay: '.6s' }} />

      <div className="pointer-events-none absolute inset-x-0 top-12 text-center text-white">
        <p className="text-sm font-semibold">{msg}</p>
        <div className="mt-2 flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="h-2.5 w-2.5 rounded-full" style={{ background: n <= power ? '#ffe94f' : 'rgba(255,255,255,.25)' }} />
          ))}
        </div>
      </div>

      <motion.div className="absolute" style={{ left: '12%', bottom: 86, y: yK }}>
        <Koala size={80} />
      </motion.div>
      <motion.div className="absolute" style={{ right: '12%', bottom: 86, y: yC }}>
        <Cat size={80} />
      </motion.div>

      <div className="absolute inset-x-4 bottom-[54px] h-8 rounded-full bg-[#2a1f45]" style={{ boxShadow: '0 0 24px 4px rgba(255,79,216,.45)' }}>
        <div className="absolute inset-x-2 top-1 h-3 rounded-full bg-gradient-to-r from-[#ff4fd8] to-[#4fd8ff]" />
      </div>
      <div className="absolute bottom-[26px] left-[14%] h-7 w-2 rounded bg-[#150e2e]" />
      <div className="absolute bottom-[26px] right-[14%] h-7 w-2 rounded bg-[#150e2e]" />

      {won && (
        <motion.div className="pointer-events-none absolute inset-0 z-20 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 0.6 }} />
      )}
      {show && <ZoneResult title={D.win} story={D.story} item={D.photo} label="trampolin" onAgain={onAgain} />}
    </div>
  )
}