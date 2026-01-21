// Script para gerar posts do Instagram
// Tamanho: 1080x1080px (quadrado)

const fs = require('fs');
const path = require('path');

// Posts do Instagram
const posts = [
    {
        id: 1,
        type: "quote",
        title: "SISTEMA → FLUXO → FERRAMENTA",
        subtitle: "A ordem que economizou R$ 2M",
        text: "A maioria começa pela ferramenta.\nNós começamos pelo sistema.\n\nPor quê?\n\nPorque tecnologia não resolve\nproblemas de design.",
        cta: "Link na bio →",
        filename: "post-01-sistema-fluxo-ferramenta"
    },
    {
        id: 2,
        type: "case",
        title: "Caso Real",
        subtitle: "40h → 8h sem tecnologia",
        text: "Cliente queria automatizar onboarding\nde 40 horas com IA.\n\nNós questionamos:\n'Por que 300 campos?'\n\nDescobrimos: apenas 27 eram essenciais.\n\nEliminamos 273 campos.\n\nResultado: 40h → 8h\nInvestimento: R$ 0\nEconomia: R$ 280k/ano",
        cta: "Link na bio →",
        filename: "post-02-caso-40h-8h"
    },
    {
        id: 3,
        type: "stat",
        title: "80% FALHAM",
        subtitle: "Por quê?",
        text: "Empresas brasileiras gastaram\nR$ 50 bilhões em IA em 2024.\n\n80% não viram ROI.\n\nO problema não foi a IA.\nFoi começar pela tecnologia\nem vez de começar pelo sistema.",
        cta: "Link na bio →",
        filename: "post-03-80-falham"
    },
    {
        id: 4,
        type: "tip",
        title: "Dica NIDUS",
        subtitle: "Antes de automatizar",
        text: "Pergunte:\n\n'Isso deveria existir?'\n\nSe a resposta for não,\nelimine.\nNão automatize.\n\nAutomatizar processo ruim\n= processo ruim mais rápido.",
        cta: "Link na bio →",
        filename: "post-04-dica-eliminar"
    },
    {
        id: 5,
        type: "comparison",
        title: "Tradicional vs NIDUS",
        subtitle: "A diferença",
        text: "TRADICIONAL:\n• Vende ferramenta\n• Automatiza o que você pede\n• Entrega slides\n\nNIDUS:\n• Questiona sistema\n• Elimina o desnecessário\n• Entrega funcionando",
        cta: "Link na bio →",
        filename: "post-05-tradicional-vs-nidus"
    },
    {
        id: 6,
        type: "quote",
        title: "Pensamento Sistêmico",
        subtitle: "A pergunta certa",
        text: "A pergunta certa não é:\n'Qual IA usar?'\n\nA pergunta certa é:\n'Por que esse problema existe?'",
        cta: "Link na bio →",
        filename: "post-06-pergunta-certa"
    },
    {
        id: 7,
        type: "stat",
        title: "R$ 2M+",
        subtitle: "Economizados",
        text: "Em projetos que iam falhar.\n\nComo?\n\nQuestionando processos\nantes de automatizar.\n\nEliminando o desnecessário.\nOtimizando o essencial.\n\nSó então escolhendo tecnologia.",
        cta: "Link na bio →",
        filename: "post-07-2m-economizados"
    },
    {
        id: 8,
        type: "tip",
        title: "3 Níveis de Automação",
        subtitle: "Você está no nível 1?",
        text: "Nível 1: Automatizar tarefas\n(Economiza minutos)\n\nNível 2: Automatizar processos\n(Economiza horas)\n\nNível 3: Eliminar sistemas\n(Economiza dias)\n\n90% ficam no nível 1.",
        cta: "Link na bio →",
        filename: "post-08-3-niveis"
    },
    {
        id: 9,
        type: "case",
        title: "Escala Real",
        subtitle: "Sem contratar",
        text: "Consultoria boutique:\n\nFaturamento: +100%\nFuncionários: +0%\nMargem: +50%\n\nComo?\n\nEliminando desperdício.\nOtimizando processos.\n\nEscala = eficiência,\nnão tamanho.",
        cta: "Link na bio →",
        filename: "post-09-escala-sem-contratar"
    },
    {
        id: 10,
        type: "quote",
        title: "Não Automatize o Caos",
        subtitle: "Elimine primeiro",
        text: "Automatizar processo ruim\n= processo ruim mais rápido.\n\nElimine o processo ruim.\nDepois, se necessário,\nautomatize o que sobrou.",
        cta: "Link na bio →",
        filename: "post-10-nao-automatize-caos"
    },
    {
        id: 11,
        type: "tip",
        title: "ROI Real",
        subtitle: "Como medir certo",
        text: "ROI falso:\n'Implementamos 20 automações!'\n\nROI real:\n'Economizamos R$ 280k/ano'\n\nMeça economia em R$,\nnão em automações.",
        cta: "Link na bio →",
        filename: "post-11-roi-real"
    },
    {
        id: 12,
        type: "stat",
        title: "30%",
        subtitle: "Redução média de custos",
        text: "Sem demitir ninguém.\n\nComo?\n\nEliminando processos\ndesnecessários.\n\nOtimizando processos\nque sobraram.\n\nResultado: equipe trabalha\nmenos e produz mais.",
        cta: "Link na bio →",
        filename: "post-12-30-reducao"
    }
];

// Salvar posts em JSON
fs.writeFileSync(
    path.join(__dirname, '../public/instagram/posts-data.json'),
    JSON.stringify(posts, null, 2)
);

console.log(`✅ ${posts.length} posts criados!`);
console.log('📁 Dados salvos em: public/instagram/posts-data.json');
