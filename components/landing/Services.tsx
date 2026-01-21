"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Diagnóstico",
        price: "R$ 30.000",
        period: "Único",
        desc: "Análise completa da sua operação. Encontramos os erros e desenhamos o plano de ação.",
        features: [
            "Mapeamento de processos chave",
            "Identificação de desperdícios",
            "Plano de execução detalhado",
        ],
        icon: Rocket,
        cta: "Começar Diagnóstico",
        popular: false,
    },
    {
        title: "Execução",
        price: "R$ 100k+",
        period: "Projeto",
        desc: "Colocamos o plano em prática. Criamos as automações e instalamos os sistemas.",
        features: [
            "Implementação do plano de ação",
            "Configuração de ferramentas",
            "Treinamento prático do time",
        ],
        icon: Zap,
        cta: "Agendar Execução",
        popular: true,
    },
    {
        title: "Conselheiro",
        price: "R$ 15.000",
        period: "Mensal",
        desc: "Acompanhamento mensal para garantir que a tecnologia continue gerando lucro.",
        features: [
            "Sessões de estratégia mensais",
            "Revisão constante de processos",
            "Suporte direto por WhatsApp",
        ],
        icon: ShieldCheck,
        cta: "Contratar Advisor",
        popular: false,
    },
];

export function Services() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="servicos">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Investimento
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter">
                            Como <br />
                            <span className="text-white/20">ajudamos.</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-6 mb-2">
                            Custo da inação
                        </p>
                        <p className="text-lg text-muted-foreground font-medium border-l-2 border-primary pl-6">
                            Cada mês sem otimizar são R$ 15-30k desperdiçados em processos ineficientes. Quanto você já perdeu?
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-border">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-6 sm:p-8 md:p-10 border-b-2 sm:border-b-2 sm:border-r-2 lg:border-b-0 lg:border-r-2 border-border last:border-0 sm:last:border-r-0 lg:last:border-r-2 flex flex-col group ${service.popular ? 'bg-primary/5' : 'bg-background'} overflow-hidden`}
                        >
                            {service.popular && (
                                <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1 z-10">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="text-xl sm:text-2xl font-black text-primary">{service.price}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">/ {service.period}</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                                    {service.desc}
                                </p>
                            </div>

                            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-2 md:gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span className="break-words">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={`/contato?source=${service.title.toLowerCase()}`} className="w-full">
                                <Button
                                    className={`w-full rounded-none font-black uppercase tracking-widest py-6 md:py-8 text-xs border-2 ${service.popular ? 'bg-primary text-primary-foreground border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'bg-transparent text-primary border-primary hover:bg-primary/5'} transition-all`}
                                >
                                    {service.cta}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
