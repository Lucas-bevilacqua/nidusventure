import type { Metadata } from "next";
import { Work_Sans, Syne } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NIDUS Ventures | Venture Builder B2B SaaS",
    template: "%s | NIDUS Ventures",
  },
  description: "Transformamos problemas operacionais complexos em produtos escaláveis. Consultoria de arquitetura de sistemas + Venture Building. Eficiência operacional, automação inteligente e ROI real.",
  keywords: ["eficiencia operacional", "automação", "sistemas", "processos", "ROI", "consultoria B2B", "venture building", "arquitetura de sistemas"],
  authors: [{ name: "Lucas Bevilacqua" }],
  creator: "Lucas Bevilacqua",
  publisher: "NIDUS Ventures",
  metadataBase: new URL("https://nidusventures.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nidusventures.com.br",
    siteName: "NIDUS Ventures",
    title: "NIDUS Ventures | Venture Builder B2B SaaS",
    description: "Transformamos problemas operacionais complexos em produtos escaláveis. Consultoria de arquitetura de sistemas + Venture Building.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDUS Ventures | Venture Builder B2B SaaS",
    description: "Transformamos problemas operacionais complexos em produtos escaláveis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { WhatsAppCTA } from "@/components/landing/WhatsAppCTA";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${workSans.variable} ${syne.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <WhatsAppCTA />
        <SpeedInsights />
      </body>
    </html>
  );
}
