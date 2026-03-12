import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MinimalNav } from './components/MinimalNav';
import { AppleHero } from './components/AppleHero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ResumeViewer } from './components/ResumeViewer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Chatbot } from './components/Chatbot';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollSpy } from './hooks/useScrollSpy';
import {
    NAV_LINKS,
    ABOUT,
    CURRENTLY_EXPLORING,
    EXPERIENCE,
    PROJECTS,
    SKILLS,
    CONTACT_INFO,
    BLOG_POSTS,
    TYPING_TEXTS,
} from './constants';
import { Project, BlogPost } from './types';

/* ─── Section label helper ─────────────────────────────── */
const SectionLabel: React.FC<{ num: string; text: string }> = ({ num, text }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-4"
    >
        <span className="text-xs font-mono text-cyan-500 dark:text-cyan-500 text-cyan-600">{'// { ' + num + ' }'}</span>
        <div className="h-px flex-1 max-w-[60px] bg-zinc-800 dark:bg-zinc-800 bg-zinc-300" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-600 text-zinc-500">{text}</span>
    </motion.div>
);

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [showResume, setShowResume] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [expandedPost, setExpandedPost] = useState<string | null>(null);

    useSmoothScroll();

    const sectionRefs = [
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
    ];

    const activeId = useScrollSpy(sectionRefs.map(r => r.current), { threshold: 0.3 });

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className="bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">

            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 origin-left z-[100]"
                style={{ scaleX: 0 }}
                initial={{ scaleX: 0 }}
            />

            <MinimalNav
                navLinks={NAV_LINKS}
                activeId={activeId}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode(!darkMode)}
            />

            {/* ── Hero ──────────────────────────────────────────── */}
            <section id="home" ref={sectionRefs[0] as React.RefObject<HTMLElement>}>
                <AppleHero
                    name="Mitra Datta"
                    title="ML & AI Engineer"
                    subtitle="Building intelligent systems at the intersection of LLM infrastructure, distributed inference, and full-stack AI engineering."
                    typingTexts={TYPING_TEXTS}
                />
            </section>

            {/* ── About ─────────────────────────────────────────── */}
            <section
                id="about"
                ref={sectionRefs[1] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-100 dark:bg-zinc-900/50"
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <SectionLabel num="01" text="About" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-8">
                        {/* Bio */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                            >
                                Building AI that ships,{' '}
                                <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">not just impresses.</span>
                            </motion.h2>

                            <div className="space-y-4">
                                {ABOUT.split('\n\n').map((p, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                                    >
                                        {p}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* Currently exploring */}
                        <div className="space-y-3">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-5"
                            >
                                Currently Exploring
                            </motion.p>
                            {CURRENTLY_EXPLORING.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                                            <span className="text-cyan-400 text-xs">✦</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">{item.title}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Experience ────────────────────────────────────── */}
            <section
                id="experience"
                ref={sectionRefs[2] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-50 dark:bg-[#09090b]"
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <SectionLabel num="02" text="Experience" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-14"
                    >
                        Where I've Worked
                    </motion.h2>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

                        <div className="space-y-0">
                            {EXPERIENCE.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                    className="relative pl-8 pb-12 group"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full border-2 border-cyan-500 bg-[#09090b] dark:bg-[#09090b] bg-zinc-50 group-hover:bg-cyan-500 transition-colors duration-300" />

                                    {/* Card */}
                                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{exp.company}</h3>
                                                <p className="text-sm text-cyan-500 dark:text-cyan-400 font-medium">{exp.role}</p>
                                            </div>
                                            <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {exp.points.map((pt, j) => (
                                                <li key={j} className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    <span className="text-cyan-500/60 mt-1.5 flex-shrink-0">▸</span>
                                                    <span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Projects ──────────────────────────────────────── */}
            <section
                id="projects"
                ref={sectionRefs[3] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-100 dark:bg-zinc-900/40"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <SectionLabel num="03" text="Projects" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-14"
                    >
                        Selected Work
                    </motion.h2>

                    <ProjectShowcase projects={PROJECTS} onProjectClick={setSelectedProject} />
                </div>
            </section>

            {/* ── Blog ──────────────────────────────────────────── */}
            <section
                id="blog"
                ref={sectionRefs[4] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-50 dark:bg-[#09090b]"
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <SectionLabel num="04" text="Writing" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-14"
                    >
                        Thoughts & Research
                    </motion.h2>

                    <div className="space-y-4">
                        {BLOG_POSTS.map((post: BlogPost, i: number) => (
                            <motion.article
                                key={post.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                            >
                                <div className="p-6">
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="text-xs font-mono text-zinc-500">{post.date}</span>
                                        <span className="text-zinc-700 dark:text-zinc-700">·</span>
                                        <span className="text-xs font-mono text-zinc-500">{post.readTime}</span>
                                        {post.isTechnical && (
                                            <span className="px-2 py-0.5 text-xs font-bold text-cyan-500 bg-cyan-500/10 rounded-md uppercase tracking-wide font-mono">
                                                Technical
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed mb-4">{post.excerpt}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-0.5 text-xs font-mono text-violet-500 dark:text-violet-400 bg-violet-500/10 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Toggle */}
                                    <button
                                        onClick={() => setExpandedPost(expandedPost === post.title ? null : post.title)}
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-wide"
                                    >
                                        {expandedPost === post.title ? '[ collapse ]' : '[ read more ]'}
                                        <motion.svg animate={{ rotate: expandedPost === post.title ? 180 : 0 }} className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </button>

                                    <AnimatePresence>
                                        {expandedPost === post.title && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-5 mt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                                                    {post.content.split('\n\n').map((para, pi) => (
                                                        <p key={pi} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{para}</p>
                                                    ))}

                                                    {post.formulas && post.formulas.length > 0 && (
                                                        <div className="mt-5 pt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                                                            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Key Formulas</p>
                                                            {post.formulas.map((f, fi) => (
                                                                <div key={fi} className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4">
                                                                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{f.name}</p>
                                                                    <div className="font-mono text-xs text-cyan-500 bg-zinc-100 dark:bg-zinc-900 rounded-lg px-3 py-2 overflow-x-auto mb-1">{f.latex}</div>
                                                                    <p className="text-xs text-zinc-500">{f.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {post.links && post.links.length > 0 && (
                                                        <div className="pt-4 flex flex-wrap gap-2">
                                                            {post.links.map((lnk, li) => (
                                                                <a key={li} href={lnk.url} target="_blank" rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-cyan-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                                                >
                                                                    ↗ {lnk.text}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Skills ────────────────────────────────────────── */}
            <section
                id="skills"
                ref={sectionRefs[5] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-100 dark:bg-zinc-900/40"
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <SectionLabel num="05" text="Skills" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-14"
                    >
                        Tech Stack
                    </motion.h2>

                    <div className="space-y-6">
                        {SKILLS.map((group, gi) => (
                            <motion.div
                                key={gi}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: gi * 0.1 }}
                            >
                                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                                    <span className="text-cyan-500">▸</span> {group.category}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {group.list.map((skill, si) => (
                                        <motion.span
                                            key={si}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: gi * 0.1 + si * 0.04 }}
                                            className="px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-200 cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact ───────────────────────────────────────── */}
            <section
                id="contact"
                ref={sectionRefs[6] as React.RefObject<HTMLElement>}
                className="relative py-28 md:py-36 bg-zinc-50 dark:bg-[#09090b]"
            >
                <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
                    <SectionLabel num="06" text="Contact" />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-tighter mb-4 mt-4"
                    >
                        Let's build{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                            something great.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 mb-10 leading-relaxed"
                    >
                        Open to full-time roles, research collaborations, and interesting problems.
                    </motion.p>

                    {/* Email button */}
                    <motion.a
                        href={`mailto:${CONTACT_INFO.email}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 mb-10"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {CONTACT_INFO.email}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.a>

                    {/* Links row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6 mb-10"
                    >
                        {[
                            { label: 'GitHub', url: CONTACT_INFO.github },
                            { label: 'LinkedIn', url: CONTACT_INFO.linkedin },
                        ].map((l) => (
                            <motion.a
                                key={l.label}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors tracking-wide"
                                whileHover={{ y: -2 }}
                            >
                                {l.label} ↗
                            </motion.a>
                        ))}

                    </motion.div>

                    {/* Resume buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        <a
                            href="/Mitra_Ganapaneni_Resume.pdf"
                            download
                            className="px-6 py-2.5 text-sm font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:border-cyan-500/50 hover:text-cyan-500 transition-all font-mono"
                        >
                            Download Resume
                        </a>
                        <button
                            onClick={() => setShowResume(true)}
                            className="px-6 py-2.5 text-sm font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:border-violet-500/50 hover:text-violet-400 transition-all font-mono"
                        >
                            View Resume
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="py-6 border-t border-zinc-200 dark:border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-700">
                    <span>© {new Date().getFullYear()} Mitra Datta Ganapaneni</span>
                    <span className="text-zinc-700 dark:text-zinc-800">Built with React · TypeScript · Tailwind · Framer Motion</span>
                </div>
            </footer>

            {/* Modals */}
            <AnimatePresence>
                {showResume && <ResumeViewer url="/Mitra_Ganapaneni_Resume.pdf" onClose={() => setShowResume(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>

            <Chatbot />
        </div>
    );
};

export default App;
