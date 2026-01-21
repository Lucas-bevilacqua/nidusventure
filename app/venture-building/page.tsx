"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Container } from "@/components/ui/container";
import { Users, Layout, Zap, ArrowRight, TrendingUp, Mic } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const pipeline = [
    {
        name: "KOPILOT",
        status: "Em Produção / Revenue",
        desc: "O primeiro CRM de campo voice-first. Seus vendedores falam, a IA transforma em relatórios estruturados. Zero digitação, 95% de adoção garantida.",
        icon: Mic,
        url: "https://usekopilot.com.br",
    },
    {
        name: "FlowOS",
        status: "Beta / Equity Built",
        desc: "O sistema operacional definitivo para consultorias B2B. Gestão de fluxo, automação de entregáveis e ROI tracking nativo.",
        icon: Layout,
    },
    {
        name: "AuditBot",
        status: "MVP / Pre-revenue",
        desc: "IA agnóstica de plataforma que analisa logs de processos (Slack, Notion, CRM) e desenha blueprinters de automação automaticamente.",
        icon: Zap,
    },
];

export default function VentureBuildingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 border-b-2 border-border overflow-x-hidden">
                <Container>
                    <div className="max-w-4xl space-y-6 md:space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Incubator & Lab
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black italic uppercase leading-[0.9] sm:leading-[0.8] tracking-tighter break-words px-4">
                            CONSTRUÍMOS <br />
                            <span className="text-white/20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">O AMANHÃ.</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground leading-tight italic max-w-2xl break-words px-4">
                            Transformamos problemas operacionais recorrentes em produtos SaaS escaláveis. Não somos investidores — somos co-founders técnicos.
                        </p>
                    </div>
                </Container>
            </section>

            {/* The Model */}
            <section className="py-16 sm:py-20 md:py-24 overflow-x-hidden">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        <div className="space-y-8 md:space-y-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter break-words">
                                Nosso Modelo de <br />
                                <span className="text-primary italic">Skin in the Game.</span>
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed break-words">
                                    Na NIDUS, a consultoria é o laboratório. Quando resolvemos um problema de um cliente que percebemos ser comum a todo um mercado, nós construímos a ferramenta.
                                </p>
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed break-words">
                                    Não buscamos rounds de investimento. Buscamos eficiência, lucro e valor real de mercado.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: "CONSULTORIA FINANCIA", desc: "O lucro da consultoria banca o discovery e o desenvolvimento dos primeiros MVPs." },
                                { title: "VALIDAÇÃO REAL", desc: "Nossos produtos já nascem com clientes (da consultoria) usando e pagando desde o dia 1." },
                                { title: "EQUITY SPLITS", desc: "Tipicamente 50/50. Entramos com o problema validado + capital + clientes. Você com a execução." },
                            ].map((item, i) => (
                                <div key={i} className="p-8 border-2 border-border bg-card/10 hover:border-primary/50 transition-colors">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm font-medium text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Pipeline Detail */}
            <section className="py-16 sm:py-20 md:py-24 bg-card/10 border-y border-border overflow-x-hidden">
                <Container>
                    <div className="space-y-12 md:space-y-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                            <div className="space-y-3 md:space-y-4">
                                <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">Current Builds</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter break-words">O Pipeline.</h2>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-border bg-background">
                            {pipeline.map((item, i) => (
                                <div key={i} className="p-6 sm:p-8 md:p-12 border-b-2 sm:border-b-2 sm:border-r-2 lg:border-b-0 lg:border-r-2 last:border-0 sm:last:border-r-0 lg:last:border-r-2 border-border space-y-6 md:space-y-8 group hover:bg-white/[0.02] transition-colors overflow-hidden">
                                    <item.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary opacity-20 group-hover:opacity-100 transition-opacity shrink-0" />
                                    <div className="space-y-3 md:space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white break-words">{item.name}</h3>
                                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{item.status}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-medium break-words">{item.desc}</p>
                                    </div>
                                    {item.url ? (
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pt-2 md:pt-4 flex items-center gap-3 md:gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-colors cursor-pointer"
                                        >
                                            Visitar Site <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                        </a>
                                    ) : (
                                        <Link href={`/blog/${item.name.toLowerCase()}`} className="pt-2 md:pt-4 flex items-center gap-3 md:gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-colors cursor-pointer">
                                            Explorar Blueprint <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Co-founder Call */}
            <section className="py-16 sm:py-20 md:py-24 overflow-x-hidden">
                <Container>
                    <div className="bg-primary/5 border-4 border-primary p-6 sm:p-8 md:p-12 lg:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-5 rotate-12 pointer-events-none">
                            <Users className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 text-primary" />
                        </div>
                        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 relative px-4">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black italic uppercase tracking-tighter leading-none break-words">
                                Be a <br /> Co-founder.
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed break-words">
                                Estamos sempre em busca de Product Engineers e Growth Masters que queiram 'skin in the game' para liderar nossas próximas verticais.
                            </p>
                            <Link href="/contato?source=venture-building" className="inline-block px-8 md:px-12 py-4 md:py-6 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,255,65,0.5)] transition-all text-sm md:text-base">
                                Apply for Partnership
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
