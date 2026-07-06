import { motion } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import Signature from './Signature.jsx'
import ChapterTag from './ChapterTag.jsx'
import CircleStamp from './CircleStamp.jsx'
import Watermark from './Watermark.jsx'

export default function Contact() {
  return (
    <section id="contact" style={{ minHeight: '90vh', overflow: 'hidden' }}>
      <ChapterTag index={8} />
      <Watermark text="THANKS" top="10%" />
      <img
        src="/assets/mark-a-transparent.png"
        alt=""
        style={{
          position: 'absolute',
          right: '4vw',
          top: '30%',
          width: 'min(30vh, 30vw)',
          opacity: 0.08,
          animation: 'spinSlow 48s linear infinite',
          pointerEvents: 'none',
        }}
      />
      {/* corner stamp accent instead of stacking in the main flow -- keeps the
          center column from getting crowded with too many decorative pieces */}
      <div style={{ position: 'absolute', bottom: '4vh', left: '5vw', zIndex: 1 }}>
        <CircleStamp
          size={90}
          duration={26}
          centerContent={<span className="caption" style={{ fontSize: '0.55rem' }}>2026</span>}
        />
      </div>
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', marginTop: '0.75rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            Let's talk.
          </motion.h2>
        </Magnetic>

        <motion.div
          className="cursive"
          initial={{ opacity: 0, rotate: 3 }}
          whileInView={{ opacity: 1, rotate: 3 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginTop: '1.5rem' }}
        >
          seriously, say hi
        </motion.div>

        <div style={{ marginTop: '3.5rem' }}>
          <Signature />
        </div>

        <div style={{
          display: 'flex', gap: '1.75rem', flexWrap: 'wrap', justifyContent: 'center',
          marginTop: '3.5rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem', width: '100%', maxWidth: 480,
        }}>
          {[
            { label: 'Email', href: 'mailto:ayman@example.com' },
            { label: 'GitHub', href: 'https://github.com/robawt' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/ayman-khan-bb82732b5/' },
          ].map((l) => (
            <Magnetic key={l.label} strength={0.3}>
              <a href={l.href} target="_blank" rel="noreferrer" className="caption" style={{ color: 'var(--steel)' }}>
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>
        <div className="caption" style={{ color: 'var(--steel)', marginTop: '1.25rem' }}>© 2026 Mohammed Ayman Khan</div>
      </div>
    </section>
  )
}
