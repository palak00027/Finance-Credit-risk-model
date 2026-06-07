// src/pages/SignupPage.jsx
// FinGuard — Signup Page
// Frontend-only. Connects to AuthContext.signup()

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const C = {
  ink: "#0D0F1A", inkSoft: "#3A3D52", inkMuted: "#7A7D96",
  bg: "#F5F4F0", card: "#FFFFFF",
  accent: "#1A3FFF", accentL: "#E6EAFF",
  coral: "#E04040", coralL: "#FDEAEA",
  green: "#0F9060", greenL: "#E0F5EC",
  border: "rgba(13,15,26,0.10)",
};
const r = 14; const rSm = 8;

// ─── Field Component ──────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, error, hint }) {
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
        <div style={{ fontSize: 12, color: C.coral, marginTop: 5, fontWeight: 500 }}>{error}</div>
      )}
      {hint && !error && (
        <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 5 }}>{hint}</div>
      )}
    </div>
  );
}

// ─── Password strength ────────────────────────────────────────
function PasswordStrength({ password }) {
  const score = password.length === 0 ? 0
    : password.length < 5 ? 1
    : password.length < 8 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const colors = ["transparent", C.coral, "#D97706", "#2563EB", C.green];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div style={{ marginTop: -12, marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 3,
            background: i <= score ? colors[score] : C.border,
            transition: "background .2s",
          }} />
        ))}
      </div>
      {score > 0 && (
        <div style={{ fontSize: 11, color: colors[score], fontWeight: 600 }}>{labels[score]} password</div>
      )}
    </div>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: "" }));
    setGlobalError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!form.confirm) {
      newErrors.confirm = "Please confirm your password.";
    } else if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    await new Promise(res => setTimeout(res, 500));

    const result = signup(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate("/app/dashboard");
    } else {
      setGlobalError(result.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: C.bg, padding: "40px 24px",
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
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: C.inkMuted, marginBottom: 28 }}>
            Join FinGuard — no credit card needed
          </p>

          {/* Global error */}
          {globalError && (
            <div style={{
              background: C.coralL, border: `1px solid ${C.coral}30`,
              borderRadius: rSm, padding: "10px 14px", marginBottom: 20,
              fontSize: 13, color: C.coral, fontWeight: 500,
            }}>
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Field
              label="Full Name"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Priya Sharma"
              error={errors.name}
            />
            <Field
              label="Work Email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@company.com"
              error={errors.email}
            />
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="Min 6 characters"
              error={errors.password}
              hint="Use uppercase letters and numbers for a stronger password."
            />
            <PasswordStrength password={form.password} />
            <Field
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={set("confirm")}
              placeholder="Re-enter your password"
              error={errors.confirm}
            />

            {/* Terms */}
            <p style={{ fontSize: 12, color: C.inkMuted, marginBottom: 20, lineHeight: 1.6 }}>
              By creating an account you agree to our{" "}
              <a href="#" style={{ color: C.accent }}>Terms of Service</a>{" "}
              and{" "}
              <a href="#" style={{ color: C.accent }}>Privacy Policy</a>.
            </p>

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
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.inkMuted }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: C.accent, fontWeight: 600, textDecoration: "none" }}>
            Log in
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