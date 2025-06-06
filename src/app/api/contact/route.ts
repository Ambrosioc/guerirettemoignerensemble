import { sendNewContactMessage } from '@/emails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validation des données
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Vérifier si l'email est valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalide' },
                { status: 400 }
            );
        }

        // Envoyer l'email de notification
        await sendNewContactMessage({
            name,
            email,
            subject,
            message,
            submittedAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        });

    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}