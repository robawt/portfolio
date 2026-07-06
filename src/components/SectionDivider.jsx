import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENTS = { signal: 'var(--signal)', blue: 'var(--blue)' }

// Artistic break between major sections -- editorial numbering + a line that
// draws itself in on scroll + a small mark that turns continuously + a
// mouse-parallaxed ghost numeral. Not a new "section" (no min-height:100vh),
// just a beat between chapters, the way landonorris.com uses a caption card
// ("Qatar, 2024") and whitespace rather than a hard cut between blocks.
export default function SectionDivider({ index, label, accent = 'signal' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 })
  const smy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 })
  const numX = useTransform(smx, [-1, 1], ['-14px', '14px'])
  const numY = useTransform(smy, [-1, 1], ['-8px', '8px'])
  const markX = useTransform(smx, [-1, 1], ['6px', '-6px'])
  const markY = useTransform(smy, [-1, 1], ['4px', '-4px'])

  const color = ACCENTS[accent] || ACCENTS.signal

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        height: 'clamp(20vh, 4vw + 18vh, 32vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1,
        minHeight: 0,
        padding: '0',
      }}
    >
      {/* oversized ghost numeral, drifts opposite the cursor */}
      <motion.div
        className="display hoverable"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '6vw',
          top: '50%',
          x: numX,
          y: numY,
          translateY: '-50%',
          fontSize: 'clamp(4.5rem, 12vw, 10rem)',
          color: 'transparent',
          WebkitTextStroke: '1px var(--line)',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {String(index).padStart(2, '0')}
      </motion.div>

      {/* line that draws itself across as this beat enters view */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: 'absolute',
          left: '6vw',
          right: '6vw',
          top: '50%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color} 35%, ${color} 65%, transparent)`,
          transformOrigin: 'center',
          zIndex: 1,
        }}
      />

      {/* small mark that keeps turning, and nudges slightly with the cursor */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'relative',
          x: markX,
          y: markY,
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '50%',
          border: `1px solid ${color}`,
          background: 'var(--void)',
          zIndex: 2,
        }}
      >
        <span style={{ position: 'absolute', top: '50%', left: '50%', width: 1, height: '0.95rem', background: color, transform: 'translate(-50%,-50%)' }} />
        <span style={{ position: 'absolute', top: '50%', left: '50%', width: '0.95rem', height: 1, background: color, transform: 'translate(-50%,-50%)' }} />
      </motion.div>

      {/* what's coming up next, editorial-caption style */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="caption"
        style={{
          position: 'absolute',
          right: '6vw',
          top: '50%',
          translateY: '-50%',
          textAlign: 'right',
          zIndex: 2,
        }}
      >
        <div style={{ opacity: 0.55, marginBottom: '0.3rem', letterSpacing: '0.14em' }}>next —</div>
        <div style={{ color: 'var(--bone)', fontSize: '0.95rem', letterSpacing: '0.06em' }}>{label}</div>
      </motion.div>
    </div>
  )
}
