import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { APRIL } from '../data/april.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Slg from './Slg.jsx'
import Kts from './Kts.jsx'
import Pudak from './Pudak.jsx'
import SatinBouquet from './SatinBouquet.jsx'

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
      <div className={PANEL}>
        <Replayable Comp={Comp} D={D} />
      </div>
      {after}
    </section>
  )
}

export const AprSlg = () => <Stage id="apr-slg" D={APRIL.slg} Comp={Slg} />
export const AprKts = () => <Stage id="apr-kts" D={APRIL.kts} Comp={Kts} />

// Jeda: ganti hari dengan cepat, murni perubahan latar tanpa konten
export const AprJeda = () => <section aria-hidden="true" style={sec('apr-jeda')} />

export const AprPantai = () => <Pudak D={APRIL.beach} />
// Sore: murni jembatan latar, tanpa konten
export const AprSore = () => <section aria-hidden="true" style={sec('apr-sore')} />

export function AprBuket() {
  const { ink } = useContext(SkyContext)
  return (
    <Stage
      id="apr-buket"
      D={APRIL.bouquet}
      Comp={SatinBouquet}
      after={
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2 }}
          style={{ color: ink }}
          className={`mt-8 max-w-[300px] text-center text-[1.9rem] leading-snug ${SCRIPT}`}
        >
          {APRIL.closing}
        </motion.p>
      }
    />
  )
}