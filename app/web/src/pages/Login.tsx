import { useState } from "react";
import { api, setSession } from "../api";
import { navigate } from "../App";

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: any) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const s = await api.login(form);
      setSession(s);
      navigate("#/app");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 460, margin: "40px auto" }}>
      <span className="kicker">Entrar</span>
      <h2>Acessar o painel</h2>
      <form onSubmit={submit}>
        <label>E-mail</label>
        <input type="email" value={form.email} onChange={upd("email")} required />
        <label>Senha</label>
        <input type="password" value={form.password} onChange={upd("password")} required />
        {err && <div className="error">{err}</div>}
        <div className="row" style={{ marginTop: 18 }}>
          <button className="btn btn-primary" disabled={loading}>{loading ? "..." : "Entrar"}</button>
          <a href="#/signup" className="btn btn-ghost">Criar conta</a>
        </div>
      </form>
    </div>
  );
}
