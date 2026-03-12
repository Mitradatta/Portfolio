import React, { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isFirst?: boolean;
    className?: string;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
    ({ id, title, children, isFirst = false, className = '' }, ref) => {
        const elementRef = useRef<HTMLDivElement>(null);
        const isInView = useInView(elementRef, { once: true, margin: "-100px" });

        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                },
            },
        };

        const titleVariants = {
            hidden: { opacity: 0, x: -50 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.6,
                    ease: "easeOut",
                },
            },
        };

        const contentVariants = {
            hidden: { opacity: 0, y: 30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    ease: "easeOut",
                },
            },
        };

        return (
            <section
                id={id}
                ref={ref}
                className={`py-16 md:py-24 scroll-mt-20 ${isFirst ? 'pt-0' : ''} ${className}`}
            >
                <motion.div
                    ref={elementRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={titleVariants}
                        className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-8 md:mb-12 relative inline-block"
                    >
                        {title}
                        <span className="text-indigo-500">.</span>
                        <motion.span
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                    </motion.h2>
                    <motion.div
                        variants={contentVariants}
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700/50"
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </section>
        );
    }
);

AnimatedSection.displayName = 'AnimatedSection';
