import Magnetic from './Magnetic.jsx'

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.5rem 6vw',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', mixBlendMode: 'difference' }}>
        <img src="/assets/mark-a-transparent.png" alt="mark" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        <span className="eyebrow" style={{ color: 'var(--bone)' }}>Ayman Khan</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', mixBlendMode: 'difference' }}>
        {['Moments', 'Work', 'Contact'].map((label) => (
          <Magnetic key={label} strength={0.3}>
            <a href={`#${label.toLowerCase()}`} className="eyebrow" style={{ color: 'var(--bone)' }}>
              {label}
            </a>
          </Magnetic>
        ))}
      </div>
    </nav>
  )
}
