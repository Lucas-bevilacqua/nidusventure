import React from "react";

const TONES = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",
};

export function Toast({ tone = "success", title, children, onClose, style }) {
  return (
    <div style={{
      display: "flex", gap: 12, alignItems: "flex-start",
      background: "var(--ink-2)", border: "1px solid var(--ink-border)",
      borderRadius: "var(--radius-md)", padding: "14px 16px",
      color: "var(--text-on-dark)", maxWidth: 380, boxShadow: "var(--shadow-lg)", ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: TONES[tone] || TONES.success, marginTop: 6, flexShrink: 0 }}></span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {title && <span style={{ font: "var(--type-small)", fontWeight: 600 }}>{title}</span>}
        {children && <span style={{ font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>{children}</span>}
      </div>
      {onClose && (
        <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-on-dark-muted)", cursor: "pointer", font: "var(--type-body)", padding: 0, lineHeight: 1 }}>×</button>
      )}
    </div>
  );
}
