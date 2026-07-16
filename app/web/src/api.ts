// Cliente da API do backend Nidus OS. O token vive no localStorage (placeholder do MVP;
// em producao, auth gerenciada). A chave de IA nunca passa por aqui — fica no servidor.
const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8010";

export function getToken(): string | null {
  return localStorage.getItem("nidus_token");
}
export function setSession(s: { token: string; org_id: string; workspace_id: string; user_id: string }) {
  localStorage.setItem("nidus_token", s.token);
  localStorage.setItem("nidus_org", s.org_id);
  localStorage.setItem("nidus_ws", s.workspace_id);
  localStorage.setItem("nidus_user", s.user_id);
}
export function clearSession() {
  ["nidus_token", "nidus_org", "nidus_ws", "nidus_user"].forEach((k) => localStorage.removeItem(k));
}
export const workspaceId = () => localStorage.getItem("nidus_ws") || "";
export const userId = () => localStorage.getItem("nidus_user") || "";

async function req(path: string, method = "GET", body?: unknown) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).detail || `Erro ${res.status}`);
  return data;
}

export const api = {
  signup: (b: any) => req("/auth/signup", "POST", b),
  login: (b: any) => req("/auth/login", "POST", b),
  listNinho: (ws: string) => req(`/ninho/items?workspace_id=${ws}`),
  createNinho: (b: any) => req("/ninho/items", "POST", b),
  createFlow: (b: any) => req("/flow-instances", "POST", b),
  setReviewer: (id: string, reviewer_id: string) =>
    req(`/flow-instances/${id}/reviewer`, "POST", { reviewer_id }),
  activate: (id: string) => req(`/flow-instances/${id}/activate`, "POST"),
  runTask: (b: any) => req("/tasks", "POST", b),
  review: (id: string, b: any) => req(`/tasks/${id}/review`, "POST", b),
};
