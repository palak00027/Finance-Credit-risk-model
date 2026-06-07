
export default function BarChart({ label, pct, value, color = 'var(--accent)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
      <span style={{ fontSize: '10.5px', color: 'var(--ink-soft)', width: 120, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 7, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--ink)', width: 48, textAlign: 'right', flexShrink: 0 }}>{value}</span>
    </div>
  )
}