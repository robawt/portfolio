import { useEffect, useState } from 'react'

export default function VisitorCounter({ target = 4827 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.floor(p * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  const digits = String(count).padStart(6, '0').split('')

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.4rem' }}>
      <div className="eyebrow" style={{ color: 'var(--steel)' }}>You are visitor number</div>
      <div style={{ display: 'flex', gap: '2px', background: 'var(--line)', padding: '6px', width: 'fit-content' }}>
        {digits.map((d, i) => (
          <span
            key={i}
            className="pixel"
            style={{
              background: 'var(--void)',
              color: 'var(--signal)',
              fontSize: '1.1rem',
              padding: '0.4rem 0.35rem',
              border: '1px solid var(--blue)',
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
