// src/pages/app/FraudMonitorPage.jsx
import { useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessDenied from "../../components/ui/AccessDenied";
import AccessBanner from "../../components/app/AccessBanner";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const stats = [
  { icon: "🚨", label: "Live Alerts", value: "37", sub: "3 critical", subColor: "down" },
  { icon: "🕸️", label: "Fraud Rings Detected", value: "14", sub: "+2 this hour", subColor: "down" },
  { icon: "🤖", label: "Auto-Blocked", value: "1,284", sub: "Today", subColor: "up" },
  { icon: "💰", label: "Amount Protected", value: "₹4.2Cr", sub: "This month", subColor: "up" },
];

const alerts = [
  { id: "TXN-8821", amount: "₹92,400", type: "UPI Fraud", risk: "coral" },
  { id: "TXN-7714", amount: "₹14,200", type: "Card Skimming", risk: "coral" },
  { id: "TXN-6603", amount: "₹5,800", type: "Mule Transfer", risk: "amber" },
  { id: "TXN-5541", amount: "₹3,100", type: "Synthetic ID", risk: "amber" },
  { id: "TXN-4490", amount: "₹1,200", type: "Micro Fraud", risk: "blue" },
];

function GnnRingSvg() {
  return (
    <svg viewBox="0 0 340 240" style={{ width: "100%", maxHeight: 240 }}>
      {/* Ring A - coral */}
      <circle cx="90" cy="120" r="55" fill="var(--coral-l)" stroke="var(--coral)" strokeWidth="2" />
      <text x="90" y="108" textAnchor="middle" fill="var(--coral)" fontSize="11" fontWeight="700">Ring A</text>
      <text x="90" y="122" textAnchor="middle" fill="var(--ink-soft)" fontSize="10">₹38L exposed</text>
      <circle cx="68" cy="138" r="8" fill="var(--coral)" opacity="0.8" />
      <circle cx="95" cy="148" r="6" fill="var(--coral)" opacity="0.6" />
      <circle cx="115" cy="132" r="7" fill="var(--coral)" opacity="0.7" />

      {/* Ring B - amber */}
      <circle cx="200" cy="80" r="45" fill="var(--amber-l)" stroke="var(--amber)" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fill="var(--amber)" fontSize="11" fontWeight="700">Ring B</text>
      <text x="200" y="84" textAnchor="middle" fill="var(--ink-soft)" fontSize="10">₹12L exposed</text>
      <circle cx="185" cy="95" r="7" fill="var(--amber)" opacity="0.7" />
      <circle cx="215" cy="90" r="6" fill="var(--amber)" opacity="0.6" />

      {/* Ring C - blue */}
      <circle cx="250" cy="170" r="48" fill="var(--accent-l)" stroke="var(--accent)" strokeWidth="2" />
      <text x="250" y="162" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="700">Ring C</text>
      <text x="250" y="176" textAnchor="middle" fill="var(--ink-soft)" fontSize="10">₹7L exposed</text>
      <circle cx="232" cy="185" r="6" fill="var(--accent)" opacity="0.6" />
      <circle cx="265" cy="182" r="7" fill="var(--accent)" opacity="0.7" />

      {/* Dashed connections */}
      <line x1="140" y1="110" x2="158" y2="88" stroke="var(--ink-muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="220" y1="115" x2="230" y2="132" stroke="var(--ink-muted)" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

export default function FraudMonitorPage() {
  const { role } = useRole();
  const config = ROLES[role];
  if (config.deny.includes("fraud")) return <AccessDenied message={config.denyMsg} />;
  const isPartial = config.partial?.includes("fraud");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AccessBanner partial={isPartial} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card title="GNN Fraud Ring Map">
          <GnnRingSvg />
        </Card>

        <Card title="Active Alerts">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Txn ID", "Amount", "Type", "Risk"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "var(--ink-muted)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "8px", fontFamily: "monospace", fontSize: "12px" }}>{a.id}</td>
                  <td style={{ padding: "8px", fontWeight: 600 }}>{a.amount}</td>
                  <td style={{ padding: "8px", color: "var(--ink-soft)" }}>{a.type}</td>
                  <td style={{ padding: "8px" }}><Badge color={a.risk}>{a.risk === "coral" ? "High" : a.risk === "amber" ? "Medium" : "Low"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <button style={{ padding: "6px 14px", borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "transparent", fontSize: "13px", cursor: "pointer", color: "var(--ink-soft)" }}>Review All</button>
            <button style={{ padding: "6px 14px", borderRadius: "var(--r-sm)", border: "1px solid var(--accent)", background: "var(--accent-l)", fontSize: "13px", cursor: "pointer", color: "var(--accent)" }}>Export</button>
          </div>
        </Card>
      </div>

      {/* Behavioural Biometrics */}
      <Card title="Behavioural Biometrics">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--coral-l)", borderRadius: "var(--r-sm)" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "6px" }}>Typing Anomaly Score</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--coral)" }}>87%</div>
            <div style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "4px" }}>High deviation detected on TXN-8821</div>
          </div>
          <div style={{ padding: "16px", background: "var(--green-l)", borderRadius: "var(--r-sm)" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "6px" }}>Device Fingerprint</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--green)" }}>Matched</div>
            <div style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "4px" }}>23,410 devices verified today</div>
          </div>
          <div style={{ padding: "16px", background: "var(--amber-l)", borderRadius: "var(--r-sm)" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "6px" }}>Session Risk Score</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--amber)" }}>64 / 100</div>
            <div style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "4px" }}>Elevated — review flagged</div>
          </div>
        </div>
      </Card>
    </div>
  );
}