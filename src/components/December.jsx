import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { DECEMBER } from '../data/december.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Tickets from './Tickets.jsx'
import TrainScene from './TrainScene.jsx'
import TrainWindow from './TrainWindow.jsx'
import GoldenShop from './GoldenShop.jsx'
import Bouquet from './Bouquet.jsx'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SCRIPT = "font-['Dancing_Script',cursive]"

const BOKEH = [
  { x: '4%', y: '12%', s: 90, c: '#ffb36b' },
  { x: '78%', y: '20%', s: 70, c: '#ff8fb1' },
  { x: '70%', y: '62%', s: 110, c: '#ffc86b' },
  { x: '-6%', y: '55%', s: 100, c: '#c47ad9' },
  { x: '40%', y: '64%', s: 80, c: '#ffb36b' },
]

export function DesTiket() {
  const { ink } = useContext(SkyContext)
  const [done, setDone] = useState(false)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[8svh]" style={sec('des-tiket')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-5 ${H2}`}>{DECEMBER.tickets.title}</motion.h2>
      <Tickets done={done} onDone={() => setDone(true)} />
      <div className="-mx-4 mt-8 w-[calc(100%+2rem)]">
        <TrainScene running={done} />
      </div>
    </section>
  )
}

export const DesJendela = TrainWindow

export function DesGolden() {
  const G = DECEMBER.golden
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec('des-golden')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{G.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-2 text-2xl ${SCRIPT}`}>{G.date}</motion.p>
      <motion.p {...fade} style={{ color: ink }} className="text-sm">{G.subtitle}</motion.p>
      <GoldenShop />
    </section>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const DesSore = () => <section aria-hidden="true" style={sec('des-sore')} />

export function DesMalam() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center overflow-x-clip px-4 pt-[8svh]" style={sec('des-malam')}>
      {BOKEH.map((b, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full blur-2xl"
          style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: b.c }}
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.h2 {...fade} style={{ color: ink }} className={`relative mb-6 ${H2}`}>{DECEMBER.bouquet.title}</motion.h2>
      <div className="relative">
        <Bouquet />
      </div>
    </section>
  )
}