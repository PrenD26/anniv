import { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { SkyContext } from './SkyBackground.jsx'

export default function Cake() {
  const B = OCTOBER.birthday
  const { ink } = useContext(SkyContext)
  const [out, setOut] = useState(false)
  const digits = [...String(B.age)]

  return (
    <div className="flex flex-col items-center">
      <button type="button" disabled={out} onClick={() => setOut(true)} aria-label="Tiup lilin" className="relative h-[250px] w-[280px]">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 gap-3">
          {digits.map((d, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.span
                className="mb-1 block h-6 w-3.5 rounded-[50%_50%_50%_50%/65%_65%_35%_35%] bg-gradient-to-t from-[#ff9a3c] to-[#ffe27a]"
                style={{ transformOrigin: '50% 100%', boxShadow: '0 0 18px 6px rgba(255,214,120,.65)' }}
                animate={out ? { opacity: 0, scale: 0 } : { scaleY: [1, 1.2, 0.92, 1.1, 1], rotate: [-3, 3, -2, 2, -3] }}
                transition={out ? { duration: 0.3 } : { duration: 1.1 + i * 0.2, repeat: Infinity }}
              />
              <span className="font-display text-[5.2rem] font-extrabold leading-[0.85] text-[#ffd0e2]" style={{ textShadow: '0 4px 0 #ff9db5' }}>
                {d}
              </span>
            </div>
          ))}
        </div>

        {out &&
          Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute z-20 h-3 w-3 rounded-full bg-white/40 blur-[2px]"
              style={{ left: `calc(50% + ${(i - 2) * 14}px)`, top: 8 }}
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, scale: 2 }}
              transition={{ duration: 1.6, delay: i * 0.08 }}
            />
          ))}

        {out && (
          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="absolute left-1/2 top-2 -ml-[15px] z-20"
            style={{ filter: 'drop-shadow(0 0 10px #fff6c9)' }}
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 1, 0], y: -260, scale: [0.4, 1, 1, 0.6] }}
            transition={{ duration: 3.5, delay: 1.2 }}
          >
            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill="#ffe27a" />
          </motion.svg>
        )}

        <div className="absolute bottom-0 left-1/2 -ml-[140px] h-3.5 w-[280px] rounded-full bg-[#e9dcff]" />
        <div className="absolute bottom-2 left-1/2 -ml-[125px] h-[84px] w-[250px] rounded-2xl bg-[#ffc2d9]">
          <div className="absolute bottom-3 left-1/2 flex w-[220px] -translate-x-1/2 justify-between">
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className="h-3 w-3 rounded-full bg-[#ff7aa0]" />
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 -ml-[95px] h-[62px] w-[190px] rounded-2xl bg-[#ffe3ee]" style={{ bottom: 84 }}>
          <div className="absolute bottom-3 left-1/2 flex w-[150px] -translate-x-1/2 justify-between">
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="h-2.5 w-2.5 rounded-full bg-[#ffb3cc]" />
            ))}
          </div>
        </div>
      </button>

      <div className="mt-5 h-16 text-center">
        <AnimatePresence mode="wait">
          {!out ? (
            <motion.p key="h" style={{ color: ink }} className="text-sm" exit={{ opacity: 0 }}>{B.hint}</motion.p>
          ) : (
            <motion.p
              key="w"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              style={{ color: ink, textShadow: '0 0 18px rgba(240,194,255,.8)' }}
              className="font-['Dancing_Script',cursive] text-4xl"
            >
              {B.wish}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}