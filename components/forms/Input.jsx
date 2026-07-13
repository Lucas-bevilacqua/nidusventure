import React from "react";

export function Input({ label, placeholder, value, onChange, type = "text", error, disabled, light = false, style }) {
  const [focus, setFocus] = React.useState(false);
  const textColor = light ? "var(--text-on-light)" : "var(--text-on-dark)";
  const mutedColor = light ? "var(--text-on-light-muted)" : "var(--text-on-dark-muted)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, font: "var(--type-small)", color: mutedColor, ...style }}>
      {label && <span style={{ fontWeight: 500, color: textColor }}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          font: "var(--type-body)", color: textColor,
          background: light ? "#fff" : "var(--ink-2)",
          border: `1px solid ${error ? "var(--danger)" : focus ? "var(--verde)" : light ? "var(--paper-border)" : "var(--ink-border)"}`,
          borderRadius: "var(--radius-md)", padding: "12px 16px", outline: "none",
          opacity: disabled ? 0.5 : 1,
          boxShadow: focus && !error ? "0 0 0 3px var(--verde-dim)" : "none",
          transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
        }}
      />
      {error && <span style={{ color: "var(--danger)", font: "var(--type-caption)" }}>{error}</span>}
    </label>
  );
}
