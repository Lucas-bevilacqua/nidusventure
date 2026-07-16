import { useState } from "react";
import { api, setSession } from "../api";
import { navigate } from "../App";

export function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", company_name: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: any) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const s = await api.signup(form);
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
      <span className="kicker">Criar conta</span>
      <h2>Configure seu primeiro fluxo</h2>
      <p className="muted">Crie a conta e o ambiente da sua empresa. Sem cartão agora.</p>
      <form onSubmit={submit}>
        <label>Seu nome</label>
        <input value={form.name} onChange={upd("name")} required />
        <label>E-mail</label>
        <input type="email" value={form.email} onChange={upd("email")} required />
        <label>Senha (mín. 8 caracteres)</label>
        <input type="password" value={form.password} onChange={upd("password")} minLength={8} required />
        <label>Nome da empresa</label>
        <input value={form.company_name} onChange={upd("company_name")} required />
        {err && <div className="error">{err}</div>}
        <div className="row" style={{ marginTop: 18 }}>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
          <a href="#/login" className="btn btn-ghost">Já tenho conta</a>
        </div>
      </form>
    </div>
  );
}
