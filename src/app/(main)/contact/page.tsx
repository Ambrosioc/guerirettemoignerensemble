'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Send } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '' // Champ anti-bot invisible
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitTime, setSubmitTime] = useState<number | null>(null);

    // Enregistrer le temps de chargement de la page pour l'anti-bot
    React.useEffect(() => {
        setSubmitTime(Date.now());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Anti-bot : vérifier le honeypot
        if (formData.honeypot) {
            toast.error('Erreur de validation');
            return;
        }

        // Anti-bot : vérifier le délai minimal (3 secondes)
        if (submitTime && (Date.now() - submitTime) < 3000) {
            toast.error('Veuillez patienter quelques secondes avant de soumettre le formulaire');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue');
            }

            // Succès
            toast.success('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            
            // Réinitialiser le formulaire
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: '',
                honeypot: ''
            });

        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-60">
                {/* Hero Section */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <FadeIn>
                                <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact</h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-xl text-gray-600">
                                    Une question ? Une proposition ? N&apos;hésitez pas à me contacter.
                                    Je serais ravie d&apos;échanger avec vous.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-3 gap-8">
                                <FadeIn delay={0.3}>
                                    <motion.div
                                        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                                        whileHover={{ y: -5 }}
                                    >
                                        <Mail className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="font-serif text-xl mb-2">Email</h3>
                                        <a
                                            href="mailto:merveillegrace-helene@outlook.com"
                                            className="text-gray-600 hover:text-[#d4af37] transition-colors"
                                        >
                                            merveillegrace-helene@outlook.com
                                        </a>
                                    </motion.div>
                                </FadeIn>

                                <FadeIn delay={0.4}>
                                    <motion.div
                                        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                                        whileHover={{ y: -5 }}
                                    >
                                        <MapPin className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                                        <h3 className="font-serif text-xl mb-2">Localisation</h3>
                                        <p className="text-gray-600">Paris, France</p>
                                    </motion.div>
                                </FadeIn>

                                <FadeIn delay={0.5}>
                                    <motion.div
                                        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="flex justify-center gap-4 text-[#d4af37] mb-4">
                                            <motion.a
                                                href="https://www.instagram.com/merveillegrace_lutete"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#b39030] transition-colors"
                                                whileHover={{ scale: 1.2 }}
                                            >
                                                <Instagram className="w-8 h-8" />
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                className="hover:text-[#b39030] transition-colors"
                                                whileHover={{ scale: 1.2 }}
                                            >
                                                <Facebook className="w-8 h-8" />
                                            </motion.a>
                                        </div>
                                        <h3 className="font-serif text-xl mb-2">Réseaux sociaux</h3>
                                        <p className="text-gray-600">Suivez mon actualité</p>
                                    </motion.div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                            <FadeIn delay={0.6}>
                                <motion.div 
                                    className="bg-white rounded-xl shadow-sm p-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="font-serif text-2xl mb-6 text-center">Envoyez-moi un message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Honeypot - champ invisible pour les bots */}
                                        <input
                                            type="text"
                                            name="honeypot"
                                            value={formData.honeypot}
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Prénom *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nom *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </motion.div>
                                        </div>
                                        
                                        <motion.div whileHover={{ scale: 1.02 }}>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }}>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                                Sujet *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent bg-white"
                                                required
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Sélectionnez un sujet</option>
                                                <option value="Question générale">Question générale</option>
                                                <option value="À propos des livres">À propos des livres</option>
                                                <option value="Événements & dédicaces">Événements & dédicaces</option>
                                                <option value="Presse & médias">Presse & médias</option>
                                                <option value="Collaboration">Collaboration</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }}>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={6}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                                required
                                                disabled={isSubmitting}
                                                placeholder="Votre message..."
                                            ></textarea>
                                        </motion.div>

                                        <div className="text-center">
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={18} className="mr-2" />
                                                        Envoyer le message
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </div>
        </AnimatedPage>
    );
}