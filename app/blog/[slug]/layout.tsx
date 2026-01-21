import { Metadata } from 'next';
import { blogPosts } from '@/lib/data/blog';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts.find(p => p.slug === params.slug);
    
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
