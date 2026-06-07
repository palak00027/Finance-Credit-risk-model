// src/pages/app/ApiSandboxPage.jsx
import { useState, useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessDenied from "../../components/ui/AccessDenied";
import AccessBanner from "../../components/app/AccessBanner";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const stats = [
  { icon: "🔌", label: "API Calls Made", value: "1.24M", sub: "This month", subColor: "neutral" },
  { icon: "✅", label: "Success Rate", value: "99.7%", sub: "Last 24h", subColor: "up" },
  { icon: "⚡", label: "Avg Latency", value: "84ms", sub: "P95: 210ms", subColor: "up" },
  { icon: "🤝", label: "Certified Partners", value: "48", sub: "+3 this month", subColor: "up" },
];

const endpoints = [
  {
    id: "fraud-check",
    label: "POST /v1/fraud/check",
    description: "Real-time transaction risk scoring",
    code: `{
  "transaction_id": "TXN-8821",
  "amount": 92400,
  "currency": "INR",
  "upi_id": "priya@okaxis",
  "device_fingerprint": "df_a92x",
  "timestamp": "2026-04-17T10:22:00Z"
}`,
    response: `{
  "transaction_id": "TXN-8821",
  "risk_score": 87,
  "risk_level": "HIGH",
  "recommendation": "BLOCK",
  "flags": ["velocity_anomaly", "device_mismatch"],
  "latency_ms": 72,
  "model_version": "v3.2.1"
}`,
  },
  {
    id: "credit-score",
    label: "POST /v1/credit/score",
    description: "Alternative credit scoring",
    code: `{
  "customer_id": "CUST-4421",
  "pan": "ABCDE1234F",
  "consent_token": "ct_9x7za",
  "data_sources": ["upi", "utility", "gst"]
}`,
    response: `{
  "customer_id": "CUST-4421",
  "score": 718,
  "band": "GOOD",
  "score_range": [0, 900],
  "top_factors": [
    {"factor": "UPI regularity", "weight": 0.34},
    {"factor": "Utility payments", "weight": 0.28}
  ],
  "thin_file": false,
  "latency_ms": 134
}`,
  },
  {
    id: "consent-verify",
    label: "GET /v1/consent/verify",
    description: "DPDP consent verification",
    code: `GET /v1/consent/verify?customer_id=CUST-4421&purpose=credit_scoring`,
    response: `{
  "customer_id": "CUST-4421",
  "consent_active": true,
  "purpose": "credit_scoring",
  "granted_at": "2026-03-01T08:00:00Z",
  "expires_at": "2026-09-01T08:00:00Z",
  "data_sources": ["upi", "utility"],
  "revocable": true
}`,
  },
];

const allEndpoints = [
  { method: "POST", path: "/v1/fraud/check", desc: "Real-time transaction fraud scoring", badge: "green" },
  { method: "POST", path: "/v1/credit/score", desc: "Alt-data credit score generation", badge: "blue" },
  { method: "GET", path: "/v1/consent/verify", desc: "DPDP consent verification", badge: "amber" },
  { method: "POST", path: "/v1/risk/simulate", desc: "Portfolio stress test simulation", badge: "coral" },
  { method: "GET", path: "/v1/audit/log", desc: "Explainable AI audit trail", badge: "grey" },
  { method: "DELETE", path: "/v1/consent/revoke", desc: "User data deletion request", badge: "coral" },
];

export default function ApiSandboxPage() {
  const { role } = useRole();
  const config = ROLES[role];
  if (config.deny.includes("sandbox")) return <AccessDenied message={config.denyMsg} />;

  const [selected, setSelected] = useState("fraud-check");
  const [ran, setRan] = useState(false);
  const [loading, setLoading] = useState(false);

  const ep = endpoints.find((e) => e.id === selected);

  function handleRun() {
    setLoading(true);
    setRan(false);
    setTimeout(() => { setLoading(false); setRan(true); }, 900);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AccessBanner />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card title="Request Builder">
          <div style={{ marginBottom: "12px" }}>
            <select
              value={selected}
              onChange={(e) => { setSelected(e.target.value); setRan(false); }}
              style={{
                width: "100%", padding: "8px 12px", borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)", fontSize: "13px", color: "var(--ink)",
                background: "var(--bg)", cursor: "pointer",
              }}
            >
              {endpoints.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
            </select>
            <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "6px" }}>{ep.description}</p>
          </div>
          <pre style={{
            background: "var(--ink)", color: "#E8EAF6", borderRadius: "var(--r-sm)",
            padding: "14px", fontSize: "12px", overflowX: "auto", lineHeight: 1.6,
            minHeight: "160px",
          }}>
            {ep.code}
          </pre>
          <button
            onClick={handleRun}
            disabled={loading}
            style={{
              marginTop: "12px", padding: "10px 20px", borderRadius: "var(--r-sm)",
              background: loading ? "var(--ink-muted)" : "var(--accent)",
              color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600, fontSize: "13px", transition: "background 0.2s",
            }}
          >
            {loading ? "Running..." : "▶ Run Request"}
          </button>
        </Card>

        <Card title="API Response">
          {!ran && !loading && (
            <div style={{ color: "var(--ink-muted)", fontSize: "13px", paddingTop: "20px" }}>
              Hit "Run Request" to see the response from the FinGuard API.
            </div>
          )}
          {loading && (
            <div style={{ color: "var(--accent)", fontSize: "13px", paddingTop: "20px" }}>
              ⏳ Calling endpoint...
            </div>
          )}
          {ran && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Badge color="green">200 OK</Badge>
                <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>84ms · application/json</span>
              </div>
              <pre style={{
                background: "var(--ink)", color: "#C8E6C9", borderRadius: "var(--r-sm)",
                padding: "14px", fontSize: "12px", overflowX: "auto", lineHeight: 1.6,
              }}>
                {ep.response}
              </pre>
            </>
          )}
        </Card>
      </div>

      {/* All Endpoints */}
      <Card title="Available Endpoints">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Method", "Endpoint", "Description", "Status"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px", color: "var(--ink-muted)", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allEndpoints.map((e) => (
              <tr key={e.path} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px" }}>
                  <span style={{
                    fontFamily: "monospace", fontSize: "11px", fontWeight: 700,
                    color: e.method === "GET" ? "var(--green)" : e.method === "DELETE" ? "var(--coral)" : "var(--accent)",
                  }}>{e.method}</span>
                </td>
                <td style={{ padding: "10px", fontFamily: "monospace", fontSize: "12px", color: "var(--ink-soft)" }}>{e.path}</td>
                <td style={{ padding: "10px", color: "var(--ink-soft)" }}>{e.desc}</td>
                <td style={{ padding: "10px" }}><Badge color={e.badge}>Active</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}