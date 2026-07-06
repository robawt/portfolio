import { motion } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'

const projects = [
  { num: '01', title: 'Project One', stack: 'React · Node · Postgres' },
  { num: '02', title: 'Project Two', stack: 'Python · Pandas · ML' },
  { num: '03', title: 'Project Three', stack: 'Swift · iOS' },
]

export default function Index() {
  return (
    <section id="work">
      <ChapterTag index={5} />
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Selected work
      </motion.div>
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
      <p style={{ maxWidth: '40ch', color: 'var(--steel)', marginBottom: '3.5rem' }}>
        A short list, kept short on purpose.
      </p>

      <div style={{ borderTop: '1px solid var(--line)' }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.num}
            className="hoverable"
            initial={{ opacity: 0.25, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ x: 12 }}
            style={{
              display: 'grid', gridTemplateColumns: '3rem 1fr auto', alignItems: 'baseline',
              gap: '1.5rem', padding: '1.6rem 0', borderBottom: '1px solid var(--line)',
            }}
          >
            <span className="caption" style={{ color: 'var(--steel)' }}>{p.num}</span>
            <h3 style={{ fontWeight: 500, fontSize: 'clamp(1.2rem, 2.6vw, 1.7rem)' }}>{p.title}</h3>
            <span className="caption" style={{ color: 'var(--steel)', whiteSpace: 'nowrap' }}>{p.stack}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
