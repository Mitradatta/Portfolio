import React from 'react';
import { XIcon } from './Icons';

interface ResumeViewerProps {
    url: string;
    onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ url, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Resume Viewer</h2>
                     <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-grow">
                    <iframe src={url} title="Resume Viewer" className="w-full h-full border-none"></iframe>
                </div>
            </div>
        </div>
    );
};
