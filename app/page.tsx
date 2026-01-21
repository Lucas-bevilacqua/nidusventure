import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Methodology } from "@/components/landing/Methodology";
import { VentureBuilding } from "@/components/landing/VentureBuilding";
import { Services } from "@/components/landing/Services";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { About } from "@/components/landing/About";
import { Insights } from "@/components/landing/Insights";
import { Contact } from "@/components/landing/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <div id="problema"><Problem /></div>
        <div id="metodologia"><Methodology /></div>
        <div id="solucao"><Solution /></div>
        <div id="cases"><CaseStudies /></div>
        <div id="servicos"><Services /></div>
        <div id="sobre"><About /></div>
        <div id="ventures"><VentureBuilding /></div>
        <div id="insights"><Insights /></div>
        <div id="contato"><Contact source="home" /></div>
      </div>

      <footer className="py-8 md:py-12 bg-black border-t border-border overflow-x-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-center md:text-left">
            NIDUS<span className="text-primary">VENTURES</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground text-center max-w-md">
            © {new Date().getFullYear()} NIDUS VENTURES. EU NÃO VENDO IA. EU DESENHO SISTEMAS.
          </div>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
