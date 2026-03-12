import { useState, useEffect } from 'react';

export const useScrollSpy = (
    elements: (HTMLElement | null)[],
    options: IntersectionObserverInit
): string => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, options);

        elements.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            elements.forEach((element) => {
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [elements, options]);

    return activeId;
};
