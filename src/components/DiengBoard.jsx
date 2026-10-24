import { motion } from 'framer-motion'

const KIND = { go: '#8fd0f2', rest: '#c9b2ff', plan: '#ffd98a', oops: '#ff8fa3', food: '#a8e6cf', home: '#ffd0e2' }

export default function DiengBoard({ B }) {
  return (
    <div className="w-full max-w-[340px] rounded-3xl bg-[#1c1633] p-4 shadow-2xl" style={{ perspective: 800 }}>
      <p className="mb-3 text-center text-xs font-bold tracking-[0.3em] text-[#ffd98a]">{B.title}</p>
      <div className="flex flex-col gap-1.5">
        {B.rows.map(([time, label, kind], i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-[#2b2150] px-3 py-1.5"
            style={{ transformOrigin: '50% 0%' }}
            initial={{ rotateX: -90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: KIND[kind] }} />
            <span className="w-[92px] shrink-0 text-xs font-bold tabular-nums text-[#ffd98a]">{time}</span>
            <span className="text-sm text-white">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}