import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { FEBRUARY } from '../data/february.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import BallPit from './BallPit.jsx'
import Trampoline from './Trampoline.jsx'
import NeonSlide from './NeonSlide.jsx'
import BalloonCannon from './BalloonCannon.jsx'
import Rain from './Rain.jsx'
import { ValentineBox, DollHug, BouquetClip, FrameWall } from './Valentine.jsx'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SCRIPT = "font-['Dancing_Script',cursive]"
const PANEL = 'relative mt-4 h-[500px] w-full max-w-[360px] overflow-hidden rounded-3xl shadow-2xl'

// "Main lagi" memasang ulang permainan dari awal
function Replayable({ Comp, D }) {
  const [r, setR] = useState(0)
  return <Comp key={r} D={D} onAgain={() => setR((x) => x + 1)} />
}

function Ride({ id, D, Comp, head }) {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec(id)}>
      {head}
      <motion.h2 {...fade} style={{ color: ink }} className={`${H2} ${head ? 'mt-5 !text-[clamp(1.6rem,7vw,2rem)]' : ''}`}>{D.label}</motion.h2>
      <div className={PANEL}>
        <Replayable Comp={Comp} D={D} />
      </div>
    </section>
  )
}

function MilkyHead() {
  const M = FEBRUARY.milky
  const { ink } = useContext(SkyContext)
  return (
    <>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{M.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{M.date}</motion.p>
      <motion.p {...fade} style={{ color: ink }} className="text-sm">{M.subtitle}</motion.p>
    </>
  )
}

export const FebBola = () => <Ride id="feb-bola" D={FEBRUARY.pit} Comp={BallPit} head={<MilkyHead />} />
export const FebTramp = () => <Ride id="feb-tramp" D={FEBRUARY.tramp} Comp={Trampoline} />
export const FebLuncur = () => <Ride id="feb-luncur" D={FEBRUARY.slide} Comp={NeonSlide} />
export const FebMeriam = () => <Ride id="feb-meriam" D={FEBRUARY.cannon} Comp={BalloonCannon} />
export const FebHujan = () => <Ride id="feb-hujan" D={FEBRUARY.rain} Comp={Rain} />

// Sore: murni jembatan latar, tanpa konten
export const FebSore = () => <section aria-hidden="true" style={sec('feb-sore')} />

export function FebKotak() {
  const V = FEBRUARY.valentine
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec('feb-kotak')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{V.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{V.date}</motion.p>
      <motion.p {...fade} style={{ color: ink }} className="mb-6 text-sm">{V.subtitle}</motion.p>
      <ValentineBox />
    </section>
  )
}

export function FebBoneka() {
  const V = FEBRUARY.valentine
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec('feb-boneka')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-5 ${H2}`}>{V.doll.title}</motion.h2>
      <DollHug />
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-4 mt-12 ${H2}`}>{V.bouquet.title}</motion.h2>
      <BouquetClip />
    </section>
  )
}

export function FebBingkai() {
  const V = FEBRUARY.valentine
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec('feb-bingkai')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{V.frame.title}</motion.h2>
      <FrameWall />
    </section>
  )
}