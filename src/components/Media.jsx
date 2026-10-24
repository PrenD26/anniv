import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoFrame from './Photo.jsx'
import { setVolume } from '../audio/player.js'

export const isVideo = (src = '') => /\.(mp4|webm|mov|m4v)$/i.test(src)

function VideoFrame({ item, label, frameClass = '', imgClass = '', style }) {
  const [open, setOpen] = useState(false)
  const [bad, setBad] = useState(false)

  const show = () => {
    setOpen(true)
    setVolume(0.12, 600) // lagu mengecil selama video main
  }
  const hide = () => {
    setOpen(false)
    setVolume(0.85, 900)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={show}
        whileTap={{ scale: 0.97 }}
        aria-label={`Putar ${label}`}
        style={style}
        className={`relative bg-white ${frameClass}`}
      >
        {bad ? (
          <div className={`flex flex-col items-center justify-center bg-lilac-200 px-2 text-center text-xs text-ink ${imgClass}`}>
            <b>{label}</b>
            <span className="mt-1 break-all opacity-70">{item.src}</span>
          </div>
        ) : (
          <video
            src={`${item.src}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            onError={() => setBad(true)}
            className={`block object-cover ${imgClass}`}
          />
        )}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-lg text-white">▶</span>
        </span>
      </motion.button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={hide}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-white p-3 pb-4 shadow-2xl"
              >
                <video src={item.src} autoPlay controls playsInline loop className="max-h-[70svh] w-full bg-black object-contain" />
                <p className="mt-3 text-center font-['Dancing_Script',cursive] text-2xl text-ink">{item.caption}</p>
              </motion.div>
              <button type="button" aria-label="Tutup video" onClick={hide} className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/90 text-2xl leading-none text-ink">
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

export default function MediaFrame({ item, label, frameClass = '', imgClass = '', style }) {
  if (!isVideo(item.src)) {
    return <PhotoFrame photo={item} label={label} frameClass={frameClass} imgClass={imgClass} style={style} />
  }
  return <VideoFrame item={item} label={label} frameClass={frameClass} imgClass={imgClass} style={style} />
}