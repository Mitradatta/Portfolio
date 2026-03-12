import React, { forwardRef, useRef, useEffect, useState } from 'react';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isFirst?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ id, title, children, isFirst = false }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <section id={id} ref={ref} className={`py-16 md:py-24 scroll-mt-20 ${isFirst ? 'pt-0' : ''}`}>
            <div
                ref={elementRef}
                className={`transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-8 md:mb-12">
                    {title}
                    <span className="text-indigo-500">.</span>
                </h2>
                <div className="bg-white dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700/50">
                    {children}
                </div>
            </div>
        </section>
    );
});
