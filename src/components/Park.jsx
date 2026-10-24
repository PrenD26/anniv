import { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { JANUARY } from '../data/january.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'
import GoKart from './GoKart.jsx'
import WaterBike from './WaterBike.jsx'
import Haunted from './Haunted.jsx'
import SnowRoom from './SnowRoom.jsx'
import Arcade from './Arcade.jsx'

const RIDES = [
  { id: 'gokart', Comp: GoKart, color: '#ffb36b' },
  { id: 'water', Comp: WaterBike, color: '#8fd0f2' },
  { id: 'haunted', Comp: Haunted, color: '#b89cff' },
  { id: 'snow', Comp: SnowRoom, color: '#bfe6ff' },
  { id: 'arcade', Comp: Arcade, color: '#ff9fc0' },
]

export default function Park() {
  const P = JANUARY.park
  const { ink } = useContext(SkyContext)
  const [active, setActive] = useState(null)
  const [stamped, setStamped] = useState([])
  const [done, setDone] = useState([])
  const [round, setRound] = useState(0)

  const open = (id) => {
    setStamped((s) => (s.includes(id) ? s : [...s, id]))
    setActive(id)
  }
  const finish = (id) => setDone((d) => (d.includes(id) ? d : [...d, id]))
  const ride = RIDES.find((r) => r.id === active)

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative mt-8 w-full max-w-[360px]">
        <div className="pointer-events-none absolute -top-9 right-6 z-0 flex gap-1">
          <Koala size={46} />
          <Cat size={46} />
        </div>
        <div className="relative z-10 rounded-3xl bg-[#fffdf8] p-4 text-[#2d2638] shadow-xl">
          <p className="text-center font-display text-xl font-extrabold">{P.cardTitle}</p>
          <p className="text-center text-xs opacity-70">{P.cardHint}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-4">
            {RIDES.map((r, i) => {
              const st = stamped.includes(r.id)
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => open(r.id)}
                  aria-label={`Naik ${P[r.id].label}`}
                  className="flex w-[76px] flex-col items-center"
                >
                  <motion.span
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold"
                    initial={false}
                    animate={
                      st
                        ? { backgroundColor: r.color, borderColor: r.color, scale: [1.5, 1] }
                        : { backgroundColor: 'rgba(255,255,255,0)', borderColor: '#b9a3dc', scale: 1 }
                    }
                    transition={{ type: 'spring', damping: 12, stiffness: 220 }}
                    style={{ borderStyle: st ? 'solid' : 'dashed', outline: active === r.id ? '3px solid #7a5cc4' : 'none', outlineOffset: 2 }}
                  >
                    {done.includes(r.id) ? '✓' : i + 1}
                  </motion.span>
                  <span className="mt-1 text-xs font-semibold">{P[r.id].label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative mt-5 h-[540px] w-full max-w-[360px] overflow-hidden rounded-3xl bg-white/30 shadow-2xl">
        <AnimatePresence mode="wait">
          {ride ? (
            <motion.div
              key={`${ride.id}-${round}`}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ride.Comp D={{ ...P[ride.id] }} onDone={() => finish(ride.id)} onAgain={() => setRound((r) => r + 1)} />
            </motion.div>
          ) : (
            <motion.div key="empty" className="absolute inset-0 flex items-center justify-center px-8 text-center text-[#3b2a63]" exit={{ opacity: 0 }}>
              <p className="font-display text-xl font-extrabold">{P.stageEmpty}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 h-6">
        {done.length === RIDES.length && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ color: ink }} className="text-center font-semibold">
            {P.allDone}
          </motion.p>
        )}
      </div>
    </div>
  )
}