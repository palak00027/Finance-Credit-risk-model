export default function Card({ children, style = {} }) {
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