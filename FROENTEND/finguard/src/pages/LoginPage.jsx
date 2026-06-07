// src/pages/LoginPage.jsx
// FinGuard — Login Page
// Frontend-only auth. Connects to AuthContext.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const C = {
  ink: "#0D0F1A", inkSoft: "#3A3D52", inkMuted: "#7A7D96",
  bg: "#F5F4F0", card: "#FFFFFF",
  accent: "#1A3FFF", accentL: "#E6EAFF",
  amber: "#D97706", amberL: "#FEF3C7",
  coral: "#E04040", coralL: "#FDEAEA",
  green: "#0F9060", greenL: "#E0F5EC",
  border: "rgba(13,15,26,0.10)",
};
const r = 14; const rSm = 8;

// ─── Field Component ──────────────────────────────────────────
function Field({ label, type, value, onChange, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.inkSoft, marginBottom: 7 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "12px 16px",
          fontSize: 14, color: C.ink,
          background: C.bg,
          border: `1.5px solid ${error ? C.coral : focused ? C.accent : C.border}`,
          borderRadius: rSm, outline: "none",
          transition: "border-color .15s",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
      {error && (
        <div style={{ fontSize: 12, color: C.coral, marginTop: 5, fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required.");
    if (!password.trim()) return setError("Password is required.");

    setLoading(true);
    // Simulate tiny async delay
    await new Promise((res) => setTimeout(res, 400));

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      navigate("/app/dashboard");
    } else {
      setError(result.message || "Invalid credentials. Try demo@FinGuard.ai / Finguard123");
    }
  };

  const fillDemo = () => {
    setEmail("demo@FinGuard.ai");
    setPassword("Finguard123");
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: C.bg, padding: "24px",
        backgroundImage: "linear-gradient(rgba(13,15,26,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,15,26,.04) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 36 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛡️</div>
          <span style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: 22, color: C.ink }}>FinGuard</span>
        </div>

        {/* Card */}
        <div style={{
          background: C.card, borderRadius: r,
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 32px rgba(13,15,26,.07)",
          padding: "36px 36px 32px",
        }}>
          <h1 style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: 26, color: C.ink, marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: C.inkMuted, marginBottom: 28 }}>
            Log in to your FinGuard account
          </p>

          {/* Demo credentials banner */}
          <div
            onClick={fillDemo}
            style={{
              background: C.amberL, border: `1px solid ${C.amber}30`,
              borderRadius: rSm, padding: "10px 14px",
              marginBottom: 24, cursor: "pointer",
              display: "flex", alignItems: "flex-start", gap: 10,
              transition: "opacity .15s",
            }}
            title="Click to auto-fill demo credentials"
            onMouseEnter={e => (e.currentTarget.style.opacity = 0.8)}
            onMouseLeave={e => (e.currentTarget.style.opacity = 1)}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 2 }}>Demo Credentials — click to fill</div>
              <div style={{ fontSize: 12, color: C.inkSoft }}>
                Email: <strong>demo@FinGuard.ai</strong> &nbsp;|&nbsp; Password: <strong>Finguard123</strong>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {/* Global error */}
            {error && (
              <div style={{
                background: C.coralL, border: `1px solid ${C.coral}30`,
                borderRadius: rSm, padding: "10px 14px", marginBottom: 20,
                fontSize: 13, color: C.coral, fontWeight: 500,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 20px",
                background: loading ? "#A0ABFF" : C.accent,
                color: "#fff", borderRadius: rSm,
                fontSize: 15, fontWeight: 700, letterSpacing: 0.3,
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity .18s, transform .18s",
                boxShadow: "0 3px 16px rgba(26,63,255,.28)",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = 0.88; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? "Logging in…" : "Log In →"}
            </button>
          </form>
        </div>

        {/* Signup link */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.inkMuted }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: C.accent, fontWeight: 600, textDecoration: "none" }}>
            Sign up free
          </Link>
        </p>

        {/* Back to landing */}
        <p style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: C.inkMuted }}>
          <Link to="/" style={{ color: C.inkMuted, textDecoration: "none" }}>
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}