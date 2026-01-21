"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { X, Check } from "lucide-react";

const comparison = [
    {
        label: "Abordagem",
        traditional: "Vende ferramenta",
        nidus: "Questiona SE você precisa",
    },
    {
        label: "Processo",
        traditional: "Automatiza o que você pede",
        nidus: "Elimina o desnecessário ANTES",
    },
    {
        label: "Ponto de partida",
        traditional: "Começa pela tecnologia",
        nidus: "Começa pelo sistema",
    },
    {
        label: "Expectativa",
        traditional: "Promete resultado em 30 dias",
        nidus: "Funciona na 1ª tentativa",
    },
];

export function Problem() {
    return (
        <section className="py-24 md:py-32 border-y border-border overflow-hidden bg-background" id="problema">
            <Container>
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left side: Context */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-[1] md:leading-[0.95] tracking-tighter">
                                O mercado <br />
                                <span className="text-primary italic">vende promessas.</span> <br />
                                Eu entrego <br />
                                <span className="underline decoration-primary/30">lucro.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                                Muitas empresas falham ao usar IA porque tentam automatizar processos que já estão quebrados. Nós primeiro consertamos o fluxo para depois escalar o resultado.
                            </p>

                            <div className="pt-4">
                                <span className="px-6 py-3 border-2 border-primary text-primary text-xs font-black uppercase tracking-[0.2em] inline-block">
                                    Anti-Hype Approach
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Comparison Table */}
                    <div className="lg:col-span-12 xl:col-span-7 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-2 border-border bg-card/10 overflow-hidden shadow-[15px_15px_0px_rgba(0,255,65,0.05)]"
                        >
                            <div className="grid grid-cols-3 border-b-2 border-border bg-secondary/30">
                                <div className="p-4 md:p-8 border-r-2 border-border" />
                                <div className="p-4 md:p-8 border-r-2 border-border text-center">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Tradicional</span>
                                </div>
                                <div className="p-4 md:p-8 text-center bg-primary/10">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">NIDUS</span>
                                </div>
                            </div>

                            {comparison.map((item, i) => (
                                <div key={i} className="grid grid-cols-3 border-b-2 border-border last:border-0 hover:bg-white/5 transition-colors group">
                                    <div className="p-4 md:p-8 border-r-2 border-border flex items-center">
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
                                    </div>
                                    <div className="p-4 md:p-8 border-r-2 border-border flex items-center gap-4 text-sm md:text-lg text-muted-foreground/80 leading-tight">
                                        <X className="w-5 h-5 text-destructive shrink-0" />
                                        <span>{item.traditional}</span>
                                    </div>
                                    <div className="p-4 md:p-8 flex items-center gap-4 text-sm md:text-lg font-bold bg-primary/[0.03] leading-tight text-foreground">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        <span>{item.nidus}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <div className="mt-8 text-right pr-4">
                            <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">
                                /// O resultado vem antes da tecnologia
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
