import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'

export default function Metrics() {
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--card)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>By the Numbers</div>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 680 }}>
          Performance you can stake your compliance on
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', marginTop: '3rem'
        }}>
          {METRICS.map(m => (
            <div key={m.num} style={{ background: 'var(--card)', padding: '2.5rem 1.5rem' }}>
              <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: '2.4rem', letterSpacing: '-0.03em', color: 'var(--ink)' }}>{m.num}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}