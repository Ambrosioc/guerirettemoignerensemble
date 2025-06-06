'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Articles', href: '/admin/posts', icon: '📝' },
    { name: 'Boutique', href: '/admin/boutique', icon: '🛍️' },
    { name: 'Paiements', href: '/admin/payments', icon: '💳' },
];

interface SidebarProps {
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const handleLinkClick = () => {
        // Fermer la sidebar mobile quand on clique sur un lien
        if (onMobileClose) {
            onMobileClose();
        }
    };

    // Fermer la sidebar mobile quand on appuie sur Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileOpen && onMobileClose) {
                onMobileClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileOpen, onMobileClose]);

    // Empêcher le scroll du body quand la sidebar mobile est ouverte
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    return (
        <>
            {/* Overlay pour mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex min-h-0 flex-1 flex-col">
                    {/* Header avec bouton de fermeture mobile */}
                    <div className="flex items-center justify-between p-4 lg:justify-center">
                        <Link href="/admin" className="text-xl font-bold" onClick={handleLinkClick}>
                            Administration
                        </Link>
                        {/* Bouton de fermeture visible uniquement sur mobile */}
                        <button
                            onClick={onMobileClose}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d4af37]"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className={`${isActive
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Footer avec déconnexion */}
                    <div className="sticky inset-x-0 bottom-0 border-t bg-white p-4">
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-600 hover:bg-gray-50"
                        >
                            <LogOut className="h-5 w-5" />
                            <div className="text-left">
                                <p className="text-sm font-medium">Déconnexion</p>
                                <p className="text-xs text-gray-400">Quitter l&apos;administration</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Composant pour le bouton d'ouverture mobile
export function MobileSidebarButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
            <Menu className="h-6 w-6" />
        </button>
    );
}