"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
    {
        slug: "o-hype-da-ia-roi",
        title: "O Hype da IA: Por que 80% das empresas não veem ROI",
        excerpt: "Empresas gastaram R$ 50 bilhões em 'transformação digital com IA' em 2024. O problema não foi a IA. Foi não perguntar: 'Isso deveria existir?'",
        category: "Anti-Hype",
        date: "20 Jan, 2024",
        readTime: "5 min",
    },
    {
        slug: "sistema-fluxo-ferramenta",
        title: "Metodologia: Sistema → Fluxo → Ferramenta",
        excerpt: "O framework de 3 etapas que separa quem economiza 70% em automação de quem gasta R$ 100k testando ferramentas irrelevantes.",
        category: "Metodologia",
        date: "18 Jan, 2024",
        readTime: "7 min",
    },
    {
        slug: "3-niveis-automacao",
        title: "Os 3 Níveis de Automação: Você está no nível 1?",
        excerpt: "Economizar 5 minutos em um email ou eliminar a necessidade de enviá-lo? Descubra como subir de nível na sua operação.",
        category: "Educação",
        date: "15 Jan, 2024",
        readTime: "6 min",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-24 border-b-2 border-border">
                <Container>
                    <div className="max-w-4xl space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Editorial
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
                            PENSAMENTO <br />
                            <span className="text-white/20 text-5xl md:text-8xl">SISTÊMICO.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-medium text-muted-foreground leading-tight italic max-w-2xl">
                            Artigos sobre a intersecção entre processos, tecnologia e ROI real. Sem hype, apenas sistemas que funcionam.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="py-24">
                <Container>
                    <div className="grid gap-0 border-2 border-border">
                        {blogPosts.map((post, i) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group grid md:grid-cols-12 gap-0 border-b-2 border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Meta */}
                                <div className="md:col-span-3 p-8 border-b-2 md:border-b-0 md:border-r-2 border-border space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">{post.category}</span>
                                        <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">
                                        <Clock className="w-3 h-3 text-primary" />
                                        {post.readTime} READ
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-9 p-8 md:p-12 space-y-6">
                                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-[0.9]">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4">
                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-4 group/link">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">ESTUDAR SISTEMA</span>
                                            <div className="p-2 bg-primary text-primary-foreground group-hover/link:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
}
