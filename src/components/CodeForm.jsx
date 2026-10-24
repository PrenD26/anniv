import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CODE = '251125' // tanggal jadian: 25-11-25
const EMPTY = Array(6).fill('')

export default function CodeForm({ onMood, onStart }) {
  const [digits, setDigits] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | wrong | correct
  const refs = useRef([])
  const value = digits.join('')

  // langsung siap mengetik begitu form muncul
  useEffect(() => {
    refs.current[0]?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (value.length < 6) {
      setStatus('idle')
      onMood('happy')
      return
    }
    if (value === CODE) {
      setStatus('correct')
      onMood('happy')
      document.activeElement?.blur() // tutup keyboard agar tombol Mulai terlihat
      return
    }
    setStatus('wrong')
    onMood('sad')
    const t = setTimeout(() => {
      setDigits(EMPTY)
      refs.current[0]?.focus()
    }, 1400)
    return () => clearTimeout(t)
  }, [value])

  const fillFrom = (index, text) => {
    const clean = text.replace(/\D/g, '')
    if (!clean) return
    const next = [...digits]
    for (let j = 0; j < clean.length && index + j < 6; j++) next[index + j] = clean[j]
    setDigits(next)
    refs.current[Math.min(index + clean.length, 5)]?.focus()
  }

  const onChange = (i, e) => {
    const raw = e.target.value
    if (!raw.replace(/\D/g, '')) {
      const next = [...digits]
      next[i] = ''
      setDigits(next)
      return
    }
    fillFrom(i, raw.length > 1 ? raw : raw.slice(-1))
  }

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const next = [...digits]
      next[i - 1] = ''
      setDigits(next)
      refs.current[i - 1]?.focus()
    }
  }

  const ok = status === 'correct'

  return (
    <div className="flex w-full flex-col items-center">
      <label className="mb-3 text-base font-semibold text-lilac-100" htmlFor="digit-0">
        Masukkan kode kita
      </label>

      <motion.div
        className="flex gap-2"
        animate={status === 'wrong' ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            id={`digit-${i}`}
            ref={(el) => (refs.current[i] = el)}
            value={d}
            onChange={(e) => onChange(i, e)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            maxLength={6}
            readOnly={ok}
            aria-label={`Digit ${i + 1}`}
            className={`h-14 w-11 rounded-2xl border-2 bg-white/10 text-center text-2xl font-semibold text-white outline-none backdrop-blur-sm transition-colors focus:border-lilac-200 focus:bg-white/20 ${
              status === 'wrong' ? 'border-rose-300/80' : ok ? 'border-emerald-300/80' : 'border-lilac-300/40'
            }`}
          />
        ))}
      </motion.div>

      <p className="mt-3 h-5 text-sm text-lilac-200" role="status">
        {status === 'wrong' && 'Kodenya belum tepat, coba ingat lagi ya'}
        {ok && 'Betul, sayang!'}
        {status === 'idle' && 'Petunjuk: tanggal jadian kita (ddmmyy)'}
      </p>

      <motion.button
        type="button"
        disabled={!ok}
        onClick={onStart}
        animate={ok ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-6 h-[52px] w-56 rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] text-lg font-semibold text-white shadow-[0_0_24px_rgba(178,132,255,.45)] transition-opacity disabled:opacity-40"
      >
        Mulai
      </motion.button>
    </div>
  )
}
