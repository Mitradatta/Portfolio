import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
    const elements = [
        { icon: '🧠', delay: 0, x: '10%', y: '20%' },
        { icon: '⚡', delay: 0.5, x: '85%', y: '15%' },
        { icon: '🔧', delay: 1, x: '75%', y: '70%' },
        { icon: '💻', delay: 1.5, x: '15%', y: '75%' },
        { icon: '🚀', delay: 2, x: '50%', y: '10%' },
        { icon: '📊', delay: 2.5, x: '90%', y: '45%' },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((element, index) => (
                <motion.div
                    key={index}
                    className="absolute text-3xl md:text-4xl opacity-20 dark:opacity-10"
                    style={{ left: element.x, top: element.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 6,
                        delay: element.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {element.icon}
                </motion.div>
            ))}
        </div>
    );
};
