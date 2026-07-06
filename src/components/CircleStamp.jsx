import { useId } from 'react'

export default function CircleStamp({
  text = 'BUILDER • MAKER • EST 2026 • ',
  size = 140,
  color = 'var(--signal)',
  duration = 20,
  centerContent = null,
}) {
  const uid = useId()
  const id = `circlepath-${uid}`
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%', height: '100%',
          animation: `spinStamp ${duration}s linear infinite`,
        }}
      >
        <defs>
          <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill={color} fontSize="7.2" letterSpacing="0.5">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      {centerContent && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {centerContent}
        </div>
      )}
      <style>{`
        @keyframes spinStamp {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
