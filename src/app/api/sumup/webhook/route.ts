import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

// Types pour les événements SumUp
interface SumUpEvent {
    event_type: 'payment.successful' | 'payment.failed';
    checkout_reference: string;
    transaction_id?: string;
    payment_method?: string;
    failure_reason?: string;
}

// Initialiser le client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Clé secrète pour vérifier la signature du webhook (à configurer dans SumUp)
const webhookSecret = process.env.SUMUP_WEBHOOK_SECRET!;

// Vérifier la signature du webhook SumUp
function verifySignature(payload: string, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', webhookSecret);
    const calculatedSignature = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(calculatedSignature)
    );
}

export async function POST(request: Request) {
    try {
        const signature = request.headers.get('x-sumup-signature') || '';
        
        if (!signature) {
            return NextResponse.json(
                { error: 'Signature manquante' },
                { status: 401 }
            );
        }

        // Récupérer le corps de la requête
        const payload = await request.text();
        
        // Vérifier la signature
        if (!verifySignature(payload, signature)) {
            return NextResponse.json(
                { error: 'Signature invalide' },
                { status: 401 }
            );
        }

        const event = JSON.parse(payload) as SumUpEvent;

        // Traiter l'événement en fonction de son type
        switch (event.event_type) {
            case 'payment.successful':
                await handleSuccessfulPayment(event);
                break;
            case 'payment.failed':
                await handleFailedPayment(event);
                break;
            default:
                console.log('Type d\'événement non géré:', event.event_type);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Erreur webhook:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}

async function handleSuccessfulPayment(event: SumUpEvent) {
    const { error } = await supabase
        .from('payments')
        .update({
            status: 'SUCCESSFUL',
            transaction_id: event.transaction_id,
            payment_method: event.payment_method,
            updated_at: new Date().toISOString()
        })
        .eq('checkout_reference', event.checkout_reference);

    if (error) {
        console.error('Erreur mise à jour paiement:', error);
        throw error;
    }
}

async function handleFailedPayment(event: SumUpEvent) {
    const { error } = await supabase
        .from('payments')
        .update({
            status: 'FAILED',
            error_message: event.failure_reason || 'Paiement échoué',
            updated_at: new Date().toISOString()
        })
        .eq('checkout_reference', event.checkout_reference);

    if (error) {
        console.error('Erreur mise à jour paiement:', error);
        throw error;
    }
} 