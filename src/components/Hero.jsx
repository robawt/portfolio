import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroScene from './HeroScene.jsx'
import Signature from './Signature.jsx'
import ChapterTag from './ChapterTag.jsx'
import CircleStamp from './CircleStamp.jsx'

const line = {
  hidden: { y: '120%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 },
  }),
}

const floaters = [
  { text: 'BUILD', top: '20%', left: '10%', speed: -60 },
  { text: 'CREATE', top: '72%', left: '84%', speed: 40 },
  { text: 'SHIP', top: '42%', left: '90%', speed: -30 },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])

  const f0y = useTransform(scrollYProgress, [0, 1], [0, floaters[0].speed])
  const f1y = useTransform(scrollYProgress, [0, 1], [0, floaters[1].speed])
  const f2y = useTransform(scrollYProgress, [0, 1], [0, floaters[2].speed])
  const floaterY = [f0y, f1y, f2y]

  return (
    <section id="hero" ref={ref} style={{ overflow: 'hidden' }}>
      <ChapterTag index={1} />
      <HeroScene />

      <div style={{ position: 'absolute', bottom: '6vh', left: '6vw', zIndex: 2 }}>
        <CircleStamp
          size={110}
          centerContent={<span style={{ fontSize: '1.4rem' }}>★</span>}
        />
      </div>

      {floaters.map((f, i) => (
        <motion.div
          key={f.text}
          style={{ y: floaterY[i], position: 'absolute', top: f.top, left: f.left, zIndex: 0 }}
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 1 }}
        >
          {f.text}
        </motion.div>
      ))}

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          className="cursive"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}
          initial={{ opacity: 0, y: 10, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ delay: 0.05, duration: 0.7 }}
        >
          hey, it's me
        </motion.div>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ marginBottom: '0.75rem' }}
        >
          AI & Data Science · CBIT
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="display"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)', textAlign: 'center' }}
            variants={line}
            custom={0}
            initial="hidden"
            animate="show"
          >
            Mohammed
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="display"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)', textAlign: 'center' }}
            variants={line}
            custom={1}
            initial="hidden"
            animate="show"
          >
            Ayman Khan
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ maxWidth: '40ch', color: 'var(--steel)', fontSize: '1.05rem', marginTop: '2rem' }}
        >
          Second-year AI & Data Science student at CBIT. Building with cloud, code, and curiosity.
        </motion.p>

        <div style={{ marginTop: '3rem' }}>
          <Signature width="min(34vw, 240px)" delay={0.9} />
        </div>

        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          style={{ marginTop: '2.5rem' }}
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
