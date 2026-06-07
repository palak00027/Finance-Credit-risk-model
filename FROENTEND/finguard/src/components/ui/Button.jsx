const variants = {
  primary: {
    background: 'var(--accent)', color: 'white', border: 'none',
    padding: '0.85rem 2rem', borderRadius: '50px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
    transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-block', textDecoration: 'none',
  },
  outline: {
    background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--border)',
    padding: '0.85rem 2rem', borderRadius: '50px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
    transition: 'border-color 0.2s', display: 'inline-block', textDecoration: 'none',
  },
  white: {
    background: 'white', color: 'var(--accent)', border: 'none',
    padding: '0.85rem 2rem', borderRadius: '50px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
    transition: 'transform 0.2s', display: 'inline-block', textDecoration: 'none',
  },
  ghost: {
    background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)',
    padding: '0.85rem 2rem', borderRadius: '50px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
    transition: 'border-color 0.2s', display: 'inline-block', textDecoration: 'none',
  },
  sm: {
    background: 'var(--accent)', color: 'white', border: 'none',
    padding: '0.5rem 1.1rem', borderRadius: '7px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', fontWeight: 500,
  },
}

export default function Button({ variant = 'primary', children, onClick, style = {}, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} style={{ ...variants[variant], ...style }}>
      {children}
    </button>
  )
}