import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 })

  return (
    <motion.div
      style={{
        scaleX: smoothed,
        transformOrigin: '0% 0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--signal)',
        zIndex: 60,
      }}
    />
  )
}
