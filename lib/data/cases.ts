export interface CaseStat {
    label: string;
    value: string;
}

export interface CaseStudy {
    slug: string;
    tag: string;
    client: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    stats: CaseStat[];
    content?: string;
}

export const cases: CaseStudy[] = [
    {
        slug: "onboarding-optimization",
        tag: "OPERAÇÃO",
        client: "SaaS Enterprise",
        title: "ECONOMIA DE R$ 80K ELIMINANDO O HYPE",
        shortDesc: "Uma empresa de software queria automatizar o cadastro de clientes. Reduzimos o tempo de 40h para 8h apenas eliminando campos inúteis. Sem gastar um centavo com IA.",
        fullDesc: "O problema era clássico: excesso de captação de dados sem propósito claro. O cliente acreditava que precisava de um chatbot com IA caríssimo para lidar com as 40 horas semanais de preenchimento manual. Nossa análise mostrou que 90% dos dados coletados nunca eram usados. Otimizamos o sistema para focar no lucro, não em tech.",
        stats: [
            { label: "Dinheiro Salvo", value: "R$ 80.000" },
            { label: "Tempo Reduzido", value: "80%" },
        ],
    },
    {
        slug: "support-architecture",
        tag: "SISTEMAS",
        client: "Fintech Growth",
        title: "70% MENOS SUPORTE COM DESIGN INTELIGENTE",
        shortDesc: "Em vez de um robô de chat caro, redesenhamos a central de ajuda com base em dados reais. Menos trabalho para o time, mais satisfação para o cliente.",
        fullDesc: "Suporte sobrecarregado é quase sempre um sintoma de um sistema mal desenhado. Em vez de remediar com bots que frustram o usuário, atacamos a causa raiz: o autoatendimento era confuso. Reestruturamos o fluxo de informação, resultando em uma queda drástica na abertura de chamados.",
        stats: [
            { label: "Menos Chamados", value: "-70%" },
            { label: "Retorno Real", value: "12x" },
        ],
    },
    {
        slug: "boutique-scale",
        tag: "MARKETING B2B",
        client: "Consultoria Boutique",
        title: "ESCALANDO UMA BOUTIQUE SEM AUMENTAR O TIME",
        shortDesc: "Implementamos sistemas de triagem automática que permitiram a uma consultoria boutique dobrar seu faturamento sem contratar novos analistas.",
        fullDesc: "Crescimento sem sistemas mata a margem de lucro. Criamos filtros de qualificação baseados em dados que separavam leads prontos para fechar de curiosos, permitindo que os sócios focassem 100% no fechamento.",
        stats: [
            { label: "Faturamento", value: "+100%" },
            { label: "Novas Contratações", value: "ZERO" },
        ],
    },
];
