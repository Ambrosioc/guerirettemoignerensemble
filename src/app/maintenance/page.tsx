'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <FadeIn>
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="inline-block mb-8"
                        >
                            <Wrench className="w-16 h-16 text-[#d4af37]" />
                        </motion.div>
                        <h1 className="text-4xl font-serif mb-6">Site en maintenance</h1>
                        <p className="text-xl text-gray-600">
                            Notre site est temporairement indisponible pour maintenance.
                            <br />
                            Nous serons bientôt de retour !
                        </p>
                    </FadeIn>
                </div>
            </div>
        </AnimatedPage>
    );
} 