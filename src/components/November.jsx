import { useContext, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import StoryDialog from './StoryDialog.jsx'
import HoldHands from './HoldHands.jsx'
import Clothesline from './Clothesline.jsx'
import DateQuiz from './DateQuiz.jsx'
import ChatOverlay from './ChatOverlay.jsx'
import { setVolume } from '../audio/player.js'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SAND = '#f3dfb9'
const SAND_INK = '#5a4630'
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

/* ---------- laut, ombak, botol ---------- */
function Waves({ progress }) {
  const x1 = useTransform(progress, [0, 1], [-40, 40])
  const x2 = useTransform(progress, [0, 1], [40, -40])
  const d = 'M0 22Q25 6 50 22T100 22T150 22T200 22T250 22T300 22T350 22T400 22T450 22T500 22V50H0Z'
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-12 overflow-hidden" aria-hidden="true">
      <motion.svg style={{ x: x1 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-1 h-12 w-[calc(100%+80px)]">
        <path d={d} fill="#fff" fillOpacity=".85" />
      </motion.svg>
      <motion.svg style={{ x: x2 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-0 h-12 w-[calc(100%+80px)]">
        <path d={d} fill={SAND} />
      </motion.svg>
    </div>
  )
}

function Bottle({ uncorked }) {
  return (
    <svg width="64" height="120" viewBox="0 0 64 120" aria-hidden="true">
      <motion.g animate={uncorked ? { y: -22, rotate: 25, opacity: 0 } : { y: 0 }} transition={{ duration: 0.6 }}>
        <rect x="26" y="2" width="12" height="14" rx="3" fill="#d79a52" />
      </motion.g>
      <path
        d="M24 16h16v14c0 6 14 12 14 30v46a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V60c0-18 14-24 14-30z"
        fill="#b8a5dc"
        stroke="#6a4cb4"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="25" y="62" width="14" height="30" rx="2" fill="#fffdf8" />
      <path d="M28 70h8M28 76h8M28 82h5" stroke="#8d86a3" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 62v36" stroke="#fff" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function NovLaut() {
  const N = NOVEMBER.beach
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const [uncorked, setUncorked] = useState(false)
  const [open, setOpen] = useState(false)

  const grab = () => {
    if (uncorked) return setOpen(true)
    setUncorked(true)
    setTimeout(() => setOpen(true), 700)
  }

const SPARKS = [[12, 58], [26, 70], [44, 62], [60, 74], [76, 60], [88, 68], [34, 80], [70, 84]]
const GULLS = [{ t: '12%', l: '16%', d: 0 }, { t: '20%', l: '34%', d: 1.4 }, { t: '9%', l: '56%', d: 2.6 }]

function SeaDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute right-[12%] top-[7%] h-16 w-16 rounded-full bg-[#fff3c4]"
        style={{ boxShadow: '0 0 40px 18px rgba(255,236,170,.65)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute -left-10 top-[10%] h-9 w-32 rounded-full bg-white/70 blur-md" animate={{ x: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute right-[30%] top-[22%] h-7 w-24 rounded-full bg-white/55 blur-md" animate={{ x: [0, -34, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      {GULLS.map((g) => (
        <motion.svg
          key={g.l}
          width="26"
          height="12"
          viewBox="0 0 26 12"
          className="absolute"
          style={{ top: g.t, left: g.l }}
          animate={{ x: [0, 60, 0], y: [0, -6, 0] }}
          transition={{ duration: 9 + g.d * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M1 8Q7 0 13 7Q19 0 25 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      ))}
      <motion.svg
        width="56"
        height="52"
        viewBox="0 0 60 56"
        className="absolute left-[14%] top-[44%]"
        style={{ transformOrigin: '50% 100%' }}
        animate={{ rotate: [-3, 3, -3], y: [0, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="29" y="2" width="2" height="40" fill="#6b5a85" />
        <path d="M28 4L28 38L8 38Z" fill="#fff" />
        <path d="M33 12L33 38L52 38Z" fill="#ffe3ee" />
        <path d="M6 42H54L46 52H14Z" fill="#8a62b0" />
      </motion.svg>
      {SPARKS.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute h-0.5 w-3 rounded bg-white"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </div>
  )
}

  return (
    <section ref={ref} className="relative">
      <motion.h2 {...fade} style={{ color: ink }} className={`pt-[8svh] ${H2}`}>{N.title}</motion.h2>
     <div className="relative mt-6 h-[44svh] min-h-[300px] overflow-hidden bg-gradient-to-b from-[#7ea6ee] to-[#b6cdf6]">
  <SeaDecor />
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2">
          <motion.div animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <button type="button" onClick={grab} aria-label="Ambil botol pesan" className="flex flex-col items-center">
              <Bottle uncorked={uncorked} />
              <span className="mt-2 text-sm text-white/90">{N.bottleHint}</span>
            </button>
          </motion.div>
        </div>
        <Waves progress={scrollYProgress} />
      </div>
      <StoryDialog open={open} onClose={() => setOpen(false)} title={N.story.title} paragraphs={N.story.paragraphs} />
    </section>
  )
}

/* ---------- jejak kaki ---------- */
const pop = { hide: { opacity: 0, scale: 0.5 }, show: { opacity: 0.9, scale: 1, transition: { duration: 0.4 } } }
const TOES = [[-6.5, -13.5], [-2.5, -16.5], [1.5, -16.5], [5.5, -13.5]]

function Foot({ x, y, r, c }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <motion.g variants={pop}>
        <ellipse rx="7" ry="12" fill={c} />
        {TOES.map(([tx, ty]) => (
          <circle key={tx} cx={tx} cy={ty} r="2.5" fill={c} />
        ))}
      </motion.g>
    </g>
  )
}

// Dua pasang jejak: awalnya berjauhan, makin lama makin dekat
// Jejak kaki kiri dan kanan tiap karakter, bergantian. Awalnya berjauhan, makin lama makin dekat
function Footprints() {
  const steps = Array.from({ length: 6 }, (_, i) => ({ y: 28 + i * 78, s: 84 - i * 10 }))
  return (
    <motion.svg
      viewBox="0 0 390 490"
      className="mx-auto block w-full max-w-[420px]"
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hide: {}, show: { transition: { staggerChildren: 0.1 } } }}
      aria-hidden="true"
    >
      {steps.map((st, i) => (
        <g key={i}>
          {/* koala: kaki kiri lalu kanan */}
          <Foot x={195 - st.s - 11} y={st.y} r={-8} c="#bfa0c8" />
          <Foot x={195 - st.s + 11} y={st.y + 36} r={8} c="#bfa0c8" />
          {/* kucing: kaki kiri lalu kanan, sedikit bergeser dari koala */}
          <Foot x={195 + st.s - 11} y={st.y + 18} r={-8} c="#d3a06c" />
          <Foot x={195 + st.s + 11} y={st.y + 54} r={8} c="#d3a06c" />
        </g>
      ))}
    </motion.svg>
  )
}

function NovJejak() {
  return (
    <section className="relative pt-[4svh]" style={sec('nov-jejak')}>
      <Footprints />
    </section>
  )
}

function NovGandeng() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[6svh]" style={sec('nov-gandeng')}>
      <motion.h2 {...fade} style={{ color: SAND_INK }} className={`mb-5 ${H2}`}>{NOVEMBER.hold.title}</motion.h2>
      <HoldHands />
    </section>
  )
}

function NovFoto() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[6svh]" style={sec('nov-foto')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{NOVEMBER.photos.title}</motion.h2>
      <Clothesline />
    </section>
  )
}


function Crab() {
  return (
    <svg width="46" height="34" viewBox="0 0 46 34" aria-hidden="true">
      <path d="M10 22l-6 6M14 25l-4 7M32 25l4 7M36 22l6 6M18 13V9M28 13V9" stroke="#d9573f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="23" cy="20" rx="14" ry="9" fill="#f26b4f" />
      <circle cx="6" cy="10" r="5" fill="#f26b4f" />
      <circle cx="40" cy="10" r="5" fill="#f26b4f" />
      <circle cx="18" cy="9" r="2.5" fill="#fff" />
      <circle cx="28" cy="9" r="2.5" fill="#fff" />
      <circle cx="18" cy="9" r="1.2" fill="#2a1f45" />
      <circle cx="28" cy="9" r="1.2" fill="#2a1f45" />
    </svg>
  )
}

const Starfish = ({ s = 38 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3L24.5 14.5L37 15L27.5 23L30.5 35L20 28.5L9.5 35L12.5 23L3 15L15.5 14.5Z" fill="#f59a7b" stroke="#e07a58" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="20" cy="19" r="2" fill="#fcd1bf" />
  </svg>
)

const Shell = ({ s = 34 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 35L5 18Q8 6 20 5Q32 6 35 18Z" fill="#f7c9d8" stroke="#e59ab5" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M20 35L12 11M20 35V6M20 35L28 11" stroke="#e59ab5" strokeWidth="1.2" fill="none" />
  </svg>
)

const Spiral = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="15" fill="#f3d3a8" stroke="#d9b07a" strokeWidth="1.5" />
    <path d="M20 20m0-3a3 3 0 1 1-3 3a6 6 0 1 1 6 6a9 9 0 1 1-9-9" fill="none" stroke="#d9b07a" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

function SandDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute left-[5%] top-[3%] rotate-[-15deg]"><Starfish /></div>
      <div className="absolute right-[9%] top-[11%] rotate-12"><Shell /></div>
      <motion.div className="absolute left-[12%] top-[22%]" animate={{ x: [0, 26, 0, -26, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <Crab />
      </motion.div>
      <div className="absolute right-[7%] top-[33%] rotate-[20deg]"><Spiral /></div>
      <div className="absolute left-[6%] top-[47%] rotate-[8deg]"><Shell s={30} /></div>
      <div className="absolute right-[10%] top-[58%] rotate-[-10deg]"><Starfish s={30} /></div>
      <div className="absolute left-[9%] top-[71%] rotate-[25deg]"><Spiral /></div>
      <div className="absolute right-[8%] top-[80%] rotate-[-8deg]"><Shell /></div>
      <div className="absolute left-[44%] top-[93%] rotate-12 opacity-90"><Starfish s={32} /></div>
    </div>
  )
}
// Satu hamparan pasir yang memudar di bawah, jadi tidak ada tepi keras
export function NovPantaiSand() {
  return (
    <div
      className="relative overflow-hidden pb-[9svh]"
      style={{
        backgroundColor: '#f3dfb9',
        backgroundImage: 'radial-gradient(#e3c896 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        borderBottomLeftRadius: '50% 90px',
        borderBottomRightRadius: '50% 90px',
        boxShadow: '0 18px 30px -10px rgba(0,0,0,.35)',
      }}
    >
      <SandDecor />
      <NovJejak />
      <NovGandeng />
      <NovFoto />
    </div>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const NovSore = () => <section aria-hidden="true" style={sec('nov-sore')} />

/* ---------- malam: pilih tanggal, chat, penutup ---------- */
const HEARTS = Array.from({ length: 8 }, (_, i) => ({ x: 6 + i * 12, d: i * 0.35, s: 14 + (i % 3) * 6 }))

export function NovMalam() {
  const N = NOVEMBER
  const { ink } = useContext(SkyContext)
  const [chat, setChat] = useState(false)
  const [done, setDone] = useState(false)

  const openChat = () => {
    setChat(true)
    setVolume(0.3, 1200) // lagu mengecil supaya chat terasa intim
  }
  const closeChat = () => {
    setChat(false)
    setDone(true)
    setVolume(0.85, 1500)
  }

  return (
    <section className="relative flex flex-col items-center px-6 pt-[8svh]" style={sec('nov-malam')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{N.date.title}</motion.h2>
      <DateQuiz onSolved={openChat} />

      <div className="relative mt-10 min-h-[220px] w-full text-center">
        {done && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0" aria-hidden="true">
              {HEARTS.map((h, i) => (
                <motion.svg
                  key={i}
                  width={h.s}
                  height={h.s}
                  viewBox="0 0 40 40"
                  className="absolute"
                  style={{ left: `${h.x}%`, bottom: 0 }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -170 }}
                  transition={{ duration: 3.2, delay: h.d + 0.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <path d={HEART} fill="#ff8fb1" />
                </motion.svg>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{ color: ink }}
              className="font-['Dancing_Script',cursive] text-[2rem] leading-snug"
            >
              {N.closing.text}
            </motion.p>
            {N.closing.codeLine && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.6 }} style={{ color: ink }} className="mt-5 text-sm">
                {N.closing.codeLine}
              </motion.p>
            )}
            <motion.button
              type="button"
              onClick={openChat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 2.4 }}
              style={{ color: ink }}
              className="mt-6 text-sm underline"
            >
              Baca chatnya lagi
            </motion.button>
          </>
        )}
      </div>

      <ChatOverlay open={chat} onClose={closeChat} />
    </section>
  )
}