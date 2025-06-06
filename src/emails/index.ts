// Export de tous les modèles d'emails
export { sendWelcomeNewsletter } from './welcomeNewsletter';
export { sendOrderConfirmation } from './orderConfirmation';
export { sendPaymentFailed } from './paymentFailed';
export { sendNewContactMessage } from './newContactMessage';

// Export des utilitaires
export { renderEmailTemplate, generateTextFromHtml } from './render';

// Export du client Mailjet
export { sendMail } from '@/lib/mailjet';