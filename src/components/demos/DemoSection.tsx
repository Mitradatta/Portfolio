import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitClassifier } from './DigitClassifier';
import { SentimentAnalyzer } from './SentimentAnalyzer';
import { NeuralNetworkViz } from './NeuralNetworkViz';

interface Demo {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    tags: string[];
}

const demos: Demo[] = [
    {
        id: 'digit',
        title: 'Digit Classifier',
        description: 'Draw a digit and watch a CNN classify it in real-time using TensorFlow.js',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        component: <DigitClassifier />,
        tags: ['CNN', 'TensorFlow.js', 'Computer Vision']
    },
    {
        id: 'sentiment',
        title: 'Sentiment Analyzer',
        description: 'Analyze the sentiment of any text with real-time NLP processing',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        component: <SentimentAnalyzer />,
        tags: ['NLP', 'Text Analysis', 'Lexicon-based']
    },
    {
        id: 'neural',
        title: 'Neural Network Playground',
        description: 'Visualize how neural networks process information through layers',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        component: <NeuralNetworkViz />,
        tags: ['Deep Learning', 'Visualization', 'Interactive']
    }
];

export const DemoSection: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<string>(demos[0].id);

    const currentDemo = demos.find(d => d.id === activeDemo);

    return (
        <div className="space-y-8">
            {/* Demo selector */}
            <div className="flex flex-wrap gap-4">
                {demos.map((demo) => (
                    <motion.button
                        key={demo.id}
                        onClick={() => setActiveDemo(demo.id)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                            activeDemo === demo.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {demo.icon}
                        <span className="font-medium">{demo.title}</span>
                    </motion.button>
                ))}
            </div>

            {/* Demo info */}
            <AnimatePresence mode="wait">
                {currentDemo && (
                    <motion.div
                        key={currentDemo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {currentDemo.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                {currentDemo.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {currentDemo.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Demo component */}
                        {currentDemo.component}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info banner */}
            <motion.div
                className="flex items-start gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="flex-shrink-0 p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                        All demos run locally in your browser
                    </h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        These AI/ML demos use TensorFlow.js and client-side processing.
                        No data is sent to any server - everything runs on your device.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
