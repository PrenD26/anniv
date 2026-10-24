import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DECEMBER } from '../data/december.js'
import { SkyContext } from './SkyBackground.jsx'

const Field = ({ label, children }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider opacity-60">{label}</p>
    <p className="font-medium">{children}</p>
  </div>
)

function Stamp({ text }) {
  return (
    <motion.div
      className="pointer-events-none absolute right-3 top-14 rounded-md border-2 border-[#d6457a] px-2 py-0.5 text-sm font-bold tracking-[0.2em] text-[#d6457a]"
      style={{ rotate: -14 }}
      initial={{ scale: 2.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.85 }}
      transition={{ type: 'spring', damping: 14, stiffness: 260 }}
    >
      {text}
    </motion.div>
  )
}

function Ticket({ T, tilt, stamped, children }) {
  return (
    <motion.div className="relative w-[300px] overflow-hidden rounded-3xl bg-[#fffdf8] text-[#2d2638] shadow-xl" style={{ rotate: tilt }}>
      <div className="bg-[#c9a2d8] px-5 py-2 text-xs tracking-[0.18em]">TIKET KERETA</div>
      <div className="px-5 pb-4 pt-3">
        <p className="font-display text-[1.65rem] font-extrabold leading-none">{T.date}</p>
        <p className="mt-1 font-['Dancing_Script',cursive] text-xl text-[#6a4cb4]">{T.subtitle}</p>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <Field label="Berangkat">{T.from}</Field>
          <Field label="Tujuan">{T.to}</Field>
          {T.seat && <Field label="Kursi">{T.seat}</Field>}
        </div>
        <div className="mt-3 border-t border-dashed border-[#bdb4cc] pt-2">
          <p className="text-[10px] uppercase tracking-wider opacity-60">Penumpang</p>
          {children}
        </div>
      </div>
      {stamped && <Stamp text={T.stamp} />}
    </motion.div>
  )
}

export default function Tickets({ done, onDone }) {
  const T = DECEMBER.tickets
  const { ink } = useContext(SkyContext)
  const [started, setStarted] = useState(false)
  const [n, setN] = useState(0)

  // nama Kyla muncul seperti diketik
  useEffect(() => {
    if (!started || n >= T.kyla.length) return
    const t = setTimeout(() => setN((c) => c + 1), 85)
    return () => clearTimeout(t)
  }, [started, n])

  useEffect(() => {
    if (started && n >= T.kyla.length && !done) {
      const t = setTimeout(onDone, 500)
      return () => clearTimeout(t)
    }
  }, [started, n, done])

  return (
    <div className="flex flex-col items-center gap-4">
      <Ticket T={T} tilt={-1.5} stamped={done}>
        <p className="mt-0.5 h-8 text-lg font-semibold leading-8">{T.frend}</p>
      </Ticket>

      <Ticket T={T} tilt={1.5} stamped={done}>
        <button
          type="button"
          onClick={() => setStarted(true)}
          disabled={started}
          aria-label="Isi nama penumpang"
          className="mt-0.5 flex h-8 w-full items-center text-left text-lg font-semibold"
        >
          {started ? (
            <>
              {T.kyla.slice(0, n)}
              {n < T.kyla.length && <span className="ml-0.5 inline-block h-5 w-0.5 bg-[#2d2638]" />}
            </>
          ) : (
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-full border-b-2 border-dashed border-[#9a7fd8] text-sm font-normal text-[#9a7fd8]"
            >
              ketuk di sini
            </motion.span>
          )}
        </button>
      </Ticket>

      <motion.p style={{ color: ink }} className="h-5 text-sm">
        {done ? T.hintDone : T.hint}
      </motion.p>
    </div>
  )
}