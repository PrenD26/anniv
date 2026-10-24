// SATU-SATUNYA sumber tinggi halaman (satuan svh). Ubah di sini, langit dan koala ikut menyesuaikan.
export const SECTIONS = [
  { id: 'intro', h: 100, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'sept-title', h: 62, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'sept-toko', h: 106, sky: ['dawn', 'night'], mood: 'happy' },
  { id: 'sept-penutup', h: 60, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'okt-title', h: 70, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'okt-pagi', h: 62, sky: ['dawn', 'dawn'], mood: 'yawn' },
  { id: 'okt-momoyo', h: 68, sky: ['day', 'day'], mood: 'happy' },
  { id: 'okt-niceso', h: 112, sky: ['day', 'day'], mood: 'happy' },
    { id: 'okt-jejak', h: 72, sky: ['day', 'day'], mood: 'happy' },
  { id: 'okt-sore', h: 38, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'okt-ultah', h: 72, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'okt-dompet', h: 92, sky: ['night', 'night'], mood: 'sleep' },
    { id: 'nov-title', h: 80, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'nov-laut', h: 62, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'nov-jejak', h: 58, sky: ['day', 'day'], mood: 'happy' },
  { id: 'nov-gandeng', h: 66, sky: ['day', 'day'], mood: 'happy' },
  { id: 'nov-foto', h: 78, sky: ['day', 'day'], mood: 'happy' },
  { id: 'nov-sore', h: 38, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'nov-malam', h: 100, sky: ['night', 'night'], mood: 'sleep' },
   { id: 'des-title', h: 80, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'des-tiket', h: 108, sky: ['dawn', 'dawn'], mood: 'yawn' },
  { id: 'des-jendela', h: 85, sky: ['day', 'day'], mood: 'happy' },
  { id: 'des-golden', h: 85, sky: ['day', 'dusk'], mood: 'happy' },
  { id: 'des-sore', h: 38, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'des-malam', h: 100, sky: ['night', 'night'], mood: 'sleep' },
   { id: 'jan-title', h: 80, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'jan-taman', h: 140, sky: ['dawn', 'day'], mood: 'happy' },
  { id: 'jan-sore', h: 38, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'jan-booth', h: 135, sky: ['night', 'night'], mood: 'sleep' },
   { id: 'feb-title', h: 70, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'feb-bola', h: 96, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'feb-tramp', h: 88, sky: ['day', 'day'], mood: 'happy' },
  { id: 'feb-luncur', h: 88, sky: ['day', 'day'], mood: 'happy' },
  { id: 'feb-meriam', h: 88, sky: ['day', 'day'], mood: 'happy' },
  { id: 'feb-hujan', h: 90, sky: ['day', 'dusk'], mood: 'sleepy' },
  { id: 'feb-sore', h: 30, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'feb-kotak', h: 118, sky: ['dusk', 'night'], mood: 'sleepy' },
  { id: 'feb-boneka', h: 130, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'feb-bingkai', h: 112, sky: ['night', 'night'], mood: 'sleep' },
   { id: 'mar-title', h: 70, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'mar-takjil', h: 92, sky: ['day', 'dusk'], mood: 'happy' },
  { id: 'mar-kafe', h: 90, sky: ['dusk', 'night'], mood: 'sleepy' },
  { id: 'mar-motor', h: 160, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'mar-sore', h: 30, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'mar-booth', h: 160, sky: ['night', 'night'], mood: 'sleep' },
    { id: 'apr-title', h: 70, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'apr-slg', h: 100, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'apr-kts', h: 94, sky: ['day', 'day'], mood: 'happy' },
  { id: 'apr-jeda', h: 32, sky: ['dusk', 'night'], mood: 'sleepy' },
  { id: 'apr-pantai', h: 170, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'apr-sore', h: 28, sky: ['dusk', 'dusk'], mood: 'sleepy' },
  { id: 'apr-buket', h: 112, sky: ['night', 'night'], mood: 'sleep' },
   { id: 'may-title', h: 70, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'may-studio', h: 94, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'may-buket', h: 94, sky: ['day', 'day'], mood: 'happy' },
  { id: 'may-ultah', h: 94, sky: ['day', 'day'], mood: 'happy' },
  { id: 'may-sore', h: 32, sky: ['dusk', 'night'], mood: 'sleepy' },
  { id: 'dg-papan', h: 78, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'dg-bus', h: 94, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'dg-sky', h: 94, sky: ['night', 'dawn'], mood: 'yawn' },
  { id: 'dg-sikidang', h: 94, sky: ['day', 'day'], mood: 'happy' },
  { id: 'dg-mogok', h: 94, sky: ['day', 'dusk'], mood: 'sleepy' },
  { id: 'dg-malioboro', h: 150, sky: ['night', 'night'], mood: 'sleep' },
  { id: 'dg-pulang', h: 94, sky: ['fajar', 'day'], mood: 'yawn' },
  { id: 'jun-title', h: 62, sky: ['fajar', 'fajar'], mood: 'yawn' },
  { id: 'jun-bangun', h: 84, sky: ['fajar', 'dawn'], mood: 'yawn' },
  { id: 'jun-pantai', h: 108, sky: ['dawn', 'day'], mood: 'yawn' },
  { id: 'jun-galeri', h: 88, sky: ['day', 'day'], mood: 'happy' },
  { id: 'jun-sore', h: 34, sky: ['dusk', 'night'], mood: 'sleepy' },
  { id: 'jul-title', h: 80, sky: ['fajar', 'fajar'], mood: 'yawn' },
]

export const H = Object.fromEntries(SECTIONS.map((s) => [s.id, s.h]))
export const TOTAL = SECTIONS.reduce((a, s) => a + s.h, 0)
export const SCROLLABLE = TOTAL - 100

const PHASES = {
  night: { top: '#120a2e', bottom: '#4a3a85', stars: 1, clouds: 0, ink: '#f1e9ff' },
  dawn: { top: '#d3bff3', bottom: '#ffc9a0', stars: 0, clouds: 1, ink: '#3b2a63' },
  day: { top: '#ffcb98', bottom: '#8cc3f4', stars: 0, clouds: 1, ink: '#3b2a63' },
  dusk: { top: '#6fa8e8', bottom: '#3a2a73', stars: 0.3, clouds: 0.3, ink: '#f1e9ff' },
  fajar: { top: '#6b55b0', bottom: '#ffd2a3', stars: 0.6, clouds: 0.5, ink: '#ffffff' },
}

// Warna bertahan di tengah tiap bagian dan berganti halus di perbatasan
const pts = []
let top = 0
for (const s of SECTIONS) {
  pts.push({ y: top - 50 + s.h * 0.2, p: s.sky[0] })
  pts.push({ y: top - 50 + s.h * 0.8, p: s.sky[1] })
  top += s.h
}
let last = -1
const keys = pts.map((pt) => {
  let y = Math.min(Math.max(pt.y, 0), SCROLLABLE)
  if (y <= last) y = last + 0.001
  last = y
  return { y, ...PHASES[pt.p] }
})

export const SKY = {
  T: keys.map((k) => k.y / SCROLLABLE),
  TOP: keys.map((k) => k.top),
  BOTTOM: keys.map((k) => k.bottom),
  STARS: keys.map((k) => k.stars),
  CLOUDS: keys.map((k) => k.clouds),
  INK: keys.map((k) => k.ink),
}

export function moodAt(p) {
  const y = p * SCROLLABLE + 50
  let acc = 0
  for (const s of SECTIONS) {
    acc += s.h
    if (y < acc) return s.mood
  }
  return SECTIONS[SECTIONS.length - 1].mood
}