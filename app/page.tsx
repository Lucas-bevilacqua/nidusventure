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
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <div id="problema"><Problem /></div>
        <div id="solucao"><Solution /></div>
        <div id="metodologia"><Methodology /></div>
        <div id="ventures"><VentureBuilding /></div>
        <div id="servicos"><Services /></div>
        <div id="cases"><CaseStudies /></div>
        <div id="sobre"><About /></div>
        <div id="insights"><Insights /></div>
        <div id="contato"><Contact /></div>
      </div>

      <footer className="py-12 bg-black border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black italic uppercase tracking-tighter">
            NIDUS<span className="text-primary">VENTURES</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground text-center">
            © {new Date().getFullYear()} NIDUS VENTURES. EU NÃO VENDO IA. EU DESENHO SISTEMAS.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
