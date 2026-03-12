import React from 'react';
import { motion } from 'framer-motion';

interface ContactInfo {
    email: string;
    linkedin: string;
    github: string;
    location: string;
}

interface MinimalContactProps {
    info: ContactInfo;
    onViewResume: () => void;
}

export const MinimalContact: React.FC<MinimalContactProps> = ({ info, onViewResume }) => {
    return (
        <div className="max-w-4xl mx-auto text-center">
            {/* Big CTA */}
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8"
            >
                Let's work together.
            </motion.h3>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto"
            >
                I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll get back to you!
            </motion.p>

            {/* Email - Big and prominent */}
            <motion.a
                href={`mailto:${info.email}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-block text-2xl md:text-3xl font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-12"
                whileHover={{ scale: 1.05 }}
            >
                {info.email}
            </motion.a>

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
                <motion.a
                    href="/Mitra_Ganapaneni_Resume.pdf"
                    download
                    className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Download Resume
                </motion.a>
                <motion.button
                    onClick={onViewResume}
                    className="px-8 py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-full text-lg font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Resume
                </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-8"
            >
                <SocialLink href={info.linkedin} label="LinkedIn" />
                <SocialLink href={info.github} label="GitHub" />
                <span className="text-slate-400 dark:text-slate-600">|</span>
                <span className="text-slate-600 dark:text-slate-400">{info.location}</span>
            </motion.div>
        </div>
    );
};

const SocialLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-lg"
        whileHover={{ y: -2 }}
    >
        {label}
    </motion.a>
);
