import React from "react";

export function Checkbox({ label, checked = false, onChange, disabled, light = false, style }) {
  const textColor = light ? "var(--text-on-light)" : "var(--text-on-dark)";
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--type-body)", color: textColor, ...style }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 20, height: 20, borderRadius: 6, boxSizing: "border-box",
          border: `1.5px solid ${checked ? "var(--verde)" : light ? "var(--paper-border)" : "var(--ink-border)"}`,
          background: checked ? "var(--verde)" : "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "background var(--transition-fast), border-color var(--transition-fast)",
          color: "var(--ink-on-accent)", fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}
      >
        {checked ? "✓" : ""}
      </span>
      {label && <span onClick={() => !disabled && onChange && onChange(!checked)}>{label}</span>}
    </label>
  );
}
