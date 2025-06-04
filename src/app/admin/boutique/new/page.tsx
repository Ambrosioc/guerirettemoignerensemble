'use client';

import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function NewProductPage() {
    const handleSubmit = async (data: ProductFormValues) => {
        // TODO: Implement product creation
        console.log('Creating product:', data);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-serif text-gray-900">Nouveau produit</h1>
                <p className="text-gray-500">Ajoutez un nouveau produit à votre boutique</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Informations du produit</CardTitle>
                    <CardDescription>
                        Remplissez les informations ci-dessous pour créer votre produit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm onSubmit={handleSubmit} />
                </CardContent>
            </Card>
        </div>
    );
} 