import React from "react";

export function Tag({ active = false, light = false, children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        font: "var(--type-small)", fontWeight: 500,
        color: active ? "var(--ink-on-accent)" : light ? "var(--text-on-light)" : "var(--text-on-dark)",
        background: active ? "var(--verde)" : hover && onClick ? (light ? "var(--paper-2)" : "var(--ink-3)") : (light ? "#fff" : "var(--ink-2)"),
        border: `1px solid ${active ? "transparent" : light ? "var(--paper-border)" : "var(--ink-border)"}`,
        borderRadius: "var(--radius-pill)", padding: "8px 16px",
        cursor: onClick ? "pointer" : "default",
        transition: "background var(--transition-fast)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
