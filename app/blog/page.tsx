"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

import { blogPosts } from "@/lib/data/blog";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Header */}
            <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 border-b-2 border-border overflow-x-hidden">
                <Container>
                    <div className="max-w-4xl space-y-6 md:space-y-8">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                            Editorial
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black italic uppercase leading-[0.9] sm:leading-[0.8] tracking-tighter break-words px-4">
                            PENSAMENTO <br />
                            <span className="text-white/20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">SISTÊMICO.</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground leading-tight italic max-w-2xl break-words px-4">
                            Artigos sobre a intersecção entre processos, tecnologia e ROI real. Sem hype, apenas sistemas que funcionam.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="py-16 sm:py-20 md:py-24 overflow-x-hidden">
                <Container>
                    <div className="grid gap-0 border-2 border-border">
                        {blogPosts.map((post, i) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group grid md:grid-cols-12 gap-0 border-b-2 border-border last:border-0 hover:bg-white/[0.02] transition-colors overflow-hidden"
                            >
                                {/* Meta */}
                                <div className="md:col-span-3 p-6 sm:p-8 border-b-2 md:border-b-0 md:border-r-2 border-border space-y-3 md:space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] break-words">{post.category}</span>
                                        <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">
                                        <Clock className="w-3 h-3 text-primary shrink-0" />
                                        {post.readTime} READ
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-9 p-6 sm:p-8 md:p-12 space-y-4 md:space-y-6">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-[0.9] break-words">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl break-words">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-2 md:pt-4">
                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-3 md:gap-4 group/link flex-wrap">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">ESTUDAR SISTEMA</span>
                                            <div className="p-2 bg-primary text-primary-foreground group-hover/link:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all shrink-0">
                                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
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
