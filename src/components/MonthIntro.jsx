import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Pembuka bulan: tiap lapisan bergerak dengan kecepatan berbeda = efek kedalaman (parallax)
export default function MonthIntro({ height, kicker, title, subtitle, children }) {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const kickerY = useTransform(p, [0, 1], [60, -60])
  const titleY = useTransform(p, [0, 1], [120, -120])
  const subY = useTransform(p, [0, 1], [190, -190])
  const glowA = useTransform(p, [0, 1], [220, -220])
  const glowB = useTransform(p, [0, 1], [90, -90])

  return (
    <section ref={ref} className="relative flex items-center justify-center overflow-hidden px-6 text-center text-white" style={{ minHeight: `${height}svh` }}>
      <motion.div style={{ y: glowA }} className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#c47ad9]/25 blur-3xl" />
      <motion.div style={{ y: glowB }} className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 rounded-full bg-[#7a5cc4]/30 blur-3xl" />
            {children}
      <div className="relative">
        <motion.p style={{ y: kickerY }} className="text-base text-lilac-100">{kicker}</motion.p>
        <motion.h2
          style={{ y: titleY, textShadow: '0 0 24px rgba(183,140,255,.7)' }}
          className="mt-2 font-display text-[clamp(2.8rem,15vw,4.2rem)] font-extrabold leading-none"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p style={{ y: subY }} className="mt-3 font-['Dancing_Script',cursive] text-3xl text-[#f3d9ff]">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}