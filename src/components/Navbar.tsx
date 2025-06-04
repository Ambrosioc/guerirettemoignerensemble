'use client';

import { createClient } from '@/lib/supabase/client';
import { Menu, X } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const [navLinks, setNavLinks] = useState([
        { path: '/', label: 'Accueil' },
        { path: '/biography', label: 'Biographie' },
        { path: '/Oeuvres', label: 'Oeuvres' },
        { path: '/contact', label: 'Contact' },
        { path: '/shop', label: 'Boutique' },
        { path: '/blog', label: 'Blog' },
    ]);

    useEffect(() => {
        const supabase = createClient();

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setNavLinks([
                    { path: '/shop', label: 'Boutique' },
                    { path: '/blog', label: 'Blog' },
                ]);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setNavLinks([
                    { path: '/shop', label: 'Boutique' },
                    { path: '/blog', label: 'Blog' },
                ]);
            } else {
                setNavLinks([
                    { path: '/', label: 'Accueil' },
                    { path: '/biography', label: 'Biographie' },
                    { path: '/oeuvres', label: 'Oeuvres' },
                    { path: '/contact', label: 'Contact' },
                    { path: '/shop', label: 'Boutique' },
                    { path: '/blog', label: 'Blog' },
                ]);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <nav className="fixed w-full z-50 bg-[#faf7f2]/90 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/logo.png"
                                alt="Logo Guérir & Témoigner Ensemble"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <span className={`${playfair.className} text-xl md:text-2xl text-gray-900`}>
                                Guérir & Témoigner Ensemble
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors relative group ${isActive(link.path)
                                    ? 'text-[#d4af37]'
                                    : 'text-gray-700 hover:text-[#d4af37]'
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''
                                        }`}
                                />
                                {link.path === '/shop' && (
                                    <span className="absolute -top-3 -right-3 text-xs text-[#d4af37]">
                                        bientôt
                                    </span>
                                )}
                            </Link>
                        ))}
                        <Link
                            href="/newsletter"
                            className="px-4 py-2 text-sm font-medium text-[#d4af37] border border-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-white transition-colors"
                        >
                            Newsletter
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-[#d4af37] transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden absolute w-full bg-[#faf7f2] shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 text-base font-medium ${isActive(link.path) ? 'text-[#d4af37]' : 'text-gray-700'
                                }`}
                        >
                            {link.label}
                            {link.path === '/shop' && (
                                <span className="ml-2 text-xs text-[#d4af37]">bientôt</span>
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/newsletter"
                        className="block w-full mt-4 px-4 py-2 text-sm font-medium text-[#d4af37] border border-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-white transition-colors text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Newsletter
                    </Link>
                </div>
            </div>
        </nav>
    );
} 