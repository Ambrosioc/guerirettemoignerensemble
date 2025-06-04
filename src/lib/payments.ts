import { createClient } from '@supabase/supabase-js';

// Types
export interface PaymentData {
    checkout_reference: string;
    amount: number;
    currency?: string;
    product_id: string;
    customer_email: string;
    customer_name: string;
    customer_address: string;
    user_id?: string;
}

// Initialiser le client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Crée un enregistrement de paiement dans la base de données
 */
export async function createPayment(data: {
    amount: number;
    clientId: string;
    productId: string;
}) {
    try {
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout');
        }

        const { checkoutId, checkoutRef } = await response.json();

        const { error: paymentError } = await supabase
            .from('payments')
            .insert({
                checkout_reference: checkoutRef,
                status: 'PENDING',
                amount: data.amount,
                product_id: data.productId,
                client_id: data.clientId
            });

        if (paymentError) throw paymentError;

        return { checkoutId, checkoutRef };
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

/**
 * Récupère la liste des paiements avec filtres
 */
export async function getPayments({
    startDate,
    endDate,
    status,
    productId,
    page = 1,
    limit = 10
}: {
    startDate?: Date;
    endDate?: Date;
    status?: string;
    productId?: string;
    page?: number;
    limit?: number;
}) {
    try {
        let query = supabase
            .from('payments')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        // Appliquer les filtres
        if (startDate) {
            query = query.gte('created_at', startDate.toISOString());
        }
        if (endDate) {
            query = query.lte('created_at', endDate.toISOString());
        }
        if (status) {
            query = query.eq('status', status);
        }
        if (productId) {
            query = query.eq('product_id', productId);
        }

        // Pagination
        const start = (page - 1) * limit;
        query = query.range(start, start + limit - 1);

        const { data, error, count } = await query;

        if (error) {
            console.error('Erreur lors de la récupération des paiements:', error);
            throw error;
        }

        return {
            payments: data,
            total: count || 0,
            page,
            limit
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des paiements:', error);
        throw error;
    }
}

/**
 * Récupère les détails d'un paiement
 */
export async function getPaymentDetails(checkoutReference: string) {
    try {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('checkout_reference', checkoutReference)
            .single();

        if (error) {
            console.error('Erreur lors de la récupération du paiement:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération du paiement:', error);
        throw error;
    }
} 