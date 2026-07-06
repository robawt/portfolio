import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, style = {}, className = '' }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(srx, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(sry, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    rx.set((e.clientY - rect.top) / rect.height - 0.5)
    ry.set((e.clientX - rect.left) / rect.width - 0.5)
  }
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX, rotateY, transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  )
}
