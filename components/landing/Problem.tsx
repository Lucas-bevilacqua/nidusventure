"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { X, Check } from "lucide-react";

const comparison = [
    {
        label: "Abordagem",
        traditional: "Vende ferramenta de IA",
        nidus: "Diagnóstico real do sistema",
    },
    {
        label: "Foco",
        traditional: "Automatiza o que você pede",
        nidus: "Elimina o que não gera valor",
    },
    {
        label: "Entrega",
        traditional: "Slides e Recomendações",
        nidus: "Implementação funcionando",
    },
    {
        label: "Ponto de partida",
        traditional: "Tecnologia",
        nidus: "Resultado (Economia Real)",
    },
    {
        label: "Investimento",
        traditional: "Focado em software",
        nidus: "Focado em ROI",
    },
];

export function Problem() {
    return (
        <section className="py-16 sm:py-24 md:py-32 border-y border-border overflow-x-hidden bg-background" id="problema">
            <Container>
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
                    {/* Left side: Context */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4 md:space-y-6"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black italic uppercase leading-[1.1] md:leading-[0.95] tracking-tighter break-words">
                                Por que as <br />
                                <span className="text-primary italic">soluções falham?</span>
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl break-words">
                                Consultorias tradicionais automatizam processos que nem deveriam existir. Elas focam na ferramenta antes de entender o fluxo. <br className="hidden md:block" />
                                <span className="text-white">Resultado: você gasta e continua com a mesma dor.</span>
                            </p>

                            <div className="pt-2 md:pt-4">
                                <span className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] inline-block break-words">
                                    Anti-Hype Approach
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Comparison Table */}
                    <div className="lg:col-span-12 xl:col-span-7 w-full max-w-full overflow-x-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-2 border-border bg-card/10 overflow-hidden shadow-[15px_15px_0px_rgba(0,255,65,0.05)] w-full"
                        >
                            <div className="grid grid-cols-3 border-b-2 border-border bg-secondary/30">
                                <div className="p-3 sm:p-4 md:p-8 border-r-2 border-border" />
                                <div className="p-3 sm:p-4 md:p-8 border-r-2 border-border text-center">
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground break-words">Tradicional</span>
                                </div>
                                <div className="p-3 sm:p-4 md:p-8 text-center bg-primary/10">
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary break-words">NIDUS</span>
                                </div>
                            </div>

                            {comparison.map((item, i) => (
                                <div key={i} className="grid grid-cols-3 border-b-2 border-border last:border-0 hover:bg-white/5 transition-colors group">
                                    <div className="p-3 sm:p-4 md:p-8 border-r-2 border-border flex items-center min-w-0">
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors break-words">{item.label}</span>
                                    </div>
                                    <div className="p-3 sm:p-4 md:p-8 border-r-2 border-border flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-lg text-muted-foreground/80 leading-tight min-w-0">
                                        <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-destructive shrink-0" />
                                        <span className="break-words">{item.traditional}</span>
                                    </div>
                                    <div className="p-3 sm:p-4 md:p-8 flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-lg font-bold bg-primary/[0.03] leading-tight text-foreground min-w-0">
                                        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary shrink-0" />
                                        <span className="break-words">{item.nidus}</span>
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
