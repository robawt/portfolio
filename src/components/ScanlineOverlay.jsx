export default function ScanlineOverlay() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 998,
      pointerEvents: 'none',
      background: 'repeating-linear-gradient(0deg, rgba(11,17,48,0.06) 0px, rgba(11,17,48,0.06) 1px, transparent 1px, transparent 3px)',
      mixBlendMode: 'multiply',
      opacity: 0.5,
    }} />
  )
}
