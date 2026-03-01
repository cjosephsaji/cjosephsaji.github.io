import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ProgressiveImageProps extends HTMLMotionProps<"img"> {
    src: string;
    alt: string;
    placeholderColor?: string;
    className?: string;
}

export const ProgressiveImage = ({
    src,
    alt,
    placeholderColor = "bg-muted",
    className = "",
    ...props
}: ProgressiveImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden w-full h-full ${placeholderColor}`}>
            {/* Skeleton / Blur Placeholder */}
            <motion.div
                initial={false}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 bg-primary/10 animate-pulse skeleton-shimmer"
            />

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover z-20 ${className}`}
                {...props}
            />
        </div>
    );
};
