import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'
import TiltCard from './TiltCard.jsx'

const moments = [
  { word: 'Canvas', title: 'Visual Arts', sub: 'Painting, sketching, creative expression', tag: 'Sketchbook, 2024', bg: 'url(https://picsum.photos/seed/art-canvas/900/1200)' },
  { word: 'Verse', title: 'Poetry', sub: 'Finding rhythm in language and thought', tag: 'Notebook, 2023', bg: 'url(https://picsum.photos/seed/poetry-verse/900/1200)' },
  { word: 'Pitch', title: 'Football', sub: 'Tactics, teamwork, the beautiful game', tag: 'Sunday league, 2024', bg: 'url(https://picsum.photos/seed/football-pitch/900/1200)' },
  { word: 'Keys', title: 'Piano', sub: 'Late nights, half-finished songs', tag: 'Home studio, 2024', bg: 'url(https://picsum.photos/seed/piano-keys/900/1200)' },
  { word: 'Mind', title: 'Neuroscience & Philosophy', sub: 'How we think, why we think it', tag: 'Reading list, 2024', bg: 'url(https://picsum.photos/seed/mind-brain/900/1200)' },
  { word: 'Frame', title: 'Photography', sub: 'Looking for the light in ordinary things', tag: 'Golden hour, 2023', bg: 'url(https://picsum.photos/seed/frame-photo/900/1200)' },
  { word: 'Miles', title: 'Running', sub: 'Clearing the head, one mile at a time', tag: 'Early morning, 2024', bg: 'url(https://picsum.photos/seed/miles-running/900/1200)' },
  { word: 'Page', title: 'Reading', sub: 'A book open somewhere, always', tag: 'Nightstand, 2024', bg: 'url(https://picsum.photos/seed/page-books/900/1200)' },
]

function MomentCard({ m, i, count, scrollYProgress }) {
  const step = 1 / count
  const start = i * step
  const end = start + step

  const scale = useTransform(
    scrollYProgress,
    [start - step * 0.7, start, end, end + step * 0.7],
    [0.93, 1, 1, 0.93]
  )
  const opacity = useTransform(
    scrollYProgress,
    [start - step * 0.9, start, end, end + step * 0.9],
    [0.4, 1, 1, 0.4]
  )

  return (
    <TiltCard
      className="hoverable moment-card"
      style={{
        position: 'relative',
        width: 'min(74vw, 480px)',
        height: '70vh',
        flex: '0 0 auto',
        scale,
        opacity,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `${m.bg} center/cover no-repeat` }} />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(11,17,48,0.05) 0%, rgba(11,17,48,0.15) 55%, rgba(11,17,48,0.92) 100%)',
        }}
      />
      <div className="caption" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: 'var(--steel)', zIndex: 1 }}>
        0{i + 1} — {m.tag}
      </div>
      <div
        className="display"
        aria-hidden="true"
        style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: '3rem', color: 'rgba(255,212,0,0.10)', whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        {m.word}
      </div>
      <div style={{ position: 'absolute', left: '1.5rem', bottom: '1.5rem', right: '1.5rem', zIndex: 1 }}>
        <div className="caption" style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.2rem' }}>{m.title}</div>
        <div className="caption" style={{ color: 'var(--steel)' }}>{m.sub}</div>
      </div>
    </TiltCard>
  )
}

export default function Moments() {
  const count = moments.length
  const pinWrapRef = useRef(null)
  const trackRef = useRef(null)
  const [maxTranslate, setMaxTranslate] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [active, setActive] = useState(1)
  const [galleryFixed, setGalleryFixed] = useState(false)

  const { scrollYProgress } = useScroll({ target: pinWrapRef })

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const trackWidth = trackRef.current.scrollWidth
      const vw = window.innerWidth
      setViewportWidth(vw)
      setMaxTranslate(Math.max(0, trackWidth - vw + Math.round(vw * 0.06)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [galleryFixed])

  const pinHeight = Math.max(320, count * 45)
  // cards enter from the LEFT (off-screen) and scroll RIGHT through the
  // viewport, then exit to the RIGHT — no opacity fade, pure horizontal motion
  // viewportWidth buffer on each side ensures the track is fully off-screen
  // at the boundaries so no card slivers peek in before/after the scroll range
  const scrollRange = maxTranslate + viewportWidth
  const x = useTransform(scrollYProgress, [0, 1], [-scrollRange, scrollRange])
  const introOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  // preload gallery background images
  const preloadedImages = useRef([])
  useEffect(() => {
    moments.forEach((m) => {
      const match = m.bg.match(/url\(['"]?([^'")\)]+)['"]?\)/)
      if (match) {
        const img = new Image()
        img.src = match[1]
        preloadedImages.current.push(img)
      }
    })
  }, [])

  // The gallery renders as a position:fixed overlay only during the scroll
  // range. Cards enter from off-screen LEFT, pass through the viewport, and
  // exit to the RIGHT — no opacity fade, the horizontal motion itself is
  // the entrance/exit animation. At the boundaries the track is fully
  // off-screen so there's nothing visible to pop.

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(count, Math.max(1, Math.floor(v * count) + 1)))
    setGalleryFixed(v > 0 && v < 1)
  })

  return (
    <section id="moments" style={{ padding: '9vh 0 0 0', minHeight: 'auto' }}>
      <ChapterTag index={3} total={7} />
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

      {/* pinWrapRef — tall spacer that controls scroll duration.
          Gallery overlay is rendered as position:fixed during the scroll range
          and simply disappears outside it — cards are off-screen at the
          boundaries so no fade is needed. */}
      {galleryFixed && (
        <motion.div
          style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 5,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <GalleryContent
              trackRef={trackRef}
              x={x}
              introOpacity={introOpacity}
              active={active}
              count={count}
              barScale={barScale}
              moments={moments}
              scrollYProgress={scrollYProgress}
            />
          </motion.div>
        )}
      <div ref={pinWrapRef} style={{ height: `${pinHeight}vh`, position: 'relative' }} />
    </section>
  )
}

function GalleryContent({ trackRef, x, introOpacity, active, count, barScale, moments, scrollYProgress }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <motion.div
        className="caption"
        style={{
          position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)',
          opacity: introOpacity, color: 'var(--steel)', letterSpacing: '0.14em', zIndex: 3,
        }}
      >
        keep scrolling — this part moves sideways
      </motion.div>

      <div className="caption" style={{ position: 'absolute', top: '2rem', right: '6vw', color: 'var(--steel)', zIndex: 3 }}>
        {String(active).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </div>

      <motion.div ref={trackRef} style={{ x, display: 'flex', gap: '2px', paddingLeft: '6vw', height: '100%', alignItems: 'center' }}>
        {moments.map((m, i) => (
          <MomentCard key={m.title} m={m} i={i} count={count} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      <div style={{ position: 'absolute', bottom: '2.5rem', left: '6vw', right: '6vw', height: 1, background: 'var(--line)', zIndex: 3 }}>
        <motion.div style={{ scaleX: barScale, transformOrigin: '0% 50%', height: '100%', background: 'var(--signal)' }} />
      </div>
    </div>
  )
}
