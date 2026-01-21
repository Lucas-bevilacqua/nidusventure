import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nidusventures.com.br';
    
    // Páginas estáticas
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/sobre`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/consultoria`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/venture-building`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/audit`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contato`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cases`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Artigos do blog
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
        // Usar publishedDate se disponível (formato ISO), senão usar data atual
        const lastModified = post.publishedDate 
            ? new Date(post.publishedDate) 
            : new Date();
        
        // Validar se a data é válida
        if (isNaN(lastModified.getTime())) {
            return {
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(), // Fallback para data atual se inválida
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            };
        }
        
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
    });

    return [...staticPages, ...blogPages];
}
