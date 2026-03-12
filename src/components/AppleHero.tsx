import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeWriter } from './TypeWriter';

interface AppleHeroProps {
    name: string;
    title: string;
    subtitle: string;
    typingTexts?: string[];
}

export const AppleHero: React.FC<AppleHeroProps> = ({ name, subtitle, typingTexts = [] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ');

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#09090b] dark:bg-[#09090b] bg-zinc-50">

            {/* Line grid */}
            <div className="absolute inset-0 dark:opacity-[0.045] opacity-[0.07]" style={{
                backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
                backgroundSize: '64px 64px',
            }} />

            {/* Radial glow top-left */}
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20 dark:opacity-20 opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 65%)' }} />

            {/* Radial glow bottom-right */}
            <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full dark:opacity-15 opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)' }} />

            {/* Noise vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b] dark:to-[#09090b] to-zinc-50/80 pointer-events-none" />

            <motion.div
                style={{ y: yContent, opacity: opacityContent }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

                    {/* LEFT: Main content */}
                    <div>
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-cyan-500/25 bg-cyan-500/8 dark:bg-cyan-500/8 bg-cyan-50"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-xs text-cyan-500 dark:text-cyan-400 font-medium tracking-wide font-mono">Open to opportunities</span>
                        </motion.div>

                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                        >
                            <h1 className="font-black tracking-tighter leading-[0.88] mb-6" style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}>
                                <span className="block text-zinc-100 dark:text-zinc-100 text-zinc-900">{firstName}</span>
                                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                                    {lastName}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Typewriter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="flex items-center gap-3 mb-5"
                        >
                            <div className="h-px w-8 bg-zinc-700 dark:bg-zinc-700 bg-zinc-300" />
                            {typingTexts.length > 0 ? (
                                <TypeWriter
                                    texts={typingTexts}
                                    className="text-xs font-mono text-zinc-500 dark:text-zinc-500 tracking-[0.2em] uppercase"
                                />
                            ) : (
                                <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase">AI Engineer</span>
                            )}
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.75 }}
                            className="text-base text-zinc-500 dark:text-zinc-500 max-w-md mb-9 leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-3 mb-10"
                        >
                            <a href="#projects"
                                className="group relative px-6 py-2.5 text-sm font-semibold rounded-lg text-white overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg" />
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative">View My Work →</span>
                            </a>
                            <a href="#contact"
                                className="px-6 py-2.5 text-sm font-semibold rounded-lg text-zinc-400 dark:text-zinc-400 text-zinc-600 border border-zinc-700 dark:border-zinc-700 border-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
                            >
                                Get In Touch
                            </a>
                        </motion.div>

                        {/* Social row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.05 }}
                            className="flex items-center gap-5"
                        >
                            {[
                                { label: 'GitHub', url: 'https://github.com/Mitradatta' },
                                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mitradatta' },
                                { label: 'Email', url: 'mailto:gmitradatta2001@gmail.com' },
                            ].map((link) => (
                                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                                    className="text-xs font-mono text-zinc-600 dark:text-zinc-600 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors tracking-wide uppercase"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: Stats card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hidden lg:flex flex-col gap-3 min-w-[200px]"
                    >
                        {[
                            { val: '3.93', label: 'GPA @ UMass', accent: 'cyan' },
                            { val: '12×', label: 'Latency Reduction', accent: 'violet' },
                            { val: '84%', label: 'LLM Cost Reduction', accent: 'cyan' },
                            { val: '1K+', label: 'Code Reviews', accent: 'violet' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                                className="p-4 rounded-xl border border-zinc-800 dark:border-zinc-800 border-zinc-200 bg-zinc-900/60 dark:bg-zinc-900/60 bg-white/60 backdrop-blur-sm"
                            >
                                <div className={`text-2xl font-black mb-0.5 ${s.accent === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}>
                                    {s.val}
                                </div>
                                <div className="text-xs text-zinc-500 font-mono">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-1.5">
                    <span className="text-[9px] text-zinc-700 uppercase tracking-[0.35em] font-mono">scroll</span>
                    <div className="w-px h-7 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
};
