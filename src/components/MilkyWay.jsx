import { useMemo } from 'react'

const rng = (seed) => {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

export default function MilkyWay() {
  const stars = useMemo(() => {
    const r = rng(12345)
    const arr = []
    // bright core stars
    for (let i = 0; i < 60; i++) {
      arr.push({
        x: 45 + (r() - 0.5) * 12,
        y: 48 + (r() - 0.5) * 8,
        s: 0.8 + r() * 1.6,
        o: 0.6 + r() * 0.4,
        c: r() < 0.3 ? '#fff4e6' : r() < 0.6 ? '#f0f8ff' : '#ffffff',
        tw: r() < 0.4,
        d: r() * 5,
        t: 2 + r() * 4,
      })
    }
    // band stars
    for (let i = 0; i < 320; i++) {
      const band = (r() - 0.5) * 16
      const spread = Math.pow(Math.abs(r() - 0.5) * 2, 1.6) * 10
      arr.push({
        x: 10 + r() * 80,
        y: 50 + band + (r() - 0.5) * spread,
        s: 0.4 + r() * 1.2,
        o: 0.25 + r() * 0.55,
        c: r() < 0.25 ? '#ffd9b3' : r() < 0.5 ? '#e6f0ff' : r() < 0.7 ? '#f5e6ff' : '#ffffff',
        tw: r() < 0.25,
        d: r() * 6,
        t: 2.5 + r() * 4,
      })
    }
    // outer faint stars
    for (let i = 0; i < 180; i++) {
      const band = (r() - 0.5) * 22
      arr.push({
        x: 5 + r() * 90,
        y: 50 + band + (r() - 0.5) * 14,
        s: 0.3 + r() * 0.8,
        o: 0.15 + r() * 0.35,
        c: '#ffffff',
        tw: r() < 0.15,
        d: r() * 7,
        t: 3 + r() * 5,
      })
    }
    return arr
  }, [])

  const nebula = useMemo(() => {
    const r = rng(54321)
    return Array.from({ length: 14 }, (_, i) => ({
      x: 20 + r() * 60,
      y: 45 + (r() - 0.5) * 18,
      w: 18 + r() * 26,
      h: 6 + r() * 10,
      rot: (r() - 0.5) * 24,
      o: 0.08 + r() * 0.16,
      hue: r() < 0.4 ? '200' : r() < 0.7 ? '280' : '340',
    }))
  }, [])

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[38%]"
      style={{ width: '190vmax', height: '56vmax', transform: 'translate(-50%, -50%) rotate(-32deg)' }}
      aria-hidden="true"
    >
      {/* galactic core glow */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          width: '26%',
          height: '14%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(255,248,235,0.28) 0%, rgba(255,235,210,0.16) 25%, rgba(190,170,255,0.12) 55%, rgba(120,90,200,0) 100%)',
          filter: 'blur(18px)',
        }}
      />
      {/* main band */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            // dark dust lane
            'radial-gradient(ellipse 52% 9% at 48% 52%, rgba(8,4,28,0.55) 0%, rgba(8,4,28,0.25) 40%, rgba(8,4,28,0) 75%)',
            // warm core
            'radial-gradient(ellipse 28% 11% at 52% 49%, rgba(255,246,220,0.32) 0%, rgba(255,238,200,0.18) 35%, rgba(255,238,200,0) 70%)',
            // cyan/blue arm
            'radial-gradient(ellipse 38% 16% at 62% 54%, rgba(150,210,255,0.18) 0%, rgba(110,170,255,0.1) 40%, rgba(110,170,255,0) 75%)',
            // magenta/pink arm
            'radial-gradient(ellipse 40% 18% at 36% 46%, rgba(255,170,235,0.16) 0%, rgba(210,140,255,0.09) 45%, rgba(210,140,255,0) 78%)',
            // violet halo
            'radial-gradient(ellipse 58% 32% at 50% 50%, rgba(170,140,255,0.22) 0%, rgba(150,120,255,0.12) 40%, rgba(100,80,200,0.05) 65%, rgba(60,40,140,0) 80%)',
            // faint outer glow
            'radial-gradient(ellipse 70% 38% at 50% 50%, rgba(130,110,255,0.14) 0%, rgba(90,70,200,0.07) 50%, rgba(60,40,150,0) 85%)',
          ].join(','),
          filter: 'blur(6px)',
        }}
      />
      {/* nebula clumps */}
      {nebula.map((n, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: `${n.w}%`,
            height: `${n.h}%`,
            transform: `translate(-50%, -50%) rotate(${n.rot}deg)`,
            background: `radial-gradient(ellipse, hsla(${n.hue}, 80%, 75%, ${n.o}) 0%, hsla(${n.hue}, 70%, 65%, ${n.o * 0.6}) 40%, transparent 70%)`,
            filter: 'blur(14px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
      {/* stars */}
      {stars.map((p, i) => (
        <span
          key={i}
          className={p.tw ? 'star twinkle' : 'star'}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: p.c,
            opacity: p.o,
            boxShadow: p.s > 1.2 ? `0 0 ${p.s * 2}px ${p.c}` : 'none',
            animationDelay: `${p.d}s`,
            animationDuration: `${p.t}s`,
          }}
        />
      ))}
      {/* subtle grain haze */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 64% 24% at 50% 50%, rgba(255,250,240,0.06) 0%, rgba(200,190,255,0.04) 30%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  )
}
