// src/pages/app/RbacMatrixPage.jsx
import { useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessBanner from "../../components/app/AccessBanner";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const features = [
  { label: "Dashboard Overview", bank: "full", fintech: "full", regulator: "full", user: "full" },
  { label: "Fraud Monitor", bank: "full", fintech: "denied", regulator: "partial", user: "denied" },
  { label: "Credit Scoring", bank: "full", fintech: "denied", regulator: "partial", user: "denied" },
  { label: "Risk Simulation", bank: "full", fintech: "denied", regulator: "partial", user: "denied" },
  { label: "API Sandbox", bank: "full", fintech: "full", regulator: "denied", user: "denied" },
  { label: "RBAC Matrix", bank: "full", fintech: "full", regulator: "full", user: "full" },
  { label: "Compliance", bank: "full", fintech: "denied", regulator: "full", user: "denied" },
  { label: "Consent Engine", bank: "full", fintech: "full", regulator: "full", user: "full" },
];

const roles = ["bank", "fintech", "regulator", "user"];
const roleLabels = { bank: "🏦 Bank/NBFC", fintech: "🚀 Fintech", regulator: "⚖️ Regulator", user: "👤 End User" };

function AccessCell({ level, isActive }) {
  const config = {
    full: { color: "green", label: "✅ Full" },
    partial: { color: "amber", label: "⚠️ Partial" },
    denied: { color: "coral", label: "❌ Denied" },
  }[level];
  return (
    <td style={{
      padding: "10px 12px",
      textAlign: "center",
      background: isActive ? "var(--accent-l)" : "transparent",
    }}>
      <Badge color={config.color}>{config.label}</Badge>
    </td>
  );
}

export default function RbacMatrixPage() {
  const { role } = useRole();

  const roleBanners = {
    bank: { bg: "var(--green-l)", color: "var(--green)", msg: "🏦 Bank/NBFC Role — Full access to all modules." },
    fintech: { bg: "var(--accent-l)", color: "var(--accent)", msg: "🚀 Fintech Role — Sandbox and Consent modules accessible." },
    regulator: { bg: "var(--amber-l)", color: "var(--amber)", msg: "⚖️ Regulator/RBI Role — Compliance and read-only access." },
    user: { bg: "var(--coral-l)", color: "var(--coral)", msg: "👤 End User — Consent Engine access only." },
  };

  const banner = roleBanners[role];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Role Banner */}
      <div style={{
        background: banner.bg,
        border: `1px solid ${banner.color}`,
        borderRadius: "var(--r-sm)",
        padding: "14px 18px",
        color: banner.color,
        fontWeight: 600,
        fontSize: "14px",
      }}>
        {banner.msg}
      </div>

      <AccessBanner />

      <Card title="Permission Matrix">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--ink-muted)", fontWeight: 600, minWidth: "180px" }}>Feature</th>
                {roles.map((r) => (
                  <th key={r} style={{
                    padding: "10px 12px", textAlign: "center", fontWeight: 600,
                    color: r === role ? "var(--accent)" : "var(--ink-soft)",
                    background: r === role ? "var(--accent-l)" : "transparent",
                    fontSize: "12px",
                  }}>
                    {roleLabels[r]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.label} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--ink)" }}>{f.label}</td>
                  {roles.map((r) => (
                    <AccessCell key={r} level={f[r]} isActive={r === role} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}