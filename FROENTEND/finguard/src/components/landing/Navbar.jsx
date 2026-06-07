import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(245,244,240,0.92)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 64
    }}>
      <a href="#" style={{
        fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: '1.1rem',
        color: 'var(--ink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        FinGuard
      </a>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {['Features','How It Works','Compliance','Pricing'].map(l => (
          <a key={l} href="#" style={{ textDecoration: 'none', fontSize: '0.875rem', color: 'var(--ink-soft)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='var(--accent)'}
            onMouseLeave={e => e.target.style.color='var(--ink-soft)'}
          >{l}</a>
        ))}
      </div>
      <button onClick={() => navigate('/login')} style={{
        background: 'var(--ink)', color: 'white', border: 'none', cursor: 'pointer',
        padding: '0.5rem 1.3rem', borderRadius: '50px',
        fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500, transition: 'background 0.2s'
      }}
        onMouseEnter={e => e.target.style.background='var(--accent)'}
        onMouseLeave={e => e.target.style.background='var(--ink)'}
      >
        Get Demo
      </button>
    </nav>
  )
}