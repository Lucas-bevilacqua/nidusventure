import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/landing/Navbar";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import Script from "next/script";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const baseUrl = 'https://nidusventures.com.br';
    const url = `${baseUrl}/blog/${post.slug}`;
    const imageUrl = post.imageUrl || `${baseUrl}/og-default.jpg`;

    // Structured Data (JSON-LD) para SEO e IAs
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": imageUrl,
        "datePublished": post.publishedDate || post.date,
        "dateModified": post.publishedDate || post.date,
        "author": {
            "@type": "Person",
            "name": post.author || "Lucas Bevilacqua",
            "url": `${baseUrl}/sobre`,
        },
        "publisher": {
            "@type": "Organization",
            "name": "NIDUS Ventures",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/icon.svg`,
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url,
        },
        "keywords": post.keywords.join(", "),
        "articleSection": post.category,
        "timeRequired": `PT${post.readTime.replace(' min', 'M')}`,
        "inLanguage": "pt-BR",
    };

    return (
        <>
            {/* Structured Data para SEO e IAs */}
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            
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
                        <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
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
        </>
    );
}
