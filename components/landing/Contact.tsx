"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Calendar } from "lucide-react";
import React, { useState } from "react";
import { createLead } from "@/app/actions/leads";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        const result = await createLead(data);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setError(result.error || "Algo deu errado.");
        }

        setIsSubmitting(false);
    };

    return (
        <section className="py-24 md:py-32 bg-background border-t-4 border-primary" id="contato">
            <Container>
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left: Message */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                        <div className="space-y-8">
                            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                                Vamos conversar
                            </span>
                            <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[1.1] md:leading-[1] tracking-tighter">
                                Pronto <br />
                                para o <br />
                                <span className="text-white/20">próximo</span> <br />
                                <span className="text-primary">passo?</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium max-w-sm leading-relaxed">
                                Se você cansou de ferramentas complicadas e quer um sistema que realmente funcione e dê lucro, agende sua conversa.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:contato@nidus.ventures" className="flex items-center gap-6 p-6 border-2 border-border hover:border-primary transition-all group">
                                <div className="p-4 bg-primary/10 text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">E-mail</p>
                                    <p className="font-bold text-white group-hover:text-primary transition-colors">contato@nidus.ventures</p>
                                </div>
                            </a>
                            <a href="https://calendly.com/lucas-bevilacqua/diagnostico" target="_blank" className="flex items-center gap-6 p-6 border-2 border-border hover:border-primary transition-all group">
                                <div className="p-4 bg-primary/10 text-primary">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Marcar conversa</p>
                                    <p className="font-bold text-white group-hover:text-primary transition-colors">Calendly / 15-30min</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-card/30 border-2 border-border p-8 md:p-12 shadow-[30px_30px_0px_rgba(0,255,65,0.05)]"
                        >
                            {isSuccess ? (
                                <div className="py-20 text-center space-y-6">
                                    <h3 className="text-4xl font-black italic uppercase tracking-tighter text-primary">Mensagem Enviada!</h3>
                                    <p className="text-muted-foreground">Lucas Bevilacqua entrará em contato em até 24 horas úteis.</p>
                                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="rounded-none border-primary text-primary">
                                        Enviar outra mensagem
                                    </Button>
                                </div>
                            ) : (
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <h3 className="text-2xl font-black uppercase tracking-widest text-white border-b-2 border-primary pb-4 inline-block">
                                        Análise Gratuita
                                    </h3>

                                    {error && (
                                        <div className="p-4 bg-destructive/10 border border-destructive text-destructive text-xs font-bold uppercase tracking-widest">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Seu Nome</label>
                                            <input name="name" required type="text" className="w-full bg-transparent border-b-2 border-border p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Nome Completo" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">E-mail da Empresa</label>
                                            <input name="email" required type="email" className="w-full bg-transparent border-b-2 border-border p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="voce@empresa.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">O que mais te atrapalha hoje?</label>
                                        <textarea name="message" required rows={4} className="w-full bg-transparent border-b-2 border-border p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Ex: Planilhas lentas, processos confusos..." />
                                    </div>

                                    <Button disabled={isSubmitting} size="lg" className="w-full rounded-none bg-primary text-primary-foreground font-black uppercase tracking-widest py-8 text-sm hover:shadow-[0_10px_30px_rgba(0,255,65,0.3)] transition-all">
                                        {isSubmitting ? "Enviando..." : "Solicitar Análise"} <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>

                                    <p className="text-[10px] text-center text-muted-foreground font-black uppercase tracking-[0.3em]">
                                        Respondemos em até 24 horas úteis.
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
