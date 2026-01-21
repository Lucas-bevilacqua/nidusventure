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
    challenge?: string;
    solution?: string;
    results?: string;
    methodology?: string;
}

export const cases: CaseStudy[] = [
    {
        slug: "kopilot-voice-first-crm",
        tag: "VENTURE BUILDING",
        client: "KOPILOT",
        title: "95% DE ADOÇÃO EM CRM DE CAMPO: O PRIMEIRO VOICE-FIRST",
        shortDesc: "O problema: vendedores de campo não preenchem CRM. A solução: primeiro CRM voice-first do Brasil. Vendedores falam, IA transforma em relatórios estruturados. Zero digitação, 95% de adoção garantida, ROI em 8 dias.",
        fullDesc: "KOPILOT nasceu de um problema real: vendedores de campo não preenchem CRM. Não por preguiça, mas porque digitar relatórios no celular após 8 horas de visita é inviável. A solução não foi forçar adoção, mas eliminar a fricção: voice-first. Vendedores falam naturalmente, IA processa e estrutura os dados automaticamente. Resultado: 95% de adoção (vs 15% de CRMs tradicionais) e ROI em 8 dias.",
        challenge: "Vendedores de campo são o coração de empresas B2B, mas 85% não preenchem CRM. O problema não é falta de disciplina: é fricção. Digitar relatórios detalhados no celular após 8 horas de visita é inviável. Empresas perdem visibilidade completa da operação de campo, tomam decisões baseadas em dados incompletos e não conseguem escalar vendas de forma previsível. CRMs tradicionais foram feitos para escritório, não para campo.",
        solution: "KOPILOT é o primeiro CRM de campo voice-first do Brasil. Em vez de forçar vendedores a digitar, eles falam naturalmente sobre a visita. IA processa a fala, identifica entidades (cliente, produto, status, próximos passos) e estrutura automaticamente em relatórios. Zero digitação. Zero fricção. A tecnologia não foi o foco: o foco foi eliminar a barreira que impedia adoção. Sistema → Fluxo → Ferramenta: primeiro entendemos por que vendedores não preenchiam (sistema), depois redesenhamos o fluxo para ser natural (fala), e só então escolhemos a ferramenta (IA de processamento de voz).",
        results: "95% de adoção vs 15% de CRMs tradicionais. ROI em 8 dias. Visibilidade completa da operação de campo em tempo real. Vendedores economizam 2h/dia que antes gastavam digitando relatórios. Gestores têm dados estruturados para tomar decisões baseadas em evidências. A empresa escala vendas sem aumentar o time, porque agora tem visibilidade real do que acontece no campo.",
        methodology: "Aplicamos o framework Sistema → Fluxo → Ferramenta. Primeiro, questionamos: por que vendedores não preenchem CRM? (Sistema). Descobrimos que não era falta de disciplina, mas fricção do processo. Segundo, redesenhamos o fluxo: em vez de digitar após a visita, falar durante a visita (Fluxo). Terceiro, escolhemos a ferramenta: IA de processamento de voz que estrutura dados automaticamente (Ferramenta). Tecnologia foi escolhida por último, não primeiro.",
        stats: [
            { label: "Adoção", value: "95%" },
            { label: "ROI", value: "8 dias" },
            { label: "Economia de Tempo", value: "2h/dia" },
            { label: "Visibilidade", value: "100%" },
        ],
        content: `
## O Problema Real: Por Que Vendedores Não Preenchem CRM

85% dos vendedores de campo não preenchem CRM. Não é falta de disciplina. É fricção.

Imagine: você passa 8 horas visitando clientes, dirigindo, resolvendo problemas. No final do dia, precisa digitar relatórios detalhados no celular. É inviável.

**O resultado:**
- Empresas perdem visibilidade completa da operação de campo
- Decisões baseadas em dados incompletos ou desatualizados
- Impossibilidade de escalar vendas de forma previsível
- Time de gestão sem dados para otimizar processos

CRMs tradicionais foram feitos para escritório, não para campo. Eles assumem que vendedores têm tempo e disposição para digitar. Não têm.

## A Solução: Voice-First, Não Mais Digitação

KOPILOT é o primeiro CRM de campo voice-first do Brasil. A diferença é simples: **vendedores falam, IA transforma em relatórios estruturados**.

### Como Funciona

1. **Vendedor faz visita ao cliente**
2. **Durante ou após a visita, abre o app e fala naturalmente:**
   - "Visitei a empresa X, cliente está interessado no produto Y, próxima visita em 15 dias"
3. **IA processa a fala e estrutura automaticamente:**
   - Identifica cliente, produto, status, próximos passos
   - Cria relatório estruturado
   - Atualiza CRM em tempo real
4. **Gestor vê dados completos no dashboard**

Zero digitação. Zero fricção. Adoção natural.

## Por Que Funciona: Sistema → Fluxo → Ferramenta

Não começamos pela tecnologia. Começamos pelo sistema.

### 1. Sistema: Por Que Vendedores Não Preenchem?

Questionamos a causa raiz. Descobrimos: não é preguiça, é fricção. O processo de digitar relatórios após 8 horas de campo é inviável.

### 2. Fluxo: Como Tornar Natural?

Redesenhamos o fluxo para eliminar fricção. Em vez de digitar após a visita, falar durante ou logo após. Fala é natural. Digitação não é.

### 3. Ferramenta: Qual Tecnologia Usar?

Só então escolhemos a ferramenta: IA de processamento de voz que estrutura dados automaticamente. Tecnologia foi escolhida por último, não primeiro.

## Resultados: 95% de Adoção vs 15% de CRMs Tradicionais

### Métricas Reais

- **95% de adoção** (vs 15% de CRMs tradicionais)
- **ROI em 8 dias** (tempo médio de recuperação do investimento)
- **2h/dia economizadas** por vendedor (tempo que antes gastava digitando)
- **100% de visibilidade** da operação de campo em tempo real

### Impacto no Negócio

**Para Vendedores:**
- Economizam 2 horas por dia
- Processo natural, sem fricção
- Mais tempo para vender, menos tempo digitando

**Para Gestores:**
- Dados completos e atualizados em tempo real
- Decisões baseadas em evidências, não em suposições
- Visibilidade total da operação de campo

**Para a Empresa:**
- Escala vendas sem aumentar o time
- Processos otimizados baseados em dados reais
- ROI positivo em menos de 2 semanas

## A Metodologia NIDUS Aplicada

KOPILOT é um exemplo perfeito do framework **Sistema → Fluxo → Ferramenta**:

1. **Sistema:** Entendemos por que vendedores não preenchiam (fricção, não preguiça)
2. **Fluxo:** Redesenhamos para ser natural (fala, não digitação)
3. **Ferramenta:** Escolhemos IA de voz que estrutura dados automaticamente

**A tecnologia não foi o foco. O foco foi eliminar a barreira que impedia adoção.**

## Por Que Outros CRMs Falham

CRMs tradicionais falham porque:
- Assumem que vendedores têm tempo para digitar
- Forçam adoção com treinamentos e incentivos
- Não eliminam a fricção do processo
- Focam em features, não em adoção

**KOPILOT funciona porque elimina a fricção na raiz.**

## Conclusão: Tecnologia que Resolve Problema Real

KOPILOT não é mais um CRM. É a prova de que quando você entende o sistema antes de escolher a ferramenta, a adoção é natural.

**95% de adoção não é sorte. É design de sistema correto.**

---

**Quer ver KOPILOT em ação?** [Acesse usekopilot.com.br](https://usekopilot.com.br) ou [agende um diagnóstico gratuito](/contato?source=cases-kopilot) para descobrir como aplicar essa metodologia na sua empresa.
        `,
    },
];
