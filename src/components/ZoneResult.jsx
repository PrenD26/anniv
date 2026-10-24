import { motion } from 'framer-motion'
import MediaFrame from './Media.jsx'

export default function ZoneResult({ title, story, item, items, label, onAgain, againLabel = 'Main lagi', onClose, extra, delay = 0.4 }) {
  const list = items || (item ? [item] : [])
  const small = list.length > 1
  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1d1438]/85 px-6 text-center text-white backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-display text-3xl font-extrabold">{title}</p>
      {extra && <p className="mt-1 text-xs text-lilac-200">{extra}</p>}
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed">{story}</p>
      {list.length > 0 && (
        <div className="mt-4 flex justify-center gap-3">
          {list.map((it, i) => (
            <MediaFrame
              key={it.src}
              item={it}
              label={`${label} ${i + 1}`}
              frameClass={`${small ? 'w-[124px]' : 'w-[150px]'} p-1.5 pb-5 shadow-xl`}
              imgClass="aspect-square w-full"
              style={{ rotate: i % 2 ? -3 : 3 }}
            />
          ))}
        </div>
      )}
      <div className="mt-5 flex gap-3">
        {onAgain && (
          <button type="button" onClick={onAgain} className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            {againLabel}
          </button>
        )}
        {onClose && (
          <button type="button" onClick={onClose} className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            Tutup
          </button>
        )}
      </div>
    </motion.div>
  )
}