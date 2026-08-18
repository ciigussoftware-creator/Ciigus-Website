import { techStack } from '../data/content'

const all = [...techStack, ...techStack]

export default function TechMarquee() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', background: '#fff', borderBottom: '1px solid var(--color-border)', padding: '1.2rem 0' }}>
      <div className="ticker-track" style={{ animationDuration: '50s' }}>
        {all.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', paddingRight: '3rem' }}>
            <img src={item.logo} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.6, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.6' }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
