import { sendMail } from '@/lib/mailjet';
import { generateTextFromHtml, renderEmailTemplate } from './render';
import OrderConfirmationTemplate from './templates/OrderConfirmationTemplate';

interface OrderItem {
    title: string;
    price: number;
    quantity: number;
}

interface OrderConfirmationData {
    customerEmail: string;
    customerName: string;
    orderNumber: string;
    items: OrderItem[];
    total: number;
    shippingAddress: string;
}

export async function sendOrderConfirmation({
    customerEmail,
    customerName,
    orderNumber,
    items,
    total,
    shippingAddress
}: OrderConfirmationData) {
    try {
        // Générer le template HTML
        const html = await renderEmailTemplate(
            OrderConfirmationTemplate({
                customerName,
                orderNumber,
                items,
                total,
                shippingAddress
            })
        );

        // Générer la version texte
        const text = generateTextFromHtml(html);

        // Envoyer l'email
        const result = await sendMail({
            to: customerEmail,
            subject: `📚 Confirmation de votre commande ${orderNumber}`,
            html,
            text
        });

        return result;

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation de commande:', {
            customerEmail,
            orderNumber,
            error: error instanceof Error ? error.message : error
        });
        throw error;
    }
}