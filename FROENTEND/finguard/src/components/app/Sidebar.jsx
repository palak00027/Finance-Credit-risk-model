import { useNavigate, useLocation } from 'react-router-dom'
import { useRole } from '../../context/RoleContext'
import { useAuth } from '../../context/AuthContext'
import { ROLES } from '../../data/roles'

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: '⬛', path: '/app/dashboard', section: 'Overview' },
  { id: 'fraud', label: 'Fraud Monitor', icon: '🔍', path: '/app/fraud', badge: '3', badgeColor: 'coral' },
  { id: 'credit', label: 'Credit Scoring', icon: '📊', path: '/app/credit' },
  { id: 'risk', label: 'Risk Simulation', icon: '⚡', path: '/app/risk' },
  { id: 'sandbox', label: 'API Sandbox', icon: '⚙️', path: '/app/sandbox' },
  { id: 'rbac', label: 'RBAC Matrix', icon: '🔐', path: '/app/rbac', section: 'Compliance & Access' },
  { id: 'compliance', label: 'RBI / DPDP', icon: '✅', path: '/app/compliance', badge: 'OK', badgeColor: 'green' },
  { id: 'consent', label: 'Consent Engine', icon: '🔒', path: '/app/consent' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, setRole } = useRole()
  const { currentUser, logout } = useAuth()
  const cfg = ROLES[role]

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div style={{
      width: 228, minWidth: 228, background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', zIndex: 10, overflowY: 'auto'
    }}>
      {/* Logo */}
      <div onClick={() => navigate('/')} title="Back to landing" style={{
        padding: '18px 18px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
      }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 13, color: 'white', letterSpacing: '0.02em', fontFamily: "'Times New Roman', Times, serif" }}>FinGuard</span>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 16px 10px' }} />

      {/* Role Switcher */}
      <div style={{ padding: '4px 18px 6px' }}>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6,
            color: 'white', fontSize: 11, padding: '6px 8px',
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", outline: 'none'
          }}
        >
          {Object.entries(ROLES).map(([k, v]) => (
            <option key={k} value={k} style={{ background: '#1a1f3e' }}>{v.label}</option>
          ))}
        </select>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 16px 10px' }} />

      {/* Nav Items */}
      {NAV_ITEMS.map((item, i) => {
        const isDenied = cfg.deny.includes(item.id)
        const isActive = location.pathname === item.path
        const isSection = item.section && (i === 0 || NAV_ITEMS[i-1].section !== item.section)

        return (
          <div key={item.id}>
            {item.section && (
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', padding: '0 18px 6px', textTransform: 'uppercase' }}>
                {item.section}
              </div>
            )}
            <div
              onClick={() => !isDenied && navigate(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 18px', cursor: isDenied ? 'not-allowed' : 'pointer',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                fontSize: '12.5px', fontWeight: 400, transition: 'all 0.15s',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                background: isActive ? 'rgba(26,63,255,0.22)' : 'transparent',
                opacity: isDenied ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (!isDenied && !isActive) { e.currentTarget.style.color='white'; e.currentTarget.style.background='rgba(255,255,255,0.05)' }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color='rgba(255,255,255,0.5)'; e.currentTarget.style.background='transparent' }}}
            >
              <span style={{ width: 15, textAlign: 'center', fontSize: 12 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  background: item.badgeColor === 'green' ? 'var(--green)' : 'var(--coral)',
                  color: 'white', fontSize: 10, fontWeight: 600,
                  padding: '1px 6px', borderRadius: 10
                }}>{item.badge}</span>
              )}
            </div>
          </div>
        )
      })}

      {/* User Footer */}
      <div style={{ marginTop: 'auto', padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: 'white', flexShrink: 0
          }}>
            {currentUser?.initials || cfg.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'white' }}>{cfg.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>{cfg.role}</div>
          </div>
          <button onClick={handleLogout} title="Logout" style={{
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)',
            cursor: 'pointer', fontSize: 14, padding: '2px 4px'
          }}>↩</button>
        </div>
      </div>
    </div>
  )
}