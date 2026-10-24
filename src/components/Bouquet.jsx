import { useContext, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { DECEMBER } from '../data/december.js'
import { SkyContext } from './SkyBackground.jsx'

const FLOWERS = [
  { x: 150, y: 96, r: 36, c: '#c8a2f0' },
  { x: 98, y: 134, r: 31, c: '#ff9fc0' },
  { x: 204, y: 132, r: 31, c: '#fffdf8' },
  { x: 62, y: 182, r: 27, c: '#b88be8' },
  { x: 240, y: 180, r: 27, c: '#ffc2d9' },
  { x: 120, y: 182, r: 26, c: '#fffdf8' },
  { x: 184, y: 184, r: 25, c: '#d9bff7' },
]
const PETAL_COLORS = ['#c8a2f0', '#ff9fc0', '#fffdf8', '#d9bff7']
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  x: 30 + ((i * 53) % 240),
  c: PETAL_COLORS[i % 4],
  d: 4.5 + (i % 4) * 0.4,
  delay: 2 + i * 0.55,
  drift: (i % 2 ? 1 : -1) * (20 + (i % 3) * 12),
}))

function Flower({ f, i, open }) {
  return (
    <g transform={`translate(${f.x} ${f.y})`}>
      <motion.g
        initial={false}
        animate={open ? { scale: 1, opacity: 1 } : { scale: 0.15, opacity: 0 }}
        transition={open ? { type: 'spring', damping: 11, stiffness: 90, delay: 0.5 + i * 0.28 } : { duration: 0 }}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy={-f.r * 0.52}
            rx={f.r * 0.4}
            ry={f.r * 0.56}
            transform={`rotate(${a})`}
            fill={f.c}
            stroke="rgba(90,60,140,.18)"
            strokeWidth="1"
          />
        ))}
        <circle r={f.r * 0.26} fill="#ffd966" />
      </motion.g>
    </g>
  )
}

export default function Bouquet() {
  const B = DECEMBER.bouquet
  const { ink } = useContext(SkyContext)
  const x = useMotionValue(0)
  const paperOpacity = useTransform(x, [-240, 0, 240], [0, 1, 0])
  const [open, setOpen] = useState(false)

  const unwrap = (dir = 1) => {
    if (open) return
    setOpen(true)
    navigator.vibrate?.(25)
    animate(x, dir * 460, { duration: 0.8, ease: 'easeOut' })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[380px] w-[300px]">
        <svg viewBox="0 0 300 380" className="absolute inset-0 h-full w-full" aria-label="Buket bunga segar">
          {FLOWERS.map((f, i) => (
            <path
              key={i}
              d={`M150 336Q${(150 + f.x) / 2} ${(336 + f.y) / 2 + 20} ${f.x} ${f.y + f.r * 0.3}`}
              stroke="#5f9f6a"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          ))}
          <ellipse cx="106" cy="236" rx="22" ry="9" transform="rotate(-35 106 236)" fill="#6fb37a" />
          <ellipse cx="194" cy="236" rx="22" ry="9" transform="rotate(35 194 236)" fill="#6fb37a" />
          {FLOWERS.map((f, i) => (
            <Flower key={i} f={f} i={i} open={open} />
          ))}
          {/* bungkus bawah dan pita (selalu terlihat) */}
          <path d="M150 348L64 252Q150 276 236 252Z" fill="#f1dcc4" stroke="#d9bd9a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M150 348L108 262M150 348L192 262" stroke="#d9bd9a" strokeWidth="1.2" fill="none" />
          <path d="M104 266Q150 284 196 266L192 282Q150 300 108 282Z" fill="#ff9fc0" />
          <circle cx="150" cy="284" r="6" fill="#ff7aa0" />
        </svg>

        {/* kertas pembungkus: geser ke atas untuk membuka */}
        <motion.div
          className="absolute left-0 top-0 z-10 h-[300px] w-[300px] cursor-grab"
                   style={{ x, opacity: paperOpacity, touchAction: open ? 'auto' : 'pan-y', pointerEvents: open ? 'none' : 'auto' }}
          drag={open ? false : 'x'}
          dragDirectionLock
          dragConstraints={{ left: -240, right: 240 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -500) unwrap(-1)
            else if (info.offset.x > 70 || info.velocity.x > 500) unwrap(1)
            else animate(x, 0, { type: 'spring', damping: 18 })
          }}
          onTap={() => Math.abs(x.get()) < 6 && unwrap(1)}
          role="button"
          tabIndex={0}
          aria-label="Buka bungkus buket"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && unwrap(1)}
        >
          <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
            <path d="M150 298L28 132Q22 60 84 28Q150 4 216 28Q278 60 272 132Z" fill="#f1dcc4" stroke="#d9bd9a" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M150 298L110 70M150 298L190 70" stroke="#d9bd9a" strokeWidth="1.2" fill="none" />
          </svg>
          <motion.div
            className="absolute inset-x-0 top-[34%] flex flex-col items-center text-sm text-[#8a6b4a]"
                       animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <span className="text-2xl leading-none">‹ ›</span>
            <span>Geser kiri atau kanan</span>
          </motion.div>
        </motion.div>

        {open &&
          PETALS.map((p, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-3 w-2 rounded-[50%]"
              style={{ left: p.x, top: 60, background: p.c, boxShadow: '0 0 0 1px rgba(90,60,140,.15)' }}
              initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, 300], x: [0, p.drift], rotate: [0, 220] }}
              transition={{ duration: p.d, delay: p.delay, repeat: Infinity, repeatDelay: 1.5, ease: 'easeIn' }}
            />
          ))}
      </div>

      {!open && (
        <motion.p style={{ color: ink }} className="mt-3 text-sm">
          {B.hint}
        </motion.p>
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-5 w-[290px] -rotate-1 rounded-2xl bg-[#fffdf8] p-4 text-center text-[#2d2638] shadow-xl"
        >
          <p className="font-['Dancing_Script',cursive] text-2xl leading-snug">{B.card}</p>
        </motion.div>
      )}
    </div>
  )
}