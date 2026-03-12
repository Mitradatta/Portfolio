import React from 'react';
import { Project } from '../types';
import { XIcon, GithubIcon, LightbulbIcon } from './Icons';

interface ProjectDetailModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white dark:bg-slate-900 w-full max-w-4xl h-auto max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-20"
                    aria-label="Close project details"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div className="flex-shrink-0 h-64 w-full overflow-hidden">
                     <img 
                        className="h-full w-full object-cover"
                        src={`https://picsum.photos/seed/${project.imageSeed}/800/400`} 
                        alt={project.title} 
                    />
                </div>

                <div className="flex-grow overflow-y-auto p-6 sm:p-8">
                    <div className="flex justify-between items-start gap-4">
                        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{project.title}</h2>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-slate-800 dark:bg-slate-700 rounded-lg shadow-md hover:bg-slate-900 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all flex-shrink-0">
                            <GithubIcon className="w-5 h-5"/>
                            GitHub
                        </a>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {project.detailedDescription}
                    </p>

                    <div className="mt-8">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <LightbulbIcon className="w-6 h-6 text-yellow-500" />
                            Key Learnings
                        </h3>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                            {project.learnings.map((learning, index) => (
                                <li key={index}>{learning}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
