import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'

const sentence = "I want to build things that hold up under real use, and end up somewhere that expects that of me."
const words = sentence.split(' ')

function Word({ text, index, total, progress, highlight }) {
  // each word's reveal window is a slice of the scroll progress -> genuinely scroll-linked,
  // so the reveal speed always matches how fast the person scrolls, never a fixed timer
  const start = (index / total) * 0.8
  const end = start + 0.6 / total
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return (
    <motion.span
      style={{ opacity, color: highlight ? 'var(--signal)' : 'inherit', marginRight: '0.35ch', display: 'inline-block' }}
    >
      {text}
    </motion.span>
  )
}

export default function Ambition() {
  const ref = useRef(null)
  const { scrollYProgress: sectionProgress } = useScroll({ target: ref })
  const bgY = useTransform(sectionProgress, [0, 1], ['-15%', '15%'])

  const { scrollYProgress: wordsProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'start 0.15'],
  })

  return (
    <section id="ambition" ref={ref} style={{ alignItems: 'flex-start', overflow: 'hidden' }}>
      <ChapterTag index={7} />
      <motion.div
        style={{
          y: bgY,
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: 'url(/assets/wave-lines.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.14,
          filter: 'grayscale(0.3)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Where this is going
        </motion.div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.6rem)', maxWidth: '24ch', fontWeight: 500, lineHeight: 1.25 }}>
          {words.map((w, i) => (
            <Word key={i} text={w} index={i} total={words.length} progress={wordsProgress} highlight={i === 6} />
          ))}
        </h2>
      </div>
    </section>
  )
}
