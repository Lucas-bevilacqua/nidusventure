import { useEffect, useState } from "react";
import { getToken, clearSession } from "./api";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const on = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export function navigate(hash: string) {
  window.location.hash = hash;
}

export function App() {
  const route = useHashRoute();
  const authed = !!getToken();

  // Rota padrao: painel se logado, senao signup.
  useEffect(() => {
    if (route === "#/" || route === "") navigate(authed ? "#/app" : "#/signup");
  }, [route, authed]);

  let page;
  if (route.startsWith("#/login")) page = <Login />;
  else if (route.startsWith("#/app")) page = authed ? <Dashboard /> : <Login />;
  else page = <Signup />;

  return (
    <div className="wrap">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="brand">nidus <span>OS</span></div>
        {authed && (
          <button className="btn btn-ghost" onClick={() => { clearSession(); navigate("#/signup"); }}>
            Sair
          </button>
        )}
      </div>
      {page}
    </div>
  );
}
