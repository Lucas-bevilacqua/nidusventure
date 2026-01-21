"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";
import { useSearchParams } from "next/navigation";

const sourceLabels: Record<string, { title: string; subtitle?: string }> = {
    "diagnóstico": { title: "Solicitar Diagnóstico", subtitle: "Análise completa da sua operação" },
    "execução": { title: "Agendar Execução", subtitle: "Implementação do plano de ação" },
    "conselheiro": { title: "Contratar Advisor", subtitle: "Acompanhamento mensal estratégico" },
    "consultoria": { title: "Solicitar Consultoria", subtitle: "Serviços profissionais" },
    "venture-building": { title: "Apply for Partnership", subtitle: "Co-founder com NIDUS" },
    "audit": { title: "Solicitar Auditoria", subtitle: "Process Audit & IA Blueprint" },
    "contato": { title: "Análise Gratuita", subtitle: "Diagnóstico gratuito de 1 hora" },
};

export default function ContatoPage() {
    const searchParams = useSearchParams();
    const source = searchParams.get("source") || "contato";
    const labels = sourceLabels[source.toLowerCase()] || sourceLabels["contato"];

    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Navbar />
            <div className="pt-20 sm:pt-24">
                <Contact source={source} title={labels.title} subtitle={labels.subtitle} />
            </div>
        </main>
    );
}
