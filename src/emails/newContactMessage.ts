import { sendMail } from '@/lib/mailjet';
import { generateTextFromHtml, renderEmailTemplate } from './render';
import NewContactMessageTemplate from './templates/NewContactMessageTemplate';

interface NewContactMessageData {
    name: string;
    email: string;
    subject: string;
    message: string;
    submittedAt?: Date;
}

export async function sendNewContactMessage({
    name,
    email,
    subject,
    message,
    submittedAt = new Date()
}: NewContactMessageData) {
    try {
        // Générer le template HTML
        const template = NewContactMessageTemplate({
            name,
            email,
            subject,
            message,
            submittedAt
        });
        
        const htmlContent = await renderEmailTemplate(template);
        
        // S'assurer que htmlContent est une chaîne de caractères
        const html = String(htmlContent);
        
        // Générer la version texte
        const text = generateTextFromHtml(html);

        // Envoyer l'email de notification à l'adresse fixe de Merveille
        const result = await sendMail({
            to: 'merveillegrace-helene@outlook.com',
            subject: `📬 Nouveau message de contact de ${name}`,
            html,
            text
        });

        return result;

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email de notification de contact:', {
            from: email,
            name,
            subject,
            error: error instanceof Error ? error.message : error
        });
        throw error;
    }
}