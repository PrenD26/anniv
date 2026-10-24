import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { moodAt } from '../timeline.js'

const ST = { fill: 'none', stroke: '#2a1f45', strokeWidth: 3, strokeLinecap: 'round' }
const FACES = {
  sleep: (<><path d="M23 42q5 5 11 0M46 42q5 5 11 0" {...ST} /><ellipse cx="40" cy="55" rx="4" ry="6" fill="#2a1f45" /></>),
  yawn: (<><path d="M24 41q5-4 10 0M46 41q5-4 10 0" {...ST} /><ellipse cx="40" cy="55" rx="6" ry="9" fill="#2a1f45" /></>),
  happy: (<><circle cx="29" cy="42" r="3.5" fill="#2a1f45" /><circle cx="51" cy="42" r="3.5" fill="#2a1f45" /><ellipse cx="40" cy="53" rx="6" ry="7" fill="#4a3a6b" /><path d="M34 60q6 6 12 0" fill="#f4a6c4" /></>),
  sleepy: (<><path d="M23 42h11M46 42h11" {...ST} /><ellipse cx="40" cy="55" rx="4" ry="5" fill="#2a1f45" /></>),
}


export default function KoalaSlider({ progress }) {
  const [mood, setMood] = useState('sleep')
  useMotionValueEvent(progress, 'change', (v) => {
    const m = moodAt(v)
    setMood((prev) => (prev === m ? prev : m))
  })
  const top = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="pointer-events-none fixed right-1 top-[8svh] z-40 h-[84svh] w-11" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 rounded-full bg-white/25 shadow-[0_0_0_1px_rgba(59,42,99,.18)]" />
      <div className="absolute inset-x-0 bottom-11 top-0">
        <motion.div style={{ top }} className="absolute left-0">
          <svg width="44" height="44" viewBox="0 0 80 80">
            <circle cx="16" cy="22" r="13" fill="#bdb5dd" />
            <circle cx="64" cy="22" r="13" fill="#bdb5dd" />
            <circle cx="16" cy="22" r="7" fill="#f6e9f6" />
            <circle cx="64" cy="22" r="7" fill="#f6e9f6" />
            <circle cx="40" cy="44" r="28" fill="#bdb5dd" />
            {FACES[mood]}
          </svg>
        </motion.div>
      </div>
    </div>
  )
}