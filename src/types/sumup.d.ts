interface SumUpCardResponse {
    code: string;
    message: string;
    [key: string]: any;
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
