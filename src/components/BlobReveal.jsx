import { useEffect, useRef } from 'react'

export default function BlobReveal() {
  const maskRef = useRef(null)

  useEffect(() => {
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      // gentle lag so the reveal trails the cursor like a heavy light, not a rigid cutout
      cx += (mx - cx) * 0.09
      cy += (my - cy) * 0.09
      if (maskRef.current) {
        maskRef.current.style.setProperty('--mx', `${cx}px`)
        maskRef.current.style.setProperty('--my', `${cy}px`)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* hidden design layer, sits behind everything */}
      <div
        className="blob-reveal-layer"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'url(/assets/wave-lines.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      {/* opaque cover with a cursor-shaped hole cut into it via mask */}
      <div
        ref={maskRef}
        className="blob-reveal-layer"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'var(--void)',
          WebkitMaskImage:
            'radial-gradient(circle at var(--mx) var(--my), black 0px, black 130px, white 240px)',
          maskImage:
            'radial-gradient(circle at var(--mx) var(--my), black 0px, black 130px, white 240px)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
