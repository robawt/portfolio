export default function Watermark({ text, top = '50%' }) {
  return (
    <div
      className="display"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(6rem, 22vw, 20rem)',
        color: 'transparent',
        WebkitTextStroke: '1px var(--line)',
        whiteSpace: 'nowrap',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {text}
    </div>
  )
}
