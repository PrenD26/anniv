import { useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

export function Img({ p, label, className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div className={`flex flex-col items-center justify-center bg-lilac-200 px-2 text-center text-xs text-ink ${className}`}>
        <b>{label}</b>
        <span className="mt-1 break-all opacity-70">{p.src}</span>
      </div>
    )
  }
  return <img src={p.src} alt={p.caption} onError={() => setBad(true)} draggable={false} className={`block object-cover ${className}`} />
}

export default function PhotoFrame({ photo, label, frameClass = '', imgClass = '', style }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.button
        type="button"
        layoutId={id}
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.97 }}
        aria-label={`Perbesar ${label}`}
        style={style}
        className={`bg-white ${frameClass}`}
      >
        <Img p={photo} label={label} className={imgClass} />
      </motion.button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div layoutId={id} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white p-3 pb-4 shadow-2xl">
                <Img p={photo} label={label} className="aspect-[4/5] w-full" />
                <p className="mt-3 text-center font-['Dancing_Script',cursive] text-2xl text-ink">{photo.caption}</p>
              </motion.div>
              <button type="button" aria-label="Tutup foto" onClick={() => setOpen(false)} className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/90 text-2xl leading-none text-ink">
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}