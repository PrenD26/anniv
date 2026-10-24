import { useContext, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { MARCH } from '../data/march.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Takjil from './Takjil.jsx'
import Cafe from './Cafe.jsx'
import Silaturahmi from './Silaturahmi.jsx'
import Photobooth from './Photobooth.jsx'
import PostalStrip from './PostalStrip.jsx'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SCRIPT = "font-['Dancing_Script',cursive]"
const PANEL = 'relative mt-4 h-[500px] w-full max-w-[360px] overflow-hidden rounded-3xl shadow-2xl'

// "Main lagi" memasang ulang adegan dari awal
function Replayable({ Comp, D }) {
  const [r, setR] = useState(0)
  return <Comp key={r} D={D} onAgain={() => setR((x) => x + 1)} />
}

function Ride({ id, D, Comp }) {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec(id)}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{D.label}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{D.subtitle}</motion.p>
      <div className={PANEL}>
        <Replayable Comp={Comp} D={D} />
      </div>
    </section>
  )
}

export const MarTakjil = () => <Ride id="mar-takjil" D={MARCH.takjil} Comp={Takjil} />
export const MarKafe = () => <Ride id="mar-kafe" D={MARCH.cafe} Comp={Cafe} />

// Silaturahmi: pemandangan bergeser mengikuti gulir halaman
export function MarMotor() {
  const D = MARCH.motor
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section ref={ref} className="relative px-4" style={sec('mar-motor')}>
      <div className="sticky top-[7svh] flex flex-col items-center">
        <motion.h2 {...fade} style={{ color: ink }} className={H2}>{D.label}</motion.h2>
        <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{D.subtitle}</motion.p>
        <div className={PANEL}>
          <Silaturahmi D={D} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const MarSore = () => <section aria-hidden="true" style={sec('mar-sore')} />

export function MarBooth() {
  const B = MARCH.booth
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[8svh]" style={sec('mar-booth')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{B.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className="mb-6 mt-2 text-sm">{B.date}</motion.p>
      <Photobooth data={B} Skin={PostalStrip} />
    </section>
  )
}