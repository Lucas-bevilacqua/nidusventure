"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { cases } from "@/lib/data/cases";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

// Gerar rotas estáticas para todos os cases no build time
export async function generateStaticParams() {
    return cases.map((c) => ({
        slug: c.slug,
    }));
}

export default function CaseDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const caseStudy = cases.find((c) => c.slug === slug);

    if (!caseStudy) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Case Hero */}
            <section className="pt-40 pb-24 border-b-2 border-border bg-card/5">
                <Container>
                    <div className="space-y-8">
                        <Link href="/cases" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Voltar para Cases
                        </Link>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-3 py-1 border border-primary/20">
                                {caseStudy.tag}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter">
                                {caseStudy.title}
                            </h1>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Case Content */}
            <section className="py-24">
                <Container>
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            {caseStudy.content ? (
                                <div className="space-y-12">
                                    {caseStudy.challenge && (
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">O Desafio</h2>
                                            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                                <MarkdownContent content={caseStudy.challenge} />
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.solution && (
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">A Solução Nidus</h2>
                                            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                                <MarkdownContent content={caseStudy.solution} />
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.results && (
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">Resultados</h2>
                                            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                                <MarkdownContent content={caseStudy.results} />
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.methodology && (
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">A Metodologia</h2>
                                            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                                <MarkdownContent content={caseStudy.methodology} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-6 pt-8 border-t border-border">
                                        <MarkdownContent content={caseStudy.content} />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">O Desafio</h2>
                                        <p className="text-xl text-muted-foreground leading-relaxed font-medium italic">
                                            "{caseStudy.shortDesc}"
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-8">A Solução Nidus</h2>
                                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                            <p>{caseStudy.fullDesc}</p>
                                            <p>Implementamos uma camada de inteligência que não depende de ferramentas complexas, mas sim de um design de fluxo otimizado para o lucro.</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="lg:col-span-4 space-y-8 h-fit sticky top-32">
                            <div className="p-8 border-2 border-border bg-card/10 space-y-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-primary">Key Results</h3>
                                <div className="space-y-8">
                                    {caseStudy.stats.map((stat, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="text-5xl font-black italic text-white tracking-tighter">{stat.value}</div>
                                            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-8 border-t border-border/50">
                                    <Link href="/#contato" className="block w-full text-center py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
                                        Quero esse Resultado
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
