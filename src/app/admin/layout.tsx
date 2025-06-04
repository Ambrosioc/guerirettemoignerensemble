'use client';

import Sidebar from '@/components/admin/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!loading && !session && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [session, loading, router, isLoginPage]);

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
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-shrink-0 lg:block">
                <Sidebar />
            </aside>

            {/* Mobile sidebar - TODO: Add mobile menu button and drawer */}
            <div className="lg:hidden">
                {/* We'll add mobile navigation here */}
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-[#faf7f2] px-4 py-8">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
} 