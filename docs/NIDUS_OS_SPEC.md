# Nidus OS — Especificação Completa de Produto, Arquitetura e Construção

> Documento vivo. Versão 1.0 — especificação inicial para transformar a Nidus (hoje serviço de implantação acompanhada) em um **SaaS B2B autoguiado** com baixa dependência do fundador.
>
> **Aviso de honestidade:** nada neste documento está implementado. É especificação. Onde há decisão pendente do fundador, jurídica ou técnica, está marcado com ⚠️ **DECISÃO PENDENTE**.

---

## Índice

1. [Definição final da Nidus OS](#1-definição-final-da-nidus-os)
2. [Por que não concorre com GPT e Claude](#2-por-que-não-concorre-com-gpt-e-claude)
3. [Classificação como SaaS](#3-classificação-como-saas)
4. [Modelo de entrega ao cliente](#4-modelo-de-entrega-ao-cliente)
5. [Arquitetura conceitual (6 camadas)](#5-arquitetura-conceitual-6-camadas)
6. [Jornada completa do usuário (20 etapas)](#6-jornada-completa-do-usuário)
7. [Onboarding guiado (8 telas)](#7-onboarding-guiado)
8. [Fluxos iniciais](#8-fluxos-iniciais)
9. [Modelo de dados](#9-modelo-de-dados)
10. [Arquitetura técnica](#10-arquitetura-técnica)
11. [Telas](#11-telas)
12. [Microcopies](#12-microcopies)
13. [Regras de negócio](#13-regras-de-negócio)
14. [Segurança e decisões pendentes](#14-segurança-e-decisões-pendentes)
15. [Modelo de assinatura](#15-modelo-de-assinatura)
16. [Suporte de baixa dependência](#16-suporte-de-baixa-dependência)
17. [Landing page reescrita](#17-landing-page-reescrita)
18. [FAQ](#18-faq)
19. [Especificação do MVP](#19-especificação-do-mvp)
20. [Backlog de desenvolvimento](#20-backlog-de-desenvolvimento)
21. [Critérios de aceite](#21-critérios-de-aceite)
22. [Plano de lançamento](#22-plano-de-lançamento)
23. [O que pode ser automatizado](#23-o-que-pode-ser-automatizado)
24. [O que exige revisão humana](#24-o-que-exige-revisão-humana)
25. [O que ainda exige decisão do fundador](#25-o-que-ainda-exige-decisão-do-fundador)
26. [Artefatos de engenharia](#26-artefatos-de-engenharia)

---

## 1. Definição final da Nidus OS

**Nidus OS** é uma plataforma operacional guiada, entregue como SaaS web, para **configurar e executar tarefas recorrentes usando as regras, os modelos e os documentos da própria empresa**.

O cliente escolhe um fluxo pronto (ex.: propostas), organiza as referências da empresa em um espaço chamado **Ninho**, envia tarefas por formulários guiados e recebe **entregas preparadas para revisão humana**. A inteligência artificial é infraestrutura interna: o cliente nunca escreve prompts, nunca escolhe modelo, nunca abre ChatGPT ou Claude.

**Definição pública (usar na comunicação):**
> "Uma plataforma operacional guiada para configurar e executar tarefas recorrentes usando as regras, os modelos e os documentos da sua empresa."

**O nome "OS" é marca.** Não é um sistema operacional de computador e não deve ser descrito tecnicamente como tal. "OS" evoca *sistema operacional do trabalho recorrente da empresa* — o lugar onde a rotina acontece com padrão, memória e histórico.

**Frase-síntese de posicionamento:**
> "ChatGPT e Claude dão inteligência. A Nidus OS coloca essa inteligência dentro de um processo operacional guiado, com as referências da sua empresa e revisão da sua equipe."

**O que a Nidus OS faz, em uma sequência:**
1. Cria conta e ambiente da empresa (workspace).
2. Guia a configuração inicial sem exigir reunião.
3. Organiza o contexto da empresa no Ninho.
4. Oferece fluxos prontos (propostas, cobrança, atendimento).
5. Transforma cada tarefa em um formulário previsível.
6. Aplica as regras e referências escolhidas.
7. Prepara a entrega em formato de rascunho.
8. Encaminha para aprovação / edição / rejeição.
9. Guarda histórico, versões e responsáveis.
10. Permite trocar o provedor de IA por trás sem mudar a experiência do cliente.

**O cliente NÃO precisa:** abrir ChatGPT, abrir Claude, criar prompts, configurar projetos, organizar pastas, conhecer APIs, saber qual modelo é usado, participar de call obrigatória ou contratar implantação personalizada.

---

## 2. Por que não concorre com GPT e Claude

A Nidus OS **não** disputa o mercado de inteligência geral. GPT e Claude são modelos de propósito amplo; a Nidus OS é uma **camada de produto acima dos modelos**, usando suas APIs como infraestrutura.

A diferença é de **experiência de produto**, não de capacidade técnica. Não atacamos os modelos. Não dizemos que "não consultam documentos", "esquecem contexto", "só respondem genérico" ou "não têm memória/projetos" — isso é falso e enfraquece o argumento.

### Cinco formulações do posicionamento (a #1 é a canônica)

1. **"ChatGPT e Claude dão inteligência. A Nidus OS transforma essa inteligência em processo operacional guiado, com as referências da sua empresa e revisão da sua equipe."** ← usar
2. "Um assistente de IA responde a uma conversa. A Nidus OS opera uma rotina — com formulário, regras da empresa, entrega padronizada e histórico."
3. "A diferença não é o quanto a IA é inteligente. É quanto trabalho a sua empresa precisa refazer toda vez. A Nidus OS guarda o padrão para você não recomeçar do zero."
4. "Modelos de IA são o motor. A Nidus OS é o carro: onde você senta, aperta um botão e chega no lugar certo, sempre no mesmo padrão."
5. "Assistentes gerais são flexíveis por natureza. A Nidus OS é previsível por design — porque rotina de empresa precisa de padrão, não de improviso."

### Quadro-resumo

| | Assistente geral de IA (ChatGPT / Claude) | Nidus OS |
|---|---|---|
| Natureza | Ferramenta ampla de inteligência e conversa | Aplicação operacional especializada |
| Interação | Conversa livre; usuário fornece contexto a cada vez | Formulário guiado por fluxo |
| Contexto da empresa | Fornecido pelo usuário conforme a necessidade | Organizado uma vez no Ninho e reutilizado |
| Saída | Uma resposta | Uma entrega no padrão definido, para revisão |
| Uso ideal | Trabalho exploratório e variado | Trabalho operacional repetível |
| Histórico / versões / responsáveis | Não é o foco do produto | Registrado por padrão |
| Prompts | Habilidade do usuário | Não expostos ao usuário |
| Modelo de IA | O produto central | Infraestrutura trocável por baixo |

---

## 3. Classificação como SaaS

**A Nidus OS É:** SaaS B2B · plataforma operacional guiada · produto por assinatura · ambiente de memória e fluxos · sistema de preparação de trabalho · aplicação com revisão humana · produto com fluxos previamente disponíveis · experiência que usa modelos de IA como infraestrutura.

**A Nidus OS NÃO É:** pasta de prompts · projeto dentro do Claude · GPT personalizado · consultoria · agência · automação sob medida · serviço de desenvolvimento · sistema operacional técnico · substituto completo da equipe · solução que aceita qualquer processo.

**Consequências operacionais dessa classificação:**
- Receita recorrente (MRR), não projeto.
- O cliente configura sozinho; a implantação assistida deixa de ser obrigatória (vira add-on opcional pago).
- Fluxos são catálogo versionado, não construção manual por conta.
- Escopo fechado: a plataforma só aceita processos que passam nos critérios (frequência, referência, entrega clara, ponto de revisão).

---

## 4. Modelo de entrega ao cliente

Entrega 100% via SaaS web, sem instalação. Sequência de valor:

**Compra →** cliente escolhe plano e cria conta.
**Workspace →** cria o ambiente exclusivo da empresa.
**Onboarding →** o sistema guia a configuração inicial (sem reunião obrigatória).
**Ninho →** cadastra/envia informações da empresa, produtos, preços, regras, modelos, documentos, exemplos aprovados, tom de voz, restrições, critérios de aprovação.
**Escolha do fluxo →** seleciona um fluxo disponível (começar por propostas, cobrança, atendimento).
**Configuração →** o sistema coleta o necessário para adaptar aquele fluxo.
**Teste →** cliente envia um caso real ou fictício.
**Resultado →** a Nidus prepara uma entrega em rascunho.
**Revisão humana →** aprovar / editar / pedir nova versão / rejeitar (com motivo) / salvar como exemplo aprovado.
**Operação recorrente →** novas tarefas pelo painel.
**Histórico →** cada execução registra entrada, referências usadas, versão do fluxo, entrega gerada, alterações humanas, responsável, status, data/hora.

---

## 5. Arquitetura conceitual (6 camadas)

```
┌─────────────────────────────────────────────────────────────┐
│ CAMADA 1 — INTERFACE (painel do cliente, browser)            │
│ login · workspace · onboarding · Ninho · catálogo · execução │
│ revisão · histórico · configurações · faturamento · ajuda    │
└───────────────┬─────────────────────────────────────────────┘
                │ (API server-side, autenticada, escopo por org)
┌───────────────▼─────────────────────────────────────────────┐
│ CAMADA 2 — NINHO (referências por empresa)                   │
│ registros estruturados · arquivos · regras · modelos ·       │
│ versões · metadados · status de atualização · permissões     │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│ CAMADA 3 — MOTOR DE FLUXOS                                    │
│ valida entrada · seleciona referências · monta instruções ·  │
│ aciona IA · valida saída · detecta faltas · sinaliza decisão │
│ humana · salva entrega · gera checklist de revisão           │
└───────────────┬─────────────────────────────────────────────┘
                │ (interface de provedor — nunca chave no browser)
┌───────────────▼─────────────────────────────────────────────┐
│ CAMADA 4 — PROVEDOR DE INTELIGÊNCIA (abstração)              │
│ Anthropic · OpenAI · futuros · selecionado pela Nidus        │
│ custo controlado pela Nidus e embutido nos planos            │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼──────────────────┐  ┌──────────────────────┐
│ CAMADA 5 — CONTROLE              │  │ CAMADA 6 — COBRANÇA   │
│ usuários · papéis · permissões · │  │ planos · assinatura · │
│ logs · versionamento · aprovação │  │ limites · consumo ·   │
│ limites · auditoria · retenção · │  │ upgrade/downgrade ·   │
│ exclusão · tratamento de erros   │  │ cancelamento · falha  │
│                                  │  │ de pagamento · trial ·│
│                                  │  │ bloqueio por inadimpl.│
└──────────────────────────────────┘  └──────────────────────┘
```

**Camada 1 — Interface.** Painel React no navegador. Só fala com o backend por API autenticada; nunca com o provedor de IA diretamente.

**Camada 2 — Ninho.** Banco de referências por empresa: registros estruturados (produtos, preços, regras), arquivos (upload), modelos de texto, versões, metadados, status de atualização (atual/desatualizado), permissões.

**Camada 3 — Motor de fluxos.** Coração do produto. Recebe a `Task`, valida a entrada contra o `FlowConfiguration`, seleciona as referências do Ninho, monta as instruções internas (prompt versionado), aciona a Camada 4, valida a saída, detecta informação ausente, sinaliza os pontos de decisão humana, salva o `TaskOutput` e gera o checklist de revisão.

**Camada 4 — Provedor de inteligência.** Abstração `AIProvider` com implementações `AnthropicProvider`, `OpenAIProvider`, etc. O cliente **não** escolhe o modelo; a Nidus define o provedor por fluxo/ambiente. **Chaves de API nunca vão ao navegador.** O custo de API é da Nidus e considerado no preço. ⚠️ **DECISÃO PENDENTE:** modalidade futura de "chave própria do cliente" (BYO key) — documentada, mas **fora do MVP**.

**Camada 5 — Controle.** Identidade, papéis (Owner, Admin, Revisor, Operador, Leitor), permissões, logs de atividade, versionamento de fluxos e referências, aprovação, limites de uso, auditoria, retenção, exclusão, tratamento de erros.

**Camada 6 — Cobrança.** Planos, assinatura, limites, medição de consumo, upgrade/downgrade, cancelamento, falha de pagamento, trial (se adotado), bloqueio por inadimplência.

---

## 6. Jornada completa do usuário

Cada etapa traz: **Objetivo · Tela · Campos · Botões · Validações · Erros · Estado vazio · Microcopy · Evento analítico · Critério de conclusão.**

### E1 — Visitante chega à landing page
- **Objetivo:** entender em 10s o que é a Nidus OS e iniciar cadastro.
- **Tela:** landing (seção 17). **Campos:** nenhum. **Botões:** "Criar conta", "Ver como funciona".
- **Validações:** — · **Erros:** — · **Estado vazio:** —.
- **Microcopy CTA:** "Configurar meu primeiro fluxo".
- **Evento:** `landing_view`, `cta_signup_click`. **Conclusão:** clique em criar conta.

### E2 — Cria conta / escolhe plano
- **Objetivo:** criar identidade e (opcional) selecionar plano.
- **Tela:** `/signup`. **Campos:** nome, e-mail, senha (ou magic link), nome da empresa, aceite dos Termos + Privacidade (checkbox obrigatório).
- **Botões:** "Criar conta", "Já tenho conta".
- **Validações:** e-mail válido e único; senha ≥ 8 caracteres; aceite obrigatório.
- **Erros:** "Este e-mail já tem conta. Entrar?"; "Escolha uma senha com pelo menos 8 caracteres."; "É preciso aceitar os Termos para continuar."
- **Estado vazio:** — · **Microcopy:** "Você começa no plano de teste. Sem cartão agora." (se houver trial).
- **Evento:** `signup_started`, `signup_completed`. **Conclusão:** conta criada, e-mail de confirmação enviado.

### E3 — Confirma e-mail
- **Objetivo:** validar propriedade do e-mail.
- **Tela:** `/verify-email` + e-mail transacional. **Campos:** — (link) ou código de 6 dígitos.
- **Botões:** "Reenviar e-mail". **Validações:** token válido/não expirado (24h).
- **Erros:** "Link expirado. Reenviamos um novo." · **Estado vazio:** "Não recebeu? Confira o spam ou reenvie."
- **Evento:** `email_verified`. **Conclusão:** e-mail confirmado; segue ao workspace.

### E4 — Cria workspace
- **Objetivo:** criar o ambiente isolado da empresa.
- **Tela:** `/onboarding/workspace`. **Campos:** nome do workspace, fuso horário, moeda (BRL padrão).
- **Botões:** "Criar workspace". **Validações:** nome obrigatório (2–60 chars).
- **Erros:** "Dê um nome ao workspace." · **Estado vazio:** —.
- **Microcopy:** "Este é o espaço da sua empresa. Tudo o que você configurar fica só aqui."
- **Evento:** `workspace_created`. **Conclusão:** workspace criado; usuário vira Owner.

### E5 — Dados básicos da empresa
- **Objetivo:** coletar contexto mínimo (base do Ninho).
- **Tela:** Onboarding Tela 3. **Campos:** nome, segmento, produtos/serviços, cliente ideal, canal principal, responsável pelo workspace, responsável pela revisão.
- **Validações:** nome + segmento obrigatórios. **Erros:** inline por campo.
- **Estado vazio:** placeholders com exemplos. **Microcopy:** "Isso ajuda a Nidus a preparar entregas no jeito da sua empresa."
- **Evento:** `company_profile_saved`. **Conclusão:** perfil salvo.

### E6 — Escolhe o primeiro fluxo
- **Objetivo:** selecionar 1 fluxo do catálogo.
- **Tela:** Onboarding Tela 2 / `/flows/catalog`. **Campos:** seleção única (cards).
- **Botões:** "Usar este fluxo". **Validações:** plano permite o fluxo.
- **Erros:** "Seu plano inclui 1 fluxo. Para adicionar outro, veja os planos."
- **Estado vazio:** — · **Microcopy por card:** "O que prepara / o que precisa / quem revisa / quando faz sentido / quando não faz."
- **Evento:** `flow_selected`. **Conclusão:** `FlowInstance` criada (status: configurando).

### E7 — Vê requisitos do fluxo
- **Objetivo:** mostrar pré-requisitos antes de configurar.
- **Tela:** `/flows/:id/requirements`. **Campos:** — (checklist do que reunir).
- **Botões:** "Começar configuração". **Validações:** —.
- **Estado vazio:** — · **Microcopy:** "Reúna estes materiais. Você pode salvar e voltar depois."
- **Evento:** `flow_requirements_viewed`. **Conclusão:** avança.

### E8 — Preenche formulários (config do fluxo)
- **Objetivo:** parametrizar o fluxo. **Tela:** Onboarding Tela 5.
- **Campos:** evento de entrada, campos obrigatórios da tarefa, formato da entrega, pontos de revisão, limites, exceções.
- **Botões:** "Salvar e continuar". **Validações:** campos obrigatórios marcados.
- **Erros:** inline. **Estado vazio:** valores-padrão sugeridos por fluxo.
- **Evento:** `flow_config_saved`. **Conclusão:** `FlowConfiguration` válida.

### E9 — Envia documentos
- **Objetivo:** subir arquivos ao Ninho. **Tela:** Ninho / uploader.
- **Campos:** arquivos (pdf, docx, xlsx, imagem), rótulo, categoria.
- **Botões:** "Enviar", "Remover". **Validações:** tipo permitido, tamanho ≤ limite do plano.
- **Erros:** "Formato não suportado."; "Arquivo acima do limite (X MB)."
- **Estado vazio:** "Nenhum documento ainda. Envie preços, modelos e regras."
- **Evento:** `file_uploaded`. **Conclusão:** ≥ itens obrigatórios do fluxo presentes.

### E10 — Configura regras
- **Objetivo:** registrar regras, tom de voz, restrições, critérios de aprovação.
- **Tela:** Ninho → Regras. **Campos:** título, texto da regra, tipo (obrigatória/preferência/restrição), tom de voz, critérios de aprovação.
- **Botões:** "Adicionar regra". **Validações:** título + texto.
- **Erros:** inline. **Estado vazio:** modelos de regra sugeridos.
- **Evento:** `rule_created`. **Conclusão:** regras mínimas do fluxo presentes.

### E11 — Define responsável pela revisão
- **Objetivo:** garantir que toda entrega tem revisor humano.
- **Tela:** config do fluxo / membros. **Campos:** seleção de membro (papel Revisor).
- **Botões:** "Definir revisor", "Convidar pessoa". **Validações:** ≥ 1 revisor por fluxo.
- **Erros:** "Todo fluxo precisa de um revisor responsável."
- **Estado vazio:** "Você mesmo pode revisar por enquanto."
- **Evento:** `reviewer_assigned`. **Conclusão:** revisor definido.

### E12 — Executa teste
- **Objetivo:** rodar o fluxo com caso real/fictício. **Tela:** Onboarding Tela 6 / execução.
- **Campos:** os campos de entrada do fluxo. **Botões:** "Executar teste".
- **Validações:** entrada mínima; sinaliza faltantes sem bloquear ("faltando: X").
- **Erros:** "Faltam dados para uma entrega confiável: [lista]." (aviso, permite prosseguir marcando incerteza).
- **Estado vazio:** exemplo pré-preenchido "usar caso de exemplo".
- **Evento:** `task_test_run`. **Conclusão:** `TaskOutput` gerado.

### E13 — Recebe primeira entrega
- **Objetivo:** apresentar rascunho + checklist + incertezas.
- **Tela:** revisão. **Campos:** — (leitura). **Botões:** "Editar", "Aprovar", "Nova versão", "Rejeitar".
- **Validações:** — · **Erros:** se a IA falhar: "Não conseguimos preparar agora. Tentar de novo?"
- **Estado vazio:** — · **Microcopy:** "Rascunho para revisão. Nada é enviado a ninguém automaticamente."
- **Evento:** `output_viewed`. **Conclusão:** entrega visível.

### E14 — Corrige ou aprova (calibração)
- **Objetivo:** ajustar e ensinar o padrão. **Tela:** Onboarding Tela 7 / revisão.
- **Campos:** edição de texto, "o que ficou certo", "o que mudar", "regra não aplicada", "info errada", checkbox "salvar como exemplo aprovado".
- **Botões:** "Salvar revisão", "Aprovar", "Nova versão".
- **Validações:** motivo obrigatório ao rejeitar. **Erros:** "Diga o motivo — ajuda a Nidus a melhorar."
- **Evento:** `review_submitted`, `approved_example_saved`. **Conclusão:** decisão registrada.

### E15 — Ativa o fluxo
- **Objetivo:** marcar o fluxo como operacional. **Tela:** Onboarding Tela 8.
- **Campos:** — · **Botões:** "Ativar fluxo". **Validações:** config válida + revisor + Ninho mínimo.
- **Erros:** "Antes de ativar: [pendências]." · **Estado vazio:** —.
- **Evento:** `flow_activated`. **Conclusão:** `FlowInstance` = ativa.

### E16 — Uso recorrente
- **Objetivo:** rodar novas tarefas no dia a dia. **Tela:** `/flows/:id/run`.
- **Campos:** entrada do fluxo. **Botões:** "Preparar entrega". **Validações:** limite do plano.
- **Erros:** "Você atingiu o limite mensal do plano. Ver opções." **Estado vazio:** "Nenhuma tarefa ainda. Prepare a primeira."
- **Evento:** `task_run`. **Conclusão:** entrega gerada → revisão.

### E17 — Consulta histórico
- **Objetivo:** rastreabilidade. **Tela:** `/history`. **Campos:** filtros (fluxo, status, período, responsável).
- **Botões:** "Ver detalhe", "Exportar". **Validações:** —.
- **Estado vazio:** "Seu histórico aparece aqui após a primeira execução."
- **Evento:** `history_viewed`. **Conclusão:** lista renderizada.

### E18 — Atualiza referências
- **Objetivo:** manter o Ninho atual. **Tela:** Ninho. **Campos:** edição de item (cria nova `ReferenceVersion`).
- **Botões:** "Salvar nova versão", "Ver histórico". **Validações:** —.
- **Estado vazio:** — · **Microcopy:** "Atualize uma vez; os próximos trabalhos já usam a versão nova."
- **Evento:** `reference_updated`. **Conclusão:** versão salva.

### E19 — Recebe avisos de inconsistência
- **Objetivo:** alertar sobre conflito/desatualização. **Tela:** banner + Notificações.
- **Campos:** — · **Botões:** "Revisar", "Ignorar". **Validações:** —.
- **Estado vazio:** — · **Microcopy:** "Duas regras parecem conflitar: [A] e [B]. Qual vale?"
- **Evento:** `inconsistency_flagged`. **Conclusão:** aviso visto/resolvido.

### E20 — Adiciona fluxo ou muda de plano
- **Objetivo:** expandir. **Tela:** `/settings/billing` + catálogo.
- **Campos:** seleção de plano/add-on. **Botões:** "Fazer upgrade", "Adicionar fluxo".
- **Validações:** pagamento válido. **Erros:** "Pagamento recusado. Atualize o cartão."
- **Estado vazio:** — · **Evento:** `plan_changed`, `flow_addon_added`. **Conclusão:** novo direito aplicado.

---

## 7. Onboarding guiado

Barra de progresso persistente (8 passos), "salvar e sair", retomada de onde parou. Nunca prometer tempo como garantia.

### Tela 1 — Boas-vindas
- **Comunica:** o que será criado (o primeiro fluxo operacional da empresa); que exige reunir alguns materiais (preços, modelos, regras); que a Nidus **prepara entregas para revisão**, não envia nada sozinha; que **nem toda tarefa serve** (precisa de frequência, referência e entrega clara).
- **Sobre tempo:** *"A maioria das empresas configura o primeiro fluxo em cerca de duas horas de trabalho — é um objetivo, não uma promessa. Você pode salvar e voltar quando quiser."*
- **Botão:** "Começar".

### Tela 2 — Escolha do fluxo
Cards para **Propostas · Cobrança · Atendimento**. Cada card mostra:
- **O que prepara** · **O que precisa** · **Quem revisa** · **Quando faz sentido** · **Quando NÃO faz sentido.**

### Tela 3 — Empresa
Campos: nome · segmento · produtos e serviços · cliente ideal · canal principal · responsável pelo workspace · responsável pela revisão.

### Tela 4 — Ninho
Coletar: regras · modelos · documentos · preços · tom de voz · restrições · exemplos · critérios de aprovação. **Barra de progresso + marcação de itens obrigatórios** por fluxo.

### Tela 5 — Configuração do fluxo
Definir: evento de entrada · campos obrigatórios · referências utilizadas · formato da entrega · pontos de revisão · limites · casos de exceção.

### Tela 6 — Teste
Usuário fornece um caso. A Nidus: valida os dados → informa o que falta → executa → apresenta a entrega → **destaca incertezas** → gera checklist de revisão.

### Tela 7 — Calibração
Usuário informa: o que ficou correto · o que mudar · qual regra não foi aplicada · qual informação estava errada · se pode salvar como exemplo aprovado.

### Tela 8 — Ativação
Mostrar: fluxo ativo · como executar · quem revisa · como atualizar o Ninho · limites do plano · onde pedir suporte.

---

## 8. Fluxos iniciais

Estrutura padrão de cada fluxo: **Nome · Promessa · Entrada · Campos obrigatórios · Referências · Regras · Etapas · Saída · Checklist · Limites · Exceções · Erros · Prompt interno (versionado) · Critério de aprovação · Exemplo · Estrutura de dados.**

### 8.1 Fluxo de Propostas

- **Nome:** Propostas. **Promessa:** transformar uma solicitação recebida em um **rascunho de proposta no padrão comercial da empresa, para revisão.**
- **Entrada:** solicitação do cliente (texto colado, ou campos). **Evento:** "nova solicitação recebida".
- **Campos obrigatórios:** cliente/empresa, itens ou serviços solicitados, quantidade/escopo, prazo desejado (se houver), canal.
- **Referências:** tabela de preços, condições comerciais, modelo de proposta, tom de voz, restrições, exemplos aprovados.
- **Regras (NÃO PODE):** aprovar desconto · inventar preço · alterar condições · enviar ao cliente · assumir dados ausentes. Preço ausente → marca como `[PREÇO A CONFIRMAR]`.
- **Etapas:** validar entrada → identificar itens → casar com preços/condições do Ninho → montar no modelo → sinalizar lacunas → gerar checklist.
- **Saída:** documento de proposta (rascunho) + lista de incertezas + checklist.
- **Checklist:** preços conferem com a tabela? · condições corretas? · escopo completo? · nada inventado? · tom adequado?
- **Limites:** 1 proposta por execução; tamanho máx. de entrada; sem cálculo fiscal/tributário.
- **Exceções:** item sem preço na tabela → lacuna, não invenção; pedido de desconto → encaminha à decisão humana.
- **Erros:** "Não encontrei preço para [item] no Ninho. Deixei marcado para você confirmar."
- **Critério de aprovação:** revisor confirma preços/condições/escopo e aprova.
- **Exemplo:** entrada "Cliente X quer 3 licenças do plano Pro por 12 meses" → rascunho com preço do Ninho, condição de 12 meses, campos de desconto vazios marcados p/ decisão.

### 8.2 Fluxo de Cobrança

- **Nome:** Cobrança. **Promessa:** preparar uma **mensagem de cobrança para revisão**, no tom e nas regras da empresa.
- **Entrada:** pendência (cliente, valor, vencimento, situação). **Evento:** "pagamento em aberto".
- **Campos obrigatórios:** cliente, valor, vencimento, estágio (1º aviso / lembrete / atraso).
- **Referências:** política de cobrança, tom de voz, modelos por estágio, restrições legais, exemplos.
- **Regras (NÃO PODE):** alterar valor · negociar · ameaçar · enviar automaticamente · inventar histórico.
- **Etapas:** validar → escolher modelo por estágio → aplicar tom/política → montar mensagem → sinalizar → checklist.
- **Saída:** mensagem (rascunho) + incertezas + checklist. **Checklist:** valor correto? · tom adequado ao estágio? · sem ameaça? · dados do cliente certos?
- **Limites:** sem cálculo de juros/multa a menos que fornecido; sem envio automático.
- **Exceções:** cliente pede desconto/parcelamento → decisão humana.
- **Erros:** "Não tenho o histórico de pagamentos deste cliente. Não vou supor — confirme antes."
- **Critério de aprovação:** revisor confirma valor, estágio e tom.
- **Exemplo:** "Cliente Y, R$ 1.200, vencido há 5 dias" → mensagem de lembrete cordial no modelo da empresa.

### 8.3 Fluxo de Atendimento

- **Nome:** Atendimento. **Promessa:** preparar uma **resposta para revisão** com base no que está documentado.
- **Entrada:** dúvida/pedido do cliente. **Evento:** "nova mensagem de cliente".
- **Campos obrigatórios:** pergunta do cliente, canal, contexto (se houver).
- **Referências:** FAQ, políticas, prazos documentados, tom de voz, restrições, exemplos.
- **Regras (NÃO PODE):** inventar prazo · criar política · prometer exceção · dar decisão jurídica/financeira · responder como fato o que não está documentado.
- **Etapas:** validar → buscar resposta no Ninho → montar resposta → marcar o que não está documentado → checklist.
- **Saída:** resposta (rascunho) + incertezas + checklist. **Checklist:** baseado em referência? · nada inventado? · tom certo? · encaminha decisão quando preciso?
- **Limites:** não decide casos fora do documentado. **Exceções:** tema jurídico/financeiro/exceção → decisão humana.
- **Erros:** "Isso não está documentado no Ninho. Preparei uma resposta que encaminha para uma pessoa decidir."
- **Critério de aprovação:** revisor confirma aderência às referências.
- **Exemplo:** "Vocês entregam no sábado?" sem política documentada → resposta que não inventa prazo e encaminha.

> **Regra transversal dos 3 fluxos:** toda entrega é **rascunho**, sempre passa por revisão, nunca é enviada pela plataforma no MVP, e informação ausente vira **lacuna sinalizada**, nunca suposição.

---

## 9. Modelo de dados

Multiempresa com **isolamento por `organization_id`** em toda tabela de dados de cliente (row-level scoping obrigatório). Convenções: `id` UUID, `created_at`/`updated_at` timestamptz, `deleted_at` para soft delete onde indicado.

| Entidade | Campos principais | Relacionamentos | Índices | Acesso | Exclusão | Histórico |
|---|---|---|---|---|---|---|
| **User** | id, name, email(uniq), password_hash, email_verified_at, status | 1:N Membership | email | próprio + admin Nidus | soft delete; anonimizar e-mail | login/logout em AuditEvent |
| **Organization** | id, name, segment, timezone, currency, status | 1:N Workspace, Membership, Subscription | name | membros | soft + purge agendado | AuditEvent |
| **Workspace** | id, org_id, name, timezone | N:1 Org; 1:N FlowInstance, NinhoItem | org_id | membros do ws | soft delete | AuditEvent |
| **Membership** | id, org_id, user_id, role, status, invited_by | User↔Org | (org_id,user_id) uniq | admin da org | hard delete | AuditEvent |
| **Role** | enum: owner, admin, reviewer, operator, viewer | referenciado por Membership | — | sistema | — | — |
| **Plan** | id, code, name, limits(json), price_ref | 1:N Subscription | code | público (leitura) | versionado | — |
| **Subscription** | id, org_id, plan_id, status, current_period_end, provider_id | N:1 Org, Plan | org_id | admin da org + Nidus | manter p/ auditoria | mudanças em AuditEvent |
| **Usage** | id, org_id, period, executions_count, storage_bytes, tokens_est | N:1 Org | (org_id,period) | admin da org + Nidus | reter p/ billing | agregado mensal |
| **NinhoItem** | id, workspace_id, type(rule/model/doc/price/example/toneofvoice/restriction/criteria), title, body, status(current/outdated), metadata(json), current_version_id | 1:N ReferenceVersion, File | (workspace_id,type) | membros do ws | soft delete | via ReferenceVersion |
| **File** | id, workspace_id, ninho_item_id?, name, mime, size, storage_key, checksum | N:1 Workspace/NinhoItem | workspace_id | membros do ws | soft + remover do storage | AuditEvent |
| **ReferenceVersion** | id, ninho_item_id, version_no, body, changed_by, created_at | N:1 NinhoItem | (ninho_item_id,version_no) | membros do ws | manter (imutável) | é o próprio histórico |
| **FlowTemplate** | id, code, name, version, schema(json), prompt_ref, output_format, checklist(json), status | 1:N FlowInstance | code,version | admin Nidus | versionado, nunca deletar publicado | FlowVersion |
| **FlowVersion** | id, flow_template_id, version, prompt_body, changelog, published_at | N:1 FlowTemplate | (template,version) | admin Nidus | imutável | é o histórico |
| **FlowInstance** | id, workspace_id, flow_template_id, template_version, status(config/active/paused), reviewer_id | N:1 Workspace/Template; 1:N Task | workspace_id | membros do ws | soft delete | AuditEvent |
| **FlowConfiguration** | id, flow_instance_id, input_event, required_fields(json), used_references(json), output_format, review_points(json), limits(json), exceptions(json) | 1:1 FlowInstance | flow_instance_id | admin/owner do ws | versionar | AuditEvent |
| **Task** | id, flow_instance_id, created_by, status(queued/processing/ready/approved/rejected/failed), source | N:1 FlowInstance; 1:1 Input/Output | (flow_instance_id,status) | membros do ws | soft delete | ActivityLog |
| **TaskInput** | id, task_id, payload(json), attachments(file_ids) | 1:1 Task | task_id | membros do ws | com a Task | imutável |
| **TaskOutput** | id, task_id, content, uncertainties(json), checklist(json), references_used(json), flow_version, provider_used, tokens_used | 1:1 Task | task_id | membros do ws | com a Task | versões por "nova versão" |
| **Review** | id, task_id, reviewer_id, action(approve/edit/regenerate/reject), comment, edited_content, reason | N:1 Task/User | task_id | revisor+ | manter | é histórico |
| **Approval** | id, task_id, approved_by, approved_at, saved_as_example(bool) | 1:1 Task | task_id | revisor+ | manter | imutável |
| **ActivityLog** | id, org_id, actor_id, entity, entity_id, action, at | N:1 Org | (org_id,at) | admin da org | reter conforme política | append-only |
| **SupportRequest** | id, org_id, user_id, type, payload(json), status, response | N:1 Org/User | (org_id,status) | membros + Nidus | reter | thread |
| **Notification** | id, user_id, org_id, type, title, body, read_at | N:1 User | (user_id,read_at) | próprio | expira | — |
| **AuditEvent** | id, org_id?, actor_id, action, target, ip, user_agent, metadata, at | — | (org_id,at) | admin Nidus | reter por política ⚠️ | append-only, imutável |

**Regras de acesso globais:** toda query filtra por `organization_id`/`workspace_id` do usuário autenticado (defesa em profundidade: escopo no app + RLS no banco). Admin da Nidus tem acesso administrativo, mas **abrir conteúdo de cliente exige justificativa operacional registrada** (ver seção 12).

---

## 10. Arquitetura técnica

Prioridade: **baixa manutenção com serviços gerenciados.** Escolhas justificadas, não modismo.

### 10.1 Stack recomendada

| Componente | Escolha recomendada | Por quê |
|---|---|---|
| Frontend | React + Vite + TypeScript | ecossistema, o repo já usa React |
| Backend | **Python + FastAPI** | alinhado ao stack Python do grupo (Agno/FastAPI já em uso); async nativo |
| Autenticação | Serviço gerenciado (Clerk, Auth0 ou Supabase Auth) | não construir auth do zero |
| Banco | **Postgres gerenciado** (Supabase/Neon/RDS) + **RLS** | relacional, multi-tenant, RLS reforça isolamento |
| Vetores (fase 2) | pgvector no mesmo Postgres | busca semântica no Ninho sem outro serviço |
| Storage | S3/R2 (objeto, privado, URLs assinadas) | documentos fora do banco |
| Fila / assíncrono | Redis + worker (RQ/Celery) ou fila gerenciada | execução de fluxo é demorada; não bloquear request |
| Cobrança | **Stripe** (Billing + webhooks) | assinatura, upgrade/downgrade, inadimplência prontos |
| IA | Abstração `AIProvider` (Anthropic + OpenAI) | trocável; custo controlado pela Nidus |
| Logs/Monitor | Serviço gerenciado (Sentry + logs estruturados) | erro e observabilidade |
| Deploy | Railway/Render/Fly (backend+worker) + Vercel (front) | deploy automatizado por git |

⚠️ **DECISÃO PENDENTE:** provedor de auth e de banco (Supabase concentra auth+db+storage e reduz peças — recomendado para MVP).

### 10.2 Diagrama de requisição

```
Browser (React) ──HTTPS──▶ API FastAPI ──▶ [AuthN/AuthZ, escopo org]
                                          │
                                          ├─▶ Postgres (RLS por org)
                                          ├─▶ Storage (URLs assinadas)
                                          └─▶ Fila (enqueue Task)
                                                     │
                                              Worker assíncrono
                                                     │
                                     Motor de Fluxos ──▶ AIProvider ──▶ API IA
                                                     │
                                          grava TaskOutput + checklist
                                                     │
                                          Notification ──▶ Browser (poll/WS)
```

**Fluxo:** `POST /tasks` valida entrada e enfileira (status `queued`), retorna 202. O worker processa (`processing` → `ready`/`failed`), grava saída, notifica. O front faz polling do status (ou WebSocket na fase 2).

### 10.3 Confiabilidade

- **Tratamento de erros:** erro de provedor → retry com backoff (3 tentativas, jitter); falha persistente → `Task.status=failed` + mensagem amigável + alerta ao admin Nidus.
- **Timeouts:** request de API 30s; chamada ao provedor 60–120s por etapa; job total teto (ex.: 5 min) → `failed`.
- **Repetição:** idempotência por `task_id`; retry não duplica cobrança de execução.
- **Limites:** rate limit por org; cota mensal por plano; tamanho de upload; tamanho de entrada.
- **Custos a monitorar:** tokens de IA por org/fluxo, storage, egress, execuções/mês, custo de suporte. Alertar quando custo por org > X% da receita daquele plano. ⚠️ **DECISÃO PENDENTE:** limiar de alerta e teto de custo por plano.

### 10.4 Ambientes e variáveis

- **Ambientes:** `dev` (local/preview) · `staging` (dados sintéticos) · `prod`.
- **Variáveis (server-side apenas):** `DATABASE_URL`, `AUTH_*`, `STORAGE_*`, `STRIPE_SECRET`, `STRIPE_WEBHOOK_SECRET`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `AI_DEFAULT_PROVIDER`, `REDIS_URL`, `SENTRY_DSN`, `APP_BASE_URL`. **Nunca no frontend.**

### 10.5 Estrutura de repositório (monorepo)

```
nidus-os/
├─ apps/
│  ├─ web/                 # React + Vite (painel)
│  └─ landing/             # landing page (evolui a atual)
├─ services/
│  ├─ api/                 # FastAPI (endpoints, auth, billing webhooks)
│  │  ├─ routers/          # auth, workspaces, ninho, flows, tasks, billing, admin
│  │  ├─ core/             # config, security, db, deps
│  │  ├─ models/           # ORM (SQLAlchemy)
│  │  ├─ schemas/          # Pydantic
│  │  └─ engine/           # motor de fluxos + providers de IA
│  └─ worker/              # consumidor da fila (processa Task)
├─ packages/
│  └─ flows/               # FlowTemplates + prompts versionados (JSON/py)
├─ infra/                  # IaC, migrations, seeds
└─ docs/                   # esta spec
```

---

## 11. Segurança e dados

> **A Nidus OS não está em conformidade "por padrão". Nada abaixo deve ser comunicado como pronto ou "100% seguro" antes de validação jurídica e técnica.**

**Medidas de projeto (a implementar):**
- Isolamento por org: escopo no app + RLS no Postgres.
- Controle de acesso por papel (RBAC).
- Criptografia em trânsito (TLS) e em repouso (banco + storage gerenciados).
- Documentos em storage privado com URLs assinadas de curta duração.
- Envio ao provedor de IA: enviar **apenas o necessário** por tarefa; ⚠️ definir retenção do provedor e se dados podem ser usados para treino (usar contas/planos empresariais com no-training quando disponível).
- Logs de auditoria append-only; acesso admin da Nidus a conteúdo de cliente só com justificativa registrada.

⚠️ **LISTA DE DECISÕES QUE EXIGEM JURÍDICO/TÉCNICO (fundador aprova):**
1. Política de retenção e prazo de exclusão de dados e arquivos.
2. Termos de Uso e Política de Privacidade (LGPD) — base legal, DPO, direitos do titular.
3. Contrato/adendo de tratamento de dados com provedores de IA (treino? retenção? sub-processadores).
4. Classificação de dados sensíveis e o que é proibido subir ao Ninho.
5. Consentimento e transparência sobre uso de IA nos dados do cliente.
6. Plano de resposta a incidentes e notificação.
7. Política de backup (frequência, retenção, teste de restauração).
8. Exportação de dados e exclusão de conta (portabilidade + direito ao esquecimento).
9. Localização de dados (BR vs. exterior) e implicações LGPD.
10. Registro de operações de tratamento (ROPA).

**Não fazer:** afirmar conformidade LGPD antes de validado; escrever "100% seguro"; inventar certificações (SOC2/ISO) que não existem.

---

## 12. Administração da Nidus (painel interno)

Painel `/admin` (acesso restrito a staff Nidus). O administrador pode: ver organizações · ver planos · controlar uso · bloquear workspace · acompanhar erros · ver tarefas falhadas · trocar versão de fluxo · gerenciar templates · gerenciar prompts internos · publicar novo fluxo · ver tickets · aplicar créditos · ver custo por organização · alterar provedor de IA · ver métricas de ativação e retenção.

**Restrição-chave:** abrir documentos/conteúdo de cliente exige **justificativa operacional** registrada + permissão adequada. Todo acesso a conteúdo de cliente gera `AuditEvent`.

---

## 13. Modelo de assinatura

**Três planos (sem preços inventados — ver metodologia).**

| | Starter | Pro | Empresa |
|---|---|---|---|
| Workspaces | 1 | 1 | vários / departamentos |
| Fluxos | 1 | vários | maiores limites |
| Usuários | 1 (ou poucos) | mais | papéis e permissões |
| Execuções/mês | limite básico | maior | maior + negociável |
| Ninho | básico | ampliado | ampliado |
| Histórico | básico | ampliado | ampliado |
| Suporte | assíncrono | prioritário | atendimento comercial |
| Customização | não | não | integrações avaliadas |

**Modalidades de receita (diferenciadas):**
- **Assinatura recorrente** (mensal/anual) — base.
- **Add-on de uso** — execuções extras além da cota.
- **Fluxo adicional** — habilitar outro fluxo do catálogo.
- **Integração** — conector avaliado (Empresa).
- **Serviço opcional** — implantação assistida / calibração guiada (o antigo "2 horas" vira add-on pago e opcional, **não** obrigatório).

### Metodologia de precificação (não inventar número)
Preço-piso por plano = **custo variável + margem alvo**. Componha:
1. **Custo de API** por execução: tokens médios de entrada+saída × preço do provedor (medir no piloto). Ex.: `custo_exec = tokens_in×p_in + tokens_out×p_out`.
2. **Storage** por org (GB × preço).
3. **Suporte:** custo médio de ticket × tickets/org/mês.
4. **Margem:** definir alvo (ex.: manter custo variável ≤ 20–30% do preço).
5. **Valor operacional gerado:** estimar horas economizadas × custo/hora do cliente — âncora de valor (teto de disposição a pagar).
6. **Volume:** cota de execuções por plano derivada do custo unitário para não estourar margem.
7. **Usuários/fluxos:** cobrar expansão por assento e por fluxo.

Fórmula de sanity check por plano:
```
preço_plano ≥ (custo_exec × cota_exec) + custo_storage + custo_suporte
preço_plano ≤ valor_gerado_estimado × fator_captura (ex.: 0,1–0,3)
```
⚠️ **DECISÃO PENDENTE:** medir tokens reais no piloto, definir margem alvo e cotas, então fixar preços.

---

## 14. Suporte de baixa dependência

Objetivo: fundador fora da operação diária. Camadas:
- **Base de conhecimento** pesquisável.
- **Tour guiado** + **tooltips** contextuais.
- **Checklist de ativação** (o que falta para ativar).
- **Vídeos curtos** por etapa.
- **Diagnóstico automático** (Nidus detecta Ninho incompleto, regra conflitante, config inválida).
- **Mensagens contextuais** (aviso no momento certo).
- **Suporte assíncrono** com **formulário estruturado de erro** (tipo, fluxo, task_id, print).
- **Prazo de resposta** por plano (SLA assíncrono).
- **Limite de revisões** por task no plano base.
- **Sem call e sem customização** no plano base.

### Respostas prontas (macros)

- **Não sabe qual fluxo escolher:** "Comece pela tarefa mais frequente e com entrega mais clara. Propostas costuma ser o melhor primeiro fluxo. Você pode trocar depois."
- **Documento faltando:** "Sem [documento] a entrega fica incompleta. Você pode subir agora ou seguir — vou marcar as partes que dependem dele como pendentes."
- **Regra conflitante:** "Duas regras parecem se contradizer: [A] e [B]. Qual deve prevalecer? Ajuste no Ninho para eu aplicar a correta."
- **Resultado ruim:** "Use 'Nova versão' e diga o que mudar, ou 'Rejeitar' com o motivo. Salvar uma entrega boa como exemplo aprovado melhora as próximas."
- **Pediu integração:** "Integrações são avaliadas no plano Empresa. Conte qual sistema e qual objetivo que retornamos com viabilidade."
- **Pediu fluxo novo:** "Hoje temos Propostas, Cobrança e Atendimento. Registrei seu pedido de [fluxo] para o roadmap; avisamos quando entrar."
- **Pediu reunião:** "O plano base é autoguiado, sem call. Se preferir apoio dedicado, temos a implantação assistida como serviço opcional."
- **Quer geração sem revisão:** "Fluxos com decisão humana sempre entregam rascunho para revisão — é o que garante que nada errado sai no seu nome. Isso não pode ser desativado."
- **Excedeu o plano:** "Você atingiu a cota mensal. Dá para liberar execuções extras (add-on) ou subir de plano. Ver opções."

---

## 15. Landing page reescrita

Objetivo: vender **SaaS autoguiado**. **Remover** da página atual: "Em duas horas, organizamos...", "Implantação acompanhada", "Entramos na operação", "call", "diagnóstico gratuito por WhatsApp" como caminho principal, "configuramos para você". O CTA deixa de ser WhatsApp do fundador e passa a ser **"Criar conta / Configurar meu primeiro fluxo"**.

### Três opções de Hero

- **Opção A** — H1: *"Configure um fluxo. A Nidus prepara o trabalho recorrente no padrão da sua empresa."* Sub: *"Plataforma guiada: escolha um fluxo pronto, organize as referências da sua empresa no Ninho e receba entregas prontas para revisão. Sem prompts, sem configuração técnica."*
- **Opção B** — H1: *"O trabalho recorrente da sua empresa, com padrão e memória — sem começar do zero toda vez."* Sub: *"Escolha um fluxo, organize as referências no Ninho e prepare tarefas guiadas por formulário. Sua equipe revisa e aprova."*
- **Opção C (escolhida)** — H1: *"Escolha um fluxo. Organize as referências. Prepare tarefas recorrentes no padrão da sua empresa."* Sub: *"A Nidus OS é uma plataforma guiada que usa as regras, os modelos e os documentos da sua empresa para preparar entregas prontas para a sua equipe revisar. Sem prompts. Sem configuração técnica. Sem call obrigatória."* **CTA:** *"Configurar meu primeiro fluxo"* · CTA secundário: *"Ver como funciona"*.

> **Escolha:** Opção C — é a mais concreta, ecoa o território pedido e comunica SaaS + guiado + Ninho + revisão + ausência de config técnica.

### Estrutura completa da página
1. **Hero** (Opção C) — badge "Plataforma SaaS · autoguiada".
2. **Problema** — "A equipe refaz o mesmo trabalho toda semana" (reaproveitar copy atual, sem promessa de call).
3. **Como funciona** — 4 passos: escolher fluxo → organizar Ninho → preparar tarefa → revisar e aprovar.
4. **Escolha de fluxo** — cards Propostas / Cobrança / Atendimento (o que prepara, o que precisa, quando faz sentido).
5. **Ninho** — a memória organizada da empresa; atualize uma vez, use sempre.
6. **Onboarding guiado** — "Você configura sozinho, no seu ritmo. Salve e volte quando quiser."
7. **Exemplo de execução** — da solicitação ao rascunho de proposta (reaproveitar o passo a passo atual).
8. **Revisão humana** — "A Nidus prepara. Sua equipe revisa e decide. Nada é enviado automaticamente."
9. **Diferença entre assistente geral e Nidus OS** — tabela da seção 16.
10. **O que inclui** — fluxos prontos, Ninho, formulários, histórico, revisão, papéis.
11. **Limites** (honestidade) — "Fluxos disponíveis hoje: 3. Não aceita qualquer processo. Sempre há revisão humana. IA como infraestrutura, sem prompts livres."
12. **Planos** — Starter / Pro / Empresa (sem preço até definir).
13. **FAQ** (seção 18).
14. **CTA final** — "Configurar meu primeiro fluxo".

**Proibido na copy:** "Automatize tudo", "Substitua sua equipe", "Qualquer tarefa", "Funcionário digital que faz tudo", "Revolucione sua empresa", "IA ilimitada", "Configuração mágica", "Sem trabalho nenhum".

---

## 16. Comparação de posicionamento (tabela justa)

| Assistente geral de IA | Nidus OS |
|---|---|
| Ferramenta ampla | Produto focado em rotinas recorrentes |
| Experiência baseada em conversa | Experiência guiada por fluxo |
| Flexível por natureza | Previsível por design |
| Usuário fornece instruções e contexto a cada vez | Ninho organizado por empresa, reutilizado |
| Ótimo para trabalho exploratório | Ótimo para trabalho operacional repetível |
| Resposta em conversa | Entrega no padrão + histórico + revisão |

> Não é ataque: as duas coisas coexistem. A Nidus OS usa modelos como esses por baixo.

---

## 17. FAQ

- **Preciso saber usar IA ou escrever prompts?** Não. Você preenche formulários guiados; a Nidus cuida do resto.
- **A Nidus envia mensagens/propostas sozinha?** Não. Ela prepara rascunhos; sua equipe revisa, edita e aprova.
- **Qual IA vocês usam?** Modelos líderes de mercado como infraestrutura. Você não precisa escolher nem ter conta em nenhum deles; pode mudar sem afetar sua experiência.
- **Preciso de conta no ChatGPT ou Claude?** Não.
- **Serve para qualquer tarefa?** Não. Hoje: propostas, cobrança e atendimento. A tarefa precisa ter frequência, referências e entrega clara.
- **Tem call ou implantação obrigatória?** Não no plano base. É autoguiado. Apoio dedicado é serviço opcional.
- **Meus dados ficam isolados?** Cada empresa tem ambiente separado. As decisões de segurança, retenção e LGPD estão descritas nos Termos. *(⚠️ publicar só após validação jurídica.)*
- **E se a entrega vier ruim?** Peça nova versão, edite ou rejeite com motivo. Salvar boas entregas como exemplo melhora as próximas.
- **Posso adicionar mais fluxos?** Sim, conforme o plano ou como add-on.
- **Como é cobrado?** Assinatura recorrente por plano, com add-ons de uso/fluxos. *(preços a definir.)*

---

## 18. Especificação do MVP

**Primeiro fluxo do MVP: Propostas.** Motivo: maior valor percebido e mais fácil de calibrar (entrada e saída bem definidas, referências objetivas — preço, condições, modelo), gera "aha moment" claro (rascunho pronto), e a lógica se generaliza para cobrança/atendimento depois.

**Escopo fechado do MVP:** cadastro · workspace · **fluxo de Propostas** · Ninho (regras, preços, modelos, exemplos) · upload de arquivos · formulário de tarefa · geração da entrega (assíncrona) · revisão (aprovar/editar/nova versão/rejeitar) · histórico básico · assinatura (Stripe) · painel admin mínimo · suporte assíncrono. **Fora do MVP:** cobrança, atendimento, integrações, BYO key, busca vetorial, WebSocket, múltiplos workspaces.

### Critérios de aceite (MVP)
- Um novo usuário cria conta, confirma e-mail, cria workspace e ativa o fluxo de Propostas **sem contato humano**.
- Toda entrega é rascunho, com incertezas destacadas e checklist; **nunca** é enviada a terceiros.
- Preço ausente vira lacuna marcada, nunca invenção.
- Todo fluxo exige revisor definido antes de ativar.
- Chaves de IA nunca aparecem no frontend; toda execução registra provedor e versão do fluxo.
- Assinatura ativa/inativa controla acesso; cota mensal é respeitada.
- Isolamento entre organizações verificado por teste.

---

## 19. Backlog de desenvolvimento (ordem de construção)

1. **Fundação:** repo, ambientes, CI, auth gerenciada, banco + migrations, RLS por org.
2. **Org/Workspace/Membership** + papéis.
3. **Ninho:** CRUD de NinhoItem + ReferenceVersion + upload de File (storage assinado).
4. **FlowTemplate/Version (Propostas)** + prompt versionado no `packages/flows`.
5. **FlowInstance + FlowConfiguration** + definição de revisor.
6. **AIProvider** (abstração + Anthropic + OpenAI) server-side.
7. **Motor de fluxos** + fila + worker (validar→referências→instruções→IA→validar→salvar→checklist).
8. **Task/Input/Output** + tela de execução + polling de status.
9. **Revisão:** aprovar/editar/nova versão/rejeitar + salvar exemplo + Review/Approval.
10. **Histórico** + ActivityLog/AuditEvent.
11. **Billing (Stripe):** planos, assinatura, cota/Usage, bloqueio por inadimplência, webhooks.
12. **Onboarding guiado** (8 telas) + checklist de ativação.
13. **Admin mínimo:** orgs, uso, tarefas falhadas, trocar versão de fluxo, créditos.
14. **Suporte assíncrono** + base de conhecimento + macros.
15. **Landing reescrita** (Opção C) + evento analítico.
16. **Hardening:** rate limit, timeouts, retries, Sentry, testes de isolamento.

### Riscos e dependências
- **Risco:** qualidade da saída depende do Ninho — mitigação: onboarding força mínimos + calibração.
- **Risco:** custo de API estourar margem — mitigação: medir no piloto, cotas, alertas.
- **Risco:** cliente esperar "faz tudo" — mitigação: copy honesta + limites explícitos.
- **Dependências:** decisões jurídicas (seção 11) antes de publicar Termos; medição de tokens antes de preços.

### Plano de lançamento
1. **Alpha interno:** fundador + 1–2 empresas amigas usam Propostas ponta a ponta; medir tokens/custo e coletar calibração.
2. **Beta fechado:** 5–10 empresas pagantes com preço provisório; validar ativação sem contato humano e retenção.
3. **GA:** preços fixados, Termos/Privacidade publicados (pós-jurídico), landing nova no ar, cobrança automatizada.
- **Checklist de lançamento:** backups testados · monitoramento ativo · webhooks de billing verificados · isolamento testado · limites e retries em produção · Termos publicados · suporte assíncrono operando · rollback de deploy pronto.

---

## 20. Listas finais

### O que PODE ser automatizado
Validação de entrada · seleção de referências do Ninho · montagem das instruções · chamada ao provedor de IA · geração do rascunho · detecção de lacunas/faltas · geração de checklist · sinalização de incertezas · registro de histórico/versões/logs · medição de consumo · cobrança recorrente e bloqueio por inadimplência · notificações · diagnóstico de Ninho incompleto/conflitante · onboarding guiado · macros de suporte.

### O que EXIGE revisão humana
Aprovar/editar/rejeitar toda entrega · confirmar preços, valores e condições · decidir descontos, negociações e exceções · resolver regras conflitantes · aprovar exemplos como referência · qualquer decisão jurídica/financeira · envio efetivo ao cliente final (fora da plataforma no MVP).

### O que ainda EXIGE decisão do fundador
Preços dos planos, cotas e margem (após medir tokens) · escolha final de auth/banco/provedor · políticas de retenção/exclusão/backup · Termos de Uso e Privacidade (LGPD, com jurídico) · contratos com provedores de IA (treino/retenção) · limiar de alerta e teto de custo por org · roadmap de fluxos futuros · se haverá trial e suas regras · se implantação assistida vira add-on pago e por quanto · marca/domínio (nidusventures vs. nidus os).

---

## 21. Artefatos de engenharia

### 21.1 Mapa de rotas (frontend)
```
/                         landing
/signup /login /verify-email
/onboarding/workspace
/onboarding/company
/onboarding/flow          (escolha + requisitos + config)
/onboarding/ninho
/onboarding/test
/onboarding/calibrate
/onboarding/activate
/dashboard
/ninho                    (itens, arquivos, versões)
/flows                    (instâncias ativas)
/flows/:id/run
/tasks/:id                (revisão da entrega)
/history
/settings/team /settings/billing /settings/profile
/help
/admin/*                  (staff Nidus)
```

### 21.2 Endpoints (API)
```
POST /auth/signup · POST /auth/login · POST /auth/verify-email
GET  /me
POST /workspaces · GET /workspaces/:id
POST /workspaces/:id/company
GET  /flows/catalog
POST /workspaces/:id/flow-instances            (escolher fluxo)
PUT  /flow-instances/:id/configuration
POST /flow-instances/:id/reviewer
GET/POST/PUT/DELETE /ninho-items                (CRUD, cria ReferenceVersion)
POST /files (upload → URL assinada) · GET /files/:id
POST /tasks                                     (enfileira; 202)
GET  /tasks/:id                                 (status + output)
POST /tasks/:id/review                          (approve/edit/regenerate/reject)
GET  /history
GET  /billing/plans · POST /billing/subscribe · POST /billing/webhook
# admin
GET /admin/orgs · POST /admin/orgs/:id/block · GET /admin/tasks/failed
POST /admin/flows/publish · PUT /admin/flow-instances/:id/version
POST /admin/orgs/:id/credits
```

### 21.3 Componentes (frontend)
`AppShell` · `OnboardingStepper` · `FlowCatalogCard` · `NinhoItemForm` · `FileUploader` · `FlowConfigForm` · `TaskRunForm` (dinâmico por schema) · `OutputViewer` · `UncertaintyList` · `ReviewChecklist` · `ReviewActions` · `HistoryTable` · `PlanCard` · `UsageMeter` · `EmptyState` · `Toast/Notification` · `AdminOrgTable`.

### 21.4 Esquema do banco (DDL resumido)
```sql
create table organizations (id uuid primary key, name text not null, segment text,
  timezone text default 'America/Sao_Paulo', currency text default 'BRL',
  status text default 'active', created_at timestamptz default now());

create table workspaces (id uuid primary key, org_id uuid references organizations,
  name text not null, created_at timestamptz default now());
create index on workspaces(org_id);

create table ninho_items (id uuid primary key, workspace_id uuid references workspaces,
  type text not null, title text not null, body text, status text default 'current',
  metadata jsonb default '{}', current_version_id uuid, deleted_at timestamptz,
  created_at timestamptz default now());
create index on ninho_items(workspace_id, type);

create table reference_versions (id uuid primary key, ninho_item_id uuid references ninho_items,
  version_no int not null, body text, changed_by uuid, created_at timestamptz default now(),
  unique(ninho_item_id, version_no));

create table flow_instances (id uuid primary key, workspace_id uuid references workspaces,
  flow_template_id text not null, template_version int not null,
  status text default 'config', reviewer_id uuid, created_at timestamptz default now());
create index on flow_instances(workspace_id);

create table tasks (id uuid primary key, flow_instance_id uuid references flow_instances,
  created_by uuid, status text default 'queued', source text, created_at timestamptz default now());
create index on tasks(flow_instance_id, status);

create table task_outputs (id uuid primary key, task_id uuid references tasks unique,
  content text, uncertainties jsonb, checklist jsonb, references_used jsonb,
  flow_version int, provider_used text, tokens_used int, created_at timestamptz default now());

create table reviews (id uuid primary key, task_id uuid references tasks, reviewer_id uuid,
  action text not null, comment text, edited_content text, reason text,
  created_at timestamptz default now());
-- + audit_events, subscriptions, usage, files, memberships, notifications, support_requests
-- RLS: enable row level security; policy usando current_setting('app.org_id')
```

### 21.5 Pseudocódigo do motor de fluxos
```python
def run_flow(task_id):
    task = repo.get_task(task_id)
    flow = repo.get_flow_version(task.flow_instance)
    config = repo.get_config(task.flow_instance)

    # 1. validar entrada
    missing = validate_input(task.input, config.required_fields)
    # (faltas não bloqueiam: viram incertezas)

    # 2. selecionar referências do Ninho
    refs = select_references(task.workspace_id, config.used_references)

    # 3. montar instruções internas (prompt versionado + refs + regras)
    prompt = build_prompt(flow.prompt_body, refs, task.input, config.rules)

    # 4. acionar provedor (server-side, com retry/backoff/timeout)
    provider = AIProvider.get(config.provider or DEFAULT_PROVIDER)
    result = with_retries(lambda: provider.complete(prompt, timeout=120))

    # 5. validar saída (nada inventado; lacunas marcadas)
    output, uncertainties = validate_output(result, refs, config)

    # 6. sinalizar decisões humanas + checklist
    checklist = build_checklist(flow.checklist, output, uncertainties)

    # 7. salvar
    repo.save_output(task_id, output, uncertainties, checklist,
                     references_used=refs.ids, flow_version=flow.version,
                     provider_used=provider.name, tokens_used=result.tokens)
    repo.set_status(task_id, "ready")
    notify_reviewer(task)
```

### 21.6 Abstração de provedores de IA
```python
from abc import ABC, abstractmethod

class AIProvider(ABC):
    name: str
    @abstractmethod
    def complete(self, prompt: Prompt, timeout: int) -> Completion: ...

    @staticmethod
    def get(code: str) -> "AIProvider":
        return {"anthropic": AnthropicProvider(),
                "openai": OpenAIProvider()}[code]

class AnthropicProvider(AIProvider):
    name = "anthropic"
    def complete(self, prompt, timeout):
        # usa ANTHROPIC_API_KEY (server-side); modelo definido pela Nidus
        resp = anthropic.messages.create(model=cfg.ANTHROPIC_MODEL,
                 system=prompt.system, messages=prompt.messages,
                 max_tokens=cfg.MAX_TOKENS, timeout=timeout)
        return Completion(text=resp.content, tokens=resp.usage.total)

class OpenAIProvider(AIProvider):
    name = "openai"
    def complete(self, prompt, timeout):
        resp = openai.chat.completions.create(model=cfg.OPENAI_MODEL,
                 messages=prompt.to_openai(), timeout=timeout)
        return Completion(text=resp.choices[0].message.content,
                          tokens=resp.usage.total_tokens)
```
> Chave nunca no browser. Modelo escolhido pela Nidus. Trocar provedor não muda a experiência do cliente.

### 21.7 Prompt interno do fluxo de Propostas (v1)
```
[SYSTEM]
Você prepara RASCUNHOS de proposta comercial para revisão humana. Você NUNCA
envia nada e NUNCA decide preço, desconto ou condição.

REGRAS DURAS:
- Use SOMENTE preços e condições presentes nas REFERÊNCIAS. Se um preço não existir,
  escreva exatamente [PREÇO A CONFIRMAR] e adicione o item a "incertezas".
- Não invente dados do cliente, escopo ou prazos. Faltou algo? Marque como incerteza.
- Não aprove nem sugira desconto. Pedido de desconto → adicione a "decisões_humanas".
- Respeite o TOM DE VOZ e as RESTRIÇÕES das referências.
- Saída em JSON: { "proposta": "...", "incertezas": [...], "decisoes_humanas": [...],
  "checklist": [...] }.

[REFERENCES]  (injetadas do Ninho: preços, condições, modelo, tom, restrições, exemplos)
[INPUT]       (dados da tarefa preenchidos pelo usuário)
[TASK] Gere o rascunho seguindo o MODELO da empresa e as regras acima.
```
Versionar em `packages/flows/proposals/prompt.v1.txt` (imutável; nova versão = novo arquivo).

### 21.8 Testes essenciais
- **Isolamento:** usuário da org A não lê dados da org B (app + RLS).
- **Sem invenção:** input sem preço → saída contém `[PREÇO A CONFIRMAR]` e incerteza.
- **Revisor obrigatório:** ativar fluxo sem revisor → bloqueado.
- **Rascunho sempre:** nenhuma rota envia entrega a terceiro.
- **Cota:** execução acima do limite do plano → bloqueada com mensagem.
- **Retry/timeout:** falha do provedor → retry; falha persistente → `failed` + alerta, sem duplicar cobrança.
- **Chave segura:** nenhuma variável de IA exposta no bundle do frontend.
- **Billing webhook:** inadimplência → acesso bloqueado; pagamento ok → liberado.

### 21.9 Checklist de deploy
- [ ] Migrations aplicadas + RLS ativa.
- [ ] Variáveis server-side setadas (nenhuma chave no front).
- [ ] Webhook Stripe verificado (assinatura + eventos).
- [ ] Worker + fila no ar; retries/timeouts configurados.
- [ ] Sentry + logs estruturados ativos.
- [ ] Backups agendados e restauração testada.
- [ ] Rate limit e cotas em produção.
- [ ] Teste de isolamento entre orgs passando.
- [ ] Termos e Privacidade publicados (pós-jurídico).
- [ ] Rollback de deploy documentado.

---

*Fim da versão 1.0. Itens ⚠️ dependem de decisão do fundador, jurídico ou medição no piloto antes de ir a produção.*
