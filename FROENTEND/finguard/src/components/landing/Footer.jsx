import { useNavigate } from 'react-router-dom'
import { PROBLEMS, FEATURES, METRICS, HOW_IT_WORKS } from '../../data/landingData'

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