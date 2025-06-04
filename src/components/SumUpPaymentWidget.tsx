'use client';

import { useEffect, useRef } from 'react';

interface SumUpResponse {
    transaction_id?: string;
    transaction_code?: string;
    status: 'success' | 'error';
    error?: {
        message: string;
    };
}

interface SumUpPaymentWidgetProps {
    checkoutId: string;
    amount: number;
    currency?: string;
    locale?: string;
    onSuccess?: (response: SumUpResponse) => void;
    onError?: (error: Error | SumUpResponse) => void;
    onCancel?: () => void;
}

interface SumUpWidgetOptions {
    checkoutId: string;
    amount: string;
    currency: string;
    locale: string;
    id: string;
    onResponse: (type: string, response: SumUpResponse) => void;
    showEmail: boolean;
    showFooter: boolean;
}

interface SumUpWidget {
    mount: (options: SumUpWidgetOptions) => void;
    unmount: () => void;
    submit: () => void;
    update: (options: Partial<SumUpWidgetOptions>) => void;
}

declare global {
    interface Window {
        SumUpCard?: {
            mount: (options: SumUpWidgetOptions) => SumUpWidget;
        };
    }
}

export default function SumUpPaymentWidget({
    checkoutId,
    amount,
    currency = 'EUR',
    locale = 'fr-FR',
    onSuccess,
    onError,
    onCancel
}: SumUpPaymentWidgetProps) {
    const widgetRef = useRef<SumUpWidget | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Charger le script SumUp
        const script = document.createElement('script');
        script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
        script.async = true;

        const initializeWidget = () => {
            if (!window.SumUpCard || !containerRef.current) return;

            try {
                widgetRef.current = window.SumUpCard.mount({
                    checkoutId,
                    amount: amount.toFixed(2),
                    currency,
                    locale,
                    id: 'sumup-payment-widget',
                    onResponse: (type: string, response: SumUpResponse) => {
                        switch (type) {
                            case 'success':
                                onSuccess?.(response);
                                break;
                            case 'error':
                                onError?.(response);
                                break;
                            case 'fail':
                                onCancel?.();
                                break;
                        }
                    },
                    showEmail: true, // Recommandé pour SCA
                    showFooter: true,
                });
            } catch (error) {
                console.error('Erreur lors de l\'initialisation du widget SumUp:', error);
                onError?.(error instanceof Error ? error : new Error('Erreur inconnue'));
            }
        };

        script.onload = initializeWidget;
        script.onerror = () => {
            console.error('Erreur lors du chargement du script SumUp');
            onError?.(new Error('Erreur lors du chargement du script SumUp'));
        };

        document.head.appendChild(script);

        return () => {
            if (widgetRef.current) {
                widgetRef.current.unmount();
            }
            document.head.removeChild(script);
        };
    }, [checkoutId, amount, currency, locale, onSuccess, onError, onCancel]);

    return (
        <div
            id="sumup-payment-widget"
            ref={containerRef}
            className="w-full min-h-[300px] bg-white rounded-lg shadow-sm p-4"
        />
    );
} 