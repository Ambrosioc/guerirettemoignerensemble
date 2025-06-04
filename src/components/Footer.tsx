'use client';

import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FadeIn from './FadeIn';

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        // Vérifier l'état de connexion au chargement
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        checkAuth();

        // Écouter les changements d'état de connexion
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Ne pas afficher le footer si l'utilisateur est connecté
    if (isLoggedIn) return null;

    return (
        <footer className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Contact Column */}
                    <FadeIn delay={0.2}>
                        <div>
                            <h3 className="font-serif text-xl mb-4">Contact</h3>
                            <a
                                href="mailto:merveillegrace-helene@outlook.com"
                                className="text-gray-600 hover:text-[#d4af37] transition-colors"
                            >
                                merveillegrace-helene@outlook.com
                            </a>
                        </div>
                    </FadeIn>

                    {/* Social Media Column */}
                    <FadeIn delay={0.4}>
                        <div>
                            <h3 className="font-serif text-xl mb-4">Suivez-moi</h3>
                            <div className="flex gap-4">
                                <motion.a
                                    href="https://www.instagram.com/merveillegrace_lutete"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Instagram size={24} />
                                    <span className="sr-only">Instagram</span>
                                </motion.a>
                                <motion.a
                                    href="mailto:merveillegrace-helene@outlook.com"
                                    className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Mail size={24} />
                                    <span className="sr-only">Email</span>
                                </motion.a>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Useful Links Column */}
                    <FadeIn delay={0.6}>
                        <div>
                            <h3 className="font-serif text-xl mb-4">Liens utiles</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/a-propos"
                                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                    >
                                        À propos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/mentions-legales"
                                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                    >
                                        Mentions légales
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/politique-de-confidentialite"
                                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                    >
                                        Politique de confidentialité
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>

                {/* Copyright */}
                <FadeIn delay={0.8}>
                    <div className="text-center text-gray-500 text-sm mt-12">
                        © {new Date().getFullYear()} Merveille Grâce LUTETE. Tous droits réservés.
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
} 