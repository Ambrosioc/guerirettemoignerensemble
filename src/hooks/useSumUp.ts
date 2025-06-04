'use client';

import { useEffect, useState } from 'react';

interface SumUpResponse {
    transaction_id?: string;
    transaction_code?: string;
    status: 'success' | 'error';
    error?: {
        message: string;
    };
}

interface SumUpWidget {
    mount: (options: {
        checkoutId: string;
        onResponse: (type: string, response: SumUpResponse) => void;
    }) => void;
}

declare global {
    interface Window {
        SumUp?: {
            PaymentWidget?: {
                init: () => Promise<SumUpWidget>;
            };
        };
    }
}

export function useSumUp() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [widget, setWidget] = useState<SumUpWidget | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://pay.sumup.com/v2/api.js';
        script.async = true;
        
        const initializeWidget = async () => {
            try {
                if (window.SumUp?.PaymentWidget) {
                    const paymentWidget = await window.SumUp.PaymentWidget.init();
                    setWidget(paymentWidget);
                    setError(null);
                }
            } catch (err) {
                setError('Erreur lors de l\'initialisation du widget de paiement');
                console.error('Erreur SumUp:', err);
            } finally {
                setIsLoading(false);
            }
        };

        script.onload = () => {
            initializeWidget();
        };

        script.onerror = () => {
            setError('Erreur lors du chargement du script de paiement');
            setIsLoading(false);
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return { isLoading, error, widget };
} 