// src/pages/app/CompliancePage.jsx
import { useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessDenied from "../../components/ui/AccessDenied";
import AccessBanner from "../../components/app/AccessBanner";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";

const stats = [
  { icon: "✅", label: "Audits Passed", value: "284", sub: "All 2026 audits", subColor: "up" },
  { icon: "📈", label: "Compliance Score", value: "98.4%", sub: "Industry top 5%", subColor: "up" },
  { icon: "📁", label: "Regulatory Filings", value: "142", sub: "YTD", subColor: "neutral" },
  { icon: "🗄️", label: "Data Localisation", value: "100%", sub: "RBI mandated", subColor: "up" },
];

const regulatoryItems = [
  { label: "RBI Master Directions on Fraud", status: "Compliant", color: "green" },
  { label: "DPDP Act 2023", status: "Compliant", color: "green" },
  { label: "PCI DSS v4.0", status: "In Progress", color: "amber" },
  { label: "ISO 27001:2022", status: "Compliant", color: "green" },
  { label: "SEBI Cyber Security", status: "Compliant", color: "green" },
  { label: "RBI Cloud Adoption Framework", status: "In Progress", color: "amber" },
];

const factors = [
  { label: "Transaction Velocity", value: "High (Score: +42)", pct: 84, color: "var(--coral)" },
  { label: "Device Mismatch", value: "Detected (Score: +28)", pct: 56, color: "var(--amber)" },
  { label: "UPI Pattern", value: "Anomalous (Score: +17)", pct: 34, color: "var(--accent)" },
];

export default function CompliancePage() {
  const { role } = useRole();
  const config = ROLES[role];
  if (config.deny.includes("compliance")) return <AccessDenied message={config.denyMsg} />;
  const isPartial = config.partial?.includes("compliance");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AccessBanner partial={isPartial} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Regulatory Dashboard */}
        <Card title="Regulatory Dashboard">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {regulatoryItems.map((item) => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>{item.label}</span>
                <Badge color={item.color}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Explainable AI */}
        <Card title="Explainable AI — Audit Trail">
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "4px" }}>Transaction under review</div>
            <div style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>TXN-4432</div>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>₹38,200 · UPI · 2026-04-17 09:14 IST</div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "8px" }}>Decision Factors (Risk Contribution)</div>
            {factors.map((f) => <ProgressBar key={f.label} {...f} />)}
          </div>

          <div style={{
            background: "var(--coral-l)", border: "1px solid var(--coral)",
            borderRadius: "var(--r-sm)", padding: "10px 14px",
            display: "flex", alignItems: "center", gap: "10px",
            color: "var(--coral)", fontWeight: 600, fontSize: "13px",
          }}>
            <span>🔴</span> Decision: BLOCKED — Risk Score 87/100
          </div>

          <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "10px" }}>
            Full audit log available for RBI inspection. All decisions are explainable and logged under ISO 27001.
          </p>
        </Card>
      </div>
    </div>
  );
}