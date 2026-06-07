import Badge from './Badge'

export default function ActivityItem({ dot, title, time, badge }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 11,
        padding: '9px 0',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* Dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: `var(--${dot})`,
          marginTop: 4,
          flexShrink: 0
        }}
      />

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '11.5px',
            color: 'var(--ink)',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{title}</span>

          {/* ✅ Correct Badge Handling */}
          {badge && (
            <Badge color={badge.color}>
              {badge.label}
            </Badge>
          )}
        </div>

        <div
          style={{
            fontSize: '10.5px',
            color: 'var(--ink-muted)',
            marginTop: 1
          }}
        >
          {time}
        </div>
      </div>
    </div>
  )
}