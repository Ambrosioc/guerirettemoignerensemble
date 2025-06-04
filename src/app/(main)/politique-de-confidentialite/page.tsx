'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';

export default function Privacy() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <h1 className="text-4xl font-serif mb-12 text-center">Politique de Confidentialité</h1>
                        </FadeIn>

                        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                            <FadeIn delay={0.1}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">1. Collecte des données personnelles</h2>
                                    <p className="text-gray-600">
                                        Nous collectons les informations suivantes lorsque vous utilisez notre site :
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600">
                                        <li>Adresse email (pour l&apos;inscription à la newsletter)</li>
                                        <li>Nom et prénom (pour le formulaire de contact)</li>
                                        <li>Données de navigation (cookies)</li>
                                    </ul>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">2. Utilisation des données</h2>
                                    <p className="text-gray-600">
                                        Les données collectées sont utilisées pour :
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600">
                                        <li>Vous envoyer notre newsletter</li>
                                        <li>Répondre à vos demandes via le formulaire de contact</li>
                                        <li>Améliorer votre expérience de navigation</li>
                                        <li>Analyser l&apos;utilisation du site</li>
                                    </ul>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">3. Protection des données</h2>
                                    <p className="text-gray-600">
                                        Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
                                        personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
                                        Les données sont stockées sur des serveurs sécurisés et l&apos;accès est strictement limité
                                        aux personnes autorisées.
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">4. Vos droits</h2>
                                    <p className="text-gray-600">
                                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
                                        des droits suivants concernant vos données personnelles :
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600">
                                        <li>Droit d&apos;accès</li>
                                        <li>Droit de rectification</li>
                                        <li>Droit à l&apos;effacement</li>
                                        <li>Droit à la limitation du traitement</li>
                                        <li>Droit à la portabilité des données</li>
                                        <li>Droit d&apos;opposition</li>
                                    </ul>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.5}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">5. Cookies</h2>
                                    <p className="text-gray-600">
                                        Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez
                                        configurer votre navigateur pour refuser tous les cookies ou pour être informé lorsqu&apos;un
                                        cookie est envoyé. Notez cependant que certaines fonctionnalités du site pourraient ne
                                        pas fonctionner correctement sans cookies.
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.6}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">6. Contact</h2>
                                    <p className="text-gray-600">
                                        Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
                                        vous pouvez nous contacter à l&apos;adresse suivante : <a href="mailto:merveillegrace-helene@outlook.com" className="hover:text-[#d4af37] transition-colors">merveillegrace-helene@outlook.com</a>
                                    </p>
                                </section>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
} 