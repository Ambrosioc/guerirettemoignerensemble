import { NextResponse } from 'next/server';

interface CheckoutRequest {
    amount: number;
    currency: string;
    description: string;
    checkout_reference: string;
}

export async function POST(request: Request) {
    
    try {
        const body = await request.json() as CheckoutRequest;
        console.log('[Server] Données reçues :', {
            ...body,
            description: body.description.substring(0, 20) + '...' // Tronquer la description
        });
        
        if (!process.env.SUMUP_API_KEY) {
            console.error('[Server] Clé API SumUp manquante');
            throw new Error('La clé API SumUp n\'est pas configurée');
        }

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            console.error('[Server] URL de base manquante');
            throw new Error('L\'URL de base n\'est pas configurée');
        }

        const returnUrl = new URL('/checkout/complete', process.env.NEXT_PUBLIC_BASE_URL).toString();
        console.log('[Server] URL de retour configurée :', returnUrl);

        console.log('[Server] Appel de l\'API SumUp');
        const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.SUMUP_API_KEY}`,
            },
            body: JSON.stringify({
                amount: body.amount,
                currency: body.currency,
                description: body.description,
                checkout_reference: body.checkout_reference,
                merchant_code: process.env.SUMUP_MERCHANT_CODE,
                return_url: returnUrl,
            }),
        });

        const responseData = await response.json();
        console.log('[Server] Réponse de l\'API SumUp :', {
            status: response.status,
            ok: response.ok,
            data: responseData
        });

        if (!response.ok) {
            console.error('[Server] Erreur de l\'API SumUp :', responseData);
            throw new Error(responseData.message || 'Erreur lors de la création du checkout');
        }

        console.log('[Server] Checkout créé avec succès');
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('[Server] Erreur lors de la création du checkout :', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Une erreur est survenue' },
            { status: 500 }
        );
    }
} 