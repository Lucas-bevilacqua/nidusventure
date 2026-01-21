"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight, Box, Repeat, Zap } from "lucide-react";

const steps = [
    {
        id: "system",
        title: "SISTEMA",
        subtitle: "A ESTRUTURA DO LUCRO",
        desc: "Analisamos como sua empresa realmente ganha dinheiro. O que é trabalho produtivo e o que é apenas perda de tempo?",
        details: [
            "Mapeamento do fluxo de caixa",
            "Fim das tarefas repetitivas",
            "Organização de processos",
        ],
        icon: Box,
        color: "#00ff41",
    },
    {
        id: "flow",
        title: "FLUXO",
        subtitle: "A AGILIDADE DA EQUIPE",
        desc: "Desenhamos o caminho mais rápido para o resultado. Criamos regras claras para que a informação não fique presa em ninguém.",
        details: [
            "Manuais de execução simples",
            "Fim dos gargalos humanos",
            "Comunicação automática",
        ],
        icon: Repeat,
        color: "#00ff41",
    },
    {
        id: "tool",
        title: "FERRAMENTA",
        subtitle: "A ESCALA REAL",
        desc: "Agora instalamos a tecnologia. Usamos IA e automações que servem ao seu negócio para que ele cresça sem precisar de mais gente.",
        details: [
            "Robôs de atendimento e venda",
            "Sistemas que rodam sozinhos",
            "Painel de lucros em tempo real",
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

                <div className="grid lg:grid-cols-3 gap-0 border-2 border-border bg-card/10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-border last:border-0 hover:bg-white/[0.02] transition-colors relative group"
                        >
                            {/* Step Number Overlay */}
                            <span className="absolute top-6 right-8 text-7xl font-black italic text-white/[0.03] group-hover:text-primary/[0.05] transition-colors">
                                0{i + 1}
                            </span>

                            <div className="space-y-8 relative">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black italic tracking-tighter text-primary">
                                        {step.title}
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        {step.subtitle}
                                    </p>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>

                                <ul className="space-y-4 pt-8 border-t border-border/50">
                                    {step.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                                            <div className="w-2 h-2 bg-primary" />
                                            {detail}
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
                            <div className="p-8 pt-0 border-t border-border/50 space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">01. SISTEMA</span>
                                        <p className="text-xs text-muted-foreground leading-tight">Questionamos os 300 campos. Descobrimos que apenas 27 eram essenciais para o lucro.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">02. FLUXO</span>
                                        <p className="text-xs text-muted-foreground leading-tight">Redesenhamos a coleta para ser assíncrona e focada nos 27 campos reais.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">03. FERRAMENTA</span>
                                        <p className="text-xs text-muted-foreground leading-tight">Nenhuma! O processo limpo resolveu o problema sem gastar 1 centavo em tech.</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-border/50 flex flex-wrap gap-8 items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-3xl font-black italic tracking-tighter text-primary">40h → 8h</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tempo Reduzido</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-black italic tracking-tighter text-primary">R$ 0</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Gasto em IA</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-black italic tracking-tighter text-primary">R$ 80k</div>
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
