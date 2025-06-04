'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

interface PaymentFormProps {
    productId: string;
    amount: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

export default function PaymentForm({ productId, amount, onSuccess, onError }: PaymentFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const supabase = createClient();

            // 1. Créer ou récupérer le client
            const { data: existingClient } = await supabase
                .from('clients')
                .select()
                .eq('email', formData.email)
                .single();

            let clientId;
            if (existingClient) {
                clientId = existingClient.id;
            } else {
                const { data: newClient, error: insertError } = await supabase
                    .from('clients')
                    .insert({
                        name: formData.name,
                        email: formData.email,
                        address: formData.address
                    })
                    .select()
                    .single();

                if (insertError) throw insertError;
                clientId = newClient.id;
            }

            // 2. Créer le checkout SumUp
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    clientId,
                    productId
                }),
            });

            if (!response.ok) throw new Error('Failed to create checkout');

            const { checkoutRef } = await response.json();

            // 3. Créer l'entrée de paiement
            const { error: paymentError } = await supabase
                .from('payments')
                .insert({
                    checkout_reference: checkoutRef,
                    status: 'PENDING',
                    amount,
                    product_id: productId,
                    client_id: clientId
                });

            if (paymentError) throw paymentError;

            // Appeler onSuccess après la création du paiement
            onSuccess();
        } catch (error) {
            onError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Adresse de livraison
                    </label>
                    <textarea
                        id="address"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d4af37] hover:bg-[#c4a030] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Chargement...' : 'Procéder au paiement'}
                </button>
            </form>
            <div id="sumup-card" className="mt-4" />
        </div>
    );
} 