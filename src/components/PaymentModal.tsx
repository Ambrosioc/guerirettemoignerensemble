'use client';

import { Dialog, Transition } from '@headlessui/react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SumUpPaymentWidget from './SumUpPaymentWidget';

// Créer le client Supabase dans une fonction pour éviter les problèmes avec Next.js
const getSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
};

interface ClientFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

interface Book {
    id: number;
    title: string;
    price: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book;
}

interface SumUpResponse {
    transaction_id?: string;
    id?: string;
    status: 'success' | 'error';
    error?: {
        message: string;
    };
    transaction_code?: string;
}

export default function PaymentModal({ isOpen, onClose, book }: PaymentModalProps) {
    const [step, setStep] = useState<'form' | 'payment'>('form');
    const [checkoutId, setCheckoutId] = useState<string | null>(null);
    const [checkoutReference, setCheckoutReference] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>();

    const onSubmit = async (data: ClientFormData) => {
        try {
            setError(null);
            const supabase = getSupabaseClient();

            // Générer le checkout_reference
            const newCheckoutReference = `BOOK-${book.id}-${Date.now()}`;
            setCheckoutReference(newCheckoutReference);

            toast('Création du client...');
            // 1. Enregistrer le client dans Supabase
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .insert({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                })
                .select()
                .single();

            if (clientError) {
                toast.error('Erreur lors de la création du client');
                throw new Error(clientError.message);
            }

            if (!clientData) {
                throw new Error('Erreur lors de la création du client');
            }

            toast.success('Client créé avec succès');
            setClientId(clientData.id);

            // 2. Créer le checkout SumUp
            const amount = parseFloat(book.price.replace(',', '.').replace('€', '').trim());

            toast('Création du paiement...');
            const checkoutResponse = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency: 'EUR',
                    description: `Achat du livre "${book.title}"`,
                    checkout_reference: newCheckoutReference
                }),
            });

            const checkoutData = await checkoutResponse.json();

            if (!checkoutResponse.ok) {
                toast.error('Erreur lors de la création du checkout');
                console.error('[Client] Erreur de l\'API checkout :', checkoutData);
                throw new Error(checkoutData.error || 'Erreur lors de la création du paiement');
            }

            toast.success('Checkout créé avec succès');

            // 3. Créer l'entrée dans la table payments
            toast('Enregistrement du paiement...');
            const { error: paymentError } = await supabase
                .from('payments')
                .insert({
                    checkout_reference: newCheckoutReference,
                    amount,
                    product_id: book.id,
                    client_id: clientData.id,
                    status: 'pending'
                })
                .select()
                .single();

            if (paymentError) {
                toast.error('Erreur lors de la création du payment');
                throw new Error(paymentError.message);
            }

            toast.success('Paiement enregistré avec succès');

            // 4. Définir le checkoutId et passer à l'étape suivante
            setCheckoutId(checkoutData.id);
            setStep('payment');
            toast.success('Vous pouvez maintenant procéder au paiement');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handlePaymentSuccess = async (response: SumUpResponse) => {
        try {

            const supabase = getSupabaseClient();

            if (!clientId) {
                throw new Error('Client ID manquant');
            }
            if (!checkoutReference) {
                throw new Error('Référence de paiement manquante');
            }

            const transactionId = response.transaction_id || response.id;
            if (!transactionId) {
                throw new Error('ID de transaction manquant');
            }

            const { error: updateError } = await supabase
                .from('payments')
                .update({
                    status: 'completed',
                    transaction_id: transactionId,
                    transaction_code: response.transaction_code || null
                })
                .eq('checkout_reference', checkoutReference)
                .select()
                .single();

            if (updateError) {
                throw new Error(updateError.message);
            }

            toast.success('Paiement complété avec succès');
            window.location.href = `/checkout/complete?checkout_id=${checkoutId}`;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handlePaymentError = (error: Error | SumUpResponse) => {
        if (error instanceof Error) {
            setError(error.message);
        } else if (error.error?.message) {
            setError(error.error.message);
        } else {
            setError('Le paiement a échoué. Veuillez réessayer.');
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {step === 'form' ? 'Vos informations' : 'Paiement'}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                {step === 'form' ? (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('lastName', { required: 'Le nom est requis' })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                {...register('firstName')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email', {
                                                    required: 'L\'email est requis',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Email invalide'
                                                    }
                                                })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Téléphone *
                                            </label>
                                            <input
                                                type="tel"
                                                {...register('phone', { required: 'Le téléphone est requis' })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Adresse postale *
                                            </label>
                                            <textarea
                                                {...register('address', { required: 'L\'adresse est requise' })}
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                            />
                                            {errors.address && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </div>

                                        <motion.button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#d4af37] px-4 py-2 text-sm font-medium text-white hover:bg-[#c4a030] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continuer vers le paiement
                                        </motion.button>
                                    </form>
                                ) : (
                                    checkoutId && (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-500 mb-4">
                                                Veuillez saisir vos informations de paiement ci-dessous
                                            </p>
                                            <SumUpPaymentWidget
                                                checkoutId={checkoutId}
                                                amount={parseFloat(book.price.replace(',', '.').replace('€', '').trim())}
                                                onSuccess={handlePaymentSuccess}
                                                onError={handlePaymentError}
                                                onCancel={() => setStep('form')}
                                            />
                                        </div>
                                    )
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
} 