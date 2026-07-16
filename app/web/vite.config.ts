import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Painel do cliente (dev na porta 5173). Chama a API do backend (porta 8010).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
