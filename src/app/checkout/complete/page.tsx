'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface CheckoutStatus {
    status: 'PAID' | 'PENDING' | 'FAILED';
    transaction_id?: string;
    transaction_code?: string;
    error_message?: string;
}

function CheckoutStatus() {
    const searchParams = useSearchParams();
    const checkoutId = searchParams.get('checkout_id');
    const [status, setStatus] = useState<CheckoutStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            if (!checkoutId) {
                setStatus({
                    status: 'FAILED',
                    error_message: 'ID de paiement manquant'
                });
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/checkout/${checkoutId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erreur lors de la vérification du paiement');
                }

                setStatus(data);
            } catch (error) {
                setStatus({
                    status: 'FAILED',
                    error_message: error instanceof Error ? error.message : 'Une erreur est survenue'
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkStatus();
    }, [checkoutId]);

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto"></div>
                <p className="mt-4 text-gray-600">Vérification du paiement en cours...</p>
            </div>
        );
    }

    if (status?.status === 'PAID') {
        return (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-serif mb-4">Paiement réussi !</h1>
                <p className="text-gray-600 mb-6">
                    Merci pour votre achat. Vous recevrez bientôt un email de confirmation.
                </p>
                {status.transaction_id && (
                    <p className="text-sm text-gray-500">
                        Référence de transaction : {status.transaction_id}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-serif mb-4">Paiement échoué</h1>
            <p className="text-gray-600 mb-6">
                {status?.error_message || 'Une erreur est survenue lors du paiement.'}
            </p>
            <a
                href="/oeuvres"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#c4a030] transition-colors"
            >
                Retourner à la boutique
            </a>
        </div>
    );
}

export default function CheckoutComplete() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <FadeIn>
                            <Suspense fallback={
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Chargement...</p>
                                </div>
                            }>
                                <CheckoutStatus />
                            </Suspense>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
} 