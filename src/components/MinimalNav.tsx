import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from '../types';

interface MinimalNavProps {
    navLinks: NavLink[];
    activeId: string;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const MinimalNav: React.FC<MinimalNavProps> = ({ navLinks, activeId, darkMode, toggleDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
            >
                <div className={`flex items-center gap-1 px-3 py-2 rounded-2xl border transition-all duration-300 ${
                    scrolled
                        ? 'bg-zinc-900/95 border-zinc-700/60 backdrop-blur-xl shadow-2xl shadow-black/40'
                        : 'bg-zinc-900/75 border-zinc-800/40 backdrop-blur-lg'
                } dark:bg-zinc-900/95 dark:border-zinc-700/60 bg-white/90 border-zinc-200/80`}>

                    {/* Logo */}
                    <motion.a href="#home" className="mr-2 px-2 py-1 flex items-center" whileHover={{ scale: 1.05 }}>
                        <span className="text-sm font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent tracking-wider font-mono">
                            MDG
                        </span>
                    </motion.a>

                    <div className="w-px h-4 bg-zinc-700 dark:bg-zinc-700 bg-zinc-300 mx-1" />

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.id}
                                href={`#${link.id}`}
                                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                    activeId === link.id
                                        ? 'text-zinc-100 dark:text-zinc-100 text-zinc-900'
                                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-200 dark:hover:text-zinc-200 hover:text-zinc-700'
                                }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                {activeId === link.id && (
                                    <motion.div
                                        layoutId="navActive"
                                        className="absolute inset-0 bg-zinc-700/70 dark:bg-zinc-700/70 bg-zinc-100 rounded-lg"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{link.title}</span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:block w-px h-4 bg-zinc-700 dark:bg-zinc-700 bg-zinc-300 mx-1" />

                    {/* Theme */}
                    <motion.button
                        onClick={toggleDarkMode}
                        className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-zinc-200 dark:hover:text-zinc-200 hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                        title="Toggle theme"
                    >
                        {darkMode ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </motion.button>

                    {/* Mobile burger */}
                    <motion.button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors ml-1"
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="w-4 h-3 flex flex-col justify-between">
                            <motion.span className="block w-full h-0.5 bg-current rounded" animate={menuOpen ? { rotate: 45, y: 5.5 } : {}} />
                            <motion.span className="block w-full h-0.5 bg-current rounded" animate={menuOpen ? { opacity: 0 } : {}} />
                            <motion.span className="block w-full h-0.5 bg-current rounded" animate={menuOpen ? { rotate: -45, y: -5.5 } : {}} />
                        </div>
                    </motion.button>
                </div>
            </motion.div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-5"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className={`text-2xl font-semibold tracking-tight ${
                                    activeId === link.id ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-100'
                                } transition-colors`}
                            >
                                {link.title}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
