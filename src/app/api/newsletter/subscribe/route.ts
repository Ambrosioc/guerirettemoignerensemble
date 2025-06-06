import { sendWelcomeNewsletter } from '@/emails';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email requis' },
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

        // Vérifier si l'email existe déjà
        const { data: existingSubscriber } = await supabase
            .from('newsletter_subscribers')
            .select('id, status')
            .eq('email', email)
            .single();

        if (existingSubscriber) {
            if (existingSubscriber.status === 'active') {
                return NextResponse.json(
                    { error: 'Cet email est déjà inscrit à notre newsletter' },
                    { status: 409 }
                );
            } else {
                // Réactiver l'abonnement
                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .update({ status: 'active' })
                    .eq('email', email);

                if (error) throw error;
            }
        } else {
            // Créer un nouvel abonnement
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email, status: 'active' }]);

            if (error) throw error;
        }

        // Envoyer l'email de bienvenue
        try {
            await sendWelcomeNewsletter({ email });
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', emailError);
            // Ne pas faire échouer l'inscription si l'email ne peut pas être envoyé
        }

        return NextResponse.json({
            success: true,
            message: 'Inscription réussie ! Vous recevrez bientôt un email de bienvenue.'
        });

    } catch (error) {
        console.error('Erreur lors de l\'inscription à la newsletter:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        );
    }
}