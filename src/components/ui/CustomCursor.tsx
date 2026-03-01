import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleElementHover = () => setIsHovering(true);
        const handleElementLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleElementHover);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleElementHover);
                el.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [isVisible]);

    // Don't render on mobile or touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Main small dot cursor */}
                    <motion.div
                        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                        animate={{
                            x: mousePosition.x - 6,
                            y: mousePosition.y - 6,
                            scale: isHovering ? 0 : 1,
                        }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 400,
                            mass: 0.5,
                        }}
                    />

                    {/* Trailing ring cursor */}
                    <motion.div
                        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center backdrop-blur-[1px]"
                        animate={{
                            x: mousePosition.x - 20,
                            y: mousePosition.y - 20,
                            scale: isHovering ? 1.5 : 1,
                            backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
                        }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 250,
                            mass: 0.8,
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
};
