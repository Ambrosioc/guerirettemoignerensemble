'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Articles', href: '/admin/posts', icon: '📝' },
    { name: 'Boutique', href: '/admin/boutique', icon: '🛍️' },
    { name: 'Paiements', href: '/admin/payments', icon: '💳' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                    <Link href="/admin" className="text-xl font-bold">
                        Administration
                    </Link>
                </div>
                <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`${isActive
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t bg-white p-4">
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-600"
                >
                    <LogOut className="h-5 w-5" />
                    <div>
                        <p className="text-sm font-medium">Déconnexion</p>
                        <p className="text-xs text-gray-400">Quitter l&apos;administration</p>
                    </div>
                </button>
            </div>
        </div>
    );
} 