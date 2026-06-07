import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'


export default function CTASection() {
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