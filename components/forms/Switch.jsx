import React from "react";

export function Switch({ label, checked = false, onChange, disabled, light = false, style }) {
  const textColor = light ? "var(--text-on-light)" : "var(--text-on-dark)";
  return (
    <label
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--type-body)", color: textColor, ...style }}
    >
      <span style={{
        width: 44, height: 26, borderRadius: "var(--radius-pill)", boxSizing: "border-box",
        background: checked ? "var(--verde)" : light ? "var(--paper-border)" : "var(--ink-3)",
        padding: 3, display: "inline-flex", flexShrink: 0,
        justifyContent: checked ? "flex-end" : "flex-start",
        transition: "background var(--transition-fast)",
      }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: checked ? "var(--ink-on-accent)" : "#fff", transition: "transform var(--transition-fast)" }}></span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
