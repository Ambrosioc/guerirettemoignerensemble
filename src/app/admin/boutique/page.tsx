'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductsList from './ProductsList';

export default function BoutiquePage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-gray-900">Boutique</h1>
                    <p className="text-gray-500">Gérez vos produits et vos ventes</p>
                </div>
                <Button
                    onClick={() => router.push('/admin/boutique/new')}
                    className="gap-2 bg-[#d4af37] hover:bg-[#d4af37]/90"
                >
                    <Plus className="h-4 w-4" />
                    Nouveau produit
                </Button>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des produits</CardTitle>
                        <CardDescription>
                            Tous vos produits et leurs statistiques de vente
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductsList />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 