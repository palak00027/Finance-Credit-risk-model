// src/components/landing/Compliance.jsx

const BADGES = [
  { label: 'DPDP Act 2023', color: 'var(--green)', bg: 'var(--green-l)' },
  { label: 'RBI Digital Lending', color: 'var(--accent)', bg: 'var(--accent-l)' },
  { label: 'AML / KYC Norms', color: 'var(--amber)', bg: 'var(--amber-l)' },
  { label: 'RBI IT Framework', color: 'var(--accent)', bg: 'var(--accent-l)' },
  { label: 'Account Aggregator', color: 'var(--green)', bg: 'var(--green-l)' },
  { label: 'Video-KYC', color: 'var(--coral)', bg: 'var(--coral-l)' },
];

const COMPLIANCE_ROWS = [
  { name: 'DPDP Act — Data Minimisation', status: 'Compliant', pending: false },
  { name: 'RBI Digital Lending — Disbursal', status: 'Compliant', pending: false },
  { name: 'AML Real-time Monitoring', status: 'Compliant', pending: false },
  { name: 'KYC / Video-KYC', status: 'Compliant', pending: false },
  { name: 'Data Localisation (India)', status: 'Compliant', pending: false },
  { name: 'SEBI Audit Trail Integration', status: 'In Progress', pending: true },
];

const FLOW = [
  { step: 'User Consent', icon: '🔐', bg: 'var(--accent-l)' },
  { step: 'Purpose-Bound Processing', icon: '⚙️', bg: 'var(--green-l)' },
  { step: 'India Data Storage', icon: '🏠', bg: 'var(--amber-l)' },
  { step: 'Audit Logs → Vault', icon: '📁', bg: 'var(--accent-l)' },
];

export default function Compliance() {
  return (
    <section id="compliance" style={{ padding: '6rem 2rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--accent-l)',
            color: 'var(--accent)',
            borderRadius: 100,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 16
          }}>
            Compliance
          </div>

          <h2 style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 'clamp(1.8rem,4vw,2.6rem)',
            fontWeight: 800,
            color: 'var(--ink)'
          }}>
            Built for India's Regulatory Stack
          </h2>
        </div>

        {/* Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 50
        }}>
          {BADGES.map((b) => (
            <span key={b.label} style={{
              background: b.bg,
              color: b.color,
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600
            }}>
              {b.label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
          gap: 24
        }}>

          {/* LEFT: TEXT */}
          <div style={{
            fontSize: 14,
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            fontWeight: 300
          }}>
            <p>
              FinGuard is designed around India's regulatory ecosystem — not added later.
              Every data flow is consent-driven, traceable, and audit-ready.
            </p>

            <p style={{ marginTop: 16 }}>
              Explainable AI ensures each decision is transparent. Differential privacy
              protects sensitive data. Immutable logs satisfy RBI and SEBI audit trails.
            </p>
          </div>

          {/* RIGHT: STATUS CARD */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            padding: '24px'
          }}>
            <h3 style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 16
            }}>
              Compliance Status
            </h3>

            {COMPLIANCE_ROWS.map((row, i) => (
              <div key={row.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < COMPLIANCE_ROWS.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                  {row.name}
                </span>

                <span style={{
                  background: row.pending ? 'var(--amber-l)' : 'var(--green-l)',
                  color: row.pending ? 'var(--amber)' : 'var(--green)',
                  borderRadius: 100,
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>

          {/* FLOW CARD */}
          <div style={{
            gridColumn: '1 / -1',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            padding: '24px'
          }}>
            <h3 style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 16
            }}>
              Data Compliance Flow
            </h3>

            {FLOW.map((f, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 0',
                borderBottom: i < FLOW.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: f.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {f.icon}
                </div>

                <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                  {f.step}
                </span>

                {i < FLOW.length - 1 && (
                  <span style={{ marginLeft: 'auto', color: 'var(--ink-muted)' }}>↓</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}