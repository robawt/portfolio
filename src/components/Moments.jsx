import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'
import TiltCard from './TiltCard.jsx'
import Watermark from './Watermark.jsx'

const moments = [
  { word: 'Canvas', title: 'Visual Arts', sub: 'Painting, sketching, creative expression', bg: 'url(https://picsum.photos/seed/art-canvas/800/600)' },
  { word: 'Verse', title: 'Poetry', sub: 'Finding rhythm in language and thought', bg: 'url(https://picsum.photos/seed/poetry-verse/800/600)' },
  { word: 'Pitch', title: 'Football', sub: 'Tactics, teamwork, and the beautiful game', bg: 'url(https://picsum.photos/seed/football-pitch/800/600)' },
  { word: 'Mind', title: 'Neuroscience & Philosophy', sub: 'How we think, why we think it', bg: 'url(https://picsum.photos/seed/mind-brain/800/600)' },
]

export default function Moments() {
  // separate ref for just the horizontal-scroll track, decoupled from the header's
  // own timing above it -- this is what keeps the pan from feeling rushed
  const trackWrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackWrapRef })
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-72%'])

  return (
    <section id="moments" style={{ padding: '9vh 0 0 0', minHeight: 'auto' }}>
      <ChapterTag index={3} />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '1.75rem', marginBottom: '4rem', padding: '0 6vw',
      }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          Outside the work
        </motion.div>
        <div style={{ position: 'relative' }}>
          <motion.h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            Moments
          </motion.h2>
          <motion.span
            className="cursive"
            initial={{ opacity: 0, rotate: 5 }}
            whileInView={{ opacity: 1, rotate: 5 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ position: 'absolute', bottom: '-1rem', right: '-2rem', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}
          >
            & life
          </motion.span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: '42ch', color: 'var(--steel)' }}
        >
          The things that shape how I build — arts, poetry, the pitch, and the mind.
        </motion.p>
      </div>

      {/* tall enough that the horizontal pan unfolds gradually rather than snapping past in one screen */}
      <div ref={trackWrapRef} style={{ height: '175vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <motion.div style={{ x, display: 'flex', gap: '2px' }}>
            {moments.map((m, i) => (
              <TiltCard
                key={m.title}
                className="hoverable"
                style={{
                  position: 'relative',
                  width: 'min(70vw, 420px)',
                  height: '56vh',
                  flex: '0 0 auto',
                  background: `${m.bg} center/cover no-repeat`,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(11,17,48,0.2) 0%, rgba(11,17,48,0.85) 100%)',
                }} />
                <div className="caption" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: 'var(--steel)', zIndex: 1 }}>
                  0{i + 1}
                </div>
                <div
                  className="display"
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: '2.6rem', color: 'rgba(255,212,0,0.12)', whiteSpace: 'nowrap',
                    zIndex: 1,
                  }}
                >
                  {m.word}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="caption" style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.2rem' }}>{m.title}</div>
                  <div className="caption" style={{ color: 'var(--steel)' }}>{m.sub}</div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
