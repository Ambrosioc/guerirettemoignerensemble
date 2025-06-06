import Mailjet from 'node-mailjet';

interface MailjetResponse {
    body: {
        Messages?: Array<{
            Status: string;
            To?: Array<{
                MessageID?: string;
            }>;
        }>;
    };
}

// Configuration du client Mailjet
const mailjetClient = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY!,
    apiSecret: process.env.MAILJET_API_SECRET!
});

export interface SendMailOptions {
    to: string | string[];
    toName?: string | string[];
    subject: string;
    html: string;
    text?: string;
    fromEmail?: string;
    fromName?: string;
}

export async function sendMail({
    to,
    toName,
    subject,
    html,
    text,
    fromEmail = 'no-reply@guerirettemoignerensemble.fr',
    fromName = 'Guérir & Témoigner Ensemble'
}: SendMailOptions) {
    // Mode test en développement
    // if (process.env.NODE_ENV !== 'production') {
    //     console.log('📧 [TEST MODE] Email would be sent:');
    //     console.log('From:', `${fromName} <${fromEmail}>`);
    //     console.log('To:', Array.isArray(to) ? to.join(', ') : to);
    //     console.log('Subject:', subject);
    //     console.log('HTML:', html.substring(0, 200) + '...');
    //     if (text) console.log('Text:', text.substring(0, 200) + '...');
    //     return { success: true, messageId: 'test-mode' };
    // }

    try {
        // Préparer les destinataires avec leurs noms si fournis
        const recipients = Array.isArray(to) 
            ? to.map((email, index) => ({
                Email: email,
                Name: Array.isArray(toName) ? toName[index] : undefined
            }))
            : [{ 
                Email: to,
                Name: typeof toName === 'string' ? toName : undefined
            }];

        // Construire le payload selon la spec Mailjet
        const payload = {
            Messages: [
                {
                    From: {
                        Email: fromEmail,
                        Name: fromName
                    },
                    To: recipients,
                    Subject: subject,
                    HTMLPart: html,
                    TextPart: text || undefined,
                    CustomID: `email-${Date.now()}` // Ajout d'un ID unique pour le suivi
                }
            ]
        };

        // Log du payload avant envoi
        console.log('📧 Payload envoyé à Mailjet:', JSON.stringify(payload, null, 2));

        // Envoi via l'API Mailjet v3.1
        const response = await mailjetClient
            .post("send", { version: 'v3.1' })
            .request(payload) as MailjetResponse;

        // Vérifier le statut de la réponse
        const status = response.body?.Messages?.[0]?.Status;
        const messageId = response.body?.Messages?.[0]?.To?.[0]?.MessageID || 'unknown';

        if (status !== 'success') {
            throw new Error(`Mailjet status: ${status}`);
        }

        console.log('✅ Email envoyé avec succès:', {
            messageId,
            from: `${fromName} <${fromEmail}>`,
            to: recipients.map(r => r.Name ? `${r.Name} <${r.Email}>` : r.Email).join(', '),
            subject
        });

        return {
            success: true,
            messageId
        };

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', {
            error: error instanceof Error ? error.message : error,
            to: Array.isArray(to) ? to.join(', ') : to,
            subject
        });

        throw new Error(`Échec de l'envoi de l'email: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
}

export default mailjetClient;