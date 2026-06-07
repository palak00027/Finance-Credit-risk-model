const styles = {
  green:  { background: 'var(--green-l)',  color: 'var(--green)' },
  amber:  { background: 'var(--amber-l)',  color: 'var(--amber)' },
  coral:  { background: 'var(--coral-l)',  color: 'var(--coral)' },
  blue:   { background: 'var(--accent-l)', color: 'var(--accent)' },
  grey:   { background: 'var(--bg)', color: 'var(--ink-muted)', border: '1px solid var(--border)' },
}

export default function Badge({ color = 'grey', children, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: '10px', fontWeight: 500,
      padding: '2px 8px', borderRadius: '10px',
      ...styles[color], ...style
    }}>
      {children}
    </span>
  )
}