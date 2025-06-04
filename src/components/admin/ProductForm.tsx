'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const productSchema = z.object({
    title: z.string().min(1, 'Le titre est requis'),
    description: z.string().min(1, 'La description est requise'),
    price: z.string().min(1, 'Le prix est requis'),
    stock: z.string().min(1, 'Le stock est requis'),
    isbn: z.string().optional(),
    themes: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: ProductFormValues;
    onSubmit: (data: ProductFormValues) => Promise<void>;
}

export default function ProductForm({ initialData, onSubmit }: ProductFormProps) {
    const router = useRouter();
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            price: '',
            stock: '',
            isbn: '',
            themes: '',
        },
    });

    const handleSubmit = async (data: ProductFormValues) => {
        try {
            await onSubmit(data);
            router.push('/admin/boutique');
        } catch (error) {
            console.error('Error submitting product:', error);
            // TODO: Add error handling
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input placeholder="Titre du produit" {...field} />
                            </FormControl>
                            <FormDescription>
                                Le titre de votre livre ou produit
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea
                                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Description du produit"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Une description détaillée de votre produit
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prix</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Prix en euros</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Quantité disponible
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ISBN</FormLabel>
                            <FormControl>
                                <Input placeholder="ISBN du livre (optionnel)" {...field} />
                            </FormControl>
                            <FormDescription>
                                Le numéro ISBN si c&apos;est un livre
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="themes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thèmes</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Thèmes séparés par des virgules (optionnel)"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Les thèmes abordés dans le livre
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="bg-[#d4af37] hover:bg-[#d4af37]/90"
                    >
                        {initialData ? 'Mettre à jour' : 'Créer'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 