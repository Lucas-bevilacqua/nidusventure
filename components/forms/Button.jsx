import React from "react";

const SIZES = {
  sm: { padding: "8px 16px", font: "500 14px/1 var(--font-body)" },
  md: { padding: "12px 22px", font: "500 16px/1 var(--font-body)" },
  lg: { padding: "16px 28px", font: "500 17px/1 var(--font-body)" },
};

export function Button({ variant = "primary", size = "md", disabled = false, children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const variants = {
    primary: {
      background: hover ? "var(--verde-strong)" : "var(--verde)",
      color: "var(--ink-on-accent)",
      border: "1px solid transparent",
    },
    secondary: {
      background: hover ? "var(--ink-3)" : "transparent",
      color: "var(--text-on-dark)",
      border: "1px solid var(--ink-border)",
    },
    ghost: {
      background: hover ? "var(--verde-dim)" : "transparent",
      color: "var(--verde)",
      border: "1px solid transparent",
    },
    light: {
      background: hover ? "var(--paper-2)" : "#fff",
      color: "var(--text-on-light)",
      border: "1px solid var(--paper-border)",
    },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        borderRadius: "var(--radius-pill)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: press ? "scale(0.98)" : "none",
        transition: "background var(--transition-fast), transform var(--transition-fast)",
        font: s.font, padding: s.padding,
        ...(variants[variant] || variants.primary),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
