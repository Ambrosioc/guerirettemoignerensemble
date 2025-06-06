import { sendMail } from '@/lib/mailjet';
import { generateTextFromHtml, renderEmailTemplate } from './render';
import ContactConfirmationTemplate from './templates/ContactConfirmationTemplate';

interface ContactConfirmationData {
    name: string;
    email: string;
}

export async function sendContactConfirmation({
    name,
    email,
}: ContactConfirmationData) {
    try {
        // Générer le template HTML
        const template = ContactConfirmationTemplate({ name });
        const htmlContent = await renderEmailTemplate(template);
        const html = String(htmlContent);
        
        // Générer la version texte
        const text = generateTextFromHtml(html);

        // Envoyer l'email de confirmation
        const result = await sendMail({
            to: email,
            toName: name,
            subject: '✉️ Votre message a bien été reçu !',
            html,
            text
        });

        console.log('✅ Email de confirmation envoyé au contact:', {
            to: `${name} <${email}>`,
            messageId: result.messageId
        });

        return result;

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation au contact:', {
            name,
            email,
            error: error instanceof Error ? error.message : error
        });
        throw error;
    }
} 