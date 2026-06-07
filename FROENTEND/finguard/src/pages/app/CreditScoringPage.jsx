import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink: #0D0F1A; --ink-soft: #3A3D52; --ink-muted: #7A7D96;
    --bg: #F5F4F0; --card: #FFFFFF;
    --accent: #1A3FFF; --accent-l: #E6EAFF;
    --green: #0F9060; --green-l: #E0F5EC;
    --amber: #D97706; --amber-l: #FEF3C7;
    --coral: #E04040; --coral-l: #FDEAEA;
    --border: rgba(13,15,26,0.1); --r: 14px; --r-sm: 8px;
  }

  .fg-credit { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); font-size: 14px; line-height: 1.5; }

  .fg-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin-bottom: 18px; }
  @media (max-width: 900px) { .fg-stats-grid { grid-template-columns: repeat(2,1fr); } }

  .fg-stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 16px; }
  .fg-stat-icon { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-bottom: 9px; }
  .fg-stat-label { font-size: 10.5px; color: var(--ink-muted); margin-bottom: 5px; }
  .fg-stat-val { font-size: 22px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; font-family: 'Times New Roman', Times, serif; }
  .fg-stat-sub { font-size: 10.5px; margin-top: 3px; }
  .fg-stat-sub.up { color: var(--green); }
  .fg-stat-sub.down { color: var(--coral); }
  .fg-stat-sub.neutral { color: var(--ink-muted); }

  .fg-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  @media (max-width: 780px) { .fg-grid-2 { grid-template-columns: 1fr; } }
  .fg-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 13px; }
  @media (max-width: 780px) { .fg-grid-3 { grid-template-columns: 1fr; } }

  .fg-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 18px; }
  .fg-card-sm { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 14px; }

  .fg-section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 5px; }
  .fg-card-title { font-weight: 600; font-size: 13px; margin-bottom: 12px; color: var(--ink); font-family: 'Times New Roman', Times, serif; }

  .fg-badge { display: inline-flex; align-items: center; font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 10px; }
  .fg-badge.green { background: var(--green-l); color: var(--green); }
  .fg-badge.amber { background: var(--amber-l); color: var(--amber); }
  .fg-badge.blue { background: var(--accent-l); color: var(--accent); }

  .fg-score-ring { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
  .fg-ring-info h3 { font-family: 'Times New Roman', Times, serif; font-weight: 700; font-size: 1.1rem; color: var(--ink); margin: 0 0 2px; }
  .fg-ring-info p { font-size: 11px; color: var(--ink-soft); margin: 0 0 6px; }

  .fg-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
  .fg-bar-label { font-size: 10.5px; color: var(--ink-soft); width: 120px; flex-shrink: 0; }
  .fg-bar-track { flex: 1; height: 7px; background: var(--bg); border-radius: 3px; overflow: hidden; }
  .fg-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
  .fg-bar-val { font-size: 10.5px; font-weight: 500; color: var(--ink); width: 44px; text-align: right; flex-shrink: 0; }

  .fg-prog-wrap { margin-bottom: 12px; }
  .fg-prog-top { display: flex; justify-content: space-between; margin-bottom: 5px; }
  .fg-prog-label { font-size: 10.5px; color: var(--ink-soft); }
  .fg-prog-val { font-size: 10.5px; font-weight: 600; }
  .fg-prog-track { height: 5px; background: var(--bg); border-radius: 3px; overflow: hidden; }
  .fg-prog-fill { height: 100%; border-radius: 3px; }

  .fg-source-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 5px; }

  .fg-explainer-box { background: var(--bg); border-radius: 7px; padding: 11px; margin-bottom: 9px; }
  .fg-explainer-header { font-size: 10.5px; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
  .fg-approved-banner { background: var(--green-l); border-radius: 7px; padding: 9px 11px; font-size: 10.5px; color: var(--green); }
  .fg-explainer-bar-label { font-size: 10.5px; color: var(--ink-soft); width: 130px; flex-shrink: 0; }

  .fg-fairness-section { margin-top: 0; }
`;

const StatCard = ({ icon, iconBg, label, value, sub, subType = "neutral" }) => (
  <div className="fg-stat-card">
    <div className="fg-stat-icon" style={{ background: iconBg }}>{icon}</div>
    <div className="fg-stat-label">{label}</div>
    <div className="fg-stat-val">{value}</div>
    <div className={`fg-stat-sub ${subType}`}>{sub}</div>
  </div>
);

const Badge = ({ children, type }) => (
  <span className={`fg-badge ${type}`}>{children}</span>
);

const BarRow = ({ label, pct, color, val, labelWidth = 120 }) => (
  <div className="fg-bar-row">
    <span className="fg-bar-label" style={{ width: labelWidth }}>{label}</span>
    <div className="fg-bar-track">
      <div className="fg-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
    <span className="fg-bar-val">{val}</span>
  </div>
);

const ProgRow = ({ label, val, pct, color }) => (
  <div className="fg-prog-wrap">
    <div className="fg-prog-top">
      <span className="fg-prog-label">{label}</span>
      <span className="fg-prog-val" style={{ color }}>{val}</span>
    </div>
    <div className="fg-prog-track">
      <div className="fg-prog-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  </div>
);

// SVG credit score ring
const ScoreRing = ({ score, max = 900 }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / max) * circumference;
  const empty = circumference - filled;
  return (
    <svg width="78" height="78" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--bg)" strokeWidth="8" />
      <circle
        cx="40" cy="40" r={radius} fill="none"
        stroke="var(--green)" strokeWidth="8"
        strokeDasharray={`${filled} ${empty}`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="38" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">{score}</text>
      <text x="40" y="52" textAnchor="middle" fontSize="9" fill="var(--ink-muted)">Score</text>
    </svg>
  );
};

export default function CreditScorePage() {
  return (
    <>
      <style>{styles}</style>
      <div className="fg-credit">

        {/* ── KPI Row ── */}
        <div className="fg-stats-grid">
          <StatCard icon="📋" iconBg="var(--green-l)" label="Scores Issued Today" value="18,340" sub="↑ 8%" subType="up" />
          <StatCard icon="👥" iconBg="var(--accent-l)" label="Thin-File Coverage" value="91.2%" sub="+3% this month" subType="up" />
          <StatCard icon="⚡" iconBg="var(--amber-l)" label="Avg. Score Time" value="1.2s" sub="Real-time API" subType="neutral" />
          <StatCard icon="📉" iconBg="var(--coral-l)" label="Default Rate" value="1.8%" sub="↓ 0.4% vs old model" subType="down" />
        </div>

        {/* ── Profile + Distribution ── */}
        <div className="fg-grid-2">

          {/* Sample Profile */}
          <div className="fg-card">
            <div className="fg-section-label">Sample Profile</div>
            <div className="fg-card-title">Priya Sharma — Thin-File Assessment</div>
            <div className="fg-score-ring">
              <ScoreRing score={718} />
              <div className="fg-ring-info">
                <h3>718 / 900</h3>
                <p>Good — Eligible for sachet loan</p>
                <Badge type="green">Approved</Badge>
              </div>
            </div>
            <div>
              <div className="fg-section-label">Data Sources Used</div>
              <div className="fg-source-tags">
                <Badge type="blue">UPI History</Badge>
                <Badge type="green">Utility Bills</Badge>
                <Badge type="amber">GST Returns</Badge>
                <Badge type="blue">AA Bank Stmt</Badge>
              </div>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="fg-card">
            <div className="fg-section-label">Score Distribution</div>
            <div className="fg-card-title">Today's Batch</div>
            <BarRow label="750–900 (Prime)" pct={38} color="var(--green)" val="38%" />
            <BarRow label="650–749 (Good)" pct={29} color="var(--accent)" val="29%" />
            <BarRow label="550–649 (Fair)" pct={18} color="var(--amber)" val="18%" />
            <BarRow label="Below 550" pct={15} color="var(--coral)" val="15%" />
            <div style={{ marginTop: 12, background: "var(--green-l)", borderRadius: 7, padding: "10px 12px" }}>
              <div style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--green)" }}>Explainability Active</div>
              <div style={{ fontSize: "10.5px", color: "var(--green)", marginTop: 2 }}>Every decision includes RBI-mandated reason codes for the borrower</div>
            </div>
          </div>
        </div>

        {/* ── Fairness Metrics ── */}
        <div className="fg-card fg-fairness-section">
          <div className="fg-section-label">Fairness Metrics</div>
          <div className="fg-card-title">Bias Monitoring Across Demographics</div>
          <div className="fg-grid-3">
            <ProgRow label="Gender Parity Score" val="0.97" pct={97} color="var(--green)" />
            <ProgRow label="Regional Equity Index" val="0.94" pct={94} color="var(--green)" />
            <ProgRow label="Income Fairness" val="0.88" pct={88} color="var(--amber)" />
          </div>
        </div>

      </div>
    </>
  );
}