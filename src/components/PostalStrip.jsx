import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import PhotoFrame from './Photo.jsx'

const AIRMAIL = 'repeating-linear-gradient(135deg, #c8414b 0 9px, #fbf4ea 9px 15px, #3156a3 15px 24px, #fbf4ea 24px 30px)'
const TILT = [-3, 4, -2]

// Bingkai putih bertepi perangko (lubang bulat di sekeliling)
function Scallop({ w, h, rot = 0, children }) {
  const id = useId().replace(/:/g, '')
  const nx = Math.round(w / 11)
  const ny = Math.round(h / 11)
  const holes = []
  for (let i = 0; i <= nx; i++) holes.push([(i * w) / nx, 0], [(i * w) / nx, h])
  for (let j = 1; j < ny; j++) holes.push([0, (j * h) / ny], [w, (j * h) / ny])
  return (
    <div className="relative shrink-0" style={{ width: w, height: h, transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 3px 4px rgba(80,50,40,.35))' }}>
      <svg width={w} height={h} className="absolute inset-0" aria-hidden="true">
        <defs>
          <mask id={id}>
            <rect width={w} height={h} fill="#fff" />
            {holes.map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r="4.4" fill="#000" />
            ))}
          </mask>
        </defs>
        <rect width={w} height={h} fill="#fff" mask={`url(#${id})`} />
      </svg>
      <div className="absolute" style={{ inset: 10 }}>{children}</div>
    </div>
  )
}

const Blossom = ({ s = 56 }) => (
  <svg width={s} height={s} viewBox="0 0 60 60" aria-hidden="true">
    <g fill="#d98080" stroke="#b85a5a" strokeWidth="1">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="30" cy="15" rx="10" ry="13" transform={`rotate(${a} 30 30)`} />
      ))}
    </g>
    <circle cx="30" cy="30" r="7" fill="#7a3a3a" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx="30" cy="21" r="1.6" fill="#f2d8c8" transform={`rotate(${a} 30 30)`} />
    ))}
  </svg>
)

const Dried = ({ s = 52 }) => (
  <svg width={s} height={s} viewBox="0 0 60 60" aria-hidden="true">
    <path d="M30 56Q26 40 34 28" stroke="#c9b08a" strokeWidth="1.6" fill="none" />
    <g fill="#f6dcd2" stroke="#e2bfb0" strokeWidth=".8">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="34" cy="17" rx="6" ry="8" transform={`rotate(${a} 34 26)`} />
      ))}
    </g>
    <circle cx="34" cy="26" r="3" fill="#e8c9a0" />
  </svg>
)

function Postmark({ S }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" style={{ color: '#2a2630' }} role="img" aria-label="Cap pos">
      <defs>
        <path id={id} d="M23 56A33 33 0 0 1 89 56" />
      </defs>
      <circle cx="56" cy="56" r="50" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="56" cy="56" r="43" fill="none" stroke="currentColor" strokeWidth="1" />
      <text fontSize="9" fontWeight="700" fill="currentColor" fontFamily="DM Sans, sans-serif">
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle" textLength="92" lengthAdjust="spacing">
          {S.top}
        </textPath>
      </text>
      <text x="56" y="60" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor" fontFamily="DM Sans, sans-serif">{S.date}</text>
      <text x="56" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" fontFamily="DM Sans, sans-serif">{S.year}</text>
      <rect x="24" y="80" width="64" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text x="56" y="91" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="2" fill="currentColor" fontFamily="DM Sans, sans-serif">{S.note}</text>
    </svg>
  )
}

export default function PostalStrip({ photos, B }) {
  const S = B.stamp
  const [stamped, setStamped] = useState(false)

  return (
    <div className="mx-auto w-[212px] p-[9px] shadow-2xl" style={{ background: AIRMAIL }}>
      <div className="relative px-1 pb-3 pt-2" style={{ background: 'linear-gradient(180deg,#f7ebe0,#efd9ca 55%,#f6e6da)' }}>
        <p
          className="text-center font-['Dancing_Script',cursive] text-[2.1rem] font-semibold leading-none text-[#1d1b22]"
          style={{ transform: 'rotate(-2deg)' }}
        >
          {B.stripTitle}
        </p>
        <div className="mt-2 flex flex-col items-center gap-[10px]">
          {photos.map((p, i) => (
            <Scallop key={p.src} w={170} h={152} rot={TILT[i % 3]}>
              <PhotoFrame
                photo={p}
                label={`foto photobooth ${i + 1}`}
                frameClass="block h-full w-full overflow-hidden !bg-transparent"
                imgClass="h-full w-full"
              />
            </Scallop>
          ))}
        </div>

        <div className="pointer-events-none absolute z-10" style={{ left: -4, top: 168 }}><Blossom /></div>
        <div className="pointer-events-none absolute z-10" style={{ right: -2, top: 494 }}><Dried /></div>

        <button
          type="button"
          onClick={() => {
            if (stamped) return
            setStamped(true)
            navigator.vibrate?.(30)
          }}
          aria-label="Cap pos"
          className="relative mt-3 block h-[132px] w-full"
        >
          {!stamped && (
            <motion.span
              className="absolute left-1/2 top-1/2 -ml-[54px] -mt-[54px] flex h-[108px] w-[108px] items-center justify-center rounded-full border-2 border-dashed border-[#b5a79a] px-3 text-center text-[11px] text-[#9a8b80]"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              {S.hint}
            </motion.span>
          )}
          {stamped && (
            <motion.div
              className="absolute left-1/2 top-1/2 -ml-[56px] -mt-[56px]"
              initial={{ scale: 2.4, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 0.88, rotate: -12 }}
              transition={{ type: 'spring', damping: 12, stiffness: 260 }}
            >
              <Postmark S={S} />
            </motion.div>
          )}
        </button>
      </div>
    </div>
  )
}