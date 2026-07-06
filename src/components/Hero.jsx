import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroScene from './HeroScene.jsx'
import Signature from './Signature.jsx'
import ChapterTag from './ChapterTag.jsx'

const line = {
  hidden: { y: '120%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 },
  }),
}

const floaters = [
  { text: 'BUILD', top: '18%', left: '8%', speed: -60, size: '0.9rem' },
  { text: 'CREATE', top: '68%', left: '82%', speed: 40, size: '0.85rem' },
  { text: 'SHIP', top: '40%', left: '88%', speed: -30, size: '0.8rem' },
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
    <section id="hero" ref={ref} style={{ alignItems: 'flex-start', overflow: 'hidden' }}>
      <ChapterTag index={1} />
      <HeroScene />

      {/* layered parallax accents -- each drifts at its own depth as you scroll, for texture */}
      {floaters.map((f, i) => (
        <motion.div
          key={f.text}
          style={{
            y: floaterY[i],
            position: 'absolute', top: f.top, left: f.left,
            fontSize: f.size, zIndex: 0,
          }}
          className="pixel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 1 }}
        >
          {f.text}
        </motion.div>
      ))}

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Builder · est. 2026
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="display"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
            variants={line}
            custom={0}
            initial="hidden"
            animate="show"
          >
            [Your Name]
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="display"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
            variants={line}
            custom={1}
            initial="hidden"
            animate="show"
          >
            Portfolio
          </motion.h1>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          width: '100%', marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ maxWidth: '34ch', color: 'var(--steel)', fontSize: '1rem' }}
          >
            One line, plainly stated — what you build, what you're chasing, no adjectives you wouldn't say out loud.
          </motion.p>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ textAlign: 'right' }}
          >
            Scroll
          </motion.div>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Signature width="min(38vw, 260px)" delay={0.9} />
        </div>
      </motion.div>
    </section>
  )
}
