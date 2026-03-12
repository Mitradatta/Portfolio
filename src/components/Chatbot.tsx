import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { claudeService } from '../services/claudeService';
import { SparkleIcon, SendIcon, XIcon, UserIcon, LoaderIcon } from './Icons';

const suggestedQuestions = [
    "What's Mitra's experience?",
    "Tell me about the projects",
    "What tech stack is used?",
    "How to contact Mitra?"
];

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const initializeChat = useCallback(async () => {
        if (isInitialized) return;

        setIsLoading(true);
        setMessages([]);
        const initialMessage = await claudeService.initializeChat();
        if (initialMessage) {
            setMessages([initialMessage]);
        }
        setIsInitialized(true);
        setIsLoading(false);
    }, [isInitialized]);

    useEffect(() => {
        if (isOpen && !isInitialized) {
            initializeChat();
        }
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen, initializeChat, isInitialized]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (customMessage?: string) => {
        const messageToSend = customMessage || input.trim();
        if (messageToSend === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: messageToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const stream = claudeService.sendMessageStream(messageToSend);
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        try {
            for await (const chunk of stream) {
                modelResponse = chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error streaming response:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = "Sorry, I encountered an error. Please try again.";
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (question: string) => {
        handleSend(question);
    };

    // Floating button when closed
    if (!isOpen) {
        return (
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 group"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Pulse ring animation */}
                <span className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white animate-ping opacity-20" />

                {/* Main button */}
                <div className="relative bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-full shadow-lg shadow-slate-900/20 dark:shadow-white/20 flex items-center justify-center">
                    <SparkleIcon className="w-7 h-7" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Ask me anything
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-white" />
                </div>
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] h-[calc(100vh-5rem)] max-w-md max-h-[600px] z-50 flex flex-col"
            >
                <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <header className="relative bg-slate-900 dark:bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-slate-900/10 backdrop-blur flex items-center justify-center">
                                    <SparkleIcon className="w-6 h-6 text-white dark:text-slate-900" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-white dark:text-slate-900">AI Assistant</h2>
                                    <p className="text-white/70 dark:text-slate-600 text-xs">Ask about Mitra's portfolio</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-900/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <XIcon className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </header>

                    {/* Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950"
                    >
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                            >
                                {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center shadow-sm">
                                        <SparkleIcon className="w-4 h-4 text-white dark:text-slate-900" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                        msg.role === 'user'
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-md'
                                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-bl-md shadow-sm border border-slate-200 dark:border-slate-800'
                                    }`}
                                >
                                    <div className="text-sm break-words whitespace-pre-wrap leading-relaxed">
                                        {msg.text.split('\n').map((line, i) => {
                                            // Handle bold text
                                            const boldParsed = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                            );
                                            // Handle bullet points
                                            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                return <div key={i} className="ml-2">{boldParsed}</div>;
                                            }
                                            return <div key={i}>{boldParsed}</div>;
                                        })}
                                    </div>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-3"
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center">
                                    <SparkleIcon className="w-4 h-4 text-white dark:text-slate-900" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 rounded-bl-md shadow-sm border border-slate-200 dark:border-slate-800">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Suggested questions (only show at start) */}
                        {messages.length === 1 && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-2"
                            >
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.map((question, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => handleSuggestionClick(question)}
                                            className="text-xs px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {question}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex items-center gap-2"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about experience, projects, skills..."
                                disabled={isLoading}
                                className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:border-transparent text-sm placeholder-slate-400 dark:placeholder-slate-500"
                            />
                            <motion.button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2.5 rounded-xl hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="w-5 h-5 animate-spin" />
                                ) : (
                                    <SendIcon className="w-5 h-5" />
                                )}
                            </motion.button>
                        </form>
                        {/* Tech stack footer */}
                        <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center mt-2">
                            Built with React, TypeScript & Tailwind CSS
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
