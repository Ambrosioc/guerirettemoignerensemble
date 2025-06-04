import { CheckoutRequest, CheckoutResponse } from '@/types/sumup';
import { createHmac } from 'crypto';

class SumUpAPI {
    private apiKey: string;
    private apiUrl: string;
    private merchantCode: string;

    constructor() {
        const apiKey = process.env.SUMUP_API_KEY;
        const apiUrl = process.env.SUMUP_API_URL || 'https://api.sumup.com/v0.1';
        const merchantCode = process.env.SUMUP_MERCHANT_CODE;

        if (!apiKey) throw new Error('SUMUP_API_KEY is not configured');
        if (!merchantCode) throw new Error('MERCHANT_CODE is not configured');

        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.merchantCode = merchantCode;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.apiUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('SumUp API Error:', {
                status: response.status,
                data
            });
            throw new Error(`SumUp API Error: ${response.status} - ${JSON.stringify(data)}`);
        }

        return data;
    }

    async createCheckout(data: Omit<CheckoutRequest, 'merchant_code'>): Promise<CheckoutResponse> {
        // Ajout automatique du merchant_code
        const checkoutData: CheckoutRequest = {
            ...data,
            merchant_code: this.merchantCode
        };

        // Validation des données requises
        const requiredFields = ['amount', 'currency', 'checkout_reference', 'return_url'] as const;
        for (const field of requiredFields) {
            if (!checkoutData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Validation du montant
        if (typeof checkoutData.amount !== 'number' || checkoutData.amount <= 0) {
            throw new Error('Invalid amount: must be a positive number');
        }

        // Validation de la devise
        if (typeof checkoutData.currency !== 'string' || checkoutData.currency.length !== 3) {
            throw new Error('Invalid currency: must be a 3-letter ISO code');
        }

        return this.request<CheckoutResponse>('/checkouts', {
            method: 'POST',
            body: JSON.stringify(checkoutData),
        });
    }

    async getCheckout(checkoutId: string): Promise<CheckoutResponse> {
        if (!checkoutId) {
            throw new Error('Checkout ID is required');
        }

        return this.request<CheckoutResponse>(`/checkouts/${checkoutId}`, {
            method: 'GET',
        });
    }

    async verifyWebhookSignature(signature: string, body: string): Promise<boolean> {
        const secret = process.env.SUMUP_WEBHOOK_SECRET;
        if (!secret) throw new Error('SUMUP_WEBHOOK_SECRET is not configured');

        const expectedSignature = createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        return signature === expectedSignature;
    }
}

// Export a singleton instance
export const sumupApi = new SumUpAPI(); 