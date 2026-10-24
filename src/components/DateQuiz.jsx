import { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { SkyContext } from './SkyBackground.jsx'

const DOW = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const OFFSET = (new Date(2025, 10, 1).getDay() + 6) % 7 // 1 Nov 2025 = Sabtu
const DAYS = 30

export default function DateQuiz({ onSolved }) {
  const D = NOVEMBER.date
  const { ink } = useContext(SkyContext)
  const [misses, setMisses] = useState(0)
  const [wrongDay, setWrongDay] = useState(null)
  const [solved, setSolved] = useState(false)

  const pick = (d) => {
    if (solved) return
    if (d === 25) {
      setSolved(true)
      navigator.vibrate?.(30)
      setTimeout(onSolved, 1500)
      return
    }
    setWrongDay(d)
    setMisses((m) => m + 1)
  }

  const msg = misses === 0 ? D.hint : misses >= 4 && misses % 2 === 0 ? D.clue : D.wrong[(misses - 1) % D.wrong.length]
  const cells = [...Array(OFFSET).fill(null), ...Array.from({ length: DAYS }, (_, i) => i + 1)]

  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={misses}
        animate={misses ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-[300px] rounded-3xl bg-[#fffdf8] px-4 pb-5 pt-7 text-[#2d2638] shadow-2xl"
      >
        <span className="absolute -top-2 left-14 h-5 w-2.5 rounded-full bg-[#6a4cb4]" />
        <span className="absolute -top-2 right-14 h-5 w-2.5 rounded-full bg-[#6a4cb4]" />
        <h3 className="text-center font-display text-2xl font-extrabold">November 2025</h3>
        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-sm">
          {DOW.map((d) => (
            <span key={d} className="pb-1 text-xs opacity-60">{d}</span>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <span key={`e${i}`} />
            const flash = d === wrongDay
            return (
              <motion.button
                key={flash ? `${d}-${misses}` : d}
                type="button"
                onClick={() => pick(d)}
                aria-label={`Tanggal ${d}`}
                className="relative flex h-10 items-center justify-center rounded-full"
                initial={flash ? { backgroundColor: '#ffc2d1' } : false}
                animate={{ backgroundColor: 'rgba(255,194,209,0)' }}
                transition={{ duration: 0.9 }}
              >
                {solved && d === 25 && (
                  <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full scale-[1.3] overflow-visible" aria-hidden="true">
                    <motion.path
                      d={HEART}
                      fill="none"
                      stroke="#ff6f9c"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1 }}
                    />
                  </svg>
                )}
                <span className={`relative ${solved && d === 25 ? 'font-bold' : ''}`}>{d}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <div className="mt-4 min-h-[2rem] text-center">
        <AnimatePresence mode="wait">
          {misses === 0 || solved ? (
            <motion.p key="h" style={{ color: ink }} className="text-sm">{solved ? '❤' : msg}</motion.p>
          ) : (
            <motion.p
              key={misses}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-block max-w-[300px] rounded-2xl bg-[#2d2638] px-3 py-1.5 text-xs text-white"
            >
              {msg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}