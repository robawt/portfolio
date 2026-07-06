import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'

export default function Interlude() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} style={{ padding: 0, minHeight: '90vh', overflow: 'hidden', alignItems: 'stretch' }}>
      <ChapterTag index={6} />
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: '-8% 0',
          backgroundImage: 'url(/assets/poster.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(11,17,48,0.55) 0%, rgba(11,17,48,0.75) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '9vh 6vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '90vh' }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          How I think about it
        </motion.div>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', maxWidth: '16ch', color: 'var(--bone)' }}
        >
          Precision<br/>over noise.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{ maxWidth: '38ch', marginTop: '1.5rem', color: 'var(--steel)', fontSize: '1.05rem' }}
        >
          Every spec matters, even the ones nobody reads. Replace this with a line about how you actually approach building things.
        </motion.p>
      </div>
    </section>
  )
}
