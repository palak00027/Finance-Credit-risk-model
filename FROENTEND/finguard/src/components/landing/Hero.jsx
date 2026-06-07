import { useNavigate } from 'react-router-dom'

const STATS = [
  { num: '97.3%', label: 'Fraud Model Accuracy' },
  { num: '400M+', label: 'Thin-File Borrowers Served' },
  { num: '42ms', label: 'Avg API Response Time' },
]

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '8rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(26,63,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,63,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      {/* Pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'var(--accent-l)', color: 'var(--accent)',
        padding: '0.35rem 1rem', borderRadius: '50px',
        fontSize: '0.78rem', fontWeight: 500, marginBottom: '1.5rem',
        position: 'relative', zIndex: 1, border: '1px solid rgba(26,63,255,0.2)'
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        India's AI-Native FinTech Compliance Platform
      </div>

      <h1 style={{
        fontFamily: "'Times New Roman', Times, serif", fontWeight: 800,
        fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 1.05,
        letterSpacing: '-0.02em', maxWidth: 900, position: 'relative', zIndex: 1
      }}>
        Stop Fraud. Score Everyone.<br />
        <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Stay Compliant.</em>
      </h1>

      <p style={{
        maxWidth: 560, color: 'var(--ink-soft)', fontSize: '1.05rem',
        fontWeight: 300, marginTop: '1.5rem', position: 'relative', zIndex: 1
      }}>
        Graph-neural fraud detection, alternative-data credit scoring, and DPDP-native consent — built for Indian banks, fintechs, and regulators.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/login')} style={{
          background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
          padding: '0.85rem 2rem', borderRadius: '50px',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(26,63,255,0.3)' }}
          onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none' }}
        >
          Launch Demo →
        </button>
        <button style={{
          background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--border)', cursor: 'pointer',
          padding: '0.85rem 2rem', borderRadius: '50px',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s'
        }}
          onMouseEnter={e => e.target.style.borderColor='var(--ink)'}
          onMouseLeave={e => e.target.style.borderColor='var(--border)'}
        >
          See How It Works
        </button>
      </div>

      <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {STATS.map(s => (
          <div key={s.num} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: '1.8rem', color: 'var(--ink)' }}>{s.num}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}