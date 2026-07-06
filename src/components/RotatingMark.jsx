import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'

const cornerStyle = (i) => ({
  position: 'absolute',
  width: 14,
  height: 14,
  borderTop: i < 2 ? '2px solid var(--signal)' : 'none',
  borderBottom: i >= 2 ? '2px solid var(--signal)' : 'none',
  borderLeft: i % 2 === 0 ? '2px solid var(--signal)' : 'none',
  borderRight: i % 2 === 1 ? '2px solid var(--signal)' : 'none',
  top: i < 2 ? -1 : 'auto',
  bottom: i >= 2 ? -1 : 'auto',
  left: i % 2 === 0 ? -1 : 'auto',
  right: i % 2 === 1 ? -1 : 'auto',
})

export default function RotatingMark() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef })
  const frameOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])

  useEffect(() => {
    const v = videoRef.current
    const onLoaded = () => setReady(true)
    v.addEventListener('loadedmetadata', onLoaded)
    return () => v.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const v = videoRef.current
    if (!v || !ready || !v.duration) return
    v.currentTime = Math.min(Math.max(progress, 0), 1) * v.duration
  })

  return (
    // tall scroll distance = finer-grained control over the rotation, feels deliberate rather than rushed
    <section ref={sectionRef} style={{ minHeight: '210vh', padding: 0, display: 'block' }}>
      <ChapterTag index={2} total={7} />
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <motion.div className="eyebrow" style={{ opacity: frameOpacity, position: 'absolute', top: '9vh' }}>
          Scroll to rotate
        </motion.div>

        <motion.div
          style={{
            opacity: frameOpacity,
            width: 'min(52vh, 52vw)',
            height: 'min(52vh, 52vw)',
            border: '1px solid var(--line)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2, 3].map((i) => <span key={i} style={cornerStyle(i)} />)}

          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            src="/assets/mark-rotate.mp4"
            style={{ width: '86%', height: '86%', objectFit: 'contain' }}
          />
        </motion.div>

        <motion.div className="caption" style={{ opacity: frameOpacity, position: 'absolute', bottom: '9vh', fontSize: '0.6rem', color: 'var(--steel)' }}>
          [ THE MARK ]
        </motion.div>
      </div>
    </section>
  )
}
