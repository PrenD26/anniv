import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { FEBRUARY } from '../data/february.js'
import { SkyContext } from './SkyBackground.jsx'
import { Koala } from './Characters.jsx'
import MediaFrame from './Media.jsx'
import { Img } from './Photo.jsx'

const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

const ICONS = {
  panda: (
    <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
      <rect x="6" y="10" width="44" height="38" rx="7" fill="#f7a8c4" />
      <circle cx="19" cy="17" r="5" fill="#2a1f45" />
      <circle cx="37" cy="17" r="5" fill="#2a1f45" />
      <circle cx="28" cy="29" r="12" fill="#fff" />
      <ellipse cx="23" cy="27" rx="3" ry="4" fill="#2a1f45" />
      <ellipse cx="33" cy="27" rx="3" ry="4" fill="#2a1f45" />
      <ellipse cx="28" cy="33" rx="2.4" ry="1.7" fill="#2a1f45" />
    </svg>
  ),
  silverqueen: (
    <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
      <rect x="4" y="16" width="48" height="28" rx="4" fill="#4b7be0" />
      <rect x="4" y="30" width="48" height="6" fill="#d9e4ff" />
      <path d="M17 26l3-9 6 6 2-8 2 8 6-6 3 9z" fill="#f5c451" />
    </svg>
  ),
  gelang: (
    <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
      <circle cx="28" cy="28" r="17" fill="none" stroke="#e8c27a" strokeWidth="5" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="28" cy="11" r="3.4" fill="#ff8fb1" transform={`rotate(${a} 28 28)`} />
      ))}
      <path d="M28 27c-5-4-6-8-3-9 2-1 3 0 3 2 0-2 1-3 3-2 3 1 2 5-3 9z" fill="#ff6f9c" />
    </svg>
  ),
  parfum: (
    <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
      <rect x="22" y="6" width="12" height="11" rx="3" fill="#d9a05a" />
      <rect x="15" y="17" width="26" height="33" rx="6" fill="#ffc2d9" stroke="#e58aa8" strokeWidth="1.5" />
      <rect x="20" y="26" width="16" height="14" rx="2" fill="#fff" opacity=".85" />
      <path d="M28 30l3 3-3 4-3-4z" fill="#e58aa8" />
    </svg>
  ),
}

/* ---------- 1. Kotak pink ---------- */
export function ValentineBox() {
  const V = FEBRUARY.valentine
  const { ink } = useContext(SkyContext)
  const x = useMotionValue(0)
  const bowOpacity = useTransform(x, [-200, -90, 0, 90, 200], [0, 1, 1, 1, 0])
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(null)
  const item = V.items.find((i) => i.id === sel)

  const unwrap = (dir = 1) => {
    if (open) return
    setOpen(true)
    navigator.vibrate?.(25)
    animate(x, dir * 260, { duration: 0.5 })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[250px] w-[290px]">
        <div className="absolute inset-x-0 top-[84px] z-[1] flex justify-center gap-2">
          {V.items.map((it, i) => (
            <motion.button
              key={it.id}
              type="button"
              disabled={!open}
              onClick={() => setSel(it.id)}
              aria-label={it.label}
              initial={false}
              animate={open ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.4 }}
              transition={open ? { type: 'spring', damping: 11, stiffness: 150, delay: 0.5 + i * 0.18 } : { duration: 0 }}
              className="h-14 w-14 rounded-2xl bg-white/90 p-1 shadow"
              style={{ outline: sel === it.id ? '3px solid #ff8fb1' : 'none' }}
            >
              {ICONS[it.id]}
            </motion.button>
          ))}
        </div>

        <div className="absolute inset-x-[18px] bottom-0 z-[2] h-[118px] rounded-b-2xl bg-[#f3a2bf]">
          <span className="absolute inset-y-0 left-1/2 -ml-3 w-6 bg-[#ff8fb1]" />
          <span className="absolute inset-x-0 top-0 h-2 bg-[#e0809f]" />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-[8px] top-[86px] z-[3] h-[48px] rounded-xl bg-[#ffc4d8] shadow-md"
          initial={false}
          animate={open ? { y: -80, rotate: -5, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: open ? 0.25 : 0 }}
        >
          <span className="absolute inset-y-0 left-1/2 -ml-3 w-6 bg-[#ff8fb1]" />
        </motion.div>

        {/* simpul pita: geser kiri atau kanan untuk membuka */}
        <motion.div
          className="absolute left-1/2 top-[56px] z-[4] -ml-[36px] w-[72px] cursor-grab"
          style={{ x, opacity: bowOpacity, touchAction: 'pan-y', pointerEvents: open ? 'none' : 'auto' }}
          drag={open ? false : 'x'}
          dragConstraints={{ left: -150, right: 150 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(_, info) =>
            Math.abs(info.offset.x) > 70 ? unwrap(Math.sign(info.offset.x) || 1) : animate(x, 0, { type: 'spring', damping: 18 })
          }
          onTap={() => Math.abs(x.get()) < 6 && unwrap(1)}
          role="button"
          tabIndex={0}
          aria-label="Buka kotak"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && unwrap(1)}
        >
          <svg width="72" height="46" viewBox="0 0 72 46" aria-hidden="true">
            <path d="M36 26C20 4 2 8 4 24C6 40 26 34 36 26Z" fill="#ff6f9c" />
            <path d="M36 26C52 4 70 8 68 24C66 40 46 34 36 26Z" fill="#ff6f9c" />
            <circle cx="36" cy="26" r="8" fill="#e8527f" />
          </svg>
        </motion.div>
      </div>

      <motion.p style={{ color: ink }} className="mt-3 h-5 text-sm">{open ? V.box.openHint : V.box.hint}</motion.p>

      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 w-[290px] rounded-2xl bg-[#fffdf8] p-4 text-center text-[#2d2638] shadow-xl"
          >
            <p className="font-display text-lg font-extrabold">{item.label}</p>
            <p className="mt-1 text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.6 }} className="mt-5 flex flex-col items-center">
          <MediaFrame item={V.box.photo} label="foto kotak pink" frameClass="w-[190px] p-2 pb-6 shadow-xl" imgClass="aspect-square w-full" style={{ rotate: -2 }} />
        </motion.div>
      )}
    </div>
  )
}

