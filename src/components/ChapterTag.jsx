import { motion } from 'framer-motion'

export default function ChapterTag({ index, total = 8 }) {
  return (
    <motion.div
      className="caption"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'absolute',
        top: '6.5rem',
        right: '6vw',
        fontSize: '0.7rem',
        color: 'var(--steel)',
        zIndex: 2,
      }}
    >
      {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </motion.div>
  )
}
