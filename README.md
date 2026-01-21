This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Este projeto está configurado para o ecossistema Vercel:

1. **Deploy:** Conecte o repositório `https://github.com/Lucas-bevilacqua/nidusventure` ao seu dashboard da Vercel.
2. **Banco de Dados:** No dashboard da Vercel, vá em **Storage** > **Postgres** e crie uma nova base de dados.
3. **Conexão:** Clique em **Connect** e selecione o seu projeto para que a Vercel injete as variáveis de ambiente (`POSTGRES_URL`, etc) automaticamente.
4. **Captura de Leads:** O formulário de contato já está configurado para salvar os dados na tabela `leads` via Next.js Server Actions.
