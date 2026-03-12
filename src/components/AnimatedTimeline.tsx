import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Experience } from '../types';
import { BriefcaseIcon } from './Icons';

interface AnimatedTimelineProps {
    experiences: Experience[];
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ experiences }) => {
    return (
        <div className="relative">
            {/* Animated vertical line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform md:-translate-x-px" />

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <TimelineItem key={index} experience={exp} index={index} isLeft={index % 2 === 0} />
                ))}
            </div>
        </div>
    );
};

interface TimelineItemProps {
    experience: Experience;
    index: number;
    isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isLeft }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {/* Timeline dot */}
            <motion.div
                className="absolute left-5 md:left-1/2 w-10 h-10 -ml-5 md:-ml-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 bg-indigo-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <BriefcaseIcon className="w-5 h-5 text-white" />
                    </div>
                </div>
            </motion.div>

            {/* Content card */}
            <motion.div
                className={`w-full pl-16 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:pl-0 md:text-right' : 'md:pl-8'}`}
                initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <motion.div
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                >
                    <div className={`flex items-start justify-between gap-4 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className={isLeft ? 'md:text-right' : ''}>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                {experience.role}
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                {experience.company}
                            </p>
                        </div>
                        <motion.span
                            className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-800 dark:text-indigo-300 rounded-full whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                        >
                            {experience.period}
                        </motion.span>
                    </div>

                    <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                        {experience.points.map((point, i) => (
                            <motion.li
                                key={i}
                                className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                            >
                                <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 align-middle" />
                                {point}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
