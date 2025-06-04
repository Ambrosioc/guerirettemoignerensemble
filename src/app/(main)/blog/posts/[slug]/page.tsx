'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    content: string;
    cover_image: string;
    published_at: string;
    category: string;
    status: string;
}

const categoryLabels: { [key: string]: string } = {
    'spiritualite': 'Spiritualité',
    'developpement-personnel': 'Développement Personnel',
    'temoignages': 'Témoignages',
    'reflexions': 'Réflexions',
    'actualites': 'Actualités'
};

export default function PostDetail() {
    const params = useParams();
    const router = useRouter();
    const { session } = useAuth();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isAdmin = session?.user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

    useEffect(() => {
        fetchPost();
    }, [params.slug]);

    async function fetchPost() {
        try {
            setLoading(true);
            let query = supabase
                .from('posts')
                .select('*')
                .eq('slug', params.slug);

            // Si l'utilisateur n'est pas admin, on ne récupère que les articles publiés
            if (!isAdmin) {
                query = query.eq('status', 'published');
            }

            const { data, error } = await query.single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // Article non trouvé ou non accessible
                    router.push('/404');
                    return;
                }
                throw error;
            }

            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
            setError('Article non trouvé');
            router.push('/404');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#faf7f2] pt-60 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-[#faf7f2] pt-60">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-serif text-gray-900 mb-4">Article non trouvé</h1>
                    <p className="text-gray-600 mb-8">Cet article n&apos;existe pas ou n&apos;est pas accessible.</p>
                    <Link href="/blog">
                        <Button variant="outline">Retour aux articles</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <AnimatedPage>
            <article className="min-h-screen bg-[#faf7f2] pt-60">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Article Header */}
                        <FadeIn>
                            <div className="text-center mb-12">
                                {post.category && (
                                    <span className="text-sm text-[#d4af37] mb-4 block">
                                        {categoryLabels[post.category] || post.category}
                                    </span>
                                )}
                                {isAdmin && post.status === 'draft' && (
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                                            Brouillon
                                        </span>
                                    </div>
                                )}
                                <h1 className="text-4xl md:text-5xl font-serif mb-6">{post.title}</h1>
                                <div className="flex items-center justify-center gap-4">
                                    <time className="text-gray-500">
                                        {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </time>
                                    {isAdmin && (
                                        <Link href={`/admin/posts/${post.id}`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit2 className="h-4 w-4" />
                                                Modifier
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Cover Image */}
                        {post.cover_image && (
                            <FadeIn delay={0.2}>
                                <motion.div
                                    className="relative aspect-[16/9] mb-12 rounded-xl overflow-hidden shadow-lg"
                                    initial={{ scale: 1.1, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </FadeIn>
                        )}

                        {/* Content */}
                        <FadeIn delay={0.3}>
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </FadeIn>

                        {/* Navigation */}
                        <FadeIn delay={0.4}>
                            <div className="mt-12 pt-8 border-t">
                                <Link href="/blog">
                                    <Button variant="outline">← Retour aux articles</Button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </article>
        </AnimatedPage>
    );
} 