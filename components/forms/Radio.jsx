import React from "react";

export function Radio({ label, checked = false, onChange, disabled, light = false, style }) {
  const textColor = light ? "var(--text-on-light)" : "var(--text-on-dark)";
  return (
    <label
      onClick={() => !disabled && onChange && onChange(true)}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--type-body)", color: textColor, ...style }}
    >
      <span style={{
        width: 20, height: 20, borderRadius: "50%", boxSizing: "border-box",
        border: `1.5px solid ${checked ? "var(--verde)" : light ? "var(--paper-border)" : "var(--ink-border)"}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transition: "border-color var(--transition-fast)",
      }}>
        {checked && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--verde)" }}></span>}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
