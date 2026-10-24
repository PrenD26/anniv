import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { SkyContext } from './SkyBackground.jsx'
import Otter from './Otter.jsx'
import PhotoFrame from './Photo.jsx'

export default function GiftBox() {
  const G = OCTOBER.gift
  const { ink } = useContext(SkyContext)
  const [open, setOpen] = useState(false)
  const [pops, setPops] = useState(0)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[400px] w-[260px]">
        {/* boneka: muncul dari balik badan kotak */}
        <motion.button
          type="button"
          aria-label="Boneka berang-berang"
          onClick={() => open && setPops((p) => p + 1)}
          initial={false}
          animate={open ? { y: -30, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 13, stiffness: 90, delay: open ? 0.35 : 0 }}
          className="absolute left-1/2 z-0 -ml-[95px]"
          style={{ bottom: 78 }}
        >
          <Otter size={190} />
        </motion.button>

        {pops > 0 &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={`${pops}-${i}`}
              className="absolute z-30 h-3 w-3 rounded-full border border-white/80 bg-white/30"
              style={{ left: `${35 + i * 7}%`, bottom: 250 }}
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -80 - i * 10, scale: 1.2 }}
              transition={{ duration: 1.2, delay: i * 0.05 }}
            />
          ))}

        {/* badan kotak */}
        <div className="absolute bottom-0 left-1/2 z-10 -ml-[80px] h-[100px] w-[160px] rounded-b-2xl bg-[#b9a2e6]">
          <span className="absolute inset-y-0 left-1/2 -ml-2 w-4 bg-[#ff9db5]" />
        </div>

        {/* tutup kotak */}
        <motion.div
          className="absolute left-1/2 z-20 -ml-[88px] h-9 w-[176px] rounded-xl bg-[#9a7fd8]"
          style={{ bottom: 96 }}
          animate={open ? { y: -110, x: 90, rotate: 24, opacity: 0 } : { y: [0, -4, 0] }}
          transition={open ? { duration: 0.7, ease: 'easeOut' } : { duration: 1.6, repeat: Infinity }}
        >
          <span className="absolute inset-y-0 left-1/2 -ml-2 w-4 bg-[#ff9db5]" />
          <span className="absolute -top-5 left-1/2 -ml-9 h-7 w-7 -rotate-12 rounded-full border-4 border-[#ff9db5]" />
          <span className="absolute -top-5 left-1/2 ml-2 h-7 w-7 rotate-12 rounded-full border-4 border-[#ff9db5]" />
        </motion.div>

        {!open && (
          <button type="button" aria-label="Buka kado" onClick={() => setOpen(true)} className="absolute bottom-0 left-1/2 z-30 -ml-[88px] h-[150px] w-[176px]" />
        )}
      </div>

      <motion.p style={{ color: ink }} className="mt-2 h-6 text-center text-sm">
        {!open ? G.hintClosed : pops > 0 ? G.egg : G.hintOpen}
      </motion.p>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9, delay: open ? 1.2 : 0 }}
        className={`mt-5 flex flex-col items-center ${open ? '' : 'pointer-events-none'}`}
      >
        <motion.p style={{ color: ink }} className="max-w-[290px] text-center leading-relaxed">{G.story}</motion.p>
        <PhotoFrame photo={G.photo} label="foto boneka" frameClass="mt-4 w-[190px] p-2 pb-8 shadow-xl" imgClass="h-[190px] w-full" style={{ rotate: 3 }} />
      </motion.div>
    </div>
  )
}