import { createContext } from 'react'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import Stars from './Stars.jsx'
import { SKY } from '../timeline.js'
import MilkyWay from './MilkyWay.jsx'
export const SkyContext = createContext(null)
export const useInk = (progress) => useTransform(progress, SKY.T, SKY.INK)

export default function SkyBackground({ progress }) {
  const top = useTransform(progress, SKY.T, SKY.TOP)
  const bottom = useTransform(progress, SKY.T, SKY.BOTTOM)
  const sky = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`
  const starsOpacity = useTransform(progress, SKY.T, SKY.STARS)
  const cloudsOpacity = useTransform(progress, SKY.T, SKY.CLOUDS)
  const starsY = useTransform(progress, [0, 1], [0, -400])
  const c1 = useTransform(progress, [0, 1], [0, -1000])
  const c2 = useTransform(progress, [0, 1], [0, -1800])
  const c3 = useTransform(progress, [0, 1], [0, -600])

  return (
    <motion.div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: sky }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
    >
      <motion.div style={{ y: starsY, opacity: starsOpacity }} className="absolute inset-x-0 -top-[10%] h-[135%]">
               <MilkyWay />
        <Stars count={220} motes={6} />
      </motion.div>
      <motion.div style={{ opacity: cloudsOpacity }} className="absolute inset-0">
        <motion.div style={{ y: c1 }} className="absolute -left-16 top-[70%] h-24 w-64 rounded-full bg-white/60 blur-2xl" />
        <motion.div style={{ y: c2 }} className="absolute -right-20 top-[100%] h-28 w-72 rounded-full bg-white/50 blur-2xl" />
        <motion.div style={{ y: c3 }} className="absolute left-10 top-[115%] h-20 w-56 rounded-full bg-white/40 blur-2xl" />
      </motion.div>
    </motion.div>
  )
}