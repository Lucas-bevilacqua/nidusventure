"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Container } from "@/components/ui/container";
import { Check, ArrowRight, ShieldCheck, Zap, Rocket } from "lucide-react";
import Link from "next/link";

const offerings = [
    {
        icon: Rocket,
        title: "Process Audit",
        subtitle: "BLUEPRINT DE OPERAÇÃO",
        desc: "Uma imersão de 2 a 4 semanas na sua operação para identificar todos os focos de ineficiência e desenhar o roadmap técnico de escala.",
        deliverables: [
            "Mapeamento completo (Atual vs. Ideal)",
            "Cálculo de ROI por oportunidade",
            "Identificação de redundâncias",
            "Roadmap de 90 dias executável",
        ],
        pricing: "R$ 30.000 — R$ 50.000",
    },
    {
        icon: Zap,
        title: "Implementation",
        subtitle: "PARTNER DE EXECUÇÃO",
        desc: "Transformamos o Blueprint em realidade. Construímos as integrações, configuramos as automações e instalamos o sistema.",
        deliverables: [
            "Setup da Stack de Operação",
            "Desenvolvimento de integrações",
            "Treinamento do time interno",
            "Monitoramento inicial (60 dias)",
        ],
        pricing: "R$ 80.000 — R$ 150.000",
    },
    {
        icon: ShieldCheck,
        title: "Strategic Advisor",
        subtitle: "RETAINER MENSAL",
        desc: "Acesso direto à expertise de um Arquiteto de Sistemas para decisões críticas, revisão de processos e suporte on-demand.",
        deliverables: [
            "2-4 sessões estratégicas por mês",
            "Suporte on-demand (WhatsApp/Slack)",
            "Revisão trimestral de processos",
            "Acesso a novos produtos NIDUS",
        ],
        pricing: "R$ 10.000 — R$ 20.000/mês",
    },
];

export default function ConsultoriaPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-24 border-b-2 border-border">
                <Container>
                    <div className="max-w-4xl space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Professional Services
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
                            RESOLVEMOS <br />
                            <span className="text-white/20 text-5xl md:text-8xl">O HOJE.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-medium text-muted-foreground leading-tight italic max-w-2xl">
                            Consultoria para empresas B2B que precisam de escala operacional imediata através de arquitetura de sistemas inteligência.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Offerings */}
            <section className="py-24">
                <Container>
                    <div className="space-y-32">
                        {offerings.map((offering, i) => (
                            <div key={i} className="grid lg:grid-cols-12 gap-16 items-start group">
                                <div className="lg:col-span-5 space-y-8">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-primary/10 border-2 border-primary/20 inline-block">
                                            <offering.icon className="w-12 h-12 text-primary" />
                                        </div>
                                        <h2 className="text-5xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                                            {offering.title}
                                        </h2>
                                        <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">{offering.subtitle}</p>
                                    </div>
                                    <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                        {offering.desc}
                                    </p>
                                    <div className="p-6 border-l-4 border-primary bg-white/[0.02]">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Investment</span>
                                        <span className="text-xl font-bold text-white tracking-widest">{offering.pricing}</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 hidden lg:block" />

                                <div className="lg:col-span-6 border-2 border-border p-10 md:p-16 space-y-12 bg-card/10">
                                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-primary">Deliverables</h3>
                                    <ul className="space-y-6">
                                        {offering.deliverables.map((item, idx) => (
                                            <li key={idx} className="flex gap-6 items-start">
                                                <div className="w-6 h-6 border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                                    <Check className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-lg font-bold uppercase tracking-widest text-white/80 leading-tight">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-8">
                                        <Link href="/contato?source=consultoria" className="block text-center px-6 md:px-10 py-4 md:py-6 border-2 border-primary text-primary font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground transition-all text-sm md:text-base">
                                            Solicitar Proposta
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Why Nidus */}
            <section className="py-24 bg-primary/5 border-y-2 border-border">
                <Container>
                    <div className="text-center space-y-16">
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                            Por que confiar <br /> na nossa arquitetura?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            {[
                                { title: "NÃO SOMOS AGência", desc: "Não fazemos posts, não fazemos anúncios. Resolvemos processos e sistemas de lucro." },
                                { title: "EXPERTIZA TÉCNICA", desc: "Arquiteto de sistemas no comando. Sabemos o que é possível e o que é hype." },
                                { title: "FOCO EM MARGEM", desc: "Escala sem aumento de headcount proporcional. Esse é o segredo do lucro no B2B." },
                            ].map((item, i) => (
                                <div key={i} className="p-10 border-2 border-border bg-background space-y-6">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary border-b border-primary/20 pb-4">{item.title}</h3>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center">
                <Container>
                    <div className="max-w-2xl mx-auto space-y-12">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                            Sua operação está pronta <br />
                            <span className="text-primary italic">para a escala real?</span>
                        </h2>
                        <Link href="/contato?source=consultoria" className="inline-block px-8 md:px-12 py-4 md:py-6 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all text-sm md:text-base">
                            Começar Auditoria
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}