/* ---------- 2. Boneka koala dipeluk koala ---------- */
function Doll({ size = 126 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 120 132" role="img" aria-label="Boneka koala">
      <ellipse cx="60" cy="96" rx="44" ry="34" fill="#f4f1ee" />
      <ellipse cx="28" cy="104" rx="14" ry="18" fill="#9da3ad" transform="rotate(20 28 104)" />
      <ellipse cx="92" cy="104" rx="14" ry="18" fill="#9da3ad" transform="rotate(-20 92 104)" />
      <circle cx="26" cy="38" r="20" fill="#9da3ad" />
      <circle cx="94" cy="38" r="20" fill="#9da3ad" />
      <circle cx="26" cy="38" r="11" fill="#fbf8f5" />
      <circle cx="94" cy="38" r="11" fill="#fbf8f5" />
      <ellipse cx="60" cy="58" rx="40" ry="34" fill="#b4b9c2" />
      <ellipse cx="60" cy="66" rx="26" ry="22" fill="#fbf8f5" />
      <circle cx="42" cy="52" r="7" fill="#b9732a" />
      <circle cx="78" cy="52" r="7" fill="#b9732a" />
      <circle cx="42" cy="52" r="3.5" fill="#2a1f45" />
      <circle cx="78" cy="52" r="3.5" fill="#2a1f45" />
      <ellipse cx="60" cy="62" rx="9" ry="6.5" fill="#1f1a2e" />
      <path d="M52 72Q60 78 68 72" stroke="#2a1f45" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="66" r="5" fill="#f4b6c8" opacity=".7" />
      <circle cx="88" cy="66" r="5" fill="#f4b6c8" opacity=".7" />
    </svg>
  )
}

export function DollHug() {
  const D = FEBRUARY.valentine.doll
  const { ink } = useContext(SkyContext)
  const [hug, setHug] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <button type="button" onClick={() => setHug((h) => !h)} aria-label="Peluk boneka koala" className="relative h-[190px] w-[300px]">
        <motion.div className="absolute bottom-0 left-[22px]" animate={{ x: hug ? 52 : 0 }} transition={{ type: 'spring', damping: 14, stiffness: 120 }}>
          <Koala size={92} />
        </motion.div>
        <motion.div className="absolute bottom-0 right-[18px]" animate={{ scale: hug ? 1.07 : 1 }} style={{ transformOrigin: '50% 100%' }}>
          <Doll size={126} />
        </motion.div>
        {hug &&
          [0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="22"
              height="22"
              viewBox="0 0 40 40"
              className="absolute left-1/2 top-[40px]"
              style={{ marginLeft: (i - 1) * 24 }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -60, opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }}
              aria-hidden="true"
            >
              <path d={HEART} fill="#ff6f9c" />
            </motion.svg>
          ))}
      </button>
      <motion.p style={{ color: ink }} className="mt-2 text-sm">{hug ? D.hug : D.hint}</motion.p>
      <motion.p style={{ color: ink }} className="mt-3 max-w-[290px] text-center leading-relaxed">{D.story}</motion.p>
    </div>
  )
}

