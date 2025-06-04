'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function Shop() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
                <div className="text-center px-4">
                    <FadeIn>
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ShoppingBag className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
                        </motion.div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <motion.h1
                            className="text-4xl font-serif mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Boutique
                        </motion.h1>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <motion.p
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            La boutique sera bientôt disponible. Vous pourrez bientôt commander les ouvrages directement depuis le site.
                        </motion.p>
                    </FadeIn>
                </div>
            </div>
        </AnimatedPage>
    );
} 