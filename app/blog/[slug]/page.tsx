"use client";

import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";
import { useEffect } from "react";

function MarkdownContent({ content }: { content: string }) {
    const processText = (text: string): (string | JSX.Element)[] => {
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        
        // Processa links [texto](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let key = 0;
        
        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            const linkText = match[1];
            const linkUrl = match[2];
            parts.push(
                <Link key={`link-${key++}`} href={linkUrl} className="text-primary hover:underline font-bold">
                    {linkText}
                </Link>
            );
            lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        
        // Processa negrito **texto**
        return parts.map((part, i) => {
            if (typeof part === 'string') {
                const boldRegex = /\*\*([^*]+)\*\*/g;
                const result: (string | JSX.Element)[] = [];
                let textIndex = 0;
                let boldMatch;
                let boldKey = 0;
                
                while ((boldMatch = boldRegex.exec(part)) !== null) {
                    if (boldMatch.index > textIndex) {
                        result.push(part.substring(textIndex, boldMatch.index));
                    }
                    result.push(
                        <strong key={`bold-${i}-${boldKey++}`} className="text-white font-bold">
                            {boldMatch[1]}
                        </strong>
                    );
                    textIndex = boldMatch.index + boldMatch[0].length;
                }
                
                if (textIndex < part.length) {
                    result.push(part.substring(textIndex));
                }
                
                return result.length === 1 && typeof result[0] === 'string' ? result[0] : <span key={`span-${i}`}>{result}</span>;
            }
            return part;
        });
    };

    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            const text = currentParagraph.join(' ').trim();
            if (text) {
                elements.push(
                    <p key={`p-${elements.length}`} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 break-words">
                        {processText(text)}
                    </p>
                );
            }
            currentParagraph = [];
        }
    };

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-none space-y-3 mb-6 pl-0">
                    {listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-2 shrink-0">•</span>
                            <span className="break-words">{processText(item.trim())}</span>
                        </li>
                    ))}
                </ul>
            );
            listItems = [];
        }
        inList = false;
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('# ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h1 key={`h1-${index}`} className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 mt-12 break-words">
                    {trimmed.substring(2)}
                </h1>
            );
        } else if (trimmed.startsWith('## ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-6 mt-10 break-words text-primary">
                    {trimmed.substring(3)}
                </h2>
            );
        } else if (trimmed.startsWith('### ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h3 key={`h3-${index}`} className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 mt-8 break-words">
                    {trimmed.substring(4)}
                </h3>
            );
        } else if (trimmed.startsWith('- ')) {
            flushParagraph();
            if (!inList) inList = true;
            listItems.push(trimmed.substring(2));
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
            flushParagraph();
            flushList();
            const text = trimmed.replace(/\*\*/g, '');
            elements.push(
                <p key={`strong-${index}`} className="text-lg sm:text-xl font-bold text-white mb-6 break-words">
                    {processText(text)}
                </p>
            );
        } else if (trimmed === '') {
            flushParagraph();
            flushList();
        } else {
            if (inList) flushList();
            currentParagraph.push(trimmed);
        }
    });

    flushParagraph();
    flushList();

    return <div className="space-y-4">{elements}</div>;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (post) {
            document.title = `${post.title} | NIDUS Ventures Blog`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.metaDescription);
            }
        }
    }, [post]);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <Navbar />

            {/* Header / Meta */}
            <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 border-b-2 border-border overflow-x-hidden">
                <Container>
                    <div className="space-y-6 md:space-y-8">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                        </Link>
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 border border-primary/20">{post.category}</span>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">
                                    <Clock className="w-3 h-3 text-primary shrink-0" /> {post.readTime} READ
                                </div>
                                <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">{post.date}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black italic uppercase leading-[0.95] tracking-tighter break-words">
                                {post.title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl break-words">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content */}
            <section className="py-16 sm:py-20 md:py-24 overflow-x-hidden">
                <Container>
                    <article className="max-w-4xl mx-auto">
                        <MarkdownContent content={post.content} />
                        
                        {/* CTA */}
                        <div className="mt-16 p-8 md:p-12 border-2 border-primary bg-primary/5 space-y-6 text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter break-words">
                                Quer Aplicar Isso na Sua Operação?
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground break-words">
                                Agende um diagnóstico gratuito e descubra onde sua empresa está perdendo dinheiro.
                            </p>
                            <Link href="/contato?source=blog" className="inline-block px-8 md:px-12 py-4 md:py-6 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all text-sm md:text-base">
                                Agendar Diagnóstico Gratuito
                            </Link>
                        </div>
                    </article>
                </Container>
            </section>
        </main>
    );
}
