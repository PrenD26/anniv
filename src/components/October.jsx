import { useContext } from 'react'
import { motion } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import Calendar from './Calendar.jsx'
import IceCream from './IceCream.jsx'
import GiftBox from './GiftBox.jsx'
import Cake from './Cake.jsx'
import Wallet from './Wallet.jsx'
import PhotoFrame from './Photo.jsx'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SCRIPT = "font-['Dancing_Script',cursive]"

export function OktPagi() {
  return (
    <section className="relative flex items-center justify-center px-4" style={sec('okt-pagi')}>
      <Calendar />
    </section>
  )
}

export function OktMomoyo() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-6 pt-[6svh]" style={sec('okt-momoyo')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-4 ${H2}`}>{OCTOBER.icecream.title}</motion.h2>
      <IceCream />
    </section>
  )
}

export function OktJejak() {
  const { ink } = useContext(SkyContext)
  const { strip } = OCTOBER
  return (
    <section className="relative flex flex-col items-center px-6 pt-[8svh]" style={sec('okt-jejak')}>
      <motion.h3 {...fade} style={{ color: ink }} className={`text-3xl ${SCRIPT}`}>{strip.title}</motion.h3>
      <motion.div className="mt-4 flex w-[196px] flex-col gap-3 bg-white p-3 shadow-xl" style={{ rotate: -2 }}>
        {strip.photos.map((p, i) => (
          <div key={p.src} className="relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: -24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5, delay: i * 0.6 }}>
              <PhotoFrame photo={p} label={`foto first date ${i + 1}`} frameClass="w-full" imgClass="h-[128px] w-full" />
            </motion.div>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-white"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: i * 0.6 + 0.1 }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export function OktNiceSo() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-6 pt-[6svh]" style={sec('okt-niceso')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{OCTOBER.gift.title}</motion.h2>
      <GiftBox />
    </section>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const OktSore = () => <section aria-hidden="true" style={sec('okt-sore')} />

export function OktUltah() {
  const { ink } = useContext(SkyContext)
  const B = OCTOBER.birthday
  return (
    <section className="relative flex flex-col items-center justify-center px-6" style={sec('okt-ultah')}>
      <motion.h2 {...fade} style={{ color: ink }} className={H2}>{B.title}</motion.h2>
      <motion.p {...fade} style={{ color: ink }} className={`mb-8 mt-2 text-3xl ${SCRIPT}`}>{B.subtitle}</motion.p>
      <Cake />
    </section>
  )
}

export function OktDompet() {
  const { ink } = useContext(SkyContext)
  const W = OCTOBER.wallet
  return (
    <section className="relative flex flex-col items-center justify-center px-6" style={sec('okt-dompet')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{W.title}</motion.h2>
      <Wallet />
     
    </section>
  )
}