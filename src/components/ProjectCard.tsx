import React from 'react';
import { Project } from '../types';
import { GithubIcon, EyeIcon } from './Icons';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="relative">
                <img 
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={`https://picsum.photos/seed/${project.imageSeed}/400/200`} 
                    alt={project.title} 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button
                        onClick={onClick}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-slate-800 font-semibold rounded-lg shadow-md hover:bg-white"
                        aria-label={`View details for ${project.title}`}
                    >
                        <EyeIcon className="w-5 h-5" />
                        View Details
                    </button>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex-shrink-0 ml-4">
                        <GithubIcon className="w-6 h-6"/>
                    </a>
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-grow">
                    {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
