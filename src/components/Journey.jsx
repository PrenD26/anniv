import { useContext, useEffect, useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import IntroScreen from './IntroScreen.jsx'
import SkyBackground, { SkyContext, useInk } from './SkyBackground.jsx'
import KoalaSlider from './KoalaSlider.jsx'
import { default as Swalayan, SwalayanClosing } from './Swalayan.jsx'
import MonthIntro from './MonthIntro.jsx'
import { OktPagi, OktMomoyo, OktNiceSo, OktJejak, OktSore, OktUltah, OktDompet } from './October.jsx'
import { SEPTEMBER } from '../data/september.js'
import { OCTOBER } from '../data/october.js'
import { H } from '../timeline.js'
import { playTrack, stopTrack } from '../audio/player.js'
import { NovLaut, NovPantaiSand, NovSore, NovMalam } from './November.jsx'
import { NOVEMBER } from '../data/november.js'
import { DesTiket, DesJendela, DesGolden, DesSore, DesMalam } from './December.jsx'
import { DECEMBER } from '../data/december.js'
import { JanTaman, JanSore, JanBooth } from './January.jsx'
import { JANUARY } from '../data/january.js'
import { FebBola, FebTramp, FebLuncur, FebMeriam, FebHujan, FebSore, FebKotak, FebBoneka, FebBingkai } from './February.jsx'
import { FEBRUARY } from '../data/february.js'
import { MarTakjil, MarKafe, MarMotor, MarSore, MarBooth } from './March.jsx'
import { RamadanHang } from './Ornaments.jsx'
import { MARCH } from '../data/march.js'
import { AprSlg, AprKts, AprJeda, AprPantai, AprSore, AprBuket } from './April.jsx'
import { APRIL } from '../data/april.js'
import { MeiStudio, MeiBuket, MeiUltah, MeiSore, DgPapan, DgBus, DgSky, DgSikidang, DgMogok, DgMalioboro, DgPulang } from './May.jsx'
import { MAY } from '../data/may.js'
import Wake from './Wake.jsx'
import Molang from './Molang.jsx'
import { JUNE } from '../data/june.js'

// Lagu berganti saat bagian itu melewati tengah layar (fade-out lama, fade-in baru)
function useTrackOnView(ref, src) {
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  useEffect(() => {
    if (!inView) return
    if (src) playTrack(src)
    else stopTrack(1500)
  }, [inView, src])
}

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })

export default function Journey() {
  const { scrollYProgress: progress } = useScroll()
  const ink = useInk(progress)
  const introRef = useRef(null)
  const septRef = useRef(null)
  const octRef = useRef(null)
  const novRef = useRef(null)
  const desRef = useRef(null)
  const janRef = useRef(null)
  const febRef = useRef(null)
  const marRef = useRef(null)
  const aprRef = useRef(null)
  const apr2Ref = useRef(null)
  const meiRef = useRef(null)
  const junRef = useRef(null)
  const julRef = useRef(null)

  useTrackOnView(introRef, '/audio/intro.mp3')
  useTrackOnView(septRef, SEPTEMBER.audio)
  useTrackOnView(octRef, OCTOBER.audio)
    useTrackOnView(novRef, NOVEMBER.audio)
   useTrackOnView(desRef, DECEMBER.audio)
  useTrackOnView(janRef, JANUARY.audio)
   useTrackOnView(febRef, FEBRUARY.audio)
  useTrackOnView(marRef, MARCH.audio)
    useTrackOnView(aprRef, APRIL.audio)
  useTrackOnView(apr2Ref, APRIL.audio2)
  useTrackOnView(meiRef, MAY.audio)
    useTrackOnView(junRef, JUNE.audio)
  useTrackOnView(julRef, null) // musik Juli menyusul

  return (
    <SkyContext.Provider value={{ progress, ink }}>
      <SkyBackground progress={progress} />
      <KoalaSlider progress={progress} />
      <main className="relative z-10">
        <div ref={introRef}>
          <IntroScreen />
        </div>
              <div ref={septRef}>
          <MonthIntro height={H['sept-title']} kicker="Bulan pertama" title={SEPTEMBER.title} subtitle={SEPTEMBER.subtitle} />
          <Swalayan />
          <SwalayanClosing />
        </div>
        <div ref={octRef}>
          <MonthIntro height={H['okt-title']} kicker="Bulan kedua" title={OCTOBER.title} subtitle={OCTOBER.subtitle} />
          <OktPagi />
          <OktMomoyo />
          <OktNiceSo />
          <OktJejak />
          <OktSore />
          <OktUltah />
          <OktDompet />
        </div>
                <div ref={novRef}>
          <MonthIntro height={H['nov-title']} kicker="Bulan ketiga" title={NOVEMBER.title} subtitle={NOVEMBER.subtitle} />
          <NovLaut />
          <NovPantaiSand />
          <NovSore />
          <NovMalam />
        </div>
              <div ref={desRef}>
          <MonthIntro height={H['des-title']} kicker="Bulan keempat" title={DECEMBER.title} subtitle={DECEMBER.subtitle} />
          <DesTiket />
          <DesJendela />
          <DesGolden />
          <DesSore />
          <DesMalam />
        </div>
               <div ref={janRef}>
          <MonthIntro height={H['jan-title']} kicker="Bulan kelima" title={JANUARY.title} subtitle={JANUARY.subtitle} />
          <JanTaman />
          <JanSore />
          <JanBooth />
        </div>
               <div ref={febRef}>
          <MonthIntro height={H['feb-title']} kicker="Bulan keenam" title={FEBRUARY.title} subtitle={FEBRUARY.subtitle} />
          <FebBola />
          <FebTramp />
          <FebLuncur />
          <FebMeriam />
          <FebHujan />
          <FebSore />
          <FebKotak />
          <FebBoneka />
          <FebBingkai />
        </div>
              <div ref={marRef}>
          <MonthIntro height={H['mar-title']} kicker="Bulan ketujuh" title={MARCH.title} subtitle={MARCH.subtitle}>
            <RamadanHang />
          </MonthIntro>
          <MarTakjil />
          <MarKafe />
          <MarMotor />
          <MarSore />
          <MarBooth />
        </div>
            <div ref={aprRef}>
          <MonthIntro height={H['apr-title']} kicker="Bulan kedelapan" title={APRIL.title} subtitle={APRIL.subtitle} />
          <AprSlg />
          <AprKts />
          <AprJeda />
        </div>
        <div ref={apr2Ref}>
          <AprPantai />
          <AprSore />
          <AprBuket />
        </div>
               <div ref={meiRef}>
          <MonthIntro height={H['may-title']} kicker="Bulan kesembilan" title={MAY.title} subtitle={MAY.subtitle} />
          <MeiStudio />
          <MeiBuket />
          <MeiUltah />
          <MeiSore />
          <DgPapan />
          <DgBus />
          <DgSky />
          <DgSikidang />
          <DgMogok />
          <DgMalioboro />
          <DgPulang />
        </div>
            <div ref={junRef}>
          <MonthIntro height={H['jun-title']} kicker="Bulan kesepuluh" title={JUNE.title} subtitle={JUNE.subtitle} />
          <Wake />
          <Molang />
          <section aria-hidden="true" style={{ minHeight: `${H['jun-sore']}svh` }} />
        </div>
        <div ref={julRef}>
          <MonthIntro height={H['jul-title']} kicker="Bulan kesebelas" title="Juli 2026" />
        </div>
      </main>
    </SkyContext.Provider>
  )
}