import { render } from '@react-email/render';
import { ReactElement } from 'react';

/**
 * Convertit un composant React en HTML pour l'envoi d'email
 */
export async function renderEmailTemplate(template: ReactElement): Promise<string> {
    const html = await render(template, {
        pretty: true,
    });
    return html;
}

/**
 * Génère une version texte simple à partir du HTML
 * Cette fonction peut être améliorée pour une meilleure conversion HTML -> texte
 */
export function generateTextFromHtml(html: unknown): string {
    // S'assurer que nous avons une chaîne de caractères
    const htmlString = String(html || '');

    return htmlString
        .replace(/<[^>]*>/g, '') // Supprime les balises HTML
        .replace(/&nbsp;/g, ' ') // Remplace les espaces insécables
        .replace(/&amp;/g, '&') // Décode les entités HTML basiques
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ') // Normalise les espaces
        .trim();
}