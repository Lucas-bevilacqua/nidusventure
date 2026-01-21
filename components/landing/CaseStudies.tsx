"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, TrendingUp, TrendingDown, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

import { cases } from "@/lib/data/cases";


export function CaseStudies() {
    return (
        <section className="py-16 sm:py-24 md:py-32 bg-background border-t border-border overflow-x-hidden" id="cases">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
                    <div className="space-y-3 md:space-y-4">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Battle Tested
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter break-words">
                            Casos de <br />
                            <span className="text-white/20">sucesso real.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-0 border-2 border-border overflow-hidden">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-6 sm:p-8 md:p-10 border-b-2 sm:border-b-2 sm:border-r-2 last:border-0 sm:last:border-r-0 border-border bg-card/10 group hover:bg-white/[0.02] transition-colors overflow-hidden"
                        >
                            <div className="space-y-6 md:space-y-8">
                                <div className="space-y-3 md:space-y-4">
                                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] px-2 md:px-3 py-1 border border-primary/20 inline-block">
                                        {c.tag}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-none break-words">
                                        {c.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed break-words">
                                        {c.shortDesc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {c.stats.map((stat, idx) => (
                                        <div key={idx} className="p-4 md:p-6 border border-border bg-background group/stat hover:border-primary/50 transition-colors overflow-hidden">
                                            <div className="text-xl sm:text-2xl font-black italic text-primary break-words">{stat.value}</div>
                                            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest break-words">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 md:pt-4">
                                    <Link href={`/cases/${c.slug}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-primary flex items-center gap-2 transition-colors">
                                        Read Full Case <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
