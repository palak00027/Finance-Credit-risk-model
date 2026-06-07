import { useLocation, useNavigate } from 'react-router-dom'

const PAGE_TITLES = {
  '/app/dashboard': 'Dashboard',
  '/app/fraud': 'Fraud Monitor',
  '/app/credit': 'Credit Scoring',
  '/app/risk': 'Risk Simulation',
  '/app/sandbox': 'API Sandbox',
  '/app/rbac': 'RBAC Permission Matrix',
  '/app/compliance': 'RBI / DPDP Compliance',
  '/app/consent': 'Consent Engine',
}

export default function Topbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const title = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <div style={{
      background: 'var(--card)', borderBottom: '1px solid var(--border)',
      padding: '0 22px', height: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, position: 'sticky', top: 0, zIndex: 5
    }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', fontFamily: "'Times New Roman', Times, serif" }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--green-l)', color: 'var(--green)', fontSize: 10, fontWeight: 500, padding: '3px 9px', borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s infinite' }} />
          Live
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="Search transactions..."
          style={{
            background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 7,
            padding: '4px 11px', fontSize: '11.5px', color: 'var(--ink)',
            width: 170, outline: 'none', fontFamily: "'DM Sans', sans-serif"
          }}
        />
        {/* Bell */}
        <div style={{ position: 'relative', cursor: 'pointer', padding: 4 }}>
          <span style={{ fontSize: 14 }}>🔔</span>
          <div style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)', border: '1.5px solid var(--card)' }} />
        </div>
        {/* Back to landing */}
        <button onClick={() => navigate('/')} style={{
          background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 7,
          padding: '5px 12px', fontSize: 11, cursor: 'pointer', color: 'var(--ink-soft)',
          fontFamily: "'DM Sans', sans-serif"
        }}>← Landing</button>
      </div>
    </div>
  )
}