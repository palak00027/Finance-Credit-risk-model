import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'

const accentColors = {
  blue: 'var(--accent)', green: 'var(--green)', amber: 'var(--amber)', coral: 'var(--coral)'
}


export default function Features() {
  return (
    <section style={{ padding: '5rem 2rem' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Platform</div>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 680 }}>
          Every layer of FinTech risk, covered
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.25rem', marginTop: '3rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)',
              padding: '1.75rem', position: 'relative', overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(13,15,26,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accentColors[f.color] }} />
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 600, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', fontWeight: 300, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}