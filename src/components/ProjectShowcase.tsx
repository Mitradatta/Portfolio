import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectShowcaseProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, onProjectClick }) => {
    return (
        <div className="space-y-32">
            {projects.map((project, index) => (
                <ProjectItem
                    key={index}
                    project={project}
                    index={index}
                    onClick={() => onProjectClick(project)}
                />
            ))}
        </div>
    );
};

interface ProjectItemProps {
    project: Project;
    index: number;
    onClick: () => void;
}

// Project-specific animated visuals
const ProjectVisual: React.FC<{ index: number; isHovered: boolean }> = ({ index, isHovered }) => {
    // Vision-Based Web Automation Agent
    if (index === 0) {
        return (
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Browser window */}
                <motion.div
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Browser header */}
                    <div className="h-6 bg-slate-100 dark:bg-slate-900 flex items-center gap-1.5 px-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    {/* Content area */}
                    <div className="p-4 space-y-2">
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                        <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded mt-4" />
                    </div>
                </motion.div>

                {/* AI Eye scanning */}
                <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                >
                    <svg className="w-8 h-8 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </motion.div>

                {/* Scanning line */}
                <motion.div
                    className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-slate-600 dark:via-slate-300 to-transparent"
                    initial={{ top: '30%' }}
                    animate={isHovered ? { top: ['30%', '80%', '30%'] } : { top: '30%' }}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
                />

                {/* Click indicator */}
                <motion.div
                    className="absolute bottom-8 right-8"
                    animate={isHovered ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : { scale: 1, opacity: 0.5 }}
                    transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                >
                    <svg className="w-6 h-6 text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.77 17.27l1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83zm4.24-14.14l-2.83 2.83 1.41 1.41 2.83-2.83-1.41-1.41zm4.95 4.95l2.83-2.83-1.41-1.41-2.83 2.83 1.41 1.41zM14 6v8h-4V6h4z"/>
                    </svg>
                </motion.div>
            </div>
        );
    }

    // MoodBoard AI
    if (index === 1) {
        return (
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Grid of mood images */}
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className={`rounded-xl ${
                                i === 0 ? 'bg-gradient-to-br from-pink-300 to-rose-400' :
                                i === 1 ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                                i === 2 ? 'bg-gradient-to-br from-amber-200 to-orange-300' :
                                'bg-gradient-to-br from-sky-300 to-blue-400'
                            }`}
                            animate={isHovered ? {
                                scale: [1, 1.05, 1],
                                rotate: [0, i % 2 === 0 ? 2 : -2, 0]
                            } : { scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                    ))}
                </div>

                {/* Connection nodes */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.line
                            x1="25" y1="25" x2="75" y2="25"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-slate-900 dark:text-white"
                            strokeDasharray="4"
                            animate={isHovered ? { strokeDashoffset: [0, -8] } : { strokeDashoffset: 0 }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.line
                            x1="25" y1="75" x2="75" y2="75"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-slate-900 dark:text-white"
                            strokeDasharray="4"
                            animate={isHovered ? { strokeDashoffset: [0, -8] } : { strokeDashoffset: 0 }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </svg>
                </motion.div>

                {/* AI Brain icon */}
                <motion.div
                    className="absolute -bottom-4 -right-4 w-14 h-14 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
                >
                    <svg className="w-7 h-7 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5Z"/>
                    </svg>
                </motion.div>
            </div>
        );
    }

    // AI Agent Evaluation Framework
    if (index === 2) {
        return (
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* GPU cluster visualization */}
                <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <motion.div
                            key={i}
                            className="bg-slate-800 dark:bg-slate-200 rounded-lg flex items-center justify-center"
                            animate={isHovered ? {
                                opacity: [0.5, 1, 0.5],
                                scale: [0.95, 1, 0.95]
                            } : { opacity: 0.7, scale: 0.95 }}
                            transition={{ duration: 0.8, delay: i * 0.1, repeat: isHovered ? Infinity : 0 }}
                        >
                            <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                <rect x="7" y="7" width="4" height="4" rx="0.5"/>
                                <rect x="13" y="7" width="4" height="4" rx="0.5"/>
                                <rect x="7" y="13" width="4" height="4" rx="0.5"/>
                                <rect x="13" y="13" width="4" height="4" rx="0.5"/>
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* H100 badge */}
                <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                >
                    H100 GPUs
                </motion.div>

                {/* vLLM icon */}
                <motion.div
                    className="absolute -bottom-3 -right-3 w-14 h-14 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
                >
                    <span className="text-white dark:text-slate-900 text-xs font-bold">vLLM</span>
                </motion.div>
            </div>
        );
    }

    // InsightBridge - Document Analysis Tool
    if (index === 3) {
        return (
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Document stack */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                            style={{
                                width: '70%',
                                height: '80%',
                                top: `${10 + i * 4}%`,
                                left: `${15 + i * 3}%`,
                                zIndex: 3 - i,
                            }}
                            animate={isHovered ? {
                                y: [0, -5, 0],
                                rotate: [0, i === 0 ? -2 : i === 1 ? 1 : 2, 0]
                            } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {/* Document lines */}
                            <div className="p-4 space-y-2">
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                            </div>
                        </motion.div>
                    ))}

                    {/* Search/AI icon */}
                    <motion.div
                        className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg z-10"
                        animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                    >
                        <svg className="w-8 h-8 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </motion.div>

                    {/* RAG indicator */}
                    <motion.div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        animate={isHovered ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.7 }}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                        RAG Pipeline
                    </motion.div>
                </div>
            </div>
        );
    }

    // MediQuery - Healthcare Chatbot
    if (index === 4) {
        return (
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Chat interface mockup */}
                <motion.div
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                    animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Chat header */}
                    <div className="h-10 bg-emerald-500 flex items-center px-4">
                        <div className="w-3 h-3 rounded-full bg-white/80" />
                        <span className="ml-2 text-white text-xs font-medium">MediQuery</span>
                    </div>

                    {/* Chat messages */}
                    <div className="p-3 space-y-2">
                        {/* User message */}
                        <motion.div
                            className="flex justify-end"
                            animate={isHovered ? { x: [10, 0] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-lg px-3 py-2 max-w-[80%]">
                                <div className="h-2 bg-emerald-300 dark:bg-emerald-700 rounded w-20" />
                            </div>
                        </motion.div>

                        {/* Bot message */}
                        <motion.div
                            className="flex justify-start"
                            animate={isHovered ? { x: [-10, 0] } : {}}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 max-w-[80%]">
                                <div className="space-y-1">
                                    <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-24" />
                                    <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-16" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Typing indicator */}
                        <motion.div
                            className="flex justify-start"
                            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        >
                            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
                                <div className="flex gap-1">
                                    <motion.span
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={isHovered ? { y: [0, -4, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.span
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={isHovered ? { y: [0, -4, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                                    />
                                    <motion.span
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={isHovered ? { y: [0, -4, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* HIPAA badge */}
                <motion.div
                    className="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                >
                    HIPAA
                </motion.div>

                {/* Health icon */}
                <motion.div
                    className="absolute -bottom-3 -left-3 w-12 h-12 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <svg className="w-6 h-6 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </motion.div>
            </div>
        );
    }

    // Default fallback
    return (
        <motion.div
            className="relative w-32 h-32 md:w-48 md:h-48"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute inset-0 rounded-3xl bg-slate-900 dark:bg-white"
                animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
            />
            <motion.div
                className="absolute inset-4 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center"
                animate={isHovered ? { rotate: -45 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </motion.div>
        </motion.div>
    );
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, onClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
                {/* Image/Visual side */}
                <motion.div
                    style={{ y }}
                    className={`relative group cursor-pointer ${!isEven ? 'md:order-2' : ''}`}
                    onClick={onClick}
                >
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0d0d0d] dark:bg-[#0d0d0d] border border-zinc-800">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Project visual */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {project.image ? (
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain p-4"
                                    animate={isHovered ? { scale: 1.04 } : { scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            ) : (
                                <ProjectVisual index={index} isHovered={isHovered} />
                            )}
                        </div>

                        {/* Tool / origin badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {project.tags.includes('Apple') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 814 1000" fill="currentColor">
                                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49.1 190.5-49.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                                    </svg>
                                    <span className="text-[10px] font-mono font-semibold text-white/90 tracking-widest uppercase">Apple</span>
                                </motion.div>
                            )}
                            {project.tags.includes('Inkscape') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-[#CE5923]/60 backdrop-blur-sm shadow-lg shadow-[#CE5923]/10"
                                >
                                    <svg className="w-3 h-3 text-[#CE5923]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span className="text-[10px] font-mono font-semibold text-[#CE5923] tracking-widest uppercase">Inkscape</span>
                                </motion.div>
                            )}
                        </div>

                        {/* View project button */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="absolute bottom-6 left-6 right-6"
                                >
                                    <div className="px-6 py-3 bg-slate-900 dark:bg-white rounded-full text-center text-sm font-medium text-white dark:text-slate-900 shadow-lg">
                                        View Project
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Content side */}
                <div className={!isEven ? 'md:order-1' : ''}>
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Project number */}

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.slice(0, 4).map((tag, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* View button */}
                        <div className="flex flex-wrap items-center gap-4">
                            <motion.button
                                onClick={onClick}
                                className="group inline-flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white"
                                whileHover={{ x: 10 }}
                            >
                                Learn more
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                            {project.tags.includes('Apple') && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all border border-zinc-200 dark:border-zinc-700"
                                >
                                    <svg className="w-3 h-3" viewBox="0 0 814 1000" fill="currentColor">
                                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49.1 190.5-49.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                                    </svg>
                                    Apple ML Blog ↗
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
