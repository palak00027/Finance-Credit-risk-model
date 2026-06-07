export default function AccessDenied({ message }) {
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