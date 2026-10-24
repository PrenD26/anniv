import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion'
import Motorbike from './Motorbike.jsx'
import { Ketupat } from './Ornaments.jsx'
import ZoneResult from './ZoneResult.jsx'

const FAR = 140
const MID = 520
const NEAR = 1100
const HOUSE_X = 1300

function Tree({ h = 90, c = '#4f8f4a' }) {
  return (
    <svg width={h * 0.7} height={h} viewBox="0 0 56 80" aria-hidden="true">
      <rect x="25" y="46" width="6" height="34" fill="#6b4a34" />
      <circle cx="28" cy="30" r="24" fill={c} />
      <circle cx="16" cy="40" r="14" fill={c} />
      <circle cx="40" cy="40" r="14" fill={c} />
    </svg>
  )
}

function MiniHouse({ c }) {
  return (
    <svg width="76" height="62" viewBox="0 0 76 62" aria-hidden="true">
      <polygon points="2,26 38,2 74,26" fill="#a9674f" />
      <rect x="8" y="26" width="60" height="36" fill={c} />
      <rect x="32" y="38" width="14" height="24" fill="#7a5a44" />
      <rect x="14" y="34" width="12" height="12" fill="#bfe0f2" />
      <rect x="50" y="34" width="12" height="12" fill="#bfe0f2" />
    </svg>
  )
}

const MID_ITEMS = [
  ['h', 30, '#c9a58a'], ['t', 170], ['h', 260, '#d6b99a'], ['t', 400],
  ['h', 470, '#c9a58a'], ['t', 620], ['h', 690, '#d6b99a'], ['t', 810],
]
const NEAR_TREES = [60, 330, 620, 900, 1130]

