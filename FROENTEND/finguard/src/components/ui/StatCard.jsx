export default function StatCard({ icon, iconBg, label, value, sub, subColor = 'neutral' }) {
  const subColors = { up: 'var(--green)', down: 'var(--coral)', neutral: 'var(--ink-muted)' }
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r)', padding: '16px'
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 7,
        background: iconBg || 'var(--accent-l)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, marginBottom: 9
      }}>{icon}</div>
      <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', marginBottom: 5 }}>{label}</div>
      <div style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.02em', fontFamily: "'Times New Roman', Times, serif"
      }}>{value}</div>
      {sub && <div style={{ fontSize: '10.5px', marginTop: 3, color: subColors[subColor] }}>{sub}</div>}
    </div>
  )
}