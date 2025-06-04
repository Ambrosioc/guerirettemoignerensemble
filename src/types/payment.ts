export type PaymentStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'CANCELLED';

export interface Payment {
    id: string;
    checkout_reference: string;
    status: PaymentStatus;
    amount: number;
    currency: string;
    product_id: string;
    customer_email: string;
    customer_name: string;
    customer_address: string;
    created_at: string;
    updated_at: string;
    transaction_id?: string;
    merchant_code?: string;
    payment_method?: string;
    error_message?: string;
    user_id?: string;
    products?: {
        title: string;
    };
} 