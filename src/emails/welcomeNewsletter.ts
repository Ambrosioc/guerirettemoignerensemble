import { sendMail } from '@/lib/mailjet';
import { generateTextFromHtml, renderEmailTemplate } from './render';
import WelcomeNewsletterTemplate from './templates/WelcomeNewsletterTemplate';

interface WelcomeNewsletterData {
    email: string;
}

export async function sendWelcomeNewsletter({ email }: WelcomeNewsletterData) {
    try {
        // Générer le template HTML
        const html = await renderEmailTemplate(
            WelcomeNewsletterTemplate({ email })
        );

        // Générer la version texte
        const text = generateTextFromHtml(html);

        // Envoyer l'email
        const result = await sendMail({
            to: email,
            subject: '🌟 Bienvenue dans notre communauté !',
            html,
            text
        });

        console.log('✅ Email de bienvenue newsletter envoyé:', {
            email,
            messageId: result.messageId
        });

        return result;

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue newsletter:', {
            email,
            error: error instanceof Error ? error.message : error
        });
        throw error;
    }
}