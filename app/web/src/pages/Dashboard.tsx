import { useEffect, useState } from "react";
import { api, workspaceId, userId } from "../api";

type PriceRow = { nome: string; preco: string };
type Item = { nome: string; quantidade: number };

export function Dashboard() {
  const ws = workspaceId();
  const [ninho, setNinho] = useState<any[]>([]);
  const [prices, setPrices] = useState<PriceRow[]>([{ nome: "", preco: "" }]);
  const [tom, setTom] = useState("Cordial, direto e profissional.");
  const [flow, setFlow] = useState<any>(null);
  const [task, setTask] = useState<any>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  // Formulario de tarefa (fluxo de Propostas)
  const [cliente, setCliente] = useState("ACME Ltda");
  const [items, setItems] = useState<Item[]>([{ nome: "Plano Pro", quantidade: 1 }]);
  const [prazo, setPrazo] = useState("12 meses");
  const [desconto, setDesconto] = useState(false);
  const [rejReason, setRejReason] = useState("");

  const hasPrices = ninho.some((i) => i.type === "precos");
  const flowActive = flow?.status === "active";

  async function refresh() {
    try { setNinho(await api.listNinho(ws)); } catch (e: any) { setErr(e.message); }
  }
  useEffect(() => { refresh(); }, []);

  const guard = async (fn: () => Promise<void>) => {
    setErr(""); setBusy(true);
    try { await fn(); } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  };

  const saveNinho = () => guard(async () => {
    const clean = prices.filter((p) => p.nome.trim());
    await api.createNinho({ workspace_id: ws, type: "precos", title: "Tabela de preços", body: JSON.stringify(clean) });
    if (tom.trim()) await api.createNinho({ workspace_id: ws, type: "tom", title: "Tom de voz", body: tom });
    await refresh();
  });

  const createFlow = () => guard(async () => {
    const f = await api.createFlow({ workspace_id: ws, flow_template_id: "proposals" });
    setFlow(f);
  });

  const activateFlow = () => guard(async () => {
    await api.setReviewer(flow.id, userId());       // revisor = você mesmo (MVP)
    const f = await api.activate(flow.id);
    setFlow({ ...flow, ...f });
  });

  const runTask = () => guard(async () => {
    const payload: any = { cliente, itens: items.filter((i) => i.nome.trim()), prazo };
    if (desconto) payload.desconto = true;
    const t = await api.runTask({ flow_instance_id: flow.id, payload });
    setTask(t);
  });

  const doReview = (action: string) => guard(async () => {
    const body: any = { action };
    if (action === "reject") body.reason = rejReason || "Sem motivo informado";
    if (action === "approve") body.saved_as_example = true;
    const t = await api.review(task.id, body);
    setTask(t);
  });

  const stepDone = { ninho: hasPrices, flow: !!flow, active: flowActive, task: !!task };

  return (
    <div>
      <div className="stepbar">
        <div className={`step ${stepDone.ninho ? "done" : "active"}`}>1 · Ninho</div>
        <div className={`step ${stepDone.flow ? "done" : stepDone.ninho ? "active" : ""}`}>2 · Fluxo</div>
        <div className={`step ${stepDone.active ? "done" : stepDone.flow ? "active" : ""}`}>3 · Ativar</div>
        <div className={`step ${stepDone.task ? "done" : stepDone.active ? "active" : ""}`}>4 · Executar</div>
        <div className={`step ${task?.status === "approved" ? "done" : stepDone.task ? "active" : ""}`}>5 · Revisar</div>
      </div>

      {err && <div className="error">{err}</div>}

      {/* 1. Ninho */}
      <div className="card">
        <span className="kicker">Passo 1 · Ninho</span>
        <h2>Referências da empresa</h2>
        <h3>Tabela de preços — a Nidus só usa preços cadastrados aqui.</h3>
        {prices.map((p, i) => (
          <div className="item-line" key={i}>
            <input placeholder="Produto/serviço" value={p.nome}
              onChange={(e) => setPrices(prices.map((x, j) => j === i ? { ...x, nome: e.target.value } : x))} />
            <input placeholder="Preço (ex.: 199,00)" value={p.preco}
              onChange={(e) => setPrices(prices.map((x, j) => j === i ? { ...x, preco: e.target.value } : x))} />
            <button className="btn btn-ghost" onClick={() => setPrices(prices.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
        <button className="btn btn-outline" onClick={() => setPrices([...prices, { nome: "", preco: "" }])}>+ Preço</button>
        <label>Tom de voz</label>
        <textarea value={tom} onChange={(e) => setTom(e.target.value)} />
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn btn-primary" disabled={busy} onClick={saveNinho}>Salvar no Ninho</button>
        </div>
        <div style={{ marginTop: 12 }}>
          {ninho.map((i) => <span className="pill" key={i.id}>{i.type}: {i.title}</span>)}
        </div>
      </div>

      {/* 2 + 3. Fluxo e ativação */}
      <div className="card">
        <span className="kicker">Passos 2 e 3 · Fluxo</span>
        <h2>Fluxo de Propostas</h2>
        {!flow && (
          <>
            <p className="muted">Crie a instância do fluxo de Propostas para este workspace.</p>
            <button className="btn btn-primary" disabled={busy || !hasPrices} onClick={createFlow}>
              Usar o fluxo de Propostas
            </button>
            {!hasPrices && <p className="muted">Salve o Ninho antes de criar o fluxo.</p>}
          </>
        )}
        {flow && !flowActive && (
          <>
            <p className="muted">Status: <span className="tag">{flow.status}</span>. Todo fluxo precisa de um revisor antes de ativar.</p>
            <button className="btn btn-primary" disabled={busy} onClick={activateFlow}>
              Definir-me como revisor e ativar
            </button>
          </>
        )}
        {flowActive && <p className="tag">✓ Fluxo ativo. Você já pode preparar tarefas.</p>}
      </div>

      {/* 4. Executar */}
      {flowActive && (
        <div className="card">
          <span className="kicker">Passo 4 · Executar</span>
          <h2>Preparar uma proposta</h2>
          <label>Cliente</label>
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} />
          <label>Itens</label>
          {items.map((it, i) => (
            <div className="item-line" key={i}>
              <input placeholder="Item" value={it.nome}
                onChange={(e) => setItems(items.map((x, j) => j === i ? { ...x, nome: e.target.value } : x))} />
              <input type="number" min={1} value={it.quantidade}
                onChange={(e) => setItems(items.map((x, j) => j === i ? { ...x, quantidade: +e.target.value } : x))} />
              <button className="btn btn-ghost" onClick={() => setItems(items.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
          <button className="btn btn-outline" onClick={() => setItems([...items, { nome: "", quantidade: 1 }])}>+ Item</button>
          <label>Prazo desejado</label>
          <input value={prazo} onChange={(e) => setPrazo(e.target.value)} />
          <label className="row" style={{ marginTop: 12 }}>
            <input type="checkbox" style={{ width: "auto" }} checked={desconto} onChange={(e) => setDesconto(e.target.checked)} />
            <span className="muted">Cliente pediu desconto</span>
          </label>
          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn btn-primary" disabled={busy} onClick={runTask}>Preparar entrega</button>
          </div>
        </div>
      )}

      {/* 5. Revisar */}
      {task?.output && (
        <div className="card">
          <span className="kicker">Passo 5 · Revisão humana</span>
          <h2>Rascunho — status: <span className="tag">{task.status}</span></h2>
          <div className="output">{task.output.content}</div>

          {task.output.uncertainties?.length > 0 && (
            <>
              <h3 className="warn" style={{ marginTop: 16 }}>Incertezas</h3>
              {task.output.uncertainties.map((u: string, i: number) => <div className="check warn" key={i}>⚠ {u}</div>)}
            </>
          )}
          {task.output.human_decisions?.length > 0 && (
            <>
              <h3 style={{ marginTop: 16 }}>Decisões humanas</h3>
              {task.output.human_decisions.map((d: string, i: number) => <div className="check" key={i}>• {d}</div>)}
            </>
          )}
          <h3 style={{ marginTop: 16 }}>Checklist de revisão</h3>
          {task.output.checklist?.map((c: string, i: number) => <div className="check" key={i}>☐ {c}</div>)}

          <hr />
          <p className="muted">Nada é enviado automaticamente. Você decide.</p>
          <div className="row">
            <button className="btn btn-primary" disabled={busy} onClick={() => doReview("approve")}>Aprovar e salvar como exemplo</button>
            <button className="btn btn-outline" disabled={busy} onClick={() => doReview("regenerate")}>Nova versão</button>
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <input placeholder="Motivo da rejeição" value={rejReason} onChange={(e) => setRejReason(e.target.value)} style={{ maxWidth: 320 }} />
            <button className="btn btn-ghost" disabled={busy} onClick={() => doReview("reject")}>Rejeitar</button>
          </div>
        </div>
      )}
    </div>
  );
}
