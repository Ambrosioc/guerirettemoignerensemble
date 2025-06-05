'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import NewsletterForm from '@/components/NewsletterForm';
import PaymentModal from '@/components/PaymentModal';
import { motion } from 'framer-motion';
import { BookIcon, BookMarked, Calendar, Quote, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Book {
    id: number;
    title: string;
    publishDate: string;
    isbn: string;
    price: string;
    description: string;
    excerpt: string;
    themes: string[];
    type: string;
    coverImage: string;
    longDescription?: string;
    amazonUrl?: string;
    fnacUrl?: string;
}

const books: Book[] = [
    {
        id: 1,
        title: "Perplexité Humaine",
        publishDate: "24 septembre 2019",
        isbn: "979-1-097670-40-5",
        price: "12,00 €",
        description: "Un livre introspectif mêlant réflexions, philosophie, psychologie du quotidien et spiritualité. L'auteure invite le lecteur à reconsidérer sa condition humaine, à guérir intérieurement et à retrouver le sens de son existence.",
        excerpt: "Au-delà de toutes les divergences et inégalités [...] sera t-elle aussi lourde que la pesanteur de l'atmosphère?",
        themes: ["Perplexité existentielle", "Développement personnel", "Condition humaine", "Spiritualité"],
        type: "Essai / Réflexion",
        coverImage: "/8C4AD283-39BE-43C0-9EBF-CAD6A39BD23B_4_5005_c.jpeg",
        amazonUrl: "#",
    },
    {
        id: 2,
        title: "Embrasée pour un nouveau départ",
        publishDate: "2025",
        isbn: "979-1-097670-40-5",
        price: "17,00 €",
        description: "Un témoignage poignant sur la transformation à travers l'épreuve. Suite à la perte de sa mère, l'autrice nous livre son parcours de reconstruction, où la foi devient le pilier central de sa guérison. Une œuvre de résilience qui donne voix à ceux qui traversent des périodes d'obscurité.",
        excerpt: "Il est temps pour moi de briller et de ne plus me cacher. [...] Le changement commence par une prise de conscience, un renoncement aux choses anciennes et le revêtement d'un nouvel état d'esprit : c'est par la suite que vient l'embrasement.",
        themes: ["Résilience & foi", "Éveil personnel", "Transformation intérieure", "Renaissance spirituelle"],
        type: "Témoignage / Essai personnel",
        coverImage: "embrasee.png",
        longDescription: `Dans ce récit, l'Autrice nous livre un témoignage poignant sur sa transformation à travers la douleur, après le décès de sa mère. Elle y dévoile ses luttes intérieures, physiques et spirituelles, offrant un message d'espoir à tous ceux qui traversent des épreuves similaires.

L'autrice est portée par la foi chrétienne et la volonté d'élever la voix de celles et ceux qui souffrent en silence.`,
        amazonUrl: "#",
    }
];

export default function Works() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleBuyClick = (book: Book) => {
        setSelectedBook(book);
        setIsPaymentModalOpen(true);
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-24">
                {/* Hero Section */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <FadeIn>
                                <h1 className="text-4xl md:text-5xl font-serif mb-6">Œuvres</h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-xl text-gray-600">
                                    Découvrez les ouvrages de Merveille Grâce LUTETE, des textes qui invitent à la réflexion,
                                    à la transformation intérieure et à l'élévation spirituelle.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Books Section */}
                <section className="pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto space-y-16">
                            {books.map((book, index) => (
                                <FadeIn key={book.id} delay={0.2 * (index + 1)}>
                                    <motion.div
                                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-8">
                                            {/* Book Header */}
                                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                {/* Left Column: Cover */}
                                                <div>
                                                    <motion.div
                                                        className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg mx-auto max-w-md"
                                                        whileHover={{ scale: 1.02 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <img
                                                            src={book.coverImage}
                                                            alt={`Couverture de ${book.title}`}
                                                            className="w-full h-full object-contain bg-[#faf7f2]"
                                                        />
                                                    </motion.div>
                                                </div>

                                                {/* Right Column: Details and Actions */}
                                                <div>
                                                    <h2 className="text-3xl font-serif mb-2">{book.title}</h2>
                                                    <p className="text-xl text-gray-600 mb-6">par Merveille Grâce LUTETE</p>

                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                                                        <span className="flex items-center gap-2">
                                                            <Calendar size={16} />
                                                            {book.publishDate}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <BookMarked size={16} />
                                                            ISBN : {book.isbn}
                                                        </span>
                                                    </div>

                                                    <div className="text-2xl font-semibold text-[#d4af37] mb-4">
                                                        {book.price}
                                                    </div>

                                                    {/* Themes */}
                                                    <div className="mb-8">
                                                        <h3 className="font-serif text-lg mb-3">Thématiques</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {book.themes.map((theme, index) => (
                                                                <motion.span
                                                                    key={index}
                                                                    className="px-3 py-1 bg-[#faf7f2] text-gray-700 rounded-full text-sm"
                                                                    whileHover={{ scale: 1.05 }}
                                                                >
                                                                    {theme}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="space-y-4">
                                                        <motion.button
                                                            onClick={() => handleBuyClick(book)}
                                                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#c4a030] transition-colors"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                                            Acheter maintenant
                                                        </motion.button>

                                                        <motion.button
                                                            className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-[#d4af37] text-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-white transition-colors"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <BookIcon className="w-5 h-5 mr-2" />
                                                            Lire un extrait
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Book Description */}
                                            <div className="prose prose-lg max-w-none">
                                                <h3 className="font-serif text-xl mb-4">Résumé</h3>
                                                <p className="text-gray-600">{book.longDescription || book.description}</p>
                                                <blockquote className="italic text-gray-600 border-l-4 border-[#d4af37] pl-4 my-6">
                                                    <Quote className="w-6 h-6 text-[#d4af37] mb-2" />
                                                    {book.excerpt}
                                                </blockquote>
                                            </div>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <FadeIn delay={0.3}>
                                <h2 className="text-3xl font-serif mb-6">Restez informé(e)</h2>
                                <p className="text-gray-600 mb-8">
                                    Inscrivez-vous à la newsletter pour être notifié(e) des prochaines parutions
                                    et recevoir des extraits exclusifs.
                                </p>
                                <NewsletterForm />
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </div>

            {/* Payment Modal */}
            {selectedBook && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => {
                        setIsPaymentModalOpen(false);
                        setSelectedBook(null);
                    }}
                    book={selectedBook}
                />
            )}
        </AnimatedPage>
    );
} 