"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export function WhatsAppCTA() {
    return (
        <motion.a
            href="https://wa.me/5511999999999" // TODO: Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.5)] transition-all flex items-center justify-center border-2 border-white/20 group"
        >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity max-md:hidden pointer-events-none">
                Falar no WhatsApp
            </span>
        </motion.a>
    );
}
