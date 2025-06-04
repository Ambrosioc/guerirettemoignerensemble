'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    meta_description: string;
    slug: string;
    cover_image: string;
    published_at: string;
    category: string;
}

const POSTS_PER_PAGE = 6;

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    async function fetchPosts() {
        try {
            setLoading(true);
            // Fetch total count
            const { count } = await supabase
                .from('posts')
                .select('*', { count: 'exact' })
                .eq('status', 'published');

            setTotalPosts(count || 0);

            // Fetch paginated posts
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false })
                .range((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE - 1);

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const categoryLabels: { [key: string]: string } = {
        'spiritualite': 'Spiritualité',
        'developpement-personnel': 'Développement Personnel',
        'temoignages': 'Témoignages',
        'reflexions': 'Réflexions',
        'actualites': 'Actualités'
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-[#faf7f2] pt-60">
                {/* Hero Section */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <FadeIn>
                                <h1 className="text-4xl md:text-5xl font-serif mb-6">Blog</h1>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-xl text-gray-600">
                                    Découvrez mes réflexions, témoignages et enseignements sur la spiritualité
                                    et le développement personnel.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                            </div>
                        ) : posts.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                    {posts.map((post, index) => (
                                        <FadeIn key={post.id} delay={index * 0.1}>
                                            <Link href={`/blog/posts/${post.slug}`}>
                                                <motion.article
                                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                                    whileHover={{ y: -5 }}
                                                >
                                                    {post.cover_image && (
                                                        <div className="aspect-[16/9] relative">
                                                            <Image
                                                                src={post.cover_image}
                                                                alt={post.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-6">
                                                        {post.category && (
                                                            <span className="text-sm text-[#d4af37] mb-2 block">
                                                                {categoryLabels[post.category] || post.category}
                                                            </span>
                                                        )}
                                                        <h2 className="text-xl font-serif mb-3">{post.title}</h2>
                                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                                            {post.meta_description}
                                                        </p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                            <span className="text-[#d4af37] font-medium">Lire la suite →</span>
                                                        </div>
                                                    </div>
                                                </motion.article>
                                            </Link>
                                        </FadeIn>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-12">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-2" />
                                            Précédent
                                        </Button>
                                        <span className="text-gray-600">
                                            Page {currentPage} sur {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Suivant
                                            <ChevronRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">
                                    Aucun article n&apos;a été publié pour le moment.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AnimatedPage>
    );
}
