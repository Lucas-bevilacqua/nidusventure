"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";

export default function ContatoPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                <Contact />
            </div>
        </main>
    );
}
