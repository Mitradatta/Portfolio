import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.3"]
    });

    const words = children.split(' ');

    return (
        <div ref={containerRef} className={className}>
            <p className="flex flex-wrap justify-center md:justify-start gap-x-2 gap-y-1 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return (
                        <Word key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Word>
                    );
                })}
            </p>
        </div>
    );
};

interface WordProps {
    children: string;
    progress: any;
    range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const y = useTransform(progress, range, [20, 0]);

    return (
        <motion.span
            style={{ opacity, y }}
            className="inline-block text-slate-800 dark:text-slate-200"
        >
            {children}
        </motion.span>
    );
};

// Character-by-character reveal for headings
interface CharRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export const CharReveal: React.FC<CharRevealProps> = ({ children, className = '', delay = 0 }) => {
    const chars = children.split('');

    return (
        <span className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.03,
                        ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};
