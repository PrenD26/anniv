import { useContext } from 'react'
import { motion } from 'framer-motion'
import { JANUARY } from '../data/january.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Park from './Park.jsx'
import Photobooth from './Photobooth.jsx'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SCRIPT = "font-['Dancing_Script',cursive]"

export function JanTaman() {
  const P = JANUARY.park
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[8svh]" style={sec('jan-taman')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{P.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-2 text-2xl ${SCRIPT}`}>{P.subtitle}</motion.p>
      <Park />
    </section>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const JanSore = () => <section aria-hidden="true" style={sec('jan-sore')} />

export function JanBooth() {
  const B = JANUARY.booth
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[8svh]" style={sec('jan-booth')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{B.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className="mb-6 mt-2 text-sm">{B.date}</motion.p>
      <Photobooth />
    </section>
  )
}