// src/pages/app/ConsentEnginePage.jsx
import { useState, useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessDenied from "../../components/ui/AccessDenied";
import AccessBanner from "../../components/app/AccessBanner";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const stats = [
  { icon: "✅", label: "Active Consents", value: "2,841", sub: "DPDP compliant", subColor: "up" },
  { icon: "🔄", label: "Renewals Today", value: "142", sub: "Automated", subColor: "neutral" },
  { icon: "🚫", label: "Revocations", value: "38", sub: "Processed immediately", subColor: "down" },
  { icon: "🗑️", label: "Deletion Requests", value: "12", sub: "Within 72h SLA", subColor: "neutral" },
];

const initialConsents = [
  { id: 1, label: "Bank Statement Analysis", purpose: "Credit Scoring", granted: "Mar 01, 2026", expires: "Sep 01, 2026", status: "active" },
  { id: 2, label: "UPI Transaction History", purpose: "Fraud Detection", granted: "Mar 01, 2026", expires: "Jun 01, 2026", status: "active" },
  { id: 3, label: "GST Filing Data", purpose: "Business Credit", granted: "Jan 15, 2026", expires: "Apr 15, 2026", status: "expired" },
];

const dpdpSteps = [
  { icon: "🔐", title: "Consent-First", desc: "No data processed without explicit purpose-bound consent from the user." },
  { icon: "🎯", title: "Purpose Limitation", desc: "Data used strictly for declared purpose; cross-purpose use is blocked at API level." },
  { icon: "🔒", title: "Differential Privacy", desc: "Aggregated insights without exposing individual data points." },
  { icon: "🗑️", title: "Right to Erasure", desc: "User-triggered deletion processed within 72 hours across all systems." },
];

export default function ConsentEnginePage() {
  const { role } = useRole();
  const config = ROLES[role];
  if (config.deny.includes("consent")) return <AccessDenied message={config.denyMsg} />;

  const [consents, setConsents] = useState(initialConsents);

  function handleRevoke(id) {
    setConsents((prev) => prev.map((c) => c.id === id ? { ...c, status: "revoked" } : c));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AccessBanner />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* User Consent Dashboard */}
        <Card title="User Consent Dashboard">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", padding: "10px", background: "var(--bg)", borderRadius: "var(--r-sm)" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "var(--accent)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "13px",
            }}>PS</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Priya Sharma</div>
              <div style={{ fontSize: "12px", color: "var(--ink-muted)" }}>priya@okaxis · Mumbai</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {consents.map((c) => (
              <div key={c.id} style={{
                padding: "14px",
                borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)",
                background: c.status === "revoked" ? "var(--bg)" : "var(--card)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: c.status === "revoked" ? "var(--ink-muted)" : "var(--ink)" }}>{c.label}</div>
                    <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>Purpose: {c.purpose}</div>
                  </div>
                  <Badge color={c.status === "active" ? "green" : c.status === "expired" ? "amber" : "grey"}>
                    {c.status === "active" ? "Active" : c.status === "expired" ? "Expired" : "Revoked"}
                  </Badge>
                </div>
                <div style={{ fontSize: "11px", color: "var(--ink-muted)", marginBottom: "8px" }}>
                  Granted: {c.granted} · Expires: {c.expires}
                </div>
                {c.status === "active" && (
                  <button
                    onClick={() => handleRevoke(c.id)}
                    style={{
                      padding: "5px 12px", fontSize: "12px", borderRadius: "var(--r-sm)",
                      border: "1px solid var(--coral)", background: "var(--coral-l)",
                      color: "var(--coral)", cursor: "pointer", fontWeight: 600,
                    }}
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* DPDP Architecture */}
        <Card title="DPDP Act Compliance Architecture">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {dpdpSteps.map((step, i) => (
              <div key={i} style={{
                display: "flex", gap: "14px", alignItems: "flex-start",
                padding: "12px", borderRadius: "var(--r-sm)",
                background: "var(--bg)", border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: "36px", height: "36px", flexShrink: 0,
                  background: "var(--accent-l)", borderRadius: "var(--r-sm)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "3px" }}>{step.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-muted)", lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}