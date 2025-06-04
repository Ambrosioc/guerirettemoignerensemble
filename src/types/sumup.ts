export interface CheckoutRequest {
    checkout_reference: string;
    amount: number;
    currency: string;
    merchant_code: string;
    description?: string;
    return_url: string;
    pay_to_email?: string;
}

export interface CheckoutResponse {
    id: string;
    status: 'PENDING' | 'PAID' | 'FAILED';
    amount: number;
    currency: string;
    checkout_reference: string;
    merchant_code: string;
    description?: string;
    return_url: string;
    date: string;
    checkout_url: string;
    pay_to_email?: string;
}

export interface WebhookPayload {
    event_type: 'CHECKOUT.PAID' | 'CHECKOUT.FAILED';
    event_id: string;
    timestamp: string;
    checkout: {
        id: string;
        status: 'PAID' | 'FAILED';
        amount: number;
        currency: string;
        merchant_code: string;
        checkout_reference?: string;
        transaction_id?: string;
        payment_type?: string;
    };
} 