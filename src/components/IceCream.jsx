import { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { SkyContext } from './SkyBackground.jsx'

const SCOOP = 'M6 60A50 50 0 0 1 106 60Q106 76 96 78Q90 92 78 82Q68 94 56 82Q44 94 34 82Q22 92 16 78Q6 76 6 60Z'

export default function IceCream() {
  const I = OCTOBER.icecream
  const { ink } = useContext(SkyContext)
  const [n, setN] = useState(0)
  const total = I.flavors.length
  const full = n >= total
  const label = n === 0 ? I.hintStart : full ? I.done : `${I.flavors[n - 1].name}. Tambah lagi!`

  return (
    <div className="flex flex-col items-center">
      <motion.button
        type="button"
        onClick={() => !full && setN((c) => c + 1)}
        aria-label="Tambah es krim"
        className="relative h-[390px] w-[220px]"
        style={{ transformOrigin: '50% 100%' }}
        animate={full ? { rotate: [0, -4, 4, -3, 3, 0] } : { rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <svg width="120" height="150" viewBox="0 0 120 150" className="absolute bottom-0 left-1/2 -translate-x-1/2" aria-hidden="true">
          <polygon points="4,0 116,0 60,150" fill="#e8b66f" />
          <path d="M24 0L66 105M52 0L82 66M80 0L96 28M96 0L54 105M68 0L38 66M40 0L24 28" stroke="#c98f45" strokeWidth="2.5" opacity=".6" />
        </svg>
        {I.flavors.slice(0, n).map((f, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -ml-14"
            style={{ bottom: 128 + i * 58, zIndex: i + 1, transformOrigin: '50% 100%' }}
            initial={{ y: -280, opacity: 0, scaleY: 1.25 }}
            animate={{ y: 0, opacity: 1, scaleY: [1.25, 0.82, 1] }}
            transition={{ y: { type: 'spring', damping: 11, stiffness: 120 }, opacity: { duration: 0.15 }, scaleY: { duration: 0.55, delay: 0.12 } }}
          >
            <svg width="112" height="96" viewBox="0 0 112 96" aria-hidden="true">
              <path d={SCOOP} fill={f.color} />
              <ellipse cx="34" cy="38" rx="14" ry="8" fill="#fff" opacity=".35" transform="rotate(-25 34 38)" />
            </svg>
          </motion.div>
        ))}
        {full && (
          <motion.span
            className="absolute left-1/2 -ml-2.5 h-5 w-5 rounded-full bg-[#ff5a7a] shadow-md"
            style={{ bottom: 128 + (total - 1) * 58 + 88, zIndex: 9 }}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
          />
        )}
      </motion.button>
      <AnimatePresence mode="wait">
        <motion.p key={n} style={{ color: ink }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 max-w-[290px] text-center text-sm">
          {label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}