/* ---------- 3. Buket kedua ---------- */
function MiniBouquet() {
  return (
    <motion.svg
      width="150"
      height="170"
      viewBox="0 0 160 170"
      style={{ transformOrigin: '50% 100%' }}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      role="img"
      aria-label="Buket mawar merah, putih, pink, dan aster ungu"
    >
      <path d="M80 160L70 90M80 160L52 96M80 160L108 96M80 160L90 84M80 160L34 104M80 160L126 104" stroke="#5f9f6a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="110" rx="20" ry="8" transform="rotate(-30 50 110)" fill="#6fb37a" />
      <ellipse cx="110" cy="110" rx="20" ry="8" transform="rotate(30 110 110)" fill="#6fb37a" />
      <circle cx="84" cy="44" r="22" fill="#d92b3a" />
      <path d="M84 44m-3-1a4 4 0 1 1 4 4a9 9 0 1 1-9-9" fill="none" stroke="#a91d2c" strokeWidth="2" />
      <circle cx="50" cy="68" r="18" fill="#fffdf8" stroke="#e8e0d0" strokeWidth="1.5" />
      <circle cx="50" cy="68" r="7" fill="#f3ead6" />
      <g fill="#f4a6c4">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="116" cy="58" rx="5" ry="10" transform={`rotate(${a} 116 68)`} />
        ))}
      </g>
      <circle cx="116" cy="68" r="5" fill="#ffd966" />
      {[[34, 94], [64, 102], [98, 102], [128, 94]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="11" fill="#b88be8" />
          <circle cx={x} cy={y} r="4" fill="#ffd966" />
        </g>
      ))}
      <path d="M80 164L22 92Q80 112 138 92Z" fill="rgba(255,255,255,.45)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.svg>
  )
}

export function BouquetClip() {
  const B = FEBRUARY.valentine.bouquet
  const { ink } = useContext(SkyContext)
  return (
    <div className="flex flex-col items-center">
      <MiniBouquet />
      <MediaFrame item={B.video} label="klip buket" frameClass="mt-4 w-[200px] p-2 pb-7 shadow-xl" imgClass="aspect-[3/4] w-full" style={{ rotate: -2 }} />
      <motion.p style={{ color: ink }} className="mt-4 max-w-[290px] text-center leading-relaxed">{B.story}</motion.p>
    </div>
  )
}

/* ---------- 4. Bingkai kolase (paling bawah) ---------- */
export function FrameWall() {
  const F = FEBRUARY.valentine.frame
  const { ink } = useContext(SkyContext)
  const [sel, setSel] = useState(null)
  const [big, setBig] = useState(false)
  const m = sel !== null ? F.memories[sel] : null

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] rounded-3xl bg-[#e4e9ee] px-8 pb-8 pt-14 shadow-2xl">
        <motion.div
          className="relative mx-auto w-[236px]"
          style={{ transformOrigin: '50% -30px' }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="236" height="40" viewBox="0 0 236 40" className="absolute -top-9 left-0" aria-hidden="true">
            <path d="M24 40L118 6L212 40" stroke="#8a7a6a" strokeWidth="2" fill="none" />
            <circle cx="118" cy="6" r="4" fill="#6b5a85" />
          </svg>
          <div className="p-[14px] shadow-xl" style={{ background: 'repeating-linear-gradient(90deg, #efdcc0 0 3px, #e6cfae 3px 6px, #f3e4cc 6px 9px)' }}>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#222]">
              <Img p={F.photo} label="kolase foto" className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3">
                {F.memories.map((mem, i) => (
                  <button key={i} type="button" onClick={() => setSel(i)} aria-label={`Kenangan: ${mem.label}`} className="relative">
                    {sel === i && <span className="absolute inset-0 border-2 border-white/90 bg-white/15" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 min-h-[110px]">
        <AnimatePresence mode="wait">
          {m ? (
            <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-[290px] rounded-2xl bg-[#fffdf8] p-4 text-center text-[#2d2638] shadow-xl">
              <p className="font-display text-lg font-extrabold">{m.label}</p>
              <p className="mt-1 text-sm leading-relaxed">{m.text}</p>
            </motion.div>
          ) : (
            <motion.p key="h" style={{ color: ink }} className="text-center text-sm">{F.hint}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <button type="button" onClick={() => setBig(true)} className="text-sm underline" style={{ color: ink }}>
        {F.full}
      </button>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2 }}
        style={{ color: ink }}
        className="mt-8 max-w-[300px] text-center font-['Dancing_Script',cursive] text-[1.9rem] leading-snug"
      >
        {F.closing}
      </motion.p>

      {createPortal(
        <AnimatePresence>
          {big && (
            <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBig(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white p-3 shadow-2xl">
                <Img p={F.photo} label="kolase foto" className="aspect-[3/4] w-full" />
              </motion.div>
              <button type="button" aria-label="Tutup foto" onClick={() => setBig(false)} className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/90 text-2xl leading-none text-ink">
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}