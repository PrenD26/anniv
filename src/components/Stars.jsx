import { useMemo } from 'react'

const rng = (seed) => {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

// Bintang berotasi pelan + berkedip, partikel cahaya naik, bintang jatuh sesekali
export default function Stars({ count = 180, motes = 8, shooting = true }) {
  const { stars, dots } = useMemo(() => {
    const r = rng(7)
    return {
      stars: Array.from({ length: count }, (_, i) => ({
        x: r() * 100, y: r() * 100, s: 1 + r() * 1.8, d: r() * 4, t: 2.5 + r() * 3, tw: i % 3 === 0,
      })),
      dots: Array.from({ length: motes }, (_, i) => ({
        x: 5 + r() * 90, s: 4 + r() * 6, d: r() * 10, t: 12 + r() * 10, c: i % 2 ? '#e9b8ff' : '#c7a8ff',
      })),
    }
  }, [count, motes])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="star-layer">
        {stars.map((st, i) => (
          <span
            key={i}
            className={st.tw ? 'star twinkle' : 'star'}
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s`, animationDuration: `${st.t}s` }}
          />
        ))}
      </div>
      {dots.map((m, i) => (
        <span key={i} className="mote" style={{ left: `${m.x}%`, width: m.s, height: m.s, background: m.c, animationDelay: `${m.d}s`, animationDuration: `${m.t}s` }} />
      ))}
      {shooting && (
        <>
          <span className="shooting" style={{ top: '8%', left: '72%', animationDuration: '12s', animationDelay: '4s' }} />
          <span className="shooting" style={{ top: '22%', left: '95%', animationDuration: '17s', animationDelay: '9s' }} />
          <span className="shooting" style={{ top: '4%', left: '45%', animationDuration: '23s', animationDelay: '15s' }} />
        </>
      )}
    </div>
  )
}