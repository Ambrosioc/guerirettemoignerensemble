'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Biography() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2]">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center" style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg")',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(250, 247, 242, 0.8)'
                }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf7f2]"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <FadeIn>
                            <h1 className="text-4xl md:text-6xl font-serif mb-6">Biographie</h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="flex justify-center gap-6 text-gray-700">
                                <motion.div
                                    className="flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Calendar size={20} />
                                    <span>Née le 10 avril 1992</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <MapPin size={20} />
                                    <span>Paris, France</span>
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Biography Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                {/* Author Portrait */}
                                <FadeIn>
                                    <motion.div
                                        className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-4"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src="/4F851CC6-7176-434F-A2CE-3DFDC5735445.JPG"
                                            alt="Portrait de Merveille Grâce LUTETE"
                                            width={800}
                                            height={1000}
                                            className="rounded-xl"
                                        />
                                    </motion.div>
                                </FadeIn>

                                {/* Introduction */}
                                <FadeIn delay={0.2}>
                                    <div className="flex flex-col justify-center h-full">
                                        <div className="mb-8">
                                            <motion.div
                                                className="flex items-center gap-2 text-[#d4af37] mb-4"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <BookOpen size={24} />
                                                <span className="font-serif text-xl">Auteure & Éditrice</span>
                                            </motion.div>
                                            <p className="text-xl italic text-gray-600">
                                                &ldquo;L&apos;écriture est devenue ma maison, mon abri, ma thérapie.&rdquo;
                                            </p>
                                        </div>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            Issue d&apos;une famille congolaise originaire de Kinshasa, Merveille Grâce LUTETE est la quatrième
                                            d&apos;une fratrie de cinq enfants. Dès son plus jeune âge, elle se distingue par sa vivacité
                                            d&apos;esprit et sa profonde ouverture au monde.
                                        </p>
                                    </div>
                                </FadeIn>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <FadeIn delay={0.3}>
                                    <p>
                                        Elle s&apos;attèle alors à écrire, consignant sur papier les événements, les situations
                                        rencontrées et les émotions qui l&apos;habitent. Elle débute par la poésie et les chants,
                                        puis évolue naturellement vers l&apos;écriture de récits, de mémoires et de chroniques,
                                        inspirés de son environnement.
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.4}>
                                    <h2 className="font-serif">Une Vocation Qui Prend Forme</h2>
                                    <p>
                                        Ses thèmes de prédilection gravitent autour de la condition humaine, la quête de sens,
                                        et le rôle de l&apos;humain sur terre, une exploration qui fait vibrer son âme. En 2019,
                                        elle franchit une étape décisive en publiant son premier ouvrage : Perplexité Humaine,
                                        un livre à la croisée du développement personnel, de la réflexion existentielle et de
                                        la philosophie quotidienne.
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.5}>
                                    <h2 className="font-serif">L&apos;Écriture Comme Thérapie</h2>
                                    <p>
                                        Très vite, elle réalise que les mots sont devenus sa maison, son abri, mais aussi sa
                                        thérapie. L&apos;écriture n&apos;est plus un simple exutoire : c&apos;est un moyen de guérison. Elle
                                        souhaite dès lors devenir un canal de réconfort et d&apos;espoir pour celles et ceux qui
                                        cherchent la paix intérieure.
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.6}>
                                    <h2 className="font-serif">Une Quête d&apos;Excellence</h2>
                                    <p>
                                        Dans cette optique d&apos;amélioration continue, elle décide de se former pour mieux maîtriser
                                        la langue française, et affiner sa plume. Cette démarche témoigne de son engagement à
                                        offrir le meilleur à ses lecteurs.
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.7}>
                                    <div className="my-12 text-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href="/contact"
                                                className="inline-block px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors"
                                            >
                                                Contactez l&apos;auteure
                                            </Link>
                                        </motion.div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AnimatedPage>
    );
} 