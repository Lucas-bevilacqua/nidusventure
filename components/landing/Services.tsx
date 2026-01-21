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
                </div>

                <div className="grid md:grid-cols-3 gap-0 border-2 border-border">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-10 border-b-2 md:border-b-0 md:border-r-2 border-border last:border-0 flex flex-col group ${service.popular ? 'bg-primary/5' : 'bg-background'}`}
                        >
                            {service.popular && (
                                <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-12 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black text-primary">{service.price}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">/ {service.period}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    {service.desc}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-12 flex-1">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/audit" className="w-full">
                                <Button
                                    className={`w-full rounded-none font-black uppercase tracking-widest py-8 text-xs border-2 ${service.popular ? 'bg-primary text-primary-foreground border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'bg-transparent text-primary border-primary hover:bg-primary/5'} transition-all`}
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
