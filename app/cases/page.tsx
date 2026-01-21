"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, TrendingUp, Clock, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cases } from "@/lib/data/cases";

export default function CasesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-24 border-b-2 border-border">
                <Container>
                    <div className="max-w-4xl space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Battle Tested
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
                            CICATRIZES <br />
                            <span className="text-white/20 text-5xl md:text-8xl">DE GUERRA.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-medium text-muted-foreground leading-tight italic max-w-2xl">
                            Casos reais onde o pensamento sistêmico venceu o hype tecnológico e gerou lucro real.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Cases Listing */}
            <section className="py-24">
                <Container>
                    <div className="space-y-12">
                        {cases.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative border-2 border-border bg-card/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                            >
                                <div className="grid lg:grid-cols-12 gap-0">
                                    {/* Content Area */}
                                    <div className="lg:col-span-8 p-8 md:p-16 space-y-10 border-b-2 lg:border-b-0 lg:border-r-2 border-border">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-3 py-1 border border-primary/20">
                                                    {c.tag}
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                                                    // {c.client}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-[0.9]">
                                                {c.title}
                                            </h2>
                                        </div>

                                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                            {c.shortDesc}
                                        </p>

                                        <Link href={`/cases/${c.slug}`} className="inline-flex items-center gap-4 group/link">
                                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white group-hover/link:text-primary transition-colors">Study the Blueprint</span>
                                            <div className="p-3 bg-primary text-primary-foreground group-hover/link:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Stats Area */}
                                    <div className="lg:col-span-4 bg-background p-8 md:p-12 flex flex-col justify-center space-y-8">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Hard Results</h3>
                                        {c.stats.map((stat, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="text-5xl font-black italic text-white tracking-tighter group-hover:text-primary transition-colors">{stat.value}</div>
                                                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center">
                <Container>
                    <div className="max-w-2xl mx-auto space-y-12">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                            Quer que seu case seja o próximo <br />
                            <span className="text-primary italic">estudo de ROI positivo?</span>
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
