import { motion } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'
import Watermark from './Watermark.jsx'

const projects = [
  { num: '01', title: 'AWS Cloud Practitioner', stack: 'Cloud · AWS · Architecture' },
  { num: '02', title: 'AI & ML Foundations', stack: 'Python · TensorFlow · Data' },
  { num: '03', title: 'Full-Stack Development', stack: 'React · Node · Python' },
]

export default function Index() {
  return (
    <section id="work">
      <ChapterTag index={5} />
      <Watermark text="WORK" top="50%" />
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Selected work
      </motion.div>
      <div style={{ position: 'relative', display: 'inline-block', marginTop: '2rem' }}>
        <motion.h2
          className="display"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 6rem)', marginBottom: '0.5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          Index
        </motion.h2>
        <motion.span
          className="cursive"
          initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            position: 'absolute', top: '-1.2rem', right: '-2.5rem',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          }}
        >
          a few
        </motion.span>
      </div>
      <p style={{ maxWidth: '40ch', color: 'var(--steel)', marginBottom: '4.5rem' }}>
        Certifications, skills, and what I'm building toward.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3.5rem', width: '100%', position: 'relative', zIndex: 1 }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.num}
            className="hoverable"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
          >
            <div style={{
              width: 220, height: 140, overflow: 'hidden', marginBottom: '0.5rem',
              backgroundImage: `url(${i % 2 === 0 ? '/assets/poster.png' : '/assets/wave-lines.png'})`,
              backgroundSize: 'cover',
              backgroundPosition: `${i * 30}% center`,
              filter: 'grayscale(0.4) brightness(0.8)',
              border: '1px solid var(--line)',
            }} />
            <span className="caption" style={{ color: 'var(--steel)' }}>{p.num}</span>
            <h3 style={{ fontWeight: 500, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>{p.title}</h3>
            <span className="caption" style={{ color: 'var(--steel)' }}>{p.stack}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
