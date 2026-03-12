import React, { useState, useEffect } from 'react';
import { NavLink } from '../types';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from './Icons';

interface HeaderProps {
    navLinks: NavLink[];
    activeId: string;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navLinks, activeId, darkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const NavLinksContent = () => (
         <>
            {navLinks.map((link) => (
                <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeId === link.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                    {link.title}
                </a>
            ))}
        </>
    );

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#home" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        Mitra
                    </a>
                    <div className="hidden md:flex items-center space-x-4">
                       <NavLinksContent />
                        <button onClick={toggleDarkMode} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400"/> : <MoonIcon className="w-6 h-6 text-slate-700"/>}
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleDarkMode} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 mr-2">
                             {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400"/> : <MoonIcon className="w-6 h-6 text-slate-700"/>}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                            {isOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden pb-4 px-2 space-y-1">
                     <NavLinksContent />
                </div>
            )}
        </header>
    );
};
