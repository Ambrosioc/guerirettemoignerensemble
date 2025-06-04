interface SumUpCardResponse {
    code: string;
    message: string;
    status?: 'success' | 'error';
    transaction_id?: string;
    transaction_code?: string;
    payment_type?: string;
    amount?: number;
    currency?: string;
    timestamp?: string;
}

interface SumUpCardConfig {
    elementId: string;
    checkoutId: string;
    onResponse: (type: string, body: SumUpCardResponse) => void;
    locale?: string;
    showSubmitButton?: boolean;
    showFooter?: boolean;
    currency?: string;
}

interface SumUpCard {
    mount: (config: SumUpCardConfig) => void;
}

declare global {
    interface Window {
        SumUpCard: SumUpCard;
    }
}

export { };
