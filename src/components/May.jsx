import { useContext, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { MAY } from '../data/may.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Studio from './Studio.jsx'
import BouquetWrap from './BouquetWrap.jsx'
import Birthday from './Birthday.jsx'
import DiengBoard from './DiengBoard.jsx'
import BusNight from './BusNight.jsx'
import SkyView from './SkyView.jsx'
import Sikidang from './Sikidang.jsx'
import BusBreak from './BusBreak.jsx'
import Malioboro from './Malioboro.jsx'
import HomeBus from './HomeBus.jsx'

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

function Stage({ id, D, Comp, after }) {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec(id)}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{D.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{D.subtitle}</motion.p>
      {D.date && <motion.p {...fade} style={{ color: ink }} className="text-sm">{D.date}</motion.p>}
      <div className={PANEL}>
        <Replayable Comp={Comp} D={D} />
      </div>
      {after}
    </section>
  )
}

export const MeiStudio = () => <Stage id="may-studio" D={MAY.studio} Comp={Studio} />
export const MeiBuket = () => <Stage id="may-buket" D={MAY.bouquet} Comp={BouquetWrap} />
export const MeiUltah = () => <Stage id="may-ultah" D={MAY.birthday} Comp={Birthday} />

// Sore: murni jembatan latar, tanpa konten
export const MeiSore = () => <section aria-hidden="true" style={sec('may-sore')} />

export function DgPapan() {
  const D = MAY.dieng
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[7svh]" style={sec('dg-papan')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{D.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mb-5 mt-1 text-2xl ${SCRIPT}`}>{D.subtitle}</motion.p>
      <DiengBoard B={D.board} />
    </section>
  )
}

export const DgBus = () => <Stage id="dg-bus" D={MAY.bus} Comp={BusNight} />
export const DgSky = () => <Stage id="dg-sky" D={MAY.sky} Comp={SkyView} />
export const DgSikidang = () => <Stage id="dg-sikidang" D={MAY.sikidang} Comp={Sikidang} />
export const DgMogok = () => <Stage id="dg-mogok" D={MAY.mogok} Comp={BusBreak} />

// Malioboro: pemandangan bergeser mengikuti gulir halaman
export function DgMalioboro() {
  const D = MAY.malioboro
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section ref={ref} className="relative px-4" style={sec('dg-malioboro')}>
      <div className="sticky top-[7svh] flex flex-col items-center">
        <motion.h2 {...fade} style={{ color: ink }} className={H2}>{D.title}</motion.h2>
        <motion.p {...fade} style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{D.subtitle}</motion.p>
        <div className={PANEL}>
          <Malioboro D={D} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

export function DgPulang() {
  const { ink } = useContext(SkyContext)
  return (
    <Stage
      id="dg-pulang"
      D={MAY.pulang}
      Comp={HomeBus}
      after={
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2 }}
          style={{ color: ink }}
          className={`mt-8 max-w-[300px] text-center text-[1.9rem] leading-snug ${SCRIPT}`}
        >
          {MAY.closing}
        </motion.p>
      }
    />
  )
}