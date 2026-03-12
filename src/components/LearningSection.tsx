import React from 'react';
import { LearningItem } from '../types';
import { LightbulbIcon } from './Icons';

interface LearningSectionProps {
    items: LearningItem[];
}

export const LearningSection: React.FC<LearningSectionProps> = ({ items }) => {
    return (
        <div className="mt-12 col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">What I'm Actively Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800/80 p-6 rounded-lg border border-slate-200 dark:border-slate-700/50 transform transition-transform hover:scale-105">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                                <LightbulbIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400"/>
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white">{item.title}</h4>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
