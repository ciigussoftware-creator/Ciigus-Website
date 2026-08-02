import { marqueeItems } from '../data/content'

const all = [...marqueeItems, ...marqueeItems]

export default function Marquee() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0' }}>
      <div className="ticker-track">
        {all.map((item, i) => (
          <span key={i} style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', paddingRight: '2.5rem' }}>
            <span style={{ color: 'var(--color-accent2)', paddingRight: '1rem' }}>·</span>{item}
          </span>
        ))}
      </div>
    </div>
  )
}
