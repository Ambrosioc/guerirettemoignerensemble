'use client';

import Sidebar, { MobileSidebarButton } from '@/components/admin/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !session && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [session, loading, router, isLoginPage]);

    // Fermer la sidebar mobile quand on change de page
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    // Si on est sur la page de login, on n'affiche pas la sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Pour toutes les autres pages admin, on affiche la sidebar
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Bouton d'ouverture mobile */}
            <MobileSidebarButton onClick={() => setIsMobileSidebarOpen(true)} />

            {/* Sidebar */}
            <Sidebar 
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-[#faf7f2] px-4 py-8 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Ajouter un padding-top sur mobile pour éviter que le contenu soit caché par le bouton */}
                    <div className="pt-16 lg:pt-0">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}