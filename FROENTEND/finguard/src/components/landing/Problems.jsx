import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'

export function Problems() {
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--ink)', color: 'white' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B8FFF', marginBottom: '0.75rem' }}>The Problem</div>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'white', maxWidth: 680 }}>
          India's financial system has critical gaps
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: '0.75rem', fontWeight: 300 }}>
          Fraud, financial exclusion, and compliance complexity cost the Indian economy billions every year.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))',
          gap: '1px', marginTop: '3rem', background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--r)', overflow: 'hidden'
        }}>
          {PROBLEMS.map(p => (
            <div key={p.title} style={{ background: 'var(--ink)', padding: '2rem', transition: 'background 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--ink)'}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 600, fontSize: '1.05rem', color: 'white', marginBottom: '0.5rem' }}>{p.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}