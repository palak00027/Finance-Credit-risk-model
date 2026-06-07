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

export function CTASection() {
  const navigate = useNavigate()
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--accent)', color: 'white', textAlign: 'center' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto' }}>
          Ready to secure your <em style={{ fontStyle: 'normal', opacity: 0.8 }}>FinTech stack?</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '1rem', fontSize: '1.05rem', fontWeight: 300 }}>
          Join banks, fintechs, and regulators already using FinGuard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'white', color: 'var(--accent)', border: 'none', cursor: 'pointer',
            padding: '0.85rem 2rem', borderRadius: '50px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500, transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.target.style.transform='translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform='none'}
          >
            Launch Demo →
          </button>
          <button style={{
            background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)',
            cursor: 'pointer', padding: '0.85rem 2rem', borderRadius: '50px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s'
          }}
            onMouseEnter={e => e.target.style.borderColor='white'}
            onMouseLeave={e => e.target.style.borderColor='rgba(255,255,255,0.4)'}
          >
            Read Documentation
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Footer() {
  return (
    <footer style={{
      padding: '2rem', background: 'var(--ink)', color: 'rgba(255,255,255,0.4)',
      fontSize: '0.82rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        <span style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700 }}>FinGuard</span>
      </div>
      <div>© 2026 FinGuard. Built for India's FinTech ecosystem.</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Terms', 'Security', 'API Docs'].map(l => (
          <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
    </footer>
  )
}