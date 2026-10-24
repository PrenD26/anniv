let el = null
let fade = null
let current = null
let token = 0

function ramp(target, ms, done) {
  clearInterval(fade)
  const from = el.volume
  const steps = Math.max(1, Math.round(ms / 50))
  let n = 0
  fade = setInterval(() => {
    n++
    el.volume = Math.min(1, Math.max(0, from + ((target - from) * n) / steps))
    if (n >= steps) {
      clearInterval(fade)
      done?.()
    }
  }, 50)
}

export function playTrack(src, { volume = 0.85, fadeIn = 1300 } = {}) {
  if (src === current) return
  current = src
  const my = ++token
  if (!el) el = new Audio()
  const start = () => {
    if (my !== token) return
    el.src = src
    el.loop = true
    el.volume = 0
    el.play()
      .then(() => my === token && ramp(volume, fadeIn))
      .catch((e) => console.warn('Audio gagal diputar:', e))
  }
  if (!el.paused && el.src) ramp(0, 1500, start)
  else start()
}

export function stopTrack(ms = 1500) {
  if (!el || current === null) return
  current = null
  token++
  ramp(0, ms, () => el.pause())
}

// Kecilkan / besarkan volume lagu yang sedang main (dipakai saat chat muncul)
export function setVolume(v, ms = 1000) {
  if (!el || current === null) return
  ramp(v, ms)
}

export const currentSrc = () => current

// Jeda / lanjutkan lagu yang sedang aktif (dipakai pemutar kaset)
export function togglePause() {
  if (!el || current === null) return
  if (el.paused) {
    el.play().then(() => ramp(0.85, 700)).catch(() => {})
  } else {
    ramp(0, 450, () => el.pause())
  }
}

export function trackInfo() {
  if (!el || current === null) return { t: 0, d: 0, playing: false }
  return { t: el.currentTime || 0, d: el.duration || 0, playing: !el.paused }
}