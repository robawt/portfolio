const badges = [
  { text: 'REACT INSIDE', color: 'var(--blue)' },
  { text: '100% HUMAN MADE', color: 'var(--signal)' },
  { text: 'NO COOKIES USED', color: 'var(--blue)' },
  { text: 'CSS3 POWERED', color: 'var(--signal)' },
]

export default function Blinkies() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      {badges.map((b) => (
        <div
          key={b.text}
          className="pixel"
          style={{
            '--blink-color': b.color,
            fontSize: '0.55rem',
            padding: '0.55rem 0.7rem',
            background: 'var(--void)',
            color: b.color,
            border: '2px solid var(--blink-color)',
            animation: 'blinkBorder 1.4s steps(1) infinite',
          }}
        >
          {b.text}
        </div>
      ))}
      <style>{`
        @keyframes blinkBorder {
          0%, 49% { border-color: var(--blink-color); }
          50%, 100% { border-color: transparent; }
        }
      `}</style>
    </div>
  )
}
