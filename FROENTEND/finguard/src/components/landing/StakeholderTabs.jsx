import { useState } from 'react'
import { STAKEHOLDER_TABS } from '../../data/landingData'

const permIcons = { allow: { bg: 'var(--green-l)', color: 'var(--green)', icon: '✓' }, deny: { bg: 'var(--coral-l)', color: 'var(--coral)', icon: '✕' }, partial: { bg: 'var(--amber-l)', color: 'var(--amber)', icon: '~' } }

export default function StakeholderTabs() {
  const [active, setActive] = useState('bank')
  const panel = STAKEHOLDER_TABS.find(t => t.id === active)

  return (
    <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #0D0F1A 0%, #1a1f3e 100%)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B8FFF', marginBottom: '0.75rem' }}>Role-Based Access</div>
        <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'white', maxWidth: 680 }}>
          Built for every stakeholder
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: '0.75rem', fontWeight: 300 }}>
          Different roles, different access. FinGuard enforces granular permissions at every layer.
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, marginTop: '2.5rem', width: 'fit-content' }}>
          {STAKEHOLDER_TABS.map(t => (
            <div key={t.id} onClick={() => setActive(t.id)} style={{
              padding: '10px 22px', borderRadius: 9, fontSize: 13, cursor: 'pointer',
              fontWeight: 500, transition: 'all 0.2s', whiteSpace: 'nowrap',
              background: active === t.id ? 'white' : 'transparent',
              color: active === t.id ? 'var(--ink)' : 'rgba(255,255,255,0.5)'
            }}>{t.label}</div>
          ))}
        </div>

        {/* Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '1.25rem', marginTop: '2rem' }}>
          {panel.cards.map(card => (
            <div key={card.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--r)', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 600, fontSize: '0.95rem', color: 'white', marginBottom: '0.5rem' }}>{card.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '1rem' }}>{card.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {card.perms.map((p, i) => {
                  const s = permIcons[p.type]
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>{s.icon}</div>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}