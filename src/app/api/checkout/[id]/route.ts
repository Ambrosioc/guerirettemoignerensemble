import { NextResponse } from 'next/server';

interface CheckoutStatus {
    status: 'PAID' | 'FAILED';
    transaction_id?: string;
    transaction_code?: string;
    error_message?: string;
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('[Server] Vérification du statut du checkout :', params.id);

    try {
        if (!process.env.SUMUP_API_KEY) {
            console.error('[Server] Clé API SumUp manquante');
            throw new Error('La clé API SumUp n\'est pas configurée');
        }

        console.log('[Server] Appel de l\'API SumUp pour vérification du statut');
        const response = await fetch(`https://api.sumup.com/v0.1/checkouts/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.SUMUP_API_KEY}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const responseData = await response.json();
        console.log('[Server] Réponse de l\'API SumUp :', {
            status: response.status,
            ok: response.ok,
            data: responseData
        });

        if (!response.ok) {
            console.error('[Server] Erreur de l\'API SumUp :', responseData);
            throw new Error(responseData.message || 'Erreur lors de la vérification du checkout');
        }

        // Transformer la réponse pour notre interface
        const status: CheckoutStatus = {
            status: responseData.status === 'PAID' ? 'PAID' : 'FAILED',
            transaction_id: responseData.transaction_id,
            transaction_code: responseData.transaction_code,
        };

        if (status.status === 'FAILED') {
            status.error_message = responseData.error_message || 'Le paiement a échoué';
            console.error('[Server] Paiement échoué :', status);
        } else {
            console.log('[Server] Paiement réussi :', status);
        }

        console.log('[Server] Statut du paiement :', status);
        return NextResponse.json(status);
    } catch (error) {
        console.error('[Server] Erreur lors de la vérification du checkout :', error);
        return NextResponse.json(
            { 
                status: 'FAILED' as const,
                error_message: error instanceof Error ? error.message : 'Une erreur est survenue'
            },
            { status: 500 }
        );
    }
} 