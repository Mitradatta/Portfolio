import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

interface SkillsGridProps {
    skills: Skill[];
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {skills.map((skill, categoryIndex) => (
                <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                    className="relative"
                >
                    {/* Category header */}
                    <h3 className="text-sm uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-8 font-medium">
                        {skill.category}
                    </h3>

                    {/* Skills list */}
                    <div className="space-y-4">
                        {skill.list.map((item, itemIndex) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + itemIndex * 0.05 }}
                                className="group flex items-center gap-4"
                            >
                                {/* Dot indicator */}
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"
                                    whileHover={{ scale: 1.5 }}
                                />

                                {/* Skill name */}
                                <span className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Horizontal scrolling skills marquee
interface SkillsMarqueeProps {
    skills: string[];
}

export const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({ skills }) => {
    return (
        <div className="relative overflow-hidden py-8">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: [0, -2000] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[...skills, ...skills, ...skills].map((skill, i) => (
                    <span
                        key={i}
                        className="text-6xl md:text-8xl font-bold text-slate-100 dark:text-slate-900"
                    >
                        {skill}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
