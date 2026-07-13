import React from "react";

export function Tabs({ items = [], value, onChange, light = false, style }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{
      display: "inline-flex", gap: 4, padding: 4,
      background: light ? "var(--paper-2)" : "var(--ink-2)",
      border: `1px solid ${light ? "var(--paper-border)" : "var(--ink-border)"}`,
      borderRadius: "var(--radius-pill)", ...style,
    }}>
      {items.map((item) => {
        const it = typeof item === "string" ? { value: item, label: item } : item;
        const active = it.value === value;
        return (
          <button
            key={it.value}
            onClick={() => onChange && onChange(it.value)}
            onMouseEnter={() => setHover(it.value)}
            onMouseLeave={() => setHover(null)}
            style={{
              font: "var(--type-small)", fontWeight: 500, border: "none",
              background: active ? "var(--verde)" : hover === it.value ? (light ? "#fff" : "var(--ink-3)") : "transparent",
              color: active ? "var(--ink-on-accent)" : light ? "var(--text-on-light)" : "var(--text-on-dark)",
              borderRadius: "var(--radius-pill)", padding: "8px 18px", cursor: "pointer",
              transition: "background var(--transition-fast)",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
