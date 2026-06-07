// src/pages/app/RiskSimulationPage.jsx
import { useState, useContext } from "react";
import { useRole } from "../../context/RoleContext";
import { ROLES } from "../../data/roles";
import AccessDenied from "../../components/ui/AccessDenied";
import AccessBanner from "../../components/app/AccessBanner";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const stats = [
  { icon: "🎲", label: "Scenarios Run", value: "2,841", sub: "This month", subColor: "neutral" },
  { icon: "⚠️", label: "High-Risk Outcomes", value: "312", sub: "11% of runs", subColor: "down" },
  { icon: "🏦", label: "Portfolios Tested", value: "48", sub: "Active", subColor: "neutral" },
  { icon: "💼", label: "Avg Capital Buffer", value: "14.2%", sub: "RBI minimum: 9%", subColor: "up" },
];

const scenarios = [
  { label: "Mild Stress", color: "green", values: [5, 50, 10, 20] },
  { label: "Moderate Shock", color: "amber", values: [15, 150, 25, 40] },
  { label: "Severe Crisis", color: "coral", values: [30, 300, 50, 70] },
  { label: "AML Surge", color: "blue", values: [10, 80, 60, 30] },
];

const history = [
  { id: "SIM-0041", scenario: "Severe Crisis", npa: "8.4%", capital: "7.2%", status: "coral" },
  { id: "SIM-0040", scenario: "Moderate Shock", npa: "4.1%", capital: "11.8%", status: "amber" },
  { id: "SIM-0039", scenario: "Mild Stress", npa: "2.2%", capital: "14.5%", status: "green" },
  { id: "SIM-0038", scenario: "AML Surge", npa: "3.8%", capital: "12.1%", status: "amber" },
];

function computeRisk(upi, rate, mule, msme) {
  const raw = upi * 0.35 + (rate / 10) * 0.25 + mule * 0.25 + msme * 0.15;
  const riskScore = Math.min(100, Math.round(raw));
  const npa = (2 + upi * 0.18 + mule * 0.12).toFixed(1);
  const capital = Math.max(5, (18 - upi * 0.2 - (rate / 40))).toFixed(1);
  const fraudLoss = Math.round(upi * 14 + mule * 22);
  return { riskScore, npa, capital, fraudLoss };
}

export default function RiskSimulationPage() {
  const { role } = useRole();
  const config = ROLES[role];
  if (config.deny.includes("risk")) return <AccessDenied message={config.denyMsg} />;
  const isPartial = config.partial?.includes("risk");

  const [upi, setUpi] = useState(10);
  const [rate, setRate] = useState(100);
  const [mule, setMule] = useState(15);
  const [msme, setMsme] = useState(30);

  const { riskScore, npa, capital, fraudLoss } = computeRisk(upi, rate, mule, msme);

  const riskColor = riskScore < 33 ? "var(--green)" : riskScore < 66 ? "var(--amber)" : "var(--coral)";
  const riskLabel = riskScore < 33 ? "Low Risk" : riskScore < 66 ? "Moderate Risk" : "High Risk";

  const sliders = [
    { label: "UPI Default Rate (%)", value: upi, set: setUpi, min: 0, max: 50 },
    { label: "Interest Rate (bps)", value: rate, set: setRate, min: 0, max: 500 },
    { label: "Mule Account Surge (%)", value: mule, set: setMule, min: 0, max: 100 },
    { label: "MSME Concentration (%)", value: msme, set: setMsme, min: 0, max: 100 },
  ];

  function loadScenario(vals) {
    setUpi(vals[0]); setRate(vals[1]); setMule(vals[2]); setMsme(vals[3]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AccessBanner partial={isPartial} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Interactive Stress Test */}
        <Card title="Interactive Stress Test">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {sliders.map(({ label, value, set, min, max }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--ink-soft)", marginBottom: "4px" }}>
                  <span>{label}</span>
                  <strong style={{ color: "var(--ink)" }}>{value}{label.includes("bps") ? " bps" : "%"}</strong>
                </div>
                <input
                  type="range" min={min} max={max} value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                />
              </div>
            ))}
          </div>

          {/* Risk output */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "6px" }}>Projected Risk Level</div>
            <div style={{ height: "12px", borderRadius: "6px", background: "var(--border)", position: "relative", overflow: "hidden", marginBottom: "8px" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${riskScore}%`, background: riskColor, borderRadius: "6px", transition: "all 0.4s" }} />
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: riskColor }}>{riskLabel} — {riskScore}/100</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "14px" }}>
              <div style={{ padding: "10px", background: "var(--bg)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "var(--ink-muted)" }}>Projected NPA</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--coral)" }}>{npa}%</div>
              </div>
              <div style={{ padding: "10px", background: "var(--bg)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "var(--ink-muted)" }}>Capital Adequacy</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>{capital}%</div>
              </div>
              <div style={{ padding: "10px", background: "var(--bg)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "var(--ink-muted)" }}>Fraud Loss Est.</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--amber)" }}>₹{fraudLoss}L</div>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "10px" }}>
              {riskScore >= 66
                ? "⚠️ Severe stress scenario — immediate capital provisioning recommended."
                : riskScore >= 33
                ? "🔶 Moderate exposure — monitor UPI and mule account metrics closely."
                : "✅ Portfolio within acceptable risk thresholds."}
            </p>
          </div>
        </Card>

        {/* Scenario Library */}
        <Card title="Scenario Library">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {scenarios.map((s) => (
              <div
                key={s.label}
                onClick={() => loadScenario(s.values)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--r-sm)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>
                    UPI {s.values[0]}% · Rate {s.values[1]}bps · Mule {s.values[2]}%
                  </div>
                </div>
                <Badge color={s.color}>Load</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scenario History */}
      <Card title="Scenario History">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Simulation ID", "Scenario", "Projected NPA", "Capital Adequacy", "Status"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px", color: "var(--ink-muted)", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px", fontFamily: "monospace", fontSize: "12px" }}>{h.id}</td>
                <td style={{ padding: "10px" }}>{h.scenario}</td>
                <td style={{ padding: "10px", color: "var(--coral)", fontWeight: 600 }}>{h.npa}</td>
                <td style={{ padding: "10px", color: "var(--accent)", fontWeight: 600 }}>{h.capital}</td>
                <td style={{ padding: "10px" }}><Badge color={h.status}>{h.status === "coral" ? "High Risk" : h.status === "amber" ? "Moderate" : "Safe"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}