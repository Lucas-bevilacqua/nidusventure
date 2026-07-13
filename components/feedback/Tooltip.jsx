import React from "react";

export function Tooltip({ label, side = "top", children, style }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {children}
      {show && (
        <span style={{
          position: "absolute", zIndex: 500, whiteSpace: "nowrap",
          background: "var(--ink-3)", color: "var(--text-on-dark)",
          border: "1px solid var(--ink-border)",
          font: "var(--type-caption)", padding: "6px 10px",
          borderRadius: "var(--radius-sm)", pointerEvents: "none",
          ...pos[side],
        }}>
          {label}
        </span>
      )}
    </span>
  );
}
