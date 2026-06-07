import Badge from './Badge'

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r)', padding: '18px', ...style
    }}>
      {children}
    </div>
  )
}

export function CardSm({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-sm)', padding: '14px', ...style
    }}>
      {children}
    </div>
  )
}

export function StatCard({ icon, iconBg, label, value, sub, subColor = 'neutral' }) {
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

export function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 5
    }}>{children}</div>
  )
}

export function SectionTitle({ children, style = {} }) {
  return (
    <div style={{
      fontWeight: 600, fontSize: 13, marginBottom: 12,
      fontFamily: "'Times New Roman', Times, serif", color: 'var(--ink)', ...style
    }}>{children}</div>
  )
}

export function BarRow({ label, pct, value, color = 'var(--accent)' }) {
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

export function ProgressBar({ label, value, pct, color = 'var(--green)' }) {
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

export function ActivityItem({ dotColor, title, time, badge, badgeColor }) {
  return (
    <div style={{
      display: 'flex', gap: 11, padding: '9px 0',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: dotColor, marginTop: 4, flexShrink: 0
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11.5px', color: 'var(--ink)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{title}</span>
          {badge && <Badge color={badgeColor}>{badge}</Badge>}
        </div>
        <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', marginTop: 1 }}>{time}</div>
      </div>
    </div>
  )
}

export function AccessDenied({ message }) {
  return (
    <div style={{
      background: 'var(--coral-l)', color: 'var(--coral)',
      padding: '12px 16px', borderRadius: 'var(--r-sm)',
      fontSize: '12px', fontWeight: 500, marginBottom: 16
    }}>
      🚫 {message}
    </div>
  )
}

export function AccessAllowed({ message }) {
  return (
    <div style={{
      background: 'var(--amber-l)', color: 'var(--amber)',
      padding: '12px 16px', borderRadius: 'var(--r-sm)',
      fontSize: '12px', fontWeight: 500, marginBottom: 16
    }}>
      {message}
    </div>
  )
}

export function StatsGrid({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 13, marginBottom: 18
    }}>
      {children}
    </div>
  )
}

export function Grid2({ children, style = {} }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18, ...style }}>
      {children}
    </div>
  )
}

export function Grid3({ children, style = {} }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 13, ...style }}>
      {children}
    </div>
  )
}