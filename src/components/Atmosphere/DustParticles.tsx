import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    size: number;
    top: string;
    left: string;
    duration: number;
    delay: number;
    floatX: number;
    floatY: number;
    opacity: number;
}

const DustParticles: React.FC = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 10,
            floatX: (Math.random() - 0.5) * 200,
            floatY: (Math.random() - 0.5) * 200,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="dust-particle"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: p.top,
                        left: p.left,
                        '--float-duration': `${p.duration}s`,
                        '--float-x': `${p.floatX}px`,
                        '--float-y': `${p.floatY}px`,
                        '--max-opacity': p.opacity,
                        animationDelay: `${p.delay}s`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export default DustParticles;
