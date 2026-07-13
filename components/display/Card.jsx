import React from "react";

export function Card({ variant = "dark", interactive = false, glow = false, children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const dark = variant === "dark";
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: dark ? "var(--ink-2)" : "#fff",
        border: `1px solid ${dark ? (interactive && hover ? "var(--ink-3)" : "var(--ink-border)") : "var(--paper-border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        color: dark ? "var(--text-on-dark)" : "var(--text-on-light)",
        boxShadow: glow ? "var(--glow-verde)" : dark ? "none" : "var(--shadow-sm)",
        transform: interactive && hover ? "translateY(-2px)" : "none",
        cursor: interactive ? "pointer" : "default",
        transition: "transform var(--transition-base), border-color var(--transition-fast), box-shadow var(--transition-base)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
