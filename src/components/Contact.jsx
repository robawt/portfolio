import { motion } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import Signature from './Signature.jsx'
import ChapterTag from './ChapterTag.jsx'

export default function Contact() {
  return (
    <section id="contact" style={{ justifyContent: 'space-between', minHeight: '85vh', overflow: 'hidden' }}>
      <ChapterTag index={8} />
      <img
        src="/assets/mark-a-transparent.png"
        alt=""
        style={{
          position: 'absolute',
          right: '4vw',
          top: '50%',
          width: 'min(38vh, 38vw)',
          transform: 'translateY(-50%)',
          opacity: 0.08,
          animation: 'spinSlow 48s linear infinite',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        @keyframes spinSlow {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Get in touch
        </motion.div>
        <Magnetic strength={0.25}>
          <motion.h2
            className="display"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            Let's talk.
          </motion.h2>
        </Magnetic>

        <div style={{ marginTop: '2.5rem' }}>
          <Signature />
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderTop: '1px solid var(--line)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Email', href: 'mailto:you@email.com' },
            { label: 'GitHub', href: 'https://github.com/yourhandle' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle' },
          ].map((l) => (
            <Magnetic key={l.label} strength={0.3}>
              <a href={l.href} target="_blank" rel="noreferrer" className="caption" style={{ color: 'var(--steel)' }}>
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>
        <div className="caption" style={{ color: 'var(--steel)' }}>© 2026 [Your Name]</div>
      </div>
    </section>
  )
}
