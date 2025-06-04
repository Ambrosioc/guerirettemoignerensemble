'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';

export default function LegalNotice() {
    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <h1 className="text-4xl font-serif mb-12 text-center">Mentions Légales</h1>
                        </FadeIn>

                        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                            <FadeIn delay={0.1}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">1. Éditeur du site</h2>
                                    <p className="text-gray-600">
                                        Ce site est édité par Merveille Grâce LUTETE, auteure et éditrice.
                                        <br />
                                        Adresse : Paris, France
                                        <br />
                                        Email : <a href="mailto:merveillegrace-helene@outlook.com" className="hover:text-[#d4af37] transition-colors">merveillegrace-helene@outlook.com</a>
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">2. Hébergement</h2>
                                    <p className="text-gray-600">
                                        Ce site est hébergé par Netlify Inc.
                                        <br />
                                        Adresse : 2325 3rd Street, Suite 215, San Francisco, California 94107
                                        <br />
                                        Site web : www.netlify.com
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">3. Propriété intellectuelle</h2>
                                    <p className="text-gray-600">
                                        L&apos;ensemble du contenu de ce site (textes, images, photographies, logo, etc.) est la propriété
                                        exclusive de Merveille Grâce LUTETE ou de ses partenaires. Toute reproduction, représentation,
                                        modification ou adaptation totale ou partielle du site et de son contenu, par quelque procédé
                                        que ce soit et sur quelque support que ce soit, est strictement interdite sans l&apos;autorisation
                                        écrite préalable de Merveille Grâce LUTETE.
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">4. Liens hypertextes</h2>
                                    <p className="text-gray-600">
                                        Le site peut contenir des liens vers d&apos;autres sites internet. Merveille Grâce LUTETE n&apos;exerce
                                        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                                    </p>
                                </section>
                            </FadeIn>

                            <FadeIn delay={0.5}>
                                <section>
                                    <h2 className="text-2xl font-serif mb-4">5. Crédits</h2>
                                    <p className="text-gray-600">
                                        Conception et développement : Merveille Grâce LUTETE
                                        <br />
                                        Images : Pexels
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