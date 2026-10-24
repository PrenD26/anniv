import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { SkyContext } from './SkyBackground.jsx'
import StoryDialog from './StoryDialog.jsx'

const DOW = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const OFFSET = (new Date(2025, 9, 1).getDay() + 6) % 7 // 1 Okt 2025 = Rabu
const DAYS = new Date(2025, 10, 0).getDate()

export default function Calendar() {
  const C = OCTOBER.calendar
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(false), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const cells = [...Array(OFFSET).fill(null), ...Array.from({ length: DAYS }, (_, i) => i + 1)]

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-[300px] rounded-3xl bg-[#fffdf8] px-4 pb-5 pt-7 text-[#2d2638] shadow-2xl">
        <span className="absolute -top-2 left-14 h-5 w-2.5 rounded-full bg-[#6a4cb4]" />
        <span className="absolute -top-2 right-14 h-5 w-2.5 rounded-full bg-[#6a4cb4]" />
        <h3 className="text-center font-display text-2xl font-extrabold">{OCTOBER.title}</h3>
        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-sm">
          {DOW.map((d) => (
            <span key={d} className="pb-1 text-xs opacity-60">{d}</span>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <span key={`e${i}`} />
            if (d !== 5 && d !== 26) return <span key={d} className="py-2.5">{d}</span>
            const big = d === 5
            const ring = {
              fill: 'none',
              stroke: big ? '#ff6f9c' : '#7a5cc4',
              strokeWidth: 2.4,
              strokeLinecap: 'round',
              initial: { pathLength: 0 },
              animate: { pathLength: seen ? 1 : 0 },
              transition: { duration: 1.2, delay: big ? 0.5 : 1.4 },
            }
            return (
              <motion.button
                key={d}
                type="button"
                onClick={() => (big ? setOpen(true) : setToast(true))}
                aria-label={big ? 'Buka cerita first date' : 'Tanggal ulang tahun'}
                className="relative flex h-10 items-center justify-center font-bold"
                animate={big && seen ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
              >
                <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full scale-[1.3] overflow-visible" aria-hidden="true">
                  {big ? <motion.path d={HEART} {...ring} /> : <motion.circle cx="20" cy="20" r="16" {...ring} />}
                </svg>
                <span className="relative">{d}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 h-8 text-center">
        <AnimatePresence mode="wait">
          {toast ? (
            <motion.p key="t" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-block rounded-full bg-[#2d2638] px-3 py-1 text-xs text-white">
              {C.hint26}
            </motion.p>
          ) : (
            <motion.p key="h" style={{ color: ink }} className="text-sm">{C.hint}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <StoryDialog open={open} onClose={() => setOpen(false)} title={C.story.title} paragraphs={C.story.paragraphs} />
    </div>
  )
}