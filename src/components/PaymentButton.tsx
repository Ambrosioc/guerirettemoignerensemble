import { useState } from 'react';

interface PaymentButtonProps {
    amount: number;
    currency: string;
    description: string;
    checkoutReference?: string;
    onError?: (error: Error) => void;
    className?: string;
}

export function PaymentButton({
    amount,
    currency,
    description,
    checkoutReference,
    onError,
    className = ''
}: PaymentButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // 1. Création du checkout via notre API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    description,
                    checkout_reference: checkoutReference,
                }),
            });

            const data = await response.json();

            // Gestion des erreurs de l'API
            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la création du paiement');
            }

            // Vérification de la présence de l'ID
            if (!data.id) {
                throw new Error('ID de checkout manquant dans la réponse');
            }

            // 2. Construction de l'URL de paiement SumUp
            const checkoutUrl = `https://checkout.sumup.com/fr-FR/${data.id}`;

            // 3. Redirection vers la page de paiement SumUp
            window.location.href = checkoutUrl;

            // Le succès du paiement sera géré sur la page de retour
            // après que l'utilisateur ait complété le paiement sur SumUp
        } catch (e) {
            // Gestion des erreurs
            const errorMessage = e instanceof Error ? e.message : 'Erreur inconnue';
            console.error('Erreur de paiement:', errorMessage);
            setError(errorMessage);
            onError?.(e instanceof Error ? e : new Error(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={handlePayment}
                disabled={isLoading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
            >
                {isLoading ? 'Redirection vers le paiement sécurisé...' : 'Payer maintenant'}
            </button>

            {error && (
                <p className="text-red-600 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
} 