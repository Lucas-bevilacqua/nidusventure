import React from "react";
import { Button } from "../forms/Button.jsx";

export function Dialog({ open = false, title, children, confirmLabel = "Confirmar", cancelLabel = "Cancelar", onConfirm, onClose, style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "oklch(0.1 0.008 170 / 0.7)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--ink-2)", border: "1px solid var(--ink-border)",
          borderRadius: "var(--radius-xl)", padding: "var(--space-6)",
          maxWidth: 480, width: "100%", color: "var(--text-on-dark)",
          display: "flex", flexDirection: "column", gap: 16, ...style,
        }}
      >
        {title && <div style={{ font: "var(--type-heading)", letterSpacing: "var(--tracking-display)" }}>{title}</div>}
        <div style={{ font: "var(--type-body)", color: "var(--text-on-dark-muted)" }}>{children}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
          <Button variant="primary" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
