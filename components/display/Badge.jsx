import React from "react";

const TONES = {
  verde: { bg: "var(--verde-dim)", border: "var(--verde)", color: "var(--verde)" },
  lilas: { bg: "var(--lilas-dim)", border: "var(--lilas)", color: "var(--lilas)" },
  neutral: { bg: "transparent", border: "var(--ink-border)", color: "var(--text-on-dark-muted)" },
  solid: { bg: "var(--verde)", border: "transparent", color: "var(--ink-on-accent)" },
};

export function Badge({ tone = "verde", children, style }) {
  const t = TONES[tone] || TONES.verde;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      font: "var(--type-caption)", fontFamily: "var(--font-mono)",
      textTransform: "uppercase", letterSpacing: "0.1em",
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
      borderRadius: "var(--radius-pill)", padding: "5px 12px",
      ...style,
    }}>
      {children}
    </span>
  );
}
