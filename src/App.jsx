import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import OpeningScreen from './components/OpeningScreen.jsx'
import Journey from './components/Journey.jsx'
import { playTrack } from './audio/player.js'


function goFullscreen() {
  const el = document.documentElement
  const req = el.requestFullscreen || el.webkitRequestFullscreen
  try {
    req?.call(el, { navigationUI: 'hide' })?.catch?.(() => {})
  } catch {
    /* browser tidak mendukung, abaikan */
  }
}

export default function App() {
  const [stage, setStage] = useState('opening')

  const handleStart = () => {
    playTrack('/audio/intro.mp3') 
    goFullscreen()// tetap dipanggil langsung dari klik "Mulai"
    setStage('intro')
  }

  return (
    <>
      {/* intro langsung dipasang di belakang, jadi tidak ada jeda */}
      {stage === 'intro' && <Journey />}

      {/* opening memudar di atas intro (crossfade) */}
      <AnimatePresence>
        {stage === 'opening' && (
          <motion.div
            key="opening"
            className="fixed inset-0 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            <OpeningScreen onStart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}