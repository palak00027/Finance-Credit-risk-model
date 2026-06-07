import { useState } from "react";

// ── CSS Variables (inject once at root level in your app) ──
// --ink: #0D0F1A; --ink-soft: #3A3D52; --ink-muted: #7A7D96;
// --bg: #F5F4F0; --card: #FFFFFF;
// --accent: #1A3FFF; --accent-l: #E6EAFF;
// --green: #0F9060; --green-l: #E0F5EC;
// --amber: #D97706; --amber-l: #FEF3C7;
// --coral: #E04040; --coral-l: #FDEAEA;
// --border: rgba(13,15,26,0.1); --r: 14px; --r-sm: 8px;

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

  .fg-dashboard { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); font-size: 14px; line-height: 1.5; }

  .fg-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin-bottom: 18px; }
  @media (max-width: 900px) { .fg-stats-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 540px) { .fg-stats-grid { grid-template-columns: 1fr; } }

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

  .fg-section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 5px; }
  .fg-card-title { font-weight: 600; font-size: 13px; margin-bottom: 12px; color: var(--ink); font-family: 'Times New Roman', Times, serif; }

  .fg-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
  .fg-bar-label { font-size: 10.5px; color: var(--ink-soft); width: 120px; flex-shrink: 0; }
  .fg-bar-track { flex: 1; height: 7px; background: var(--bg); border-radius: 3px; overflow: hidden; }
  .fg-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
  .fg-bar-val { font-size: 10.5px; font-weight: 500; color: var(--ink); width: 44px; text-align: right; flex-shrink: 0; }

  .fg-activity-item { display: flex; gap: 11px; padding: 9px 0; border-bottom: 1px solid var(--border); }
  .fg-activity-item:last-child { border-bottom: none; }
  .fg-activity-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
  .fg-activity-title { font-size: 11.5px; color: var(--ink); font-weight: 500; display: flex; justify-content: space-between; align-items: center; }
  .fg-activity-time { font-size: 10.5px; color: var(--ink-muted); margin-top: 1px; }

  .fg-badge { display: inline-flex; align-items: center; font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 10px; }
  .fg-badge.green { background: var(--green-l); color: var(--green); }
  .fg-badge.amber { background: var(--amber-l); color: var(--amber); }
  .fg-badge.coral { background: var(--coral-l); color: var(--coral); }
  .fg-badge.blue { background: var(--accent-l); color: var(--accent); }

  .fg-prog-wrap { margin-bottom: 12px; }
  .fg-prog-top { display: flex; justify-content: space-between; margin-bottom: 5px; }
  .fg-prog-label { font-size: 10.5px; color: var(--ink-soft); }
  .fg-prog-val { font-size: 10.5px; font-weight: 600; color: var(--ink); }
  .fg-prog-track { height: 5px; background: var(--bg); border-radius: 3px; overflow: hidden; }
  .fg-prog-fill { height: 100%; border-radius: 3px; }

  @keyframes fg-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .fg-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: fg-pulse 1.5s infinite; display: inline-block; }
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

const BarRow = ({ label, pct, color, val }) => (
  <div className="fg-bar-row">
    <span className="fg-bar-label">{label}</span>
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
      <span className="fg-prog-val">{val}</span>
    </div>
    <div className="fg-prog-track">
      <div className="fg-prog-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  </div>
);

const activityFeed = [
  { dot: "var(--coral)", title: "🚨 High-risk transaction blocked", badge: { text: "Fraud", type: "coral" }, time: "ACC-9821 · ₹48,000 · 2 min ago" },
  { dot: "var(--green)", title: "✅ MSME loan approved", badge: { text: "Credit", type: "green" }, time: "TXN-4432 · ₹1,20,000 · 5 min ago" },
  { dot: "var(--amber)", title: "⚠️ AML flag raised", badge: { text: "Review", type: "amber" }, time: "ACC-1107 · ₹9,90,000 · 11 min ago" },
  { dot: "var(--accent)", title: "🔗 New fintech connected", badge: { text: "API", type: "blue" }, time: "PayFast v2 · Sandbox certified · 18 min ago" },
  { dot: "var(--green)", title: "✅ Consent renewed by user", badge: { text: "DPDP", type: "green" }, time: "USR-881234 · 90-day renewal · 22 min ago" },
];

export default function DashboardPage() {
  return (
    <>
      <style>{styles}</style>
      <div className="fg-dashboard">

        {/* ── KPI Row ── */}
        <div className="fg-stats-grid">
          <StatCard icon="🔍" iconBg="var(--accent-l)" label="Frauds Blocked (Today)" value="1,247" sub="↑ 12% vs yesterday" subType="up" />
          <StatCard icon="📈" iconBg="var(--green-l)" label="Transactions Processed" value="2.4M" sub="Real-time stream" subType="neutral" />
          <StatCard icon="🏦" iconBg="var(--amber-l)" label="Credit Scores Issued" value="18,340" sub="↑ 8% this week" subType="up" />
          <StatCard icon="⚠️" iconBg="var(--coral-l)" label="Active Alerts" value="3" sub="Needs review" subType="down" />
        </div>

        {/* ── Charts Row ── */}
        <div className="fg-grid-2">
          {/* Fraud Breakdown */}
          <div className="fg-card">
            <div className="fg-section-label">Fraud Breakdown</div>
            <div className="fg-card-title">Fraud Types — Last 7 Days</div>
            <BarRow label="Mule Accounts" pct={82} color="var(--coral)" val="8,241" />
            <BarRow label="UPI Scams" pct={65} color="var(--amber)" val="6,519" />
            <BarRow label="Card Skimming" pct={41} color="var(--accent)" val="4,100" />
            <BarRow label="Account Takeover" pct={28} color="var(--green)" val="2,834" />
            <BarRow label="Synthetic ID" pct={18} color="var(--ink-muted)" val="1,820" />
          </div>

          {/* Live Activity */}
          <div className="fg-card">
            <div className="fg-section-label">Live Activity</div>
            <div className="fg-card-title">Recent Events</div>
            {activityFeed.map((ev, i) => (
              <div className="fg-activity-item" key={i}>
                <div className="fg-activity-dot" style={{ background: ev.dot }} />
                <div style={{ flex: 1 }}>
                  <div className="fg-activity-title">
                    <span>{ev.title}</span>
                    <Badge type={ev.badge.type}>{ev.badge.text}</Badge>
                  </div>
                  <div className="fg-activity-time">{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── System Health ── */}
        <div className="fg-card">
          <div className="fg-card-title">System Health</div>
          <div className="fg-grid-3">
            <div>
              <ProgRow label="API Uptime" val="99.98%" pct={99} color="var(--green)" />
              <ProgRow label="Fraud Model Accuracy" val="97.3%" pct={97} color="var(--accent)" />
            </div>
            <div>
              <ProgRow label="Avg. Latency" val="42ms" pct={88} color="var(--green)" />
              <ProgRow label="Credit Coverage" val="91.2%" pct={91} color="var(--amber)" />
            </div>
            <div>
              <ProgRow label="DPDP Compliance" val="100%" pct={100} color="var(--green)" />
              <ProgRow label="Sandbox Utilisation" val="68%" pct={68} color="var(--accent)" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}