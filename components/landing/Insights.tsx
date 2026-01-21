"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight, MessageSquare, ShieldAlert, Zap } from "lucide-react";
import Link from "next/link";

const posts = [
    {
        slug: "o-hype-da-ia-roi",
        title: "O Hype da IA: Por que empresas não lucram",
        excerpt: "Automatizar um processo ruim só faz o erro ser mais rápido. Descubra por que a pergunta não é 'qual IA usar', mas 'por que o problema existe'.",
        icon: ShieldAlert,
        category: "Dicas Reais",
    },
    {
        slug: "sistema-fluxo-ferramenta",
        title: "SISTEMA → FLUXO → FERRAMENTA",
        excerpt: "O método simples que economizou R$ 2M em projetos que iam falhar. Por que a tecnologia deve ser a sua última preocupação.",
        icon: Zap,
        category: "Método",
    },
    {
        slug: "3-niveis-automacao",
        title: "Os 3 Níveis de Automação",
        excerpt: "Você está economizando minutos ou dias? Saiba a diferença entre automatizar tarefas chatas e eliminar o trabalho inútil.",
        icon: MessageSquare,
        category: "Educação",
    },
];

export function Insights() {
    return (
        <section className="py-24 md:py-32 bg-background border-t border-border" id="insights">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Selected Reads
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter">
                            Pensamento <br />
                            <span className="text-white/20">direto.</span>
                        </h2>
                    </div>
                    <Link href="/blog">
                        <button className="px-8 py-4 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all">
                            Ver Blog Completo
                        </button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-0 border-2 border-border">
                    {posts.map((post, i) => (
                        <Link key={i} href={`/blog/${post.slug}`} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 border-b-2 md:border-b-0 md:border-r-2 last:border-0 border-border bg-card/10 h-full flex flex-col hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="mb-8 flex justify-between items-start">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                        {post.category}
                                    </span>
                                    <post.icon className="w-5 h-5 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-6 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-12 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-primary transition-colors">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
