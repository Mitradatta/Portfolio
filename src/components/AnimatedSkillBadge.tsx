import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Skill } from '../types';

interface AnimatedSkillBadgeProps {
    skill: Skill;
    index: number;
}

const skillColors: Record<string, string> = {
    'Languages': 'from-blue-500 to-cyan-500',
    'Frameworks & Libraries': 'from-purple-500 to-pink-500',
    'GPU/Distributed Computing': 'from-orange-500 to-red-500',
    'Cloud & DevOps': 'from-green-500 to-emerald-500',
    'Technologies & Interests': 'from-indigo-500 to-violet-500',
};

export const AnimatedSkillBadge: React.FC<AnimatedSkillBadgeProps> = ({ skill, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const gradient = skillColors[skill.category] || 'from-indigo-500 to-purple-500';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${gradient}`} />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{skill.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skill.list.map((item, itemIndex) => (
                    <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1 + itemIndex * 0.05,
                            type: "spring",
                            stiffness: 200,
                        }}
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                        className={`relative group cursor-default px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm overflow-hidden`}
                    >
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            {item}
                        </span>
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};
