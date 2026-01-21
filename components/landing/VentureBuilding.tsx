"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Users, Layout, Zap, ArrowRight, Mic } from "lucide-react";
import Link from "next/link";

const pipeline = [
    {
        name: "KOPILOT",
        status: "Em Produção / Revenue",
        desc: "O primeiro CRM de campo voice-first. Seus vendedores falam, a IA transforma em relatórios. 95% de adoção garantida.",
        icon: Mic,
        url: "https://usekopilot.com.br",
    },
    {
        name: "FlowOS",
        status: "Beta / Equity Built",
        desc: "Sistema de gestão operacional para consultorias boutique.",
        icon: Layout,
    },
    {
        name: "AuditBot",
        status: "MVP / Pre-revenue",
        desc: "IA que analisa logs de processos e sugere automações.",
        icon: Zap,
    },
];

export function VentureBuilding() {
    return (
        <section className="py-24 border-y border-border bg-background" id="ventures">
            <Container>
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Pipeline */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                                Nossos <span className="text-primary">Projetos</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Produtos que nasceram de dores reais resolvidas na nossa consultoria.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {pipeline.map((item, i) => {
                                const content = (
                                    <div className="p-6 md:p-8 border border-border bg-card/10 space-y-4 hover:border-primary/30 transition-colors group overflow-hidden">
                                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                                        <div className="space-y-1">
                                            <h3 className="font-black uppercase tracking-widest text-base md:text-lg break-words">{item.name}</h3>
                                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{item.status}</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed break-words">
                                            {item.desc}
                                        </p>
                                        {item.url && (
                                            <div className="pt-2">
                                                <a 
                                                    href={item.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
                                                >
                                                    Visitar Site <ArrowRight className="w-3 h-3" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                );
                                
                                return <div key={i}>{content}</div>;
                            })}
                        </div>
                    </div>

                    {/* Right: Co-founder Call */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-10 border-2 border-primary bg-primary/5 space-y-6 md:space-y-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 rotate-12 opacity-10">
                                <Users className="w-32 h-32 text-primary" />
                            </div>

                            <div className="space-y-3 md:space-y-4 relative">
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">
                                    Be a Co-founder <br />
                                    with Nidus
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground font-medium break-words">
                                    Buscamos talentos técnicos e de Growth para liderar as novas verticais que estamos incubando.
                                </p>
                            </div>

                            <ul className="space-y-4 relative">
                                {[
                                    "Equity-based participation",
                                    "Skin in the game approach",
                                    "Direct mentorship and systems coaching",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                                        <div className="w-2 h-[2px] bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contato?source=venture-building" className="block relative">
                                <Button className="w-full rounded-none bg-primary text-primary-foreground font-black uppercase tracking-widest py-5 md:py-6 text-xs md:text-sm hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
                                    Apply for Partnership <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Visual Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 space-y-12"
                >
                    <div className="text-center">
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                            O Ciclo de <span className="text-primary italic">Construção.</span>
                        </h3>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                            {[
                                { step: "01", title: "DISCOVERY", sub: "Via Consultoria", desc: "Identificamos padrões de problemas reais em clientes pagantes." },
                                { step: "02", title: "VALIDATION", sub: "Pre-sell", desc: "Validamos se o mercado pagaria pela solução antes de construir." },
                                { step: "03", title: "BUILD", sub: "90 Dias", desc: "Construímos o MVP focado em resolver o problema central." },
                                { step: "04", title: "SCALE", sub: "PMF", desc: "Escalamos o produto usando o network da consultoria." },
                            ].map((item, i) => (
                                <div key={i} className="bg-background border-2 border-border p-6 space-y-4 hover:border-primary/50 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-4xl font-black italic text-white/10 group-hover:text-primary transition-colors">{item.step}</span>
                                        <div className="px-2 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">{item.sub}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
