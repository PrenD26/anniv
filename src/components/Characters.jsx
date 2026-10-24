// Koala (Kyla) dan kucing oyen (Frend), gaya dari koala-kucing.svg
// Koala / Cat         : kepala saja. mood: 'happy' | 'sad' | 'laugh'
// KoalaBody / CatBody : seluruh badan. gait: 'idle' | 'walk' | 'run'

const DARK = '#3a3254'

function KoalaParts({ mood }) {
  const sad = mood === 'sad'
  const laugh = mood === 'laugh'
    const sleep = mood === 'sleep'
  return (
    <>
      <g className="ch-ear-kl">
        <circle cx="110" cy="158" r="29" fill="#bdb5dd" />
        <circle cx="110" cy="158" r="17" fill="#f6e9f6" />
      </g>
      <g className="ch-ear-kr">
        <circle cx="230" cy="158" r="29" fill="#bdb5dd" />
        <circle cx="230" cy="158" r="17" fill="#f6e9f6" />
      </g>
      <ellipse cx="170" cy="195" rx="66" ry="56" fill="#bdb5dd" />
      <circle cx="126" cy="217" r="9" fill="#ff9aa8" opacity={laugh ? 0.7 : 0.45} />
      <circle cx="214" cy="217" r="9" fill="#ff9aa8" opacity={laugh ? 0.7 : 0.45} />
      {laugh ? (
            <path d="M138 192Q146 181 154 192M186 192Q194 181 202 192" fill="none" stroke="#2b2b33" strokeWidth="4.5" strokeLinecap="round" />
      ) : sleep ? (
        <path d="M138 189Q146 198 154 189M186 189Q194 198 202 189" fill="none" stroke="#2b2b33" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <>
          <g className="ch-blink">
            <circle cx="146" cy="190" r="7" fill="#2b2b33" />
            <circle cx="148.5" cy="187" r="2.4" fill="#fff" />
          </g>
          <g className="ch-blink">
            <circle cx="194" cy="190" r="7" fill="#2b2b33" />
            <circle cx="196.5" cy="187" r="2.4" fill="#fff" />
          </g>
        </>
      )}
      <ellipse cx="170" cy="208" rx="16" ry="21" fill={DARK} />
      <ellipse cx="165" cy="200" rx="5" ry="3" fill="#fff" opacity=".45" />
      {sad && (
        <>
          <path d="M134 172L156 180M206 172L184 180" stroke={DARK} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="140" cy="206" rx="3.5" ry="5.5" fill="#8ed0f5" />
          <path d="M158 247Q170 238 182 247" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {laugh && (
        <>
          <path d="M153 236Q170 264 187 236Z" fill="#5a2040" />
          <ellipse cx="170" cy="244.5" rx="8" ry="4.2" fill="#ff8fa3" />
        </>
      )}
      {!sad && !laugh && <path d="M158 237Q170 247 182 237" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />}
    </>
  )
}

function CatParts({ mood }) {
  const sad = mood === 'sad'
  const laugh = mood === 'laugh'
    const sleep = mood === 'sleep'
  return (
    <>
      <g className="ch-ear-cl">
        <path d="M384 205L380 148L422 182Z" fill="#f5993a" stroke="#f5993a" strokeWidth="8" strokeLinejoin="round" />
        <path d="M389 192L388 164L410 182Z" fill="#ffb3bf" stroke="#ffb3bf" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g className="ch-ear-cr">
        <path d="M476 205L480 148L438 182Z" fill="#f5993a" stroke="#f5993a" strokeWidth="8" strokeLinejoin="round" />
        <path d="M471 192L472 164L450 182Z" fill="#ffb3bf" stroke="#ffb3bf" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <ellipse cx="430" cy="225" rx="58" ry="48" fill="#f5993a" />
      <path d="M430 180L430 194M418 182L420 193M442 182L440 193" stroke="#d9741c" strokeWidth="4" strokeLinecap="round" />
      <circle cx="394" cy="244" r="8" fill="#ff8fa3" opacity={laugh ? 0.75 : 0.5} />
      <circle cx="466" cy="244" r="8" fill="#ff8fa3" opacity={laugh ? 0.75 : 0.5} />
      <ellipse cx="430" cy="243" rx="20" ry="13" fill="#fde7c9" />
      {laugh ? (
              <path d="M398 227Q408 214 418 227M442 227Q452 214 462 227" fill="none" stroke="#2b2b33" strokeWidth="4.5" strokeLinecap="round" />
      ) : sleep ? (
        <path d="M398 224Q408 233 418 224M442 224Q452 233 462 224" fill="none" stroke="#2b2b33" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <>
          <g className="ch-blink ch-c">
            <ellipse cx="408" cy="225" rx="7.5" ry="10" fill="#2b2b33" />
            <circle cx="410.5" cy="221" r="2.8" fill="#fff" />
          </g>
          <g className="ch-blink ch-c">
            <ellipse cx="452" cy="225" rx="7.5" ry="10" fill="#2b2b33" />
            <circle cx="454.5" cy="221" r="2.8" fill="#fff" />
          </g>
        </>
      )}
      <path d="M424 237L436 237L430 245Z" fill="#ff8fa3" stroke="#ff8fa3" strokeWidth="2" strokeLinejoin="round" />
      {sad && (
        <>
          <path d="M430 245V249M419 257Q430 248 441 257" fill="none" stroke="#7a3b10" strokeWidth="2" strokeLinecap="round" />
          <path d="M395 203L419 211M465 203L441 211" stroke="#7a3b10" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="402" cy="243" rx="3.5" ry="5.5" fill="#8ed0f5" />
        </>
      )}
      {laugh && (
        <>
          <path d="M417 250Q430 272 443 250Z" fill="#7a2f2f" />
          <ellipse cx="430" cy="256" rx="7" ry="4" fill="#ff8fa3" />
        </>
      )}
      {!sad && !laugh && <path d="M430 245Q424 253 418 248M430 245Q436 253 442 248" fill="none" stroke="#7a3b10" strokeWidth="2" strokeLinecap="round" />}
      <path d="M404 246L366 240M404 252L368 256M456 246L494 240M456 252L492 256" stroke="#8a4a1a" strokeWidth="1.8" strokeLinecap="round" opacity=".55" />
    </>
  )
}

/* ---------- kepala saja ---------- */
export function Koala({ mood = 'happy', size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="80 73 180 180" role="img" aria-label="Koala">
      <KoalaParts mood={mood} />
    </svg>
  )
}

export function Cat({ mood = 'happy', size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="360 136 140 140" role="img" aria-label="Kucing oyen">
      <CatParts mood={mood} />
    </svg>
  )
}

/* ---------- seluruh badan ---------- */
// size = lebar, tinggi = size x 1,25
export function KoalaBody({ size = 100, mood = 'happy', wave = true, gait = 'idle' }) {
  const gaitClass = gait === 'walk' ? 'ch-walk' : gait === 'run' ? 'ch-run' : undefined
  return (
    <svg width={size} height={size * 1.25} viewBox="74 132 192 240" className={gaitClass} style={{ overflow: 'visible' }} role="img" aria-label="Koala">
      <g transform="translate(170 366) scale(0.94) translate(-170 -366)">
        <g className="ch-breathe-k">
          <ellipse className="ch-foot-a" cx="140" cy="352" rx="26" ry="14" fill="#aea6cf" />
          <ellipse className="ch-foot-b" cx="200" cy="352" rx="26" ry="14" fill="#aea6cf" />
          <ellipse cx="170" cy="295" rx="68" ry="62" fill="#aea6cf" />
          <ellipse cx="170" cy="305" rx="40" ry="44" fill="#ebe7f5" />
          <ellipse cx="112" cy="290" rx="14" ry="32" fill="#9c93c4" transform="rotate(15 112 290)" />
          <g className={wave && mood !== 'sad' ? 'ch-wave' : undefined}>
            <ellipse cx="245" cy="292" rx="14" ry="32" fill="#9c93c4" transform="rotate(-15 245 292)" />
          </g>
          <g className={mood === 'laugh' ? 'ch-laugh-k' : 'ch-head-k'}>
            <KoalaParts mood={mood} />
          </g>
        </g>
      </g>
    </svg>
  )
}

export function CatBody({ size = 100, mood = 'happy', wave = true, gait = 'idle', camera = false }) {
  const gaitClass = gait === 'walk' ? 'ch-walk' : gait === 'run' ? 'ch-run' : undefined
  return (
    <svg width={size} height={size * 1.25} viewBox="362 122 200 250" className={gaitClass} style={{ overflow: 'visible' }} role="img" aria-label="Kucing oyen">
      <g className="ch-breathe-c">
        <g className="ch-tail">
          <path d="M482 342C545 342 553 272 522 254" fill="none" stroke="#f5993a" strokeWidth="18" strokeLinecap="round" />
          <circle cx="522" cy="254" r="9" fill="#fde7c9" />
        </g>
        <ellipse cx="430" cy="310" rx="56" ry="52" fill="#f5993a" />
        <ellipse cx="430" cy="326" rx="30" ry="34" fill="#fde7c9" />
        <path d="M382 300L394 304M380 316L393 318M478 300L466 304M480 316L467 318" stroke="#d9741c" strokeWidth="4" strokeLinecap="round" />
        <g className={wave && mood !== 'sad' && !camera ? 'ch-wave-c' : undefined}>
          <g transform="rotate(12 388 318)">
            <ellipse cx="388" cy="318" rx="12" ry="28" fill="#f5993a" />
            <path d="M382 306L392 308" stroke="#d9741c" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="388" cy="341" r="10" fill="#fde7c9" />
          </g>
        </g>
        <g transform="rotate(-12 472 318)">
          <ellipse cx="472" cy="318" rx="12" ry="28" fill="#f5993a" />
          <path d="M478 306L468 308" stroke="#d9741c" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="472" cy="341" r="10" fill="#fde7c9" />
        </g>
        <ellipse className="ch-foot-a" cx="408" cy="358" rx="16" ry="10" fill="#fde7c9" />
        <ellipse className="ch-foot-b" cx="452" cy="358" rx="16" ry="10" fill="#fde7c9" />
        {camera && (
          <g>
            <rect x="402" y="320" width="56" height="36" rx="8" fill="#3b3550" />
            <rect x="419" y="311" width="22" height="11" rx="3" fill="#3b3550" />
            <circle cx="430" cy="338" r="13" fill="#cfe6f8" stroke="#1f1b30" strokeWidth="4" />
            <circle cx="425.5" cy="333.5" r="3.6" fill="#fff" />
            <rect x="446" y="325" width="8" height="5" rx="2" fill="#ff7f9c" />
          </g>
        )}
        <g className={mood === 'laugh' ? 'ch-laugh-c' : 'ch-head-c'}>
          <CatParts mood={mood} />
        </g>
      </g>
    </svg>
  )
}