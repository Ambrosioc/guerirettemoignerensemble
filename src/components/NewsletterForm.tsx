'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue');
            }

            setStatus('success');
            setMessage('Merci pour votre inscription ! Vous recevrez bientôt de nos nouvelles.');
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    disabled={status === 'loading'}
                />
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#d4af37] hover:bg-[#d4af37]/90"
                >
                    {status === 'loading' ? 'Inscription...' : "S'inscrire"}
                </Button>
            </form>
            {message && (
                <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}