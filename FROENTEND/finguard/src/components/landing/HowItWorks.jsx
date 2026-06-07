import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'

export default function HowItWorks() {
  return (
    <section style={{ padding: '5rem 2rem' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Architecture</div>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 680 }}>
          How FinGuard works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '2rem', marginTop: '3rem' }}>
          {HOW_IT_WORKS.map(step => (
            <div key={step.num} style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{
                fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: '2rem',
                color: 'var(--accent)', opacity: 0.25, lineHeight: 1, flexShrink: 0
              }}>{step.num}</div>
              <div>
                <h3 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', fontWeight: 300, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}