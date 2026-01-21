"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function About() {
    return (
        <section className="py-16 sm:py-24 md:py-32 bg-background border-t border-border overflow-hidden" id="sobre">
            <Container>
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
                    {/* Founder Headline */}
                    <div className="lg:col-span-12 xl:col-span-6 space-y-8 md:space-y-12">
                        <div className="space-y-3 md:space-y-4">
                            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                                The Founder
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter break-words">
                                R$ 2M+ <br />
                                <span className="text-primary italic">economizados</span> <br />
                                para clientes.
                            </h2>
                        </div>

                        {/* Founder Photo - Mobile/Tablet shown here, Desktop shown beside */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full aspect-square md:aspect-video xl:aspect-square overflow-hidden border-2 border-border group"
                        >
                            <img
                                src="/images/fotolucas.png"
                                alt="Lucas Bevilacqua"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
                        </motion.div>

                        <div className="relative p-6 md:p-8 border-2 border-border bg-card/10 space-y-4 md:space-y-6">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed italic break-words">
                                "Não acredito em ferramentas mágicas. Acredito que um processo bem desenhado é o que faz uma empresa crescer de verdade."
                            </p>
                            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                                <div className="w-8 md:w-12 h-[2px] bg-primary shrink-0" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary break-words">Lucas Bevilacqua | IA Product Manager @ Grupo Ideal Trends</span>
                            </div>
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="lg:col-span-12 xl:col-span-6 space-y-6 md:space-y-8 lg:space-y-10">
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white">A JORNADA</h3>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                                Minha jornada não foi óbvia. Em 2019, eu era um <span className="text-primary font-bold italic">produtor multimídia</span>. Meu trabalho era executar: editar, renderizar, entregar. 12 horas por dia fazendo, zero pensando.
                            </p>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-bold italic text-white/80 break-words">
                                "Por que esse processo existe?"
                            </p>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                                Quando comecei a fazer essa pergunta, tudo mudou. Saí de executor para <span className="text-primary font-bold italic">arquiteto</span>. Hoje, na NIDUS VENTURES, transformo problemas operacionais complexos em ativos de lucro através de pensamento sistêmico.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { label: "Especialidade", val: "Sistemas & IA" },
                                { label: "Objetivo", val: "Lucro & Escala" },
                                { label: "Método", val: "Prático e Direto" },
                                { label: "Modelo", val: "Sociedade & Consultoria" },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 md:p-6 border border-border bg-white/[0.02] overflow-hidden">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 break-words">{stat.label}</p>
                                    <p className="text-xs sm:text-sm font-bold uppercase text-primary break-words">{stat.val}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 md:pt-8">
                            <Link href="/consultoria" className="inline-flex items-center gap-3 md:gap-4 group flex-wrap">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white group-hover:text-primary transition-colors">Conheça o Blueprint</span>
                                <div className="p-2 md:p-3 bg-primary text-primary-foreground group-hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all shrink-0">
                                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
