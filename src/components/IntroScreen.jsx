import { motion, useScroll, useTransform } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'

// Muncul dari bawah dengan jarak berbeda per lapisan = efek kedalaman (parallax)
const rise = (y, delay, duration = 1.8) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
})

// Karakter diletakkan di belakang, bulan sabit di depan sehingga badan mereka terselip di cekungan bulan
function Moon() {
  return (
    <div
      role="img"
      aria-label="Koala dan kucing oyen tidur di atas bulan sabit"
      className="relative"
      style={{ width: 'min(82vw, 330px, 44svh)', aspectRatio: '200 / 190', filter: 'drop-shadow(0 0 28px rgba(245,238,250,.3))' }}
    >
      <motion.div className="absolute" style={{ left: '20%', top: '23%', width: '40%', aspectRatio: '1 / 1' }} animate={{ y: [0, -2, 0], rotate: [-2, 1, -2] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
        <Koala mood="sleep" size="100%" />
      </motion.div>
      <motion.div className="absolute" style={{ left: '48%', top: '32%', width: '31%', aspectRatio: '1 / 1' }} animate={{ y: [0, -2, 0], rotate: [2, -1, 2] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
        <Cat mood="sleep" size="100%" />
      </motion.div>
      <svg viewBox="0 0 200 190" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M44.5 32.4A80 80 0 1 0 155.5 32.4A62 62 0 1 1 44.5 32.4Z" fill="#f5eefa" />
      </svg>
    </div>
  )
}

export default function IntroScreen() {
  const { scrollY } = useScroll()
  // parallax saat digulir: makin jauh lapisannya, makin lambat bergerak
  const moonY = useTransform(scrollY, [0, 800], [0, 280])
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0])

  return (
    <motion.div className="relative">
      <section className="relative h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#7a5cc4]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[#c47ad9]/15 blur-3xl" />

        {/* lapisan 2: bulan + koala + kucing */}
        <motion.div style={{ y: moonY }} className="absolute inset-x-0 top-[13svh] flex justify-center">
          <motion.div {...rise(170, 0.3, 2.2)}>
            <motion.div className="relative" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <Moon />
              {['z', 'Z'].map((z, i) => (
                <motion.span
                  key={z}
                  className="absolute font-display text-2xl font-bold text-lilac-200"
                  style={{ left: `${40 + i * 10}%`, top: '20%' }}
                  animate={{ y: [0, -28], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2.5 + i * 1.5 }}
                >
                  {z}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* lapisan 3: teks, menempel tepat di bawah bulan */}
        <div className="absolute inset-x-0 px-5 text-center" style={{ top: 'calc(13svh + min(82vw, 330px, 44svh) * 0.9 + 0.5rem)' }}>
          <motion.p {...rise(240, 1.0)} className="font-['Dancing_Script',cursive] text-[1.6rem] leading-tight text-[#d9a9ea]">
            untuk wanita yang aku sayangi
          </motion.p>
          <motion.h2
            {...rise(240, 1.3)}
            className="mt-1 font-['Dancing_Script',cursive] text-[2rem] font-semibold leading-tight text-[#ecc6f7]"
            style={{ textShadow: '0 0 18px rgba(217,169,234,.55)' }}
          >
            Kyla Salwa Annisa
          </motion.h2>
          <motion.h1
            {...rise(260, 1.8)}
            className="mt-5 font-display text-[clamp(2.7rem,13.5vw,3.8rem)] font-extrabold leading-[1.05] text-white"
            style={{ textShadow: '0 0 28px rgba(183,140,255,.7)' }}
          >
            Satu Tahun Bersamamu
          </motion.h1>
        </div>

        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-[3svh] text-center text-sm text-lilac-200">
          Gulir ke bawah
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            ⌄
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}