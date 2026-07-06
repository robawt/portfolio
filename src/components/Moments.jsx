import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'
import TiltCard from './TiltCard.jsx'

const moments = [
  { word: 'Field', title: 'Photography', sub: 'Since 2019' },
  { word: 'Court', title: 'Basketball', sub: 'Point guard, city league' },
  { word: 'Studio', title: 'Music production', sub: 'Three EPs, no label' },
  { word: 'Kitchen', title: 'Cooking', sub: 'Mostly for other people' },
]

export default function Moments() {
  // separate ref for just the horizontal-scroll track, decoupled from the header's
  // own timing above it -- this is what keeps the pan from feeling rushed
  const trackWrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackWrapRef })
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-72%'])

  return (
    <section id="moments" style={{ padding: '9vh 0 0 6vw', minHeight: 'auto' }}>
      <ChapterTag index={3} />
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: '2rem', flexWrap: 'wrap', marginBottom: '3.5rem', paddingRight: '6vw',
      }}>
        <div>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Outside the work
          </motion.div>
          <motion.h2
            className="display"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            Moments
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: '34ch', color: 'var(--steel)' }}
        >
          Swap each block for a real photo — the caption is doing the work an icon used to.
        </motion.p>
      </div>

      {/* tall enough that the horizontal pan unfolds gradually rather than snapping past in one screen */}
      <div ref={trackWrapRef} style={{ height: '220vh', position: 'relative' }}>
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
                  background: 'linear-gradient(155deg, #1B1B20 0%, #0C0C0F 100%)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div className="caption" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: 'var(--steel)' }}>
                  0{i + 1}
                </div>
                <div
                  className="display"
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: '2.6rem', color: 'rgba(237,235,228,0.08)', whiteSpace: 'nowrap',
                  }}
                >
                  {m.word}
                </div>
                <div>
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