export default function Silaturahmi({ D, progress }) {
  const far = useTransform(progress, [0, 1], [0, -FAR])
  const mid = useTransform(progress, [0, 1], [0, -MID])
  const near = useTransform(progress, [0, 1], [0, -NEAR])
  const [arrived, setArrived] = useState(false)
  const [stage, setStage] = useState('idle') // idle | greet | story | done
  const [say, setSay] = useState(0)
  const timers = useRef([])

  useMotionValueEvent(progress, 'change', (v) => setArrived((a) => (a === v >= 0.97 ? a : v >= 0.97)))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const knock = () => {
    if (!arrived || stage === 'greet') return
    if (stage === 'done') return setStage('story')
    setStage('greet')
    setSay(1)
    navigator.vibrate?.(15)
    timers.current.push(setTimeout(() => setSay(2), 1500))
    timers.current.push(setTimeout(() => setStage('story'), 3600))
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#9fd0f5] via-[#cfe6f5] to-[#ffe7c2]">
      {/* lapisan jauh: awan dan bukit */}
      <motion.div style={{ x: far, width: 360 + FAR }} className="absolute left-0 top-0 h-full">
        <div className="absolute left-[8%] top-[70px] h-7 w-24 rounded-full bg-white/80 blur-md" />
        <div className="absolute left-[52%] top-[120px] h-6 w-20 rounded-full bg-white/70 blur-md" />
        <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="absolute inset-x-0 h-[120px] w-full" style={{ bottom: 98 }} aria-hidden="true">
          <path d="M0 96Q70 26 150 76T300 66T460 76L500 96V120H0Z" fill="#b5c9a8" opacity=".85" />
        </svg>
      </motion.div>

      {/* lapisan tengah: rumah dan pohon jauh */}
      <motion.div style={{ x: mid, width: 360 + MID, bottom: 98 }} className="absolute left-0 h-[100px]">
        {MID_ITEMS.map(([t, x, c]) => (
          <div key={x} className="absolute bottom-0" style={{ left: x, opacity: 0.78 }}>
            {t === 'h' ? <MiniHouse c={c} /> : <Tree h={64} c="#76a56a" />}
          </div>
        ))}
      </motion.div>

      {/* lapisan dekat: rumput, jalan, pohon, rumah Budhe */}
      <motion.div style={{ x: near, width: HOUSE_X + 190 }} className="absolute bottom-0 left-0 h-full">
        <div className="absolute inset-x-0 bottom-[78px] h-[22px] bg-[#7fb06a]" />
        <div className="absolute inset-x-0 bottom-0 h-[78px] bg-[#4a4358]" />
        <div className="absolute inset-x-0 bottom-[36px] h-1 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg,#fff 0 28px,transparent 28px 56px)' }} />
        {NEAR_TREES.map((x) => (
          <div key={x} className="absolute" style={{ left: x, bottom: 92 }}>
            <Tree h={96} />
          </div>
        ))}

        <div className="absolute" style={{ left: HOUSE_X, bottom: 96, width: 150, height: 132 }}>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2f7d4f] px-3 py-0.5 text-[11px] font-bold text-white">{D.banner}</div>
          <svg width="150" height="132" viewBox="0 0 150 132" aria-hidden="true">
            <polygon points="4,52 75,8 146,52" fill="#b5573f" />
            <rect x="12" y="52" width="126" height="80" fill="#f6e8cf" />
            <path d="M4 52H146" stroke="#8a4630" strokeWidth="4" />
            <rect x="58" y="72" width="34" height="60" rx="3" fill="#7a4a2e" />
            <circle cx="86" cy="104" r="2.4" fill="#e6c04a" />
            <rect x="22" y="66" width="26" height="24" fill="#9fd0ee" stroke="#8a6a50" strokeWidth="3" />
            <rect x="102" y="66" width="26" height="24" fill="#9fd0ee" stroke="#8a6a50" strokeWidth="3" />
          </svg>
          <div className="absolute" style={{ left: 22, top: 50 }}><Ketupat s={20} /></div>
          <div className="absolute" style={{ left: 108, top: 50 }}><Ketupat s={20} /></div>
          {arrived && stage === 'idle' && (
            <motion.span
              className="pointer-events-none absolute rounded-t-md border-2 border-[#ffe27a]"
              style={{ left: 56, top: 70, width: 38, height: 62 }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
          <button type="button" onClick={knock} disabled={!arrived} aria-label="Ketuk pintu rumah Budhe" className="absolute" style={{ left: 54, top: 68, width: 42, height: 64 }} />
        </div>
      </motion.div>

      <div className="absolute left-2 z-[5]" style={{ bottom: 14 }}>
        <Motorbike running={!arrived} />
      </div>

      {/* rangkaian ketupat */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[6]" aria-hidden="true">
        <svg width="360" height="14" viewBox="0 0 360 14" className="block">
          <path d="M0 4Q90 18 180 4T360 4" stroke="#6b5a3a" strokeWidth="1.5" fill="none" />
        </svg>
        {[28, 100, 172, 244, 316].map((x, i) => (
          <motion.div
            key={x}
            className="absolute"
            style={{ left: x - 10, top: 6 + (i % 2) * 6, transformOrigin: '50% 0' }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Ketupat s={20} />
          </motion.div>
        ))}
      </div>

      <p className="pointer-events-none absolute inset-x-0 top-[60px] z-[6] px-8 text-center text-sm font-semibold text-[#3b2a63]">
        {!arrived ? D.hint : stage === 'idle' ? D.arriveHint : ''}
      </p>

      <div className="pointer-events-none absolute inset-x-3 top-[96px] z-[7] flex flex-col gap-2">
        <AnimatePresence>
          {stage === 'greet' &&
            D.greet.slice(0, say).map((g, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm font-semibold shadow ${
                  g.who === 'kyla' ? 'self-start rounded-bl-sm bg-[#fffdf8] text-[#2d2638]' : 'self-end rounded-br-sm bg-[#bfe6a8] text-[#2d3a22]'
                }`}
              >
                {g.text}
              </motion.p>
            ))}
        </AnimatePresence>
      </div>

      {stage === 'story' && <ZoneResult title={D.storyTitle} story={D.story} items={[D.photo]} label="rumah Budhe" onClose={() => setStage('done')} delay={0.1} />}
    </div>
  )
}