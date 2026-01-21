"use client";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = ["Consultoria", "Ventures", "Cases", "Sobre"];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden",
            scrolled || isOpen ? "bg-background/80 backdrop-blur-md border-b border-border py-3 sm:py-4" : "bg-transparent py-4 sm:py-6"
        )}>
            <Container className="flex items-center justify-between">
                <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase truncate">
                    NIDUS<span className="text-primary">VENTURES</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => {
                        let href = `/${item.toLowerCase().replace(" ", "-")}`;
                        if (item === "Consultoria") href = "/consultoria";
                        if (item === "Ventures") href = "/venture-building";

                        return (
                            <Link
                                key={item}
                                href={href}
                                className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item}
                            </Link>
                        );
                    })}
                    <Link href="/contato?source=navbar">
                        <button className="px-4 sm:px-6 py-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all">
                            Agendar Call
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {menuItems.map((item) => {
                                let href = `/${item.toLowerCase().replace(" ", "-")}`;
                                if (item === "Consultoria") href = "/consultoria";
                                if (item === "Ventures") href = "/venture-building";

                                return (
                                    <Link
                                        key={item}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl font-black uppercase tracking-widest p-4 hover:text-primary transition-colors border-b border-border/50"
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                            <Link href="/contato?source=navbar" onClick={() => setIsOpen(false)}>
                                <button className="w-full py-4 sm:py-6 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest mt-6 sm:mt-8">
                                    Agendar Call
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
