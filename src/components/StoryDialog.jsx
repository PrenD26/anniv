import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function StoryDialog({ open, onClose, title, paragraphs = [] }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-[#fffdf8] p-6 text-[#2d2638] shadow-2xl"
          >
            <h3 className="font-display text-2xl font-extrabold">{title}</h3>
            {paragraphs.map((p) => (
              <p key={p} className="mt-3 leading-relaxed">{p}</p>
            ))}
            <button type="button" onClick={onClose} className="mt-5 h-11 w-full rounded-full bg-lilac-500 font-semibold text-white">
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}