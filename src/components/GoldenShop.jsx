import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DECEMBER } from '../data/december.js'

const LAMP_X = ['10%', '30%', '50%', '70%', '90%']
const SHELVES = [
  { top: 78, items: ['#ff9db5', '#c9b2ff', '#ffd27a', '#a8e6cf', '#9ec9ff', '#ff9db5', '#ffd27a'] },
  { top: 128, items: ['#c9b2ff', '#ffd27a', '#ff9db5', '#9ec9ff', '#a8e6cf', '#c9b2ff', '#ff9db5'] },
]

export default function GoldenShop() {
  const G = DECEMBER.golden
  const total = LAMP_X.length
  const [off, setOff] = useState(() => Array(total).fill(false))
  const count = off.filter(Boolean).length
  const closed = count === total

  const turnOff = (i) => {
    if (off[i]) return
    navigator.vibrate?.(12)
    setOff((s) => s.map((v, k) => (k === i ? true : v)))
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="w-[300px] overflow-hidden rounded-2xl shadow-2xl">
        <div className="bg-[#5b3f9e] py-2 text-center font-display text-lg font-extrabold tracking-wide text-[#f5c451]">
          GOLDEN SWALAYAN
        </div>
        <div
          className="h-9"
          style={{ background: 'repeating-linear-gradient(90deg, #ffffff 0 25px, #c9a2d8 25px 50px)', borderBottom: '3px solid #8a62b0' }}
        />

        <div className="relative h-[210px] overflow-hidden bg-[#ffe6a8]">
          {SHELVES.map((s, k) => (
            <div key={k} className="absolute inset-x-4" style={{ top: s.top }}>
              <div className="flex justify-center gap-1.5">
                {s.items.map((c, i) => (
                  <span key={i} className="h-6 w-6 rounded-md" style={{ background: c }} />
                ))}
              </div>
              <div className="h-1.5 rounded bg-[#b58a5a]" />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 h-[34px] bg-[#9a7fd8]" />

          {/* makin gelap tiap lampu padam */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 bg-[#150e2e]"
            initial={false}
            animate={{ opacity: (count / total) * 0.84 }}
            transition={{ duration: 0.9 }}
          />

          {/* lampu meja kasir: satu-satunya yang tetap menyala */}
          <div className="absolute bottom-[34px] left-5 z-30">
            <motion.div
              className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,226,122,.85), rgba(255,226,122,0) 70%)' }}
              initial={false}
              animate={{ opacity: closed ? 1 : (count / total) * 0.6 }}
              transition={{ duration: 1 }}
            />
            <svg width="26" height="32" viewBox="0 0 26 32" className="relative" aria-hidden="true">
              <path d="M4 14L9 2h8l5 12z" fill="#ffd966" />
              <rect x="12" y="14" width="2" height="12" fill="#6b5a85" />
              <rect x="5" y="26" width="16" height="5" rx="2" fill="#6b5a85" />
            </svg>
          </div>

          <div
            className="absolute right-3 top-[88px] z-30 rotate-[6deg] rounded bg-white px-2 py-0.5 text-[11px] font-bold tracking-wider"
            style={{ color: closed ? '#d6457a' : '#2f9f6b' }}
          >
            {closed ? 'TUTUP' : 'BUKA'}
          </div>

          {LAMP_X.map((x, i) => (
            <button
              key={x}
              type="button"
              onClick={() => turnOff(i)}
              aria-label={`Matikan lampu ${i + 1}`}
              className="absolute top-0 z-30 -ml-[22px] flex h-[70px] w-[44px] flex-col items-center"
              style={{ left: x }}
            >
              <span className="h-8 w-px bg-[#6b5a85]" />
              <motion.span
                className="h-6 w-6 rounded-full"
                initial={false}
                animate={
                  off[i]
                    ? { backgroundColor: '#8a8296', boxShadow: '0 0 0px 0px rgba(255,226,122,0)' }
                    : { backgroundColor: '#ffe27a', boxShadow: '0 0 22px 8px rgba(255,226,122,0.75)' }
                }
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 min-h-[7rem] w-full max-w-[300px] text-center">
        <AnimatePresence mode="wait">
          {!closed ? (
            <motion.p key="h" exit={{ opacity: 0 }} className="inline-block rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {G.hint}
            </motion.p>
          ) : (
            <motion.p
              key="f"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1 }}
              className="rounded-2xl bg-[#2d2638]/75 px-4 py-3 font-['Dancing_Script',cursive] text-2xl leading-snug text-white backdrop-blur-md"
            >
              {G.final}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}