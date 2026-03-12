import React from 'react';
import { Experience } from '../types';
import { BriefcaseIcon } from './Icons';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-700">
            {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-odd:order-1 group-odd:group-hover:translate-x-0.5 group-even:group-hover:-translate-x-0.5 shrink-0 shadow-lg">
                        <BriefcaseIcon className="w-5 h-5"/>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-800 dark:text-white">{exp.role} @ {exp.company}</div>
                            <time className="font-caveat font-medium text-indigo-500 text-sm whitespace-nowrap">{exp.period}</time>
                        </div>
                         <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-500 dark:text-slate-400 text-sm">
                            {exp.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};
