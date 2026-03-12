import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickySectionProps {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    dark?: boolean;
}

export const StickySection: React.FC<StickySectionProps> = ({
    id,
    title,
    subtitle,
    children,
    dark = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <section
            id={id}
            ref={containerRef}
            className={`relative min-h-screen py-32 ${
                dark
                    ? 'bg-slate-900 text-white'
                    : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    style={{ opacity, y }}
                    className="text-center mb-20"
                >
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-sm uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        {title}
                    </motion.h2>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

// Minimal card for experiences
interface MinimalCardProps {
    title: string;
    subtitle: string;
    period: string;
    points: string[];
    index: number;
}

export const MinimalCard: React.FC<MinimalCardProps> = ({
    title,
    subtitle,
    period,
    points,
    index
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative p-8 md:p-12 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-500">
                {/* Period - top right */}
                <span className="absolute top-8 right-8 text-sm text-slate-400 dark:text-slate-500 font-mono">
                    {period}
                </span>

                {/* Company */}
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {subtitle}
                </h3>

                {/* Role */}
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                    {title}
                </p>

                {/* Points */}
                <ul className="space-y-3">
                    {points.map((point, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                            className="text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l-2 border-slate-200 dark:border-slate-700"
                        >
                            {point}
                        </motion.li>
                    ))}
                </ul>

                {/* Hover indicator */}
                <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-indigo-600 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                />
            </div>
        </motion.div>
    );
};
