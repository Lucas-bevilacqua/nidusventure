"use client";

import React, { useMemo } from "react";
import Link from "next/link";

export function MarkdownContent({ content }: { content: string }) {
    const processText = (text: string): (string | React.ReactElement)[] => {
        const parts: (string | React.ReactElement)[] = [];
        let lastIndex = 0;
        
        // Processa links [texto](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let key = 0;
        
        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            const linkText = match[1];
            const linkUrl = match[2];
            parts.push(
                <Link key={`link-${key++}`} href={linkUrl} className="text-primary hover:underline font-bold">
                    {linkText}
                </Link>
            );
            lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        
        // Processa negrito **texto**
        return parts.map((part, i) => {
            if (typeof part === 'string') {
                const boldRegex = /\*\*([^*]+)\*\*/g;
                const result: (string | React.ReactElement)[] = [];
                let textIndex = 0;
                let boldMatch;
                let boldKey = 0;
                
                while ((boldMatch = boldRegex.exec(part)) !== null) {
                    if (boldMatch.index > textIndex) {
                        result.push(part.substring(textIndex, boldMatch.index));
                    }
                    result.push(
                        <strong key={`bold-${i}-${boldKey++}`} className="text-white font-bold">
                            {boldMatch[1]}
                        </strong>
                    );
                    textIndex = boldMatch.index + boldMatch[0].length;
                }
                
                if (textIndex < part.length) {
                    result.push(part.substring(textIndex));
                }
                
                return result.length === 1 && typeof result[0] === 'string' ? result[0] : <span key={`span-${i}`}>{result}</span>;
            }
            return part;
        });
    };

    const lines = useMemo(() => content.trim().split('\n'), [content]);
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            const text = currentParagraph.join(' ').trim();
            if (text) {
                elements.push(
                    <p key={`p-${elements.length}`} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 break-words">
                        {processText(text)}
                    </p>
                );
            }
            currentParagraph = [];
        }
    };

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-none space-y-3 mb-6 pl-0">
                    {listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-2 shrink-0">•</span>
                            <span className="break-words">{processText(item.trim())}</span>
                        </li>
                    ))}
                </ul>
            );
            listItems = [];
        }
        inList = false;
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('# ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h1 key={`h1-${index}`} className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 mt-12 break-words">
                    {trimmed.substring(2)}
                </h1>
            );
        } else if (trimmed.startsWith('## ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-6 mt-10 break-words text-primary">
                    {trimmed.substring(3)}
                </h2>
            );
        } else if (trimmed.startsWith('### ')) {
            flushParagraph();
            flushList();
            elements.push(
                <h3 key={`h3-${index}`} className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 mt-8 break-words">
                    {trimmed.substring(4)}
                </h3>
            );
        } else if (trimmed.startsWith('- ')) {
            flushParagraph();
            if (!inList) inList = true;
            listItems.push(trimmed.substring(2));
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
            flushParagraph();
            flushList();
            const text = trimmed.replace(/\*\*/g, '');
            elements.push(
                <p key={`strong-${index}`} className="text-lg sm:text-xl font-bold text-white mb-6 break-words">
                    {processText(text)}
                </p>
            );
        } else if (trimmed === '') {
            flushParagraph();
            flushList();
        } else {
            if (inList) flushList();
            currentParagraph.push(trimmed);
        }
    });

    flushParagraph();
    flushList();

    return <div className="space-y-4">{elements}</div>;
}
