import { Metadata } from 'next';
import { blogPosts } from '@/lib/data/blog';
import { notFound } from 'next/navigation';

// Gerar rotas estáticas para todos os artigos no build time
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
    // Next.js 16 pode passar params como Promise
    const resolvedParams = await Promise.resolve(params);
    const post = blogPosts.find(p => p.slug === resolvedParams.slug);
    
    if (!post) {
        return {
            title: "Artigo não encontrado | NIDUS Ventures",
        };
    }

    const baseUrl = 'https://nidusventures.com.br';
    const url = `${baseUrl}/blog/${post.slug}`;
    const imageUrl = post.imageUrl || `${baseUrl}/og-default.jpg`;

    return {
        title: `${post.title} | NIDUS Ventures Blog`,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author || 'Lucas Bevilacqua' }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: url,
            siteName: 'NIDUS Ventures',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            locale: 'pt_BR',
            type: 'article',
            publishedTime: post.publishedDate,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
        alternates: {
            canonical: url,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default function BlogPostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
