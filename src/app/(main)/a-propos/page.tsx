'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { BookOpen, Coffee, Heart, Users } from 'lucide-react';
import Link from 'next/link';

export default function About() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                {/* Hero Section */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <FadeIn>
                                <h1 className="text-4xl md:text-5xl font-serif mb-6">À Propos</h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-xl text-gray-600">
                                    Découvrez l&apos;histoire et la mission derrière Guérir & Témoigner Ensemble
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <FadeIn direction="right">
                                    <motion.img
                                        src="https://images.pexels.com/photos/5905498/pexels-photo-5905498.jpeg"
                                        alt="Mission illustration"
                                        className="rounded-lg shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </FadeIn>
                                <FadeIn direction="left">
                                    <h2 className="text-3xl font-serif mb-6">Notre Mission</h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        Guérir & Témoigner Ensemble est né d&apos;une conviction profonde : la puissance
                                        transformatrice des mots et du partage. Notre mission est d&apos;offrir un espace
                                        où la guérison rencontre la littérature, où chaque histoire devient un
                                        témoignage d&apos;espoir.
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        À travers nos publications, nous cherchons à toucher les cœurs, à inspirer
                                        les âmes et à accompagner chacun dans son cheminement personnel et spirituel.
                                    </p>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <FadeIn>
                                <h2 className="text-3xl font-serif text-center mb-12">Nos Valeurs</h2>
                            </FadeIn>
                            <div className="grid md:grid-cols-4 gap-8">
                                <FadeIn delay={0.2}>
                                    <motion.div
                                        className="text-center p-6"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BookOpen className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="text-xl font-serif mb-3">Authenticité</h3>
                                        <p className="text-gray-600">
                                            Nous croyons en la puissance des récits authentiques et personnels
                                        </p>
                                    </motion.div>
                                </FadeIn>

                                <FadeIn delay={0.3}>
                                    <motion.div
                                        className="text-center p-6"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Heart className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="text-xl font-serif mb-3">Bienveillance</h3>
                                        <p className="text-gray-600">
                                            Un espace sûr et accueillant pour guérir et temoigner ensemble
                                        </p>
                                    </motion.div>
                                </FadeIn>

                                <FadeIn delay={0.4}>
                                    <motion.div
                                        className="text-center p-6"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Users className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="text-xl font-serif mb-3">Communauté</h3>
                                        <p className="text-gray-600">
                                            Créer des liens et soutenir chacun dans son parcours
                                        </p>
                                    </motion.div>
                                </FadeIn>

                                <FadeIn delay={0.5}>
                                    <motion.div
                                        className="text-center p-6"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Coffee className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="text-xl font-serif mb-3">Partage</h3>
                                        <p className="text-gray-600">
                                            Échanger nos expériences pour enrichir nos perspectives
                                        </p>
                                    </motion.div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <FadeIn direction="right">
                                    <div>
                                        <h2 className="text-3xl font-serif mb-6">Notre Vision</h2>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Nous aspirons à créer un mouvement littéraire qui transcende les frontières
                                            traditionnelles de l&apos;édition. Un espace où la spiritualité contemporaine
                                            rencontre l&apos;authenticité des témoignages personnels.
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            Notre vision est de toucher et transformer des vies à travers des œuvres
                                            qui inspirent, guérissent et élèvent l&apos;âme.
                                        </p>
                                        <Link href="/contact">
                                            <motion.button
                                                className="mt-8 px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Nous Contacter
                                            </motion.button>
                                        </Link>
                                    </div>
                                </FadeIn>
                                <FadeIn direction="left">
                                    <motion.img
                                        src="https://images.pexels.com/photos/5905719/pexels-photo-5905719.jpeg"
                                        alt="Vision illustration"
                                        className="rounded-lg shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AnimatedPage>
    );
} 