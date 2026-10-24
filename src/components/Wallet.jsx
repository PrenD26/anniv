import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { OCTOBER } from '../data/october.js'
import { SkyContext } from './SkyBackground.jsx'
import PhotoFrame from './Photo.jsx'

export default function Wallet() {
  const W = OCTOBER.wallet
  const { ink } = useContext(SkyContext)
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[480px] w-[260px]">
        <div className="absolute inset-x-0 bottom-0 h-[150px] rounded-3xl bg-[#5b3f9e]" />

        {/* area potong: kartu tidak pernah terlihat di luar kotak ini */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.div
            initial={false}
            animate={open ? { y: -70, rotate: -2 } : { y: 160, rotate: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 80 }}
            className={`absolute left-1/2 -ml-[105px] w-[210px] rounded-xl bg-[#fffdf8] p-3 text-[#2d2638] shadow-xl ${open ? '' : 'pointer-events-none'}`}
            style={{ bottom: 30 }}
          >
            <PhotoFrame photo={W.photo} label="foto di dalam dompet" frameClass="w-full p-1 shadow-md" imgClass="h-[120px] w-full" />
            <p className="mt-3 text-center font-['Dancing_Script',cursive] text-xl leading-snug">{W.message}</p>
          </motion.div>
        </div>

        {/* saku depan dompet */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={open}
          aria-label="Buka dompet"
          className="absolute inset-x-0 bottom-0 z-20 h-[110px] rounded-3xl bg-gradient-to-b from-[#7a5cc4] to-[#6a4cb4] shadow-xl"
        >
          <span className="absolute inset-2 rounded-[1.25rem] border-2 border-dashed border-white/35" />
          <span className="absolute left-1/2 top-4 h-5 w-5 -translate-x-1/2 rounded-full bg-[#f5c451] shadow" />
        </button>
      </div>
      <motion.p style={{ color: ink }} className="mt-2 text-sm">{open ? W.hintOpen : W.hint}</motion.p>
    </div>
  )
}