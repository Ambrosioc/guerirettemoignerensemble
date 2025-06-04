'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import NewsletterForm from '@/components/NewsletterForm';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    meta_description: string;
    slug: string;
}

export default function Home() {
    const [latestPosts, setLatestPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestPosts();
    }, []);

    async function fetchLatestPosts() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('id, title, meta_description, slug')
                .eq('status', 'published')
                .order('published_at', { ascending: false })
                .limit(3);

            if (error) throw error;
            setLatestPosts(data || []);
        } catch (error) {
            console.error('Error fetching latest posts:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2]">
                {/* Hero Section */}
                <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg")',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(250, 247, 242, 0.7)'
                }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf7f2]"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <FadeIn>
                            <h1 className="text-4xl md:text-6xl font-serif mb-6">Merveille Grâce LUTETE</h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <blockquote className="text-xl md:text-2xl italic mb-8 max-w-2xl mx-auto">
                                &ldquo;Dieu fait que nos marques et nos cicatrices deviennent nos plus beaux trophées.&rdquo;
                            </blockquote>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <Link
                                href="/biographie"
                                className="inline-block px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors"
                            >
                                Découvrir l&apos;auteure
                            </Link>
                        </FadeIn>
                    </div>
                </section>

                {/* Brief Introduction */}
                <section className="py-16 bg-white">
                    <FadeIn>
                        <div className="container mx-auto px-4 max-w-3xl text-center">
                            <p className="text-lg leading-relaxed mb-8">
                                Écrivaine passionnée et chrétienne engagée, Merveille Grâce LUTETE partage sa vision
                                à travers des œuvres qui touchent l&apos;âme et élèvent l&apos;esprit. Son écriture, empreinte
                                de spiritualité et d&apos;authenticité, invite à la réflexion et à la transformation personnelle.
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* Latest Book */}
                <section className="py-16 bg-[#faf7f2]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2">
                                <FadeIn>
                                    <motion.img
                                        src="/embrasee.png"
                                        alt="Couverture de Embrasée pour un nouveau départ"
                                        className="rounded-lg shadow-xl w-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </FadeIn>
                            </div>
                            <div className="w-full md:w-1/2">
                                <FadeIn>
                                    <div>
                                        <h2 className="text-3xl font-serif mb-4">Embrasée pour un nouveau départ</h2>
                                        <p className="text-lg mb-6">
                                            Un témoignage poignant sur la transformation à travers l&apos;épreuve. Suite à la perte de sa mère,
                                            l&apos;autrice nous livre son parcours de reconstruction, où la foi devient le pilier central de sa
                                            guérison.
                                        </p>
                                        <Link href="/oeuvres">
                                            <motion.button
                                                className="px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Découvrir l&apos;ouvrage
                                            </motion.button>
                                        </Link>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Blog Posts */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <FadeIn>
                            <h2 className="text-3xl font-serif text-center mb-12">Derniers Articles</h2>
                        </FadeIn>
                        {loading ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
                            </div>
                        ) : latestPosts.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {latestPosts.map((post, index) => (
                                    <FadeIn key={post.id} delay={index * 0.2}>
                                        <motion.article
                                            className="bg-[#faf7f2] rounded-lg p-6"
                                            whileHover={{ y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-serif mb-4">{post.title}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.meta_description}
                                            </p>
                                            <Link
                                                href={`/blog/posts/${post.slug}`}
                                                className="text-[#d4af37] hover:text-[#b39030] font-medium"
                                            >
                                                Lire la suite →
                                            </Link>
                                        </motion.article>
                                    </FadeIn>
                                ))}
                            </div>
                        ) : (
                            <FadeIn>
                                <p className="text-center text-gray-600 text-lg">
                                    Aucun article n&apos;a été publié pour le moment.
                                </p>
                            </FadeIn>
                        )}
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-16 bg-[#faf7f2]">
                    <div className="container mx-auto px-4 max-w-2xl text-center">
                        <FadeIn>
                            <h2 className="text-3xl font-serif mb-6">Restez informé(e)</h2>
                            <p className="text-gray-600 mb-8">
                                Recevez les prochaines publications, articles et événements de Merveille Grâce LUTETE
                            </p>
                            <NewsletterForm />
                        </FadeIn>
                    </div>
                </section>
            </div>
        </AnimatedPage>
    );
} 