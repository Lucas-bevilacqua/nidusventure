"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight, History, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function SobrePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-24 border-b-2 border-border">
                <Container>
                    <div className="max-w-4xl space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Who we are
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
                            NIDUS <br />
                            <span className="text-white/20 text-5xl md:text-8xl">VENTURES.</span>
                        </h1>
                        <p className="text-2xl md:text-4xl font-medium text-muted-foreground leading-tight italic">
                            "A arquitetura invisível de um negócio determina sua capacidade de escala."
                        </p>
                    </div>
                </Container>
            </section>

            {/* Story Grid */}
            <section className="py-24">
                <Container>
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">
                                A Gênese <br />
                                do Sistema
                            </h2>
                            <div className="relative aspect-square overflow-hidden border-2 border-border group">
                                <img
                                    src="/images/fotolucas.png"
                                    alt="Lucas Bevilacqua"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-8 text-xl text-muted-foreground leading-relaxed">
                            <p>
                                NIDUS não é uma agência de marketing ou uma consultoria de TI tradicional. Somos uma <span className="text-white font-bold italic">Venture Builder B2B SaaS</span>.
                            </p>
                            <p>
                                Minha jornada começou na execução pura. Em 2019, como produtor multimídia, eu passava 12 horas por dia editando e renderizando. Foi quando descobri a automação que minha perspectiva mudou: o problema nunca foi "como fazer mais rápido", mas sim <span className="text-white font-bold italic">"por que esse processo existe?"</span>.
                            </p>
                            <p>
                                Essa epifania me levou de executor a arquiteto de sistemas. Hoje, a NIDUS existe para garantir que sua empresa não automatize o caos, mas construa sistemas de lucro que funcionam na primeira tentativa.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values / DNA */}
            <section className="py-24 bg-card/10 border-y border-border">
                <Container>
                    <div className="grid md:grid-cols-3 gap-0 border-2 border-border">
                        {[
                            {
                                icon: Zap,
                                title: "AGRESSIVIDADE TÉCNICA",
                                desc: "Não aceitamos 'não dá pra fazer'. Se existe um gargalo, existe uma solução de engenharia ou design de processo para resolvê-lo."
                            },
                            {
                                icon: History,
                                title: "PENSAMENTO SISTÊMICO",
                                desc: "Toda ação tem uma reação em cadeia. Desenhamos sistemas considerando o todo, não apenas a tarefa isolada."
                            },
                            {
                                icon: Target,
                                title: "FOCO TOTAL EM ROI",
                                desc: "Se não economiza tempo, dinheiro ou aumenta a capacidade de escala, é ruído. E nós odiamos ruído."
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-12 border-b-2 md:border-b-0 md:border-r-2 last:border-0 border-border space-y-8 group hover:bg-white/[0.02] transition-colors">
                                <item.icon className="w-12 h-12 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Final */}
            <section className="py-24 text-center">
                <Container>
                    <div className="max-w-2xl mx-auto space-y-12">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                            Vamos construir o próximo <br />
                            <span className="text-primary italic">sistema de lucro?</span>
                        </h2>
                        <Link href="/contato" className="inline-block px-12 py-6 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all">
                            Agendar Diagnóstico
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}
