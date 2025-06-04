import { sumupApi } from '@/lib/sumup';
import { WebhookPayload } from '@/types/sumup';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Récupération de la signature du webhook
        const signature = request.headers.get('x-sumup-signature');
        if (!signature) {
            return NextResponse.json(
                { error: 'Missing webhook signature' },
                { status: 400 }
            );
        }

        // Récupération et validation du corps de la requête
        const rawBody = await request.text();
        const isValid = await sumupApi.verifyWebhookSignature(signature, rawBody);
        
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid webhook signature' },
                { status: 401 }
            );
        }

        // Parsing du corps de la requête
        const payload = JSON.parse(rawBody) as WebhookPayload;

        // Traitement selon le type d'événement
        switch (payload.event_type) {
            case 'CHECKOUT.PAID':
                await handleSuccessfulPayment(payload);
                break;
            case 'CHECKOUT.FAILED':
                await handleFailedPayment(payload);
                break;
            default:
                console.log('Unhandled webhook event:', payload.event_type);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

async function handleSuccessfulPayment(payload: WebhookPayload) {
    // Exemple de traitement d'un paiement réussi
    console.log('Payment successful:', {
        checkoutId: payload.checkout.id,
        amount: payload.checkout.amount,
        currency: payload.checkout.currency,
        transactionId: payload.checkout.transaction_id
    });

    // TODO: Implémentez ici votre logique métier
    // - Mettre à jour le statut de la commande dans la base de données
    // - Envoyer un email de confirmation
    // - Générer une facture
    // - etc.
}

async function handleFailedPayment(payload: WebhookPayload) {
    // Exemple de traitement d'un paiement échoué
    console.log('Payment failed:', {
        checkoutId: payload.checkout.id,
        amount: payload.checkout.amount,
        currency: payload.checkout.currency
    });

    // TODO: Implémentez ici votre logique métier
    // - Mettre à jour le statut de la commande
    // - Notifier l'utilisateur
    // - Enregistrer l'échec pour analyse
    // - etc.
} 