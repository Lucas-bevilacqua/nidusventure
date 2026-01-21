"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, BarChart3, Search } from "lucide-react";
import Link from "next/link";

export default function AuditPage() {
    const steps = [
        { title: "Entrevista de Profundidade", desc: "Sessão de 2h com os stakeholders para entender a visão de negócio e gargalos latentes.", icon: Search },
        { title: "Mapeamento 'As-Is'", desc: "Documentamos como o processo acontece hoje. Sem filtros. Toda a burocracia exposta.", icon: BarChart3 },
        { title: "Sessão de Eliminação", desc: "A parte mais importante. Questionamos cada etapa. O que não gera valor é cortado.", icon: Zap },
        { title: "Blueprint de Sistemas", desc: "Desenhamos o novo fluxo e a arquitetura de ferramentas ideal para a implementação.", icon: ShieldCheck },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Service */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-18 md:pb-20 bg-secondary/20 border-b border-border overflow-x-hidden">
                <Container>
                    <div className="max-w-3xl space-y-4 md:space-y-6 px-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Serviço Premium</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight break-words">Process Audit & IA Blueprint</h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed break-words">
                            O diagnóstico que economiza meses de trabalho e milhares de reais em ferramentas erradas. Redesenhamos sua operação com foco em eficiência sistêmica.
                        </p>
                        <div className="pt-4 flex gap-4 flex-wrap">
                            <Link href="/contato?source=audit">
                                <Button size="lg" className="rounded-full text-xs sm:text-sm px-4 sm:px-6">Solicitar Auditoria — R$ 30k</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Detailed Steps */}
            <section className="py-16 sm:py-20 md:py-24 overflow-x-hidden">
                <Container>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                        <div className="space-y-12">
                            <h2 className="text-3xl font-bold">O que entregamos em 3 semanas</h2>
                            <div className="space-y-8">
                                {steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-6"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-secondary flex-shrink-0 flex items-center justify-center text-primary">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                            <p className="text-muted-foreground">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl space-y-8 h-fit sticky top-32">
                            <h3 className="text-2xl font-bold">Por que fazer o Audit?</h3>
                            <ul className="space-y-4">
                                {[
                                    "Elimine até 40% das tarefas manuais sem IA",
                                    "Mapeamento claro de ROI para investimentos futuros",
                                    "Documentação completa de processos essenciais",
                                    "Arquitetura de sistemas à prova de futuro",
                                    "0% de desperdício em ferramentas irrelevantes"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <Button variant="outline" className="w-full rounded-full gap-2">
                                    Baixar Exemplo de Blueprint <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ / Final CTA */}
            <section className="py-16 sm:py-20 md:py-24 bg-secondary/30 overflow-x-hidden">
                <Container className="text-center space-y-6 md:space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-bold italic break-words px-4">"Isso serve para minha empresa?"</h2>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground break-words px-4">
                        O Process Audit é ideal para empresas entre 50 e 500 funcionários que sentem que a operação está "pesada", lenta ou que já tentaram implementar IA sem sucesso.
                    </p>
                    <div className="flex justify-center pt-8">
                        <Link href="/contato?source=audit">
                            <Button size="lg" className="rounded-full px-6 sm:px-12 text-xs sm:text-sm">Falar com Especialista</Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}
