import { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'
import MediaFrame, { isVideo } from './Media.jsx'
import { Img } from './Photo.jsx'

const SAND = '#f3dfb9'
const INK = '#5a4630'
const AREA_H = 340 // tinggi area gali (px)
const BRUSH = 54 // lebar galian jari
const NEED = 260 // panjang goresan nama sebelum ombak boleh datang
const IDLE = 1700 // ms setelah jari diangkat sampai ombak datang
// posisi kerang di area gali: x dalam %, y dalam px (maksimal 6 kerang)
const POS = [{ x: 16, y: 62 }, { x: 74, y: 44 }, { x: 46, y: 128 }, { x: 14, y: 214 }, { x: 78, y: 200 }, { x: 50, y: 286 }]
const KINDS = ['scallop', 'star', 'spiral', 'conch', 'clam', 'scallop']
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'

/* ---------- ikon kerang ---------- */
function ShellIcon({ kind, s = 44 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden="true">
      {kind === 'scallop' && (
        <>
          <path d="M20 35L5 18Q8 6 20 5Q32 6 35 18Z" fill="#f7c9d8" stroke="#e59ab5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M20 35L12 11M20 35V6M20 35L28 11" stroke="#e59ab5" strokeWidth="1.2" fill="none" />
        </>
      )}
      {kind === 'star' && (
        <path d="M20 3L24.5 14.5L37 15L27.5 23L30.5 35L20 28.5L9.5 35L12.5 23L3 15L15.5 14.5Z" fill="#f59a7b" stroke="#e07a58" strokeWidth="1.5" strokeLinejoin="round" />
      )}
      {kind === 'spiral' && (
        <>
          <circle cx="20" cy="20" r="15" fill="#f3d3a8" stroke="#d9b07a" strokeWidth="1.5" />
          <path d="M20 20m0-3a3 3 0 1 1-3 3a6 6 0 1 1 6 6a9 9 0 1 1-9-9" fill="none" stroke="#d9b07a" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === 'conch' && (
        <>
          <path d="M6 30Q4 12 20 7Q35 6 35 20Q35 31 22 33Q14 34 6 30Z" fill="#f6dcc0" stroke="#d9a47a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 28Q14 16 24 13M17 30Q20 20 29 19" stroke="#d9a47a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      )}
      {kind === 'clam' && (
        <>
          <path d="M4 28A16 16 0 0 1 36 28Z" fill="#e8d2f4" stroke="#b996d6" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M20 28V14M12 28L14 17M28 28L26 17" stroke="#b996d6" strokeWidth="1.2" />
        </>
      )}
    </svg>
  )
}

function Crab() {
  return (
    <svg width="46" height="34" viewBox="0 0 46 34" aria-hidden="true">
      <path d="M10 22l-6 6M14 25l-4 7M32 25l4 7M36 22l6 6M18 13V9M28 13V9" stroke="#d9573f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="23" cy="20" rx="14" ry="9" fill="#f26b4f" />
      <circle cx="6" cy="10" r="5" fill="#f26b4f" />
      <circle cx="40" cy="10" r="5" fill="#f26b4f" />
      <circle cx="18" cy="9" r="2.5" fill="#fff" />
      <circle cx="28" cy="9" r="2.5" fill="#fff" />
      <circle cx="18" cy="9" r="1.2" fill="#2a1f45" />
      <circle cx="28" cy="9" r="1.2" fill="#2a1f45" />
    </svg>
  )
}

/* ---------- laut ---------- */
const SPARKS = [[12, 58], [26, 70], [44, 62], [60, 74], [76, 60], [88, 68], [34, 80], [70, 84]]
const GULLS = [{ t: '12%', l: '16%', d: 0 }, { t: '20%', l: '34%', d: 1.4 }, { t: '9%', l: '56%', d: 2.6 }]

function SeaDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute right-[14%] top-[8%] h-16 w-16 rounded-full bg-[#fff3c4]"
        style={{ boxShadow: '0 0 40px 18px rgba(255,236,170,.65)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute -left-10 top-[12%] h-9 w-32 rounded-full bg-white/70 blur-md" animate={{ x: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute right-[32%] top-[24%] h-7 w-24 rounded-full bg-white/55 blur-md" animate={{ x: [0, -34, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      {GULLS.map((g) => (
        <motion.svg
          key={g.l}
          width="26"
          height="12"
          viewBox="0 0 26 12"
          className="absolute"
          style={{ top: g.t, left: g.l }}
          animate={{ x: [0, 60, 0], y: [0, -6, 0] }}
          transition={{ duration: 9 + g.d * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M1 8Q7 0 13 7Q19 0 25 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      ))}
      <motion.svg
        width="56"
        height="52"
        viewBox="0 0 60 56"
        className="absolute left-[14%] top-[46%]"
        style={{ transformOrigin: '50% 100%' }}
        animate={{ rotate: [-3, 3, -3], y: [0, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="29" y="2" width="2" height="40" fill="#6b5a85" />
        <path d="M28 4L28 38L8 38Z" fill="#fff" />
        <path d="M33 12L33 38L52 38Z" fill="#ffe3ee" />
        <path d="M6 42H54L46 52H14Z" fill="#8a62b0" />
      </motion.svg>
      {SPARKS.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute h-0.5 w-3 rounded bg-white"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </div>
  )
}

function Waves({ progress }) {
  const x1 = useTransform(progress, [0, 1], [-40, 40])
  const x2 = useTransform(progress, [0, 1], [40, -40])
  const d = 'M0 22Q25 6 50 22T100 22T150 22T200 22T250 22T300 22T350 22T400 22T450 22T500 22V50H0Z'
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-12 overflow-hidden" aria-hidden="true">
      <motion.svg style={{ x: x1 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-1 h-12 w-[calc(100%+80px)]">
        <path d={d} fill="#fff" fillOpacity=".85" />
      </motion.svg>
      <motion.svg style={{ x: x2 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-0 h-12 w-[calc(100%+80px)]">
        <path d={d} fill={SAND} />
      </motion.svg>
    </div>
  )
}

/* ---------- bagian utama ---------- */
export default function Pudak({ D }) {
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const N = Math.min(D.shells.length, POS.length)
  const cvs = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const len = useRef(0)
  const mv = useRef(0)
  const rollT = useRef(null)
  const timers = useRef([])
  const modeRef = useRef('dig')
  const foundRef = useRef(new Set())
  const wavingRef = useRef(false)
  const [mode, setMode] = useState('dig') // dig | write | done
  const [found, setFound] = useState([])
  const [got, setGot] = useState([])
  const [wave, setWave] = useState(null)
  const [started, setStarted] = useState(false)
  const [wrote, setWrote] = useState(false)
  const [memory, setMemory] = useState(null)

  const setModeBoth = (m) => {
    modeRef.current = m
    setMode(m)
  }

  const paintSand = () => {
    const c = cvs.current
    const g = c.getContext('2d')
    const w = c.clientWidth
    const h = c.clientHeight
    g.globalCompositeOperation = 'source-over'
    g.shadowColor = 'transparent'
    g.shadowOffsetX = 0
    g.shadowOffsetY = 0
    const gr = g.createLinearGradient(0, 0, 0, h)
    gr.addColorStop(0, '#f6e6c0')
    gr.addColorStop(1, '#efd9a6')
    g.fillStyle = gr
    g.fillRect(0, 0, w, h)
    for (let i = 0; i < 420; i++) {
      g.fillStyle = `rgba(190,150,90,${0.08 + Math.random() * 0.14})`
      g.beginPath()
      g.arc(Math.random() * w, Math.random() * h, Math.random() * 1.4 + 0.4, 0, 7)
      g.fill()
    }
  }

  useEffect(() => {
    const c = cvs.current
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = c.clientWidth * dpr
    c.height = c.clientHeight * dpr
    const g = c.getContext('2d', { willReadFrequently: true })
    g.scale(dpr, dpr)
    paintSand()
    return () => {
      clearTimeout(rollT.current)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const pos = (e) => {
    const r = cvs.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const stroke = (a, b) => {
    const g = cvs.current.getContext('2d')
    g.lineCap = 'round'
    g.lineJoin = 'round'
    if (modeRef.current === 'dig') {
      g.globalCompositeOperation = 'destination-out'
      g.shadowColor = 'transparent'
      g.shadowOffsetX = 0
      g.shadowOffsetY = 0
      g.lineWidth = BRUSH
    } else {
      g.globalCompositeOperation = 'source-over'
      g.strokeStyle = '#a98449'
      g.lineWidth = 9
      g.shadowColor = 'rgba(255,246,214,.95)'
      g.shadowOffsetX = 1.5
      g.shadowOffsetY = 1.5
    }
    g.beginPath()
    g.moveTo(a.x, a.y)
    g.lineTo(b.x, b.y)
    g.stroke()
  }

  const check = () => {
    const c = cvs.current
    const g = c.getContext('2d')
    const dpr = c.width / c.clientWidth
    const probes = [[0, 0], [-14, 0], [14, 0], [0, -14], [0, 14], [-10, -10], [10, 10], [-10, 10], [10, -10]]
    for (let i = 0; i < N; i++) {
      if (foundRef.current.has(i)) continue
      const cx = (POS[i].x / 100) * c.clientWidth
      const cy = POS[i].y
      let clear = 0
      probes.forEach(([dx, dy]) => {
        if (g.getImageData(Math.round((cx + dx) * dpr), Math.round((cy + dy) * dpr), 1, 1).data[3] < 40) clear++
      })
      if (clear >= 7) {
        foundRef.current.add(i)
        setFound((f) => [...f, i])
        navigator.vibrate?.(20)
      }
    }
  }

  const startWave = (kind) => {
    if (wavingRef.current) return
    wavingRef.current = true
    setWave({ id: Date.now() })
    navigator.vibrate?.(30)
    // di tengah sapuan ombak, pasir diganti baru (tertutup buih putih)
    timers.current.push(
      setTimeout(() => {
        paintSand()
        len.current = 0
        setWrote(false)
        setModeBoth(kind === 'smooth' ? 'write' : 'done')
      }, 1500),
    )
  }

  const down = (e) => {
    if (modeRef.current === 'done' || wavingRef.current) return
    clearTimeout(rollT.current)
    drawing.current = true
    cvs.current.setPointerCapture?.(e.pointerId)
    const p = pos(e)
    last.current = p
    stroke(p, p)
    if (modeRef.current === 'dig') setStarted(true)
    else setWrote(true)
  }
  const move = (e) => {
    if (!drawing.current) return
    const p = pos(e)
    if (modeRef.current === 'write') len.current += Math.hypot(p.x - last.current.x, p.y - last.current.y)
    stroke(last.current, p)
    last.current = p
    if (modeRef.current === 'dig' && ++mv.current % 5 === 0) check()
  }
  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    if (modeRef.current === 'dig') check()
    else if (modeRef.current === 'write' && len.current >= NEED) {
      rollT.current = setTimeout(() => startWave('erase'), IDLE)
    }
  }

  const collect = (i) => {
    setGot((g) => (g.includes(i) ? g : [...g, i]))
    setMemory(i)
  }

  // semua kerang terkumpul dan kenangan terakhir sudah ditutup: ombak meratakan pasir
  useEffect(() => {
    if (N > 0 && got.length === N && memory === null && modeRef.current === 'dig') startWave('smooth')
  }, [got, memory])

  const again = () => {
    paintSand()
    len.current = 0
    setWrote(false)
    setModeBoth('write')
  }

  const m = memory !== null ? D.shells[memory] : null
  const hint =
    mode === 'dig'
      ? `${got.length ? `${got.length}/${N} kerang · ` : ''}${found.length > got.length ? D.tapHint : D.digHint}`
      : mode === 'write'
        ? D.hint
        : ''

  return (
    <section ref={ref} className="relative" style={{ minHeight: `${H['apr-pantai']}svh` }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.2 }} className="px-4 pt-[8svh] text-center">
        <h2 style={{ color: ink }} className={H2}>{D.title}</h2>
        <p style={{ color: ink }} className="mt-1 font-['Dancing_Script',cursive] text-2xl">{D.subtitle}</p>
      </motion.div>

      {/* laut */}
      <div className="relative mt-6 h-[38svh] min-h-[270px] overflow-hidden bg-gradient-to-b from-[#86b3ee] via-[#b9d6f5] to-[#f5e1d3]">
        <SeaDecor />
        <Waves progress={scrollYProgress} />
      </div>

      {/* pasir */}
      <div
        className="relative overflow-hidden pb-[9svh] pt-2"
        style={{
          backgroundColor: SAND,
          backgroundImage: 'radial-gradient(#e3c896 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          borderBottomLeftRadius: '50% 90px',
          borderBottomRightRadius: '50% 90px',
          boxShadow: '0 18px 30px -10px rgba(0,0,0,.25)',
        }}
      >
        <motion.div className="pointer-events-none absolute left-0 top-1 z-10" animate={{ x: [0, 250, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
          <Crab />
        </motion.div>
        <div className="pointer-events-none absolute right-3 top-2 z-10 flex gap-1" aria-hidden="true">
          <Koala size={50} />
          <Cat size={50} />
        </div>

        <div className="relative mx-auto mt-[58px] overflow-hidden rounded-2xl shadow-inner" style={{ width: 'calc(100% - 24px)', maxWidth: 360, height: AREA_H }}>
          {/* pasir basah di bawah pasir kering */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#d1b078,#b99458)' }} />

          {POS.slice(0, N).map((p, i) => {
            if (got.includes(i)) return null
            const isFound = found.includes(i)
            return (
              <div key={i} className="absolute" style={{ left: `${p.x}%`, top: p.y, width: 52, height: 52, marginLeft: -26, marginTop: -26, zIndex: isFound ? 7 : 1 }}>
                {isFound ? (
                  <motion.button
                    type="button"
                    onClick={() => collect(i)}
                    aria-label={`Ambil kerang ${i + 1}`}
                    className="relative flex h-full w-full items-center justify-center"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 rounded-full bg-white/60 blur-md" />
                    <span className="relative"><ShellIcon kind={KINDS[i]} s={46} /></span>
                  </motion.button>
                ) : (
                  <div className="flex h-full w-full items-center justify-center"><ShellIcon kind={KINDS[i]} s={46} /></div>
                )}
              </div>
            )
          })}

          <canvas
            ref={cvs}
            aria-label="Area pasir"
            className="absolute left-0 top-0 z-[5]"
            style={{ width: '100%', height: '100%', touchAction: mode === 'done' ? 'pan-y' : 'none', pointerEvents: mode === 'done' ? 'none' : 'auto' }}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
          />

          {mode === 'dig' && !started && (
            <p className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center px-10 text-center text-base font-semibold" style={{ color: '#8a6a3a' }}>{D.digHint}</p>
          )}
          {mode === 'write' && !wrote && !wave && (
            <p className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center px-10 text-center font-['Dancing_Script',cursive] text-3xl" style={{ color: '#a07f4a' }}>{D.prompt}</p>
          )}

          {wave && (
            <motion.div
              key={wave.id}
              className="pointer-events-none absolute inset-x-0 top-0 z-[8]"
              style={{ height: AREA_H + 60 }}
              initial={{ y: -(AREA_H + 60) }}
              animate={{ y: AREA_H + 30 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              onAnimationComplete={() => {
                wavingRef.current = false
                setWave(null)
              }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(207,236,247,0), rgba(207,236,247,.92) 30%, rgba(255,255,255,.96))' }} />
              <svg viewBox="0 0 360 26" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-6 h-7 w-full" aria-hidden="true">
                <path d="M0 0H360V12Q330 26 300 12T240 12T180 12T120 12T60 12T0 12Z" fill="#fff" fillOpacity=".96" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* baki kerang */}
        <div className="mt-4 flex justify-center gap-2.5">
          {POS.slice(0, N).map((_, i) =>
            got.includes(i) ? (
              <motion.button
                key={i}
                type="button"
                onClick={() => setMemory(i)}
                aria-label={`Baca kenangan kerang ${i + 1}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              >
                <ShellIcon kind={KINDS[i]} s={32} />
              </motion.button>
            ) : (
              <span key={i} className="h-11 w-11 rounded-full border-2 border-dashed border-[#c9ab78]" />
            ),
          )}
        </div>
        <p className="mx-auto mt-3 min-h-[1.25rem] max-w-[300px] px-4 text-center text-sm font-semibold" style={{ color: INK }}>{hint}</p>

        {/* hasil, di dalam adegan */}
        <motion.div
          className="mx-auto mt-8 flex min-h-[360px] flex-col items-center px-6 text-center"
          initial={false}
          animate={{ opacity: mode === 'done' ? 1 : 0, y: mode === 'done' ? 0 : 20 }}
          transition={{ duration: 1.2, delay: mode === 'done' ? 0.6 : 0 }}
          style={{ pointerEvents: mode === 'done' ? 'auto' : 'none' }}
        >
          <p className="font-display text-3xl font-extrabold" style={{ color: INK }}>{D.waveTitle}</p>
          <p className="mt-3 max-w-[290px] leading-relaxed" style={{ color: INK }}>{D.story}</p>
          <MediaFrame item={D.photo} label="foto Pantai Pudak" frameClass="mt-5 w-[190px] p-2 pb-7 shadow-xl" imgClass="aspect-square w-full" style={{ rotate: 2 }} />
          <button type="button" onClick={again} className="mt-5 text-sm underline" style={{ color: INK }}>{D.again}</button>
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {m && (
            <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMemory(null)}>
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={m.label}
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-[#fffdf8] p-5 text-center text-[#2d2638] shadow-2xl"
              >
                <ShellIcon kind={KINDS[memory]} s={56} />
                <h3 className="mt-1 font-display text-2xl font-extrabold">{m.label}</h3>
                {m.photo &&
                  (isVideo(m.photo.src) ? (
                    <video src={m.photo.src} controls playsInline className="mt-3 max-h-[40svh] w-full rounded-xl bg-black object-contain" />
                  ) : (
                    <Img p={m.photo} label={m.label} className="mt-3 aspect-square w-[200px] rounded-md" />
                  ))}
                {m.photo?.caption && <p className="mt-1 font-['Dancing_Script',cursive] text-xl">{m.photo.caption}</p>}
                <p className="mt-2 text-sm leading-relaxed">{m.text}</p>
                <button type="button" onClick={() => setMemory(null)} className="mt-4 h-11 w-full rounded-full bg-lilac-500 font-semibold text-white">Simpan di baki</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}