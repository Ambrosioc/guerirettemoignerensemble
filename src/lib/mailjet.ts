import Mailjet from 'node-mailjet';

interface MailjetResponse {
    body: {
        Messages?: Array<{
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
    subject: string;
    html: string;
    text?: string;
    fromEmail?: string;
    fromName?: string;
}

export async function sendMail({
    to,
    subject,
    html,
    text,
    fromEmail = process.env.MAILJET_FROM_EMAIL!,
    fromName = process.env.MAILJET_FROM_NAME!
}: SendMailOptions) {
    // Mode test en développement
    if (process.env.NODE_ENV !== 'production') {
        console.log('📧 [TEST MODE] Email would be sent:');
        console.log('From:', `${fromName} <${fromEmail}>`);
        console.log('To:', Array.isArray(to) ? to.join(', ') : to);
        console.log('Subject:', subject);
        console.log('HTML:', html.substring(0, 200) + '...');
        if (text) console.log('Text:', text.substring(0, 200) + '...');
        return { success: true, messageId: 'test-mode' };
    }

    try {
        // Préparer les destinataires
        const recipients = Array.isArray(to) 
            ? to.map(email => ({ Email: email }))
            : [{ Email: to }];

        const response = await mailjetClient
            .post("send", { version: 'v3.1' })
            .request({
                Body: {
                    Messages: [
                        {
                            From: {
                                Email: fromEmail,
                                Name: fromName
                            },
                            To: recipients,
                            Subject: subject,
                            HTMLPart: html,
                            TextPart: text || undefined
                        }
                    ]
                }
            }) as MailjetResponse;

        const messageId = response.body?.Messages?.[0]?.To?.[0]?.MessageID || 'unknown';

        console.log('✅ Email envoyé avec succès:', {
            messageId,
            to: Array.isArray(to) ? to.join(', ') : to,
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