import React from "react";

export function Select({ label, options = [], value, onChange, disabled, light = false, style }) {
  const [focus, setFocus] = React.useState(false);
  const textColor = light ? "var(--text-on-light)" : "var(--text-on-dark)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, font: "var(--type-small)", ...style }}>
      {label && <span style={{ fontWeight: 500, color: textColor }}>{label}</span>}
      <div style={{ position: "relative", display: "flex" }}>
        <select
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none", WebkitAppearance: "none", width: "100%",
            font: "var(--type-body)", color: textColor,
            background: light ? "#fff" : "var(--ink-2)",
            border: `1px solid ${focus ? "var(--verde)" : light ? "var(--paper-border)" : "var(--ink-border)"}`,
            borderRadius: "var(--radius-md)", padding: "12px 40px 12px 16px", outline: "none",
            opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: focus ? "0 0 0 3px var(--verde-dim)" : "none",
            transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
          }}
        >
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: textColor, fontSize: 12 }}>▾</span>
      </div>
    </label>
  );
}
