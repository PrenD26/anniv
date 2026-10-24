import { useContext } from 'react'
import { motion } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { SkyContext } from './SkyBackground.jsx'
import PhotoFrame from './Photo.jsx'

const ROPE = 'M0 6Q180 26 360 6'
const ROWS = [
  [{ i: 0, x: 2, top: 10 }, { i: 1, x: 35.5, top: 16 }, { i: 2, x: 69, top: 10 }],
  [{ i: 3, x: 17.5, top: 13 }, { i: 4, x: 53.5, top: 13 }],
]

export default function Clothesline() {
  const P = NOVEMBER.photos
  const { ink } = useContext(SkyContext)

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-[360px]">
        {ROWS.map((row, r) => (
          <div key={r} className="relative h-[164px]">
            <svg viewBox="0 0 360 30" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[30px] w-full" aria-hidden="true">
              <path d={ROPE} fill="none" stroke="#8a7a6a" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {row.map(({ i, x, top }) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${x}%`, top, width: '29%', transformOrigin: '50% 0' }}
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3 + i * 0.45, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <span className="absolute -top-2 left-1/2 z-10 -ml-1 h-4 w-2 rounded bg-[#e7b863]" />
                <PhotoFrame
                  photo={P.list[i]}
                  label={`foto pantai ${i + 1}`}
                  frameClass="w-full p-1.5 pb-6 shadow-lg"
                  imgClass="aspect-square w-full"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <motion.p style={{ color: '#5a4630' }} className="mt-2 text-sm">{P.hint}</motion.p>
    </div>
  )
}