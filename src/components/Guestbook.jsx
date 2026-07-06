import { motion } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import Blinkies from './Blinkies.jsx'
import ChapterTag from './ChapterTag.jsx'
import VisitorCounter from './VisitorCounter.jsx'

const entries = [
  { name: 'jsmith_dev', msg: 'love the horizontal scroll section, how\u2019d you build that??' },
  { name: 'pixel_pam', msg: 'this gave me such nostalgia in the best way' },
  { name: 'anon', msg: 'sign my guestbook back :)' },
]

export default function Guestbook() {
  return (
    <section id="guestbook" style={{ borderTop: '3px double var(--line)' }}>
      <ChapterTag index={4} />
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Sign before you leave
      </motion.div>
      <motion.h2
        className="display"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.6rem)', marginBottom: '2.5rem', color: 'var(--signal)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        Guestbook
      </motion.h2>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
        alignItems: 'start', marginBottom: '3rem',
      }}>
        <div style={{ border: '2px solid var(--line)', padding: '1.5rem' }}>
          {entries.map((e, i) => (
            <div key={i} style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: i < entries.length - 1 ? '1px dashed var(--line)' : 'none' }}>
              <div className="caption" style={{ color: 'var(--blue)', marginBottom: '0.3rem' }}>{e.name}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--bone)' }}>{e.msg}</div>
            </div>
          ))}
          <Magnetic strength={0.25}>
            <a href="mailto:you@email.com" className="pixel hoverable" style={{
              display: 'inline-block', marginTop: '0.5rem', fontSize: '0.6rem',
              padding: '0.7rem 1rem', background: 'var(--blue)', color: 'var(--void)',
            }}>
              + SIGN GUESTBOOK
            </a>
          </Magnetic>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <VisitorCounter />
          <Blinkies />
        </div>
      </div>
    </section>
  )
}
