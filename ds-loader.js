/* nIUD DS loader — usa _ds_bundle.js se existir; senão compila os .jsx fonte com Babel.
   Uso: __getNIUD("../../").then(NS => { ... })  (requer React + Babel standalone já carregados) */
(function () {
  const FILES = [
    "components/forms/Button.jsx",
    "components/forms/Input.jsx",
    "components/forms/Select.jsx",
    "components/forms/Checkbox.jsx",
    "components/forms/Radio.jsx",
    "components/forms/Switch.jsx",
    "components/display/Card.jsx",
    "components/display/Badge.jsx",
    "components/display/Tag.jsx",
    "components/display/Metric.jsx",
    "components/navigation/Tabs.jsx",
    "components/feedback/Toast.jsx",
    "components/feedback/Tooltip.jsx",
    "components/feedback/Dialog.jsx",
  ];

  function scanWindow() {
    for (const k of Object.getOwnPropertyNames(window)) {
      try {
        const v = window[k];
        if (v && typeof v === "object" && typeof v.Button === "function" && typeof v.Metric === "function") return v;
      } catch (e) {}
    }
    return null;
  }

  async function tryBundle(root) {
    const r = await fetch(root + "_ds_bundle.js", { method: "HEAD" }).catch(() => null);
    if (!r || !r.ok) return false;
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = root + "_ds_bundle.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  async function compileSources(root) {
    const ns = {};
    for (const f of FILES) {
      const res = await fetch(root + f);
      if (!res.ok) throw new Error("404 " + f);
      const src = await res.text();
      const stripped = src
        .replace(/^import[^\n]*\n/gm, "")
        .replace(/^export function/gm, "function");
      const code = Babel.transform(stripped, { presets: [["react", { runtime: "classic" }]] }).code;
      const name = f.split("/").pop().replace(".jsx", "");
      const keys = Object.keys(ns);
      const fn = new Function("React", ...keys, code + "\nreturn " + name + ";");
      ns[name] = fn(React, ...keys.map((k) => ns[k]));
    }
    return ns;
  }

  window.__getNIUD = async function (root) {
    root = root || "";
    let ns = scanWindow();
    if (ns) return ns;
    if (await tryBundle(root)) {
      ns = scanWindow();
      if (ns) return ns;
    }
    ns = await compileSources(root);
    window.NIUD = ns;
    return ns;
  };

  /* Executa scripts <script type="text/plain" data-app> com JSX (runtime clássico),
     evitando a auto-execução do Babel standalone (que emite import de jsx-runtime). */
  function runApps() {
    document.querySelectorAll('script[type="text/plain"][data-app]').forEach((el) => {
      try {
        const code = Babel.transform(el.textContent, { presets: [["react", { runtime: "classic" }]] }).code;
        new Function(code)();
      } catch (e) {
        console.error("ds-loader app error:", e);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runApps);
  } else {
    runApps();
  }
})();
