import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SentimentResult {
    label: string;
    score: number;
    emoji: string;
}

// Simple rule-based sentiment analysis (runs entirely client-side)
const analyzeSentiment = (text: string): SentimentResult => {
    const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome',
        'love', 'happy', 'joy', 'excited', 'beautiful', 'best', 'brilliant', 'perfect',
        'outstanding', 'incredible', 'superb', 'delightful', 'pleasant', 'positive',
        'success', 'win', 'winner', 'accomplish', 'achieve', 'impressive', 'remarkable',
        'thank', 'thanks', 'grateful', 'appreciate', 'glad', 'pleased', 'enjoy'
    ];

    const negativeWords = [
        'bad', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'sad', 'angry',
        'disappointed', 'frustrating', 'annoying', 'poor', 'ugly', 'fail', 'failure',
        'boring', 'dull', 'waste', 'wrong', 'problem', 'issue', 'broken', 'useless',
        'stupid', 'dumb', 'pathetic', 'disgusting', 'miserable', 'unhappy', 'upset'
    ];

    const intensifiers = ['very', 'really', 'extremely', 'incredibly', 'absolutely', 'totally'];
    const negations = ['not', "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", 'never', 'no'];

    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    let intensity = 1;
    let negated = false;

    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[^a-z]/g, '');

        // Check for intensifiers
        if (intensifiers.includes(word)) {
            intensity = 1.5;
            continue;
        }

        // Check for negations
        if (negations.includes(word) || words[i].includes("n't")) {
            negated = true;
            continue;
        }

        // Check sentiment words
        if (positiveWords.includes(word)) {
            score += (negated ? -1 : 1) * intensity;
        } else if (negativeWords.includes(word)) {
            score += (negated ? 1 : -1) * intensity;
        }

        // Reset modifiers
        intensity = 1;
        negated = false;
    }

    // Normalize score to -1 to 1 range
    const normalizedScore = Math.max(-1, Math.min(1, score / Math.max(words.length * 0.3, 1)));

    if (normalizedScore > 0.2) {
        return {
            label: 'Positive',
            score: normalizedScore,
            emoji: normalizedScore > 0.5 ? '😄' : '🙂'
        };
    } else if (normalizedScore < -0.2) {
        return {
            label: 'Negative',
            score: normalizedScore,
            emoji: normalizedScore < -0.5 ? '😢' : '😕'
        };
    } else {
        return {
            label: 'Neutral',
            score: normalizedScore,
            emoji: '😐'
        };
    }
};

// Keyword extraction
const extractKeywords = (text: string): string[] => {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
        'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
        'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
        'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what',
        'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every',
        'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
        'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just'
    ]);

    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
        if (!stopWords.has(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });

    return Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);
};

export const SentimentAnalyzer: React.FC = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [wordCount, setWordCount] = useState(0);

    const analyze = useCallback(() => {
        if (text.trim().length === 0) {
            setResult(null);
            setKeywords([]);
            return;
        }

        const sentiment = analyzeSentiment(text);
        const extractedKeywords = extractKeywords(text);
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);

        setResult(sentiment);
        setKeywords(extractedKeywords);
        setWordCount(words.length);
    }, [text]);

    useEffect(() => {
        const timer = setTimeout(analyze, 300);
        return () => clearTimeout(timer);
    }, [text, analyze]);

    const exampleTexts = [
        "I absolutely love this product! It's amazing and works perfectly.",
        "This is the worst experience I've ever had. Totally disappointed.",
        "The weather today is okay, nothing special happening.",
        "The new AI features are incredibly impressive and game-changing!"
    ];

    const getSentimentColor = () => {
        if (!result) return 'bg-slate-200 dark:bg-slate-700';
        if (result.label === 'Positive') return 'bg-green-500';
        if (result.label === 'Negative') return 'bg-red-500';
        return 'bg-yellow-500';
    };

    const getSentimentBarWidth = () => {
        if (!result) return 50;
        return 50 + (result.score * 50);
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
                {/* Text input */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Enter text to analyze
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste some text here to analyze its sentiment..."
                        className="w-full h-32 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{wordCount} words</span>
                        <span>{text.length} characters</span>
                    </div>
                </div>

                {/* Example texts */}
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Try an example:</p>
                    <div className="flex flex-wrap gap-2">
                        {exampleTexts.map((example, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setText(example)}
                                className="text-xs px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors truncate max-w-[200px]"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {example.slice(0, 30)}...
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Main result */}
                            <div className="flex items-center gap-6">
                                <motion.div
                                    className="text-6xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {result.emoji}
                                </motion.div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {result.label}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Confidence: {Math.abs(result.score * 100).toFixed(0)}%
                                    </p>
                                </div>
                            </div>

                            {/* Sentiment bar */}
                            <div>
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                                    <span>Negative</span>
                                    <span>Neutral</span>
                                    <span>Positive</span>
                                </div>
                                <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-slate-300"
                                        initial={{ left: '50%' }}
                                        animate={{ left: `${getSentimentBarWidth()}%` }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        style={{ marginLeft: '-8px' }}
                                    />
                                </div>
                            </div>

                            {/* Keywords */}
                            {keywords.length > 0 && (
                                <div>
                                    <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Key Terms
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {keywords.map((keyword, index) => (
                                            <motion.span
                                                key={keyword}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                                            >
                                                {keyword}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
                * This demo uses a rule-based NLP approach running entirely in your browser.
                It analyzes sentiment using lexicon matching and contextual modifiers.
            </p>
        </div>
    );
};
