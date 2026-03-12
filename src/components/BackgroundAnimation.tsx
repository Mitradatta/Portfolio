import React, { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";

interface BackgroundAnimationProps {
    darkMode: boolean;
}

const BackgroundAnimationComponent: React.FC<BackgroundAnimationProps> = ({ darkMode }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadLinksPreset(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

  const options: ISourceOptions = useMemo(
    () => ({
        // Add this background property
        background: {
            color: {
                // Use slate-50 for light mode, slate-900 for dark mode
                value: darkMode ? '#0f172a' : '#f8fafc',
            },
        },
        preset: "links",
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: darkMode ? "#94a3b8" : "#4f46e5",
            },
            opacity: {
                value: 0.5,
            },
            size: {
                value: { min: 1, max: 3 },
            },
            links: {
                color: darkMode ? "#475569" : "#a5b4fc",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
    }),
    [darkMode],
);

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
            />
        );
    }

    return <></>;
};

export default memo(BackgroundAnimationComponent);
