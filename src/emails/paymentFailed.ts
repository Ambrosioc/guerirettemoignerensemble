import { sendMail } from '@/lib/mailjet';
import { generateTextFromHtml, renderEmailTemplate } from './render';
import PaymentFailedTemplate from './templates/PaymentFailedTemplate';

interface PaymentFailedData {
    customerEmail: string;
    customerName: string;
    orderNumber: string;
    amount: number;
    errorMessage?: string;
}

export async function sendPaymentFailed({
    customerEmail,
    customerName,
    orderNumber,
    amount,
    errorMessage
}: PaymentFailedData) {
    try {
        // Générer le template HTML
        const html = await renderEmailTemplate(
            PaymentFailedTemplate({
                customerName,
                orderNumber,
                amount,
                errorMessage
            })
        );

        // Générer la version texte
        const text = generateTextFromHtml(html);

        // Envoyer l'email
        const result = await sendMail({
            to: customerEmail,
            subject: `⚠️ Problème avec votre paiement - Commande ${orderNumber}`,
            html,
            text
        });

        return result;

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email d\'échec de paiement:', {
            customerEmail,
            orderNumber,
            error: error instanceof Error ? error.message : error
        });
        throw error;
    }
}