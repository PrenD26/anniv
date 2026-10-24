import { useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import Result from './Result.jsx'

const DEPTH = 176
const PRIZES = [
  { id: 'koala', left: 16 },
  { id: 'cat', left: 38 },
  { id: 'star', left: 60 },
  { id: 'heart', left: 82 },
]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const Star = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill="#ffe27a" />
  </svg>
)
const Heart = () => (
  <svg width="44" height="44" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z" fill="#ff6f9c" />
  </svg>
)
const Prize = ({ id }) => (id === 'koala' ? <Koala size={46} /> : id === 'cat' ? <Cat size={46} /> : id === 'star' ? <Star /> : <Heart />)

export default function Arcade({ D, onDone, onAgain }) {
  const d = useMotionValue(0)
  const ropeH = useTransform(d, (v) => 36 + v * DEPTH)
  const [x, setX] = useState(50)
  const [busy, setBusy] = useState(false)
  const [closed, setClosed] = useState(false)
  const [caught, setCaught] = useState(null)
  const [won, setWon] = useState(null)
  const [msg, setMsg] = useState(D.hint)

  const grab = async () => {
    if (busy || won) return
    setBusy(true)
    setMsg(D.hint)
    await animate(d, 1, { duration: 0.9, ease: 'easeIn' })
    setClosed(true)
    const hit = PRIZES.find((p) => Math.abs(p.left - x) < 9)
    await wait(250)
    if (hit) setCaught(hit.id)
    await animate(d, 0, { duration: 1, ease: 'easeOut' })
    setClosed(false)
    if (hit) {
      setWon(hit.id)
      navigator.vibrate?.(40)
      onDone()
    } else {
      setMsg(D.miss)
    }
    setBusy(false)
  }

  return (
    <div className="relative h-full w-full select-none bg-gradient-to-b from-[#2a1b52] to-[#4a2a7a] px-4 pt-4">
      <div className="flex items-center justify-center gap-1.5 rounded-t-xl bg-[#ff8fb1] py-1.5">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="blink h-2 w-2 rounded-full bg-[#fff6c9]" style={{ animationDelay: `${(i % 2) * 0.6}s` }} />
        ))}
        <span className="mx-2 text-sm font-extrabold tracking-[0.25em] text-white">ARCADE</span>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="blink h-2 w-2 rounded-full bg-[#fff6c9]" style={{ animationDelay: `${(i % 2) * 0.6}s` }} />
        ))}
      </div>

      <div className="relative h-[300px] overflow-hidden border-4 border-[#ff8fb1] bg-gradient-to-b from-[#3a2a73] to-[#5b3f9e]">
        {PRIZES.filter((p) => p.id !== caught && p.id !== won).map((p) => (
          <div key={p.id} className="absolute bottom-2 -translate-x-1/2" style={{ left: `${p.left}%` }}>
            <Prize id={p.id} />
          </div>
        ))}
        <div className="absolute top-0 w-0 transition-[left] duration-100" style={{ left: `${x}%` }}>
          <motion.div className="absolute left-0 top-0 w-[3px] -translate-x-1/2 bg-[#cfc6e8]" style={{ height: ropeH }} />
          <motion.div className="absolute left-0 -translate-x-1/2" style={{ top: ropeH }}>
            <svg
              width="46"
              height="38"
              viewBox="0 0 46 38"
              aria-hidden="true"
              style={{ transform: closed ? 'scaleX(0.78)' : 'none', transition: 'transform .2s' }}
            >
              <rect x="19" y="0" width="8" height="10" fill="#cfc6e8" />
              <path d="M23 10L8 24L12 30L23 20Z" fill="#cfc6e8" />
              <path d="M23 10L38 24L34 30L23 20Z" fill="#cfc6e8" />
            </svg>
            {caught && (
              <div className="absolute left-1/2 top-[26px] -translate-x-1/2">
                <Prize id={caught} />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <p className="mt-3 h-5 text-center text-sm font-semibold text-lilac-100">{msg}</p>
      <div className="mt-2 flex items-center gap-4 px-2">
        <input
          type="range"
          min="4"
          max="96"
          value={x}
          disabled={busy}
          onChange={(e) => setX(+e.target.value)}
          aria-label="Geser capit"
          className="h-10 flex-1 accent-[#ff8fb1]"
        />
        <button
          type="button"
          onClick={grab}
          disabled={busy}
          className="h-16 w-16 rounded-full bg-[#ff6f9c] text-sm font-extrabold text-white shadow-lg active:scale-90 disabled:opacity-50"
        >
          AMBIL
        </button>
      </div>
      {won && <Result D={D} title={D.win} onAgain={onAgain} />}
    </div>
  )
}