'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Eye, EyeOff, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
    id: string;
    title: string;
    price: number;
    stock: number;
    status: 'available' | 'out_of_stock' | 'hidden';
    sales: number;
}

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const supabase = createClient();
                const { data } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-center">
                <p className="text-gray-500">Aucun produit pour le moment</p>
                <Link
                    href="/admin/boutique/new"
                    className="mt-2 text-[#d4af37] hover:underline"
                >
                    Ajouter votre premier produit
                </Link>
            </div>
        );
    }

    const getStatusBadgeVariant = (status: Product['status']) => {
        switch (status) {
            case 'available':
                return 'success';
            case 'out_of_stock':
                return 'destructive';
            case 'hidden':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: Product['status']) => {
        switch (status) {
            case 'available':
                return 'Disponible';
            case 'out_of_stock':
                return 'Rupture';
            case 'hidden':
                return 'Masqué';
            default:
                return status;
        }
    };

    return (
        <div className="relative overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Ventes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.title}</TableCell>
                            <TableCell>{product.price.toFixed(2)} €</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadgeVariant(product.status)}>
                                    {getStatusLabel(product.status)}
                                </Badge>
                            </TableCell>
                            <TableCell>{product.sales}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            // TODO: Implement visibility toggle
                                        }}
                                    >
                                        {product.status !== 'hidden' ? (
                                            <Eye className="h-4 w-4" />
                                        ) : (
                                            <EyeOff className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Link href={`/admin/boutique/${product.id}`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            // TODO: Implement delete
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 