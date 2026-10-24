import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CatBody, KoalaBody } from './Characters.jsx';
import CodeForm from './CodeForm.jsx';
import Stars from './Stars.jsx';
import MilkyWay from './MilkyWay.jsx'
const float = (delay = 0) => ({
  animate: { y: [0, -10, 0], rotate: [-2, 2, -2] },
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay },
});

// Huruf muncul satu per satu dari atas, lembut
function Letters({ text, delay = 0, step = 0.07 }) {
  return (
    <span className="block" aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: -40, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            delay: delay + i * step,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function OpeningScreen({ onStart }) {
  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState('happy');

  useEffect(() => {
    const t = setTimeout(() => setShowForm(true), 4300); // ±4 detik
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.main
      className="screen !h-[100svh] bg-gradient-to-b from-[#1b1236] via-[#2b2050] to-[#4a3a85]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#7a5cc4]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#c47ad9]/20 blur-3xl" />
             <MilkyWay />
      <Stars />

      <motion.div
  exit={{ y: -140, opacity: 0, transition: { duration: 0.9, ease: 'easeIn' } }}
  className="relative mx-auto flex h-full max-w-md flex-col items-center px-4 pt-[8svh] text-center"
>
   <h1 className="font-display text-[clamp(2.8rem,14vw,4rem)] font-extrabold leading-[1.02] text-lilac-100">
  <Letters text="Happy" delay={0.2} step={0.075} />
  <Letters text="Anniversary" delay={0.7} step={0.075} />
</h1>

<p className="mt-1">
  <motion.span
    className="leading-none inline-block font-display text-[clamp(2.6rem,12.5vw,3.5rem)] font-bold italic text-white"
    initial={{ textShadow: '0 0 0px rgba(240,194,255,0)' }}
    animate={{
      scale: [1, 1.2, 1],
      textShadow: [
        '0 0 0px rgba(240,194,255,0)',
        '0 0 30px rgba(240,194,255,1)',
        '0 0 0px rgba(240,194,255,0)',
      ],
    }}
    transition={{ duration: 1.3, delay: 2.9, ease: 'easeInOut' }}
  >
    <Letters text="Sayangg" delay={1.65} step={0.09} />
  </motion.span>
</p>

     <div className="mt-6 flex items-end justify-center gap-4">
  <motion.div
    initial={{ x: -260, y: '-40vh', opacity: 0 }}
    animate={{
      x: [-260, -150, -140, -40, 0],
      y: ['-40vh', '-28vh', '-21vh', '-17vh', '0vh'],
      opacity: [0, 1, 1, 1, 1],
    }}
    transition={{ duration: 2.6, times: [0, 0.12, 0.35, 0.58, 1], ease: 'easeInOut' }}
  >
    <motion.div {...float(0)}>
      <KoalaBody mood={mood} size={96} />
    </motion.div>
  </motion.div>
  <motion.div
    initial={{ x: 260, y: '-40vh', opacity: 0 }}
    animate={{
      x: [260, 170, 190, 80, 0],
      y: ['-40vh', '-28vh', '-21vh', '-17vh', '0vh'],
      opacity: [0, 1, 1, 1, 1],
    }}
    transition={{ duration: 2.6, delay: 0.15, times: [0, 0.12, 0.35, 0.58, 1], ease: 'easeInOut' }}
  >
    <motion.div {...float(0.4)}>
      <CatBody mood={mood} size={96} />
    </motion.div>
  </motion.div>
</div>

        <div className="mt-8 min-h-[250px] w-full">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <CodeForm onMood={setMood} onStart={onStart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </motion.div>
    </motion.main>
  );
}