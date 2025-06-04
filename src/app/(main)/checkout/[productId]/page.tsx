'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import PaymentForm from '@/components/PaymentForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage({ params }: { params: { productId: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!amount) {
            router.push('/oeuvres');
        }
    }, [amount, router]);

    if (!amount) return null;

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <FadeIn>
                            <h1 className="text-3xl font-serif mb-8 text-center">Finaliser votre achat</h1>
                        </FadeIn>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        <FadeIn delay={0.2}>
                            <PaymentForm
                                productId={params.productId}
                                amount={parseInt(amount)}
                                onSuccess={() => {
                                    // Rediriger vers une page de confirmation
                                    router.push('/checkout/success');
                                }}
                                onError={(message) => {
                                    setError(message);
                                }}
                            />
                        </FadeIn>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
} 