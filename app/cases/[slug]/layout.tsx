import { cases } from '@/lib/data/cases';

// Gerar rotas estáticas para todos os cases no build time
export async function generateStaticParams() {
    return cases.map((c) => ({
        slug: c.slug,
    }));
}

export default function CaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
