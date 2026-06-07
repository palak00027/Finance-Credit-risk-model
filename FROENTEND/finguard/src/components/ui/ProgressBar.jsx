export default function ProgressBar({ label, value, pct, color = 'var(--green)' }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '10.5px', color: 'var(--ink-soft)' }}>{label}</span>
        <span style={{ fontSize: '10.5px', fontWeight: 500, color }}>{value}</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}