import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { damping: 28, stiffness: 320, mass: 0.4 })
  const sy = useSpring(my, { damping: 28, stiffness: 320, mass: 0.4 })

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }
    const over = (e) => {
      setHovering(!!e.target.closest('.hoverable'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mx, my])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: hovering ? 56 : 10,
        height: hovering ? 56 : 10,
        borderRadius: '50%',
        background: hovering ? 'transparent' : 'var(--signal)',
        border: hovering ? '1px solid var(--signal)' : 'none',
        pointerEvents: 'none',
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease, opacity 0.2s ease',
        mixBlendMode: 'difference',
      }}
    />
  )
}
