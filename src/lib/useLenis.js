import { useEffect } from 'react'
import Lenis from 'lenis'
import { frame, cancelFrame } from 'framer-motion'

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    // sync Lenis into Framer Motion's own frame loop instead of running a
    // separate requestAnimationFrame -- two independent rAF loops fighting
    // over scroll position is what was causing the janky/broken scroll-linked
    // animations (one frame of lag between what Lenis reports and what
    // Framer's useScroll reads)
    function update(data) {
      lenis.raf(data.timestamp)
    }
    frame.update(update, true)

    return () => {
      cancelFrame(update)
      lenis.destroy()
    }
  }, [])
}
