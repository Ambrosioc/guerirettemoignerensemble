'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Package2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Gérez votre contenu et vos produits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section Articles */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-[#d4af37]" />
                            Articles
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                            Gérez les articles de votre blog
                        </p>
                        <div className="flex gap-4">
                            <Link href="/admin/posts">
                                <Button variant="outline">
                                    Voir tous les articles
                                </Button>
                            </Link>
                            <Link href="/admin/posts/new">
                                <Button className="bg-[#d4af37] hover:bg-[#d4af37]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nouvel article
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Boutique */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package2 className="h-5 w-5 text-[#d4af37]" />
                            Boutique
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                            Gérez les produits de votre boutique
                        </p>
                        <div className="flex gap-4">
                            <Link href="/admin/boutique">
                                <Button variant="outline">
                                    Voir tous les produits
                                </Button>
                            </Link>
                            <Link href="/admin/boutique/new">
                                <Button className="bg-[#d4af37] hover:bg-[#d4af37]/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nouveau produit
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 