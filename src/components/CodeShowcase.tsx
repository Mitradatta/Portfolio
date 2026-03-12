import React, { useState } from 'react';
import { CodeSnippet } from '../types';
import { CodeBracketIcon } from './Icons';

interface CodeShowcaseProps {
    snippets: CodeSnippet[];
}

const LanguageIcon: React.FC<{ language: 'Python' | 'TypeScript' }> = ({ language }) => {
    const styles = {
        Python: "bg-blue-200 text-blue-800",
        TypeScript: "bg-sky-200 text-sky-800"
    };
    return (
        <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${styles[language]}`}>
            {language === 'Python' ? 'Py' : 'Ts'}
        </span>
    );
}

export const CodeShowcase: React.FC<CodeShowcaseProps> = ({ snippets }) => {
    const [activeTab, setActiveTab] = useState(0);
    const activeSnippet = snippets[activeTab];

    return (
        <div className="bg-slate-800 rounded-xl shadow-lg w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-900/70 p-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-400 text-sm font-mono flex items-center gap-2">
                    <CodeBracketIcon className="w-5 h-5"/>
                    <span>{activeSnippet.title}</span>
                </div>
                 <div></div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
                {snippets.map((snippet, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === index
                                ? 'bg-slate-800 text-white border-b-2 border-indigo-500'
                                : 'text-slate-400 hover:bg-slate-700/50'
                        }`}
                    >
                        <LanguageIcon language={snippet.language} />
                        {snippet.language}
                    </button>
                ))}
            </div>

            {/* Code */}
            <div className="p-4 bg-slate-800 text-sm text-slate-200 font-mono overflow-x-auto">
                <pre><code>{activeSnippet.code.trim()}</code></pre>
            </div>
        </div>
    );
};
