import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { Koala } from './Characters.jsx'

const wait = (ms, timers) => new Promise((r) => timers.push(setTimeout(r, ms)))

function Typing({ side }) {
  const mine = side === 'frend'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-1 rounded-2xl px-4 py-3 ${mine ? 'bg-[#c9a2d8]' : 'bg-[#fffdf8]'}`}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-[#6b5a85]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

function Player({ onClose, chat }) {
  const C = chat || NOVEMBER.chat
  const first = C.chapters[0]
  const [items, setItems] = useState(first?.title ? [{ id: 'd0', divider: first.title }] : [])
  const [typing, setTyping] = useState(null)
  const [finished, setFinished] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    let off = false
    const timers = []
    ;(async () => {
      for (let c = 0; c < C.chapters.length && !off; c++) {
        const ch = C.chapters[c]
        if (c > 0) {
          await wait(1400, timers)
          if (off) return
          setItems((s) => [...s, { id: `d${c}`, divider: ch.title }])
          await wait(900, timers)
        }
        for (let i = 0; i < ch.bubbles.length; i++) {
          if (off) return
          const b = ch.bubbles[i]
          setTyping(b.from)
          await wait(Math.min(1800, 700 + b.text.length * 28), timers)
          if (off) return
          setTyping(null)
          setItems((s) => [...s, { ...b, id: `${c}-${i}` }])
          await wait(500, timers)
        }
      }
      if (off) return
      await wait(700, timers)
      setFinished(true)
    })()
    return () => {
      off = true
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' })
  }, [items, typing, finished])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-[#1d1438]"
      style={{ height: '100svh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-modal="true"
      aria-label="Chat"
    >
      <header className="flex items-center gap-3 bg-[#2b1f4d] px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] text-white">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#d4c6ea]">
          <Koala size={40} />
        </div>
        <div className="flex-1">
          <p className="font-semibold leading-tight">{C.contact}</p>
          <p className="text-xs text-lilac-200">{typing === 'kyla' ? 'mengetik...' : 'online'}</p>
        </div>
        <button type="button" aria-label="Tutup chat" onClick={onClose} className="h-10 w-10 rounded-full text-2xl leading-none text-white/80">
          ×
        </button>
      </header>

      <div
        ref={box}
        className="flex-1 space-y-2 overflow-y-auto px-3 py-4"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        {items.map((m) =>
          m.divider ? (
            <div key={m.id} className="flex justify-center">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-lilac-200">{m.divider}</span>
            </div>
          ) : (
            <motion.div
              key={m.id}
              className={`flex ${m.from === 'frend' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 240 }}
            >
              <div className="relative max-w-[78%]">
                <div
                  className={`rounded-2xl px-3.5 py-2 text-[15px] leading-snug text-[#2d2638] ${
                    m.from === 'frend' ? 'rounded-br-md bg-[#c9a2d8]' : 'rounded-bl-md bg-[#fffdf8]'
                  }`}
                >
                  {m.text}
                  {(m.time || m.from === 'frend') && (
                    <span className="ml-2 inline-block translate-y-0.5 text-[10px] text-[#6b5a85]">
                      {m.time}
                      {m.from === 'frend' && (
                        <span className="ml-1" style={{ color: finished ? '#2f9fd6' : '#6b5a85' }}>✓✓</span>
                      )}
                    </span>
                  )}
                </div>
                {m.react && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className={`absolute -bottom-3 ${m.from === 'frend' ? 'left-2' : 'right-2'} rounded-full bg-[#2b1f4d] px-1.5 py-0.5 text-xs shadow`}
                  >
                    {m.react}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ),
        )}
        {typing && <Typing side={typing} />}
      </div>

      <div className="min-h-[5rem] px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-2">
        <AnimatePresence>
          {finished && (
            <motion.button
              type="button"
              onClick={onClose}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-12 w-full rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] font-semibold text-white"
            >
              Lanjut
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ChatOverlay({ open, onClose, chat }) {
  return createPortal(<AnimatePresence>{open && <Player key="chat" onClose={onClose} chat={chat} />}</AnimatePresence>, document.body)
}