const items = [
  'WELCOME TO MY CORNER OF THE INTERNET',
  'BUILT WITH REACT + THREE.JS',
  'EST. 2026',
  'BEST VIEWED WITH THE SOUND ON',
  'STILL UNDER CONSTRUCTION (AREN\u2019T WE ALL)',
]

export default function Marquee({ bg = 'var(--signal)', fg = 'var(--void)', reverse = false, customItems = null }) {
  const list = customItems || items
  const content = list.join('   \u2605   ') + '   \u2605   '
  return (
    <div style={{
      background: bg,
      color: fg,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      borderTop: '3px solid var(--void)',
      borderBottom: '3px solid var(--void)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div className="pixel" style={{
        display: 'inline-block',
        fontSize: '0.7rem',
        padding: '0.9rem 0',
        animation: `${reverse ? 'marqueeRev' : 'marquee'} 34s linear infinite`,
      }}>
        {content}{content}
      </div>
    </div>
  )
}
