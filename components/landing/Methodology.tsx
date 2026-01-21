"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight, Box, Repeat, Zap } from "lucide-react";

const steps = [
    {
        id: "diagnosis",
        title: "DIAGNÓSTICO",
        subtitle: "MAPEAMENTO REAL",
        desc: "Analisamos sua operação de ponta a ponta para identificar onde o dinheiro está fugindo e onde estão os gargalos.",
        details: [
            "Mapeamento de processos",
            "Identificação de gargalos",
            "Análise de custos ocultos",
        ],
        icon: Box,
        color: "#00ff41",
    },
    {
        id: "elimination",
        title: "ELIMINAÇÃO",
        subtitle: "FIM DO DESPERDÍCIO",
        desc: "Removemos etapas, processos e custos que não geram valor. Menos é lucro imediato na sua conta.",
        details: [
            "Remoção de burocracia",
            "Simplificação de etapas",
            "Corte de custos reais",
        ],
        icon: Repeat,
        color: "#00ff41",
    },
    {
        id: "optimization",
        title: "OTIMIZAÇÃO",
        subtitle: "ORDEM NO FLUXO",
        desc: "Simplificamos o que sobrou. Desenhamos o caminho mais rápido e eficiente para a execução do time.",
        details: [
            "Novos fluxos de trabalho",
            "Manuais de execução",
            "Eficiência operacional",
        ],
        icon: Zap,
        color: "#00ff41",
    },
    {
        id: "implementation",
        title: "IMPLEMENTAÇÃO",
        subtitle: "MÃO NA MASSA",
        desc: "Colocamos para funcionar. Instalamos a tecnologia necessária para que o sistema rode sozinho.",
        details: [
            "Configuração de sistemas",
            "Automações inteligentes",
            "Treinamento do time",
        ],
        icon: Zap,
        color: "#00ff41",
    },
];

export function Methodology() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="metodologia">
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

            <Container className="relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Framework NIDUS
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter">
                            Metodologia <br />
                            <span className="text-white/20">Sem enrolação.</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-lg text-muted-foreground font-medium border-l-2 border-primary pl-6">
                            Não automatizamos o caos. Desenhamos a ordem e escalamos com precisão através de sistemas inteligentes.
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-border bg-card/10 overflow-hidden">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-6 sm:p-8 md:p-12 border-b-2 sm:border-b-2 sm:border-r-2 lg:border-b-0 lg:border-r-2 border-border last:border-0 sm:last:border-r-0 lg:last:border-r-2 hover:bg-white/[0.02] transition-colors relative group overflow-hidden"
                        >
                            {/* Step Number Overlay */}
                            <span className="absolute top-4 right-4 sm:top-6 sm:right-8 text-5xl sm:text-7xl font-black italic text-white/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none">
                                0{i + 1}
                            </span>

                            <div className="space-y-6 md:space-y-8 relative">
                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter text-primary break-words">
                                        {step.title}
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        {step.subtitle}
                                    </p>
                                </div>

                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed break-words">
                                    {step.desc}
                                </p>

                                <ul className="space-y-3 md:space-y-4 pt-6 md:pt-8 border-t border-border/50">
                                    {step.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3 md:gap-4 text-xs font-bold uppercase tracking-widest">
                                            <div className="w-2 h-2 bg-primary shrink-0 mt-1.5" />
                                            <span className="break-words">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Interactive Example - Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 max-w-4xl mx-auto space-y-8"
                >
                    <div className="text-center space-y-4">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em]">Aplicação Prática</span>
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                            Caso: Onboarding <br /> que levava <span className="text-primary">40 horas.</span>
                        </h3>
                    </div>

                    <div className="border-2 border-border bg-card/10 overflow-hidden">
                        <details className="group">
                            <summary className="flex items-center justify-between p-8 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                                <span className="text-sm font-black uppercase tracking-widest group-open:text-primary transition-colors">A SOLUÇÃO ÓBVIA (O QUE NÃO FIZEMOS)</span>
                                <div className="p-2 border border-border group-open:border-primary transition-colors">
                                    <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                                </div>
                            </summary>
                            <div className="p-8 pt-0 border-t border-border/50 space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    ❌ <span className="text-white font-bold">Investimento: R$ 80.000</span> em chatbots com IA e automações complexas de e-mail para tentar acelerar a coleta de dados de 300 campos que o cliente precisava preencher.
                                </p>
                            </div>
                        </details>

                        <details className="group border-t-2 border-border" open>
                            <summary className="flex items-center justify-between p-8 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                                <span className="text-sm font-black uppercase tracking-widest group-open:text-primary transition-colors">O MÉTODO NIDUS (O QUE ENTREGAMOS)</span>
                                <div className="p-2 border border-border group-open:border-primary transition-colors">
                                    <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                                </div>
                            </summary>
                            <div className="p-6 md:p-8 pt-0 border-t border-border/50 space-y-4 md:space-y-6">
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">01. SISTEMA</span>
                                        <p className="text-xs text-muted-foreground leading-tight break-words">Questionamos os 300 campos. Descobrimos que apenas 27 eram essenciais para o lucro.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">02. FLUXO</span>
                                        <p className="text-xs text-muted-foreground leading-tight break-words">Redesenhamos a coleta para ser assíncrona e focada nos 27 campos reais.</p>
                                    </div>
                                    <div className="space-y-2 sm:col-span-2 md:col-span-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">03. FERRAMENTA</span>
                                        <p className="text-xs text-muted-foreground leading-tight break-words">Nenhuma! O processo limpo resolveu o problema sem gastar 1 centavo em tech.</p>
                                    </div>
                                </div>
                                <div className="pt-4 md:pt-6 border-t border-border/50 flex flex-wrap gap-4 md:gap-8 items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-primary">40h → 8h</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tempo Reduzido</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-primary">R$ 0</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Gasto em IA</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-primary">R$ 80k</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Economia Direta</div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
