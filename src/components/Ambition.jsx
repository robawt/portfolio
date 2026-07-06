import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ChapterTag from './ChapterTag.jsx'
import Watermark from './Watermark.jsx'

const sentence = "I want to build things at the intersection of data and human understanding, where AI serves people not the other way around."
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
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(sectionProgress, [0, 1], ['-15%', '15%'])

  const { scrollYProgress: wordsProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'start 0.15'],
  })

  return (
    <section id="ambition" ref={ref} style={{ overflow: 'hidden' }}>
      <ChapterTag index={7} />
      <Watermark text="AMBITION" top="15%" />
      <motion.div
        style={{
          y: bgY,
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: 'url(/assets/wave-lines.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16,
          filter: 'grayscale(0.3)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Where this is going
        </motion.div>
        <h2 style={{ fontSize: 'clamp(1.9rem, 6vw, 3.8rem)', maxWidth: '26ch', fontWeight: 500, lineHeight: 1.3, marginTop: '1rem' }}>
          {words.map((w, i) => (
            <Word key={i} text={w} index={i} total={words.length} progress={wordsProgress} highlight={i === 7} />
          ))}
        </h2>
      </div>
    </section>
  )
}
