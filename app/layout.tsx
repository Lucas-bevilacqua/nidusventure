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
  title: "NIDUS Ventures | Venture Builder B2B SaaS",
  description: "Transformamos problemas operacionais complexos em produtos escaláveis. Consultoria de arquitetura de sistemas + Venture Building.",
};

import { WhatsAppCTA } from "@/components/landing/WhatsAppCTA";

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
      </body>
    </html>
  );
}
