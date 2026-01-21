"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Briefcase, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Solution() {
    return (
        <section className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden" id="servicos">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                        O Modelo NIDUS
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter">
                        Duas frentes, <br />
                        <span className="text-white/20">um único resultado.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Track 1: Consultancy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative p-10 border-2 border-border bg-background hover:border-primary/50 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Briefcase className="w-32 h-32 text-primary" />
                        </div>

                        <div className="relative space-y-8">
                            <div className="space-y-2">
                                <span className="text-primary font-mono text-sm tracking-widest uppercase">Frente 01</span>
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                                    Consultoria <br />
                                    Operacional
                                </h3>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
                                Consertamos a eficiência da sua empresa hoje. Analisamos processos e instalamos inteligência para você lucrar mais agora.
                            </p>

                            <ul className="space-y-3">
                                {["Diagnóstico Real", "Novos Processos", "Execução Prática"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                                        <div className="w-1.5 h-1.5 bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/consultoria" className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group/link">
                                Ver Detalhes <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Track 2: Venture Builder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative p-10 border-2 border-primary bg-primary/5 hover:bg-primary/[0.08] transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Rocket className="w-32 h-32 text-primary" />
                        </div>

                        <div className="relative space-y-8">
                            <div className="space-y-2">
                                <span className="text-primary font-mono text-sm tracking-widest uppercase">Frente 02</span>
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                                    Criação de <br />
                                    Produtos
                                </h3>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
                                Construímos o futuro. Transformamos os problemas que resolvemos em ferramentas que podem ser vendidas para o mercado.
                            </p>

                            <ul className="space-y-3">
                                {["Parceria de Sócios", "Modelo de Sociedade", "Escala de Produto"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                                        <div className="w-1.5 h-1.5 bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/venture-building" className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group/link">
                                Saiba Mais <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Dual-Track Flow Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                            O Ciclo de <span className="text-primary underline decoration-primary/30">Valor Infinito.</span>
                        </h3>
                        <p className="text-muted-foreground font-medium">Como a NIDUS transforma problemas em ativos de capital.</p>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                        <Link href="/consultoria" className="p-6 border border-border bg-background text-center space-y-2 hover:border-primary transition-colors cursor-pointer">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Passo 01</div>
                            <p className="text-xs font-bold uppercase tracking-tighter leading-tight">Cliente paga R$ 50k p/ Consultoria</p>
                        </Link>
                        <div className="flex justify-center md:rotate-0 rotate-90"><ArrowRight className="w-4 h-4 text-primary/30" /></div>

                        <div className="p-6 border border-border bg-background text-center space-y-2">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Passo 02</div>
                            <p className="text-xs font-bold uppercase tracking-tighter leading-tight">Resolvemos Problema Complexo X</p>
                        </div>
                        <div className="flex justify-center md:rotate-0 rotate-90"><ArrowRight className="w-4 h-4 text-primary/30" /></div>

                        <div className="p-6 border border-primary/50 bg-primary/5 text-center space-y-2">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Passo 03</div>
                            <p className="text-xs font-bold uppercase tracking-tighter leading-tight">Validamos o Problema no Mercado</p>
                        </div>
                        <div className="flex justify-center md:rotate-0 rotate-90"><ArrowRight className="w-4 h-4 text-primary/30" /></div>

                        <Link href="/venture-building" className="p-6 border-2 border-primary bg-primary/10 text-center space-y-2 shadow-[0_0_20px_rgba(0,255,65,0.1)] hover:bg-primary/20 transition-colors cursor-pointer">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Resultado</div>
                            <p className="text-xs font-black uppercase tracking-tighter leading-tight">Construímos SaaS e Geramos Equity</p>
                        </Link>
                    </div>

                    <div className="bg-white/[0.02] border border-border p-8 text-center text-sm font-medium text-muted-foreground italic">
                        "Na NIDUS, a consultoria financia o discovery e o venture building escala a inteligência para o mercado."
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
