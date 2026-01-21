"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Header / Meta */}
            <section className="pt-40 pb-24 border-b-2 border-border">
                <Container>
                    <div className="space-y-8">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                        </Link>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 border border-primary/20">ARTIGO</span>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">
                                    <Clock className="w-3 h-3 text-primary" /> 5 MIN READ
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter">
                                {slug.replace(/-/g, " ")}
                            </h1>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Placeholder Content */}
            <section className="py-24">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="bg-primary/5 border-2 border-primary border-dashed p-10 space-y-6 text-center">
                            <AlertTriangle className="w-12 h-12 text-primary mx-auto" />
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Conteúdo em Deep Research</h2>
                            <p className="text-muted-foreground">
                                O blueprint detalhado deste artigo está sendo finalizado com base em dados reais de 2024.
                                NIDUS VENTURES não publica artigos gerados por IA. Publicamos sistemas.
                            </p>
                            <Link href="/#contato" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">
                                Avisar-me quando estiver pronto
                            </Link>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-6 opacity-30 select-none blur-sm pointer-events-none">
                            <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">The Architecture of Systems</h3>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
