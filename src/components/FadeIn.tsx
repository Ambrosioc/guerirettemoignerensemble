'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: 'left' | 'right';
}

export default function FadeIn({ children, delay = 0, direction }: FadeInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
                y: !direction ? 20 : 0
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: 'easeOut'
            }}
        >
            {children}
        </motion.div>
    );
} 