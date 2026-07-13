import React from "react";

export function Metric({ value, label, accent = false, index, light = false, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {index && (
        <span style={{ font: "var(--type-overline)", letterSpacing: "var(--tracking-wide)", color: light ? "var(--text-on-light-muted)" : "var(--text-on-dark-muted)" }}>{index}</span>
      )}
      <span style={{
        font: "var(--type-metric)", letterSpacing: "var(--tracking-display)",
        color: accent ? "var(--verde)" : light ? "var(--text-on-light)" : "var(--text-on-dark)",
      }}>{value}</span>
      <span style={{ font: "var(--type-small)", color: light ? "var(--text-on-light-muted)" : "var(--text-on-dark-muted)", maxWidth: "22ch" }}>{label}</span>
    </div>
  );
}
