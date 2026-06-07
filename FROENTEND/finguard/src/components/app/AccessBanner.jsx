// src/components/app/AccessBanner.jsx
export default function AccessBanner({ partial = false }) {
  if (partial) {
    return (
      <div
        style={{
          background: "var(--amber-l)",
          border: "1px solid var(--amber)",
          borderRadius: "var(--r-sm)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          color: "var(--amber)",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: "16px" }}>⚠️</span>
        <span>
          <strong>Partial Access:</strong> You have read-only visibility into this module. Some actions and sensitive data are restricted for your role.
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--green-l)",
        border: "1px solid var(--green)",
        borderRadius: "var(--r-sm)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        color: "var(--green)",
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: "16px" }}>✅</span>
      <span>
        <strong>Full Access:</strong> Your role has complete access to this module.
      </span>
    </div>
  );
}