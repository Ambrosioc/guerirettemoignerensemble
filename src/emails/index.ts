// Export de tous les modèles d'emails
export * from './contactConfirmation';
export * from './newContactMessage';
export * from './orderConfirmation';
export * from './paymentFailed';
export * from './welcomeNewsletter';

// Export des utilitaires
export { generateTextFromHtml, renderEmailTemplate } from './render';

// Export du client Mailjet
export { sendMail } from '@/lib/mailjet';
