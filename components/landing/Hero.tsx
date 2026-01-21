"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative pt-24 sm:pt-32 md:pt-48 pb-12 sm:pb-16 md:pb-32 overflow-x-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

            <Container>
                <div className="flex flex-col items-center text-center space-y-10 md:space-y-14">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">
                            Consultoria de Eficiência Operacional
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black italic leading-[1.1] md:leading-[1] tracking-tighter uppercase"
                    >
                        Sua operação está <br />
                        <span className="text-primary underline decoration-primary/30">custando mais</span> do que deveria.
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-4xl"
                    >
                        Identificamos onde está o desperdício e eliminamos. <br className="hidden md:block" />
                        <span className="text-white">Diagnóstico + eliminação do desnecessário + implementação que funciona.</span>
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/contato?source=hero">
                            <Button size="lg" className="rounded-none bg-primary text-primary-foreground font-black uppercase tracking-widest px-6 sm:px-8 md:px-10 text-xs sm:text-sm hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all">
                                Agendar Diagnóstico Gratuito
                            </Button>
                        </Link>
                        <Link href="#cases">
                            <Button variant="outline" size="lg" className="rounded-none border-primary text-primary font-black uppercase tracking-widest px-10 hover:bg-primary/5 transition-all">
                                Ver Resultados Reais
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8 border-t border-border/50 w-full max-w-4xl"
                    >
                        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
                            <span className="text-3xl md:text-4xl font-black text-primary italic">R$ 2M+</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">economizados para clientes</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
                            <span className="text-3xl md:text-4xl font-black text-primary italic">30%</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">redução média de custos</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
                            <span className="text-3xl md:text-4xl font-black text-primary italic">0</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">refatorações (funciona na 1ª)</span>
                        </div>
                    </motion.div>

                    {/* Visual Divider / Blueprint Element */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full max-w-5xl mt-8 sm:mt-12 min-h-[120px] sm:min-h-[140px] md:aspect-[21/9] border border-border/50 rounded-xl bg-card/30 flex items-center justify-center relative overflow-hidden group px-2 sm:px-4"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="relative text-[10px] sm:text-xs text-muted-foreground font-mono flex gap-2 sm:gap-3 md:gap-4 lg:gap-8 items-center flex-wrap justify-center p-2 sm:p-4 w-full">
                            <div className="p-1.5 sm:p-2 md:p-3 border border-border rounded bg-background shadow-sm text-center">SISTEMA</div>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0 rotate-90 sm:rotate-0" />
                            <div className="p-1.5 sm:p-2 md:p-3 border border-border rounded bg-background shadow-sm text-center">FLUXO</div>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0 rotate-90 sm:rotate-0" />
                            <div className="p-1.5 sm:p-2 md:p-3 border border-primary/50 rounded bg-background shadow-md text-foreground text-center">FERRAMENTA (IA)</div>
                        </div>

                        {/* Animated scanning line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scan pointer-events-none" />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
