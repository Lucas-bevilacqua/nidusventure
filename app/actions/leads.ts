"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";

const leadSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
    source: z.string().default("contato"),
});

export async function createLead(formData: { name: string; email: string; message: string; source?: string }) {
    try {
        // Validation
        const validatedFields = leadSchema.parse(formData);

        // Ensure table exists (simplified for this demo, usually done via migrations)
        await sql`
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                source TEXT NOT NULL DEFAULT 'contato',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Add source column if it doesn't exist (for existing tables)
        await sql`
            ALTER TABLE leads 
            ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'contato';
        `;

        // Insert lead
        await sql`
            INSERT INTO leads (name, email, message, source)
            VALUES (${validatedFields.name}, ${validatedFields.email}, ${validatedFields.message}, ${validatedFields.source});
        `;

        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        return { success: false, error: "Falha ao enviar mensagem. Tente novamente mais tarde." };
    }
}
