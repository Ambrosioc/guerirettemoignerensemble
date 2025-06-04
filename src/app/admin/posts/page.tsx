'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { Edit2, Eye, EyeOff, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    status: 'draft' | 'published';
    created_at: string;
    published_at: string | null;
}

export default function PostsList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    async function deletePost(post: Post) {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', post.id);

            if (error) throw error;
            setPosts(posts.filter(p => p.id !== post.id));
            setDeleteDialogOpen(false);
            setPostToDelete(null);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    async function togglePostStatus(post: Post) {
        const newStatus = post.status === 'published' ? 'draft' : 'published';
        try {
            const { error } = await supabase
                .from('posts')
                .update({
                    status: newStatus,
                    published_at: newStatus === 'published' ? new Date().toISOString() : null
                })
                .eq('id', post.id);

            if (error) throw error;
            setPosts(posts.map(p =>
                p.id === post.id
                    ? { ...p, status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : null }
                    : p
            ));
        } catch (error) {
            console.error('Error updating post status:', error);
        }
    }

    const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true;
        return post.status === filter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-serif">Articles</h2>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilter('all')}
                            className={filter === 'all' ? 'bg-accent' : ''}
                        >
                            Tous
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilter('published')}
                            className={filter === 'published' ? 'bg-accent' : ''}
                        >
                            Publiés
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilter('draft')}
                            className={filter === 'draft' ? 'bg-accent' : ''}
                        >
                            Brouillons
                        </Button>
                    </div>
                </div>
                <Link href="/admin/posts/new">
                    <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Nouvel article
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 font-medium text-gray-500">Titre</th>
                                    <th className="text-left p-4 font-medium text-gray-500">Statut</th>
                                    <th className="text-left p-4 font-medium text-gray-500">Créé le</th>
                                    <th className="text-left p-4 font-medium text-gray-500">Publié le</th>
                                    <th className="text-right p-4 font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-4">
                                            <span className="font-medium">{post.title}</span>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={post.status === 'published' ? 'success' : 'warning'}>
                                                {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {new Date(post.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString('fr-FR')
                                                : '-'}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => togglePostStatus(post)}
                                                >
                                                    {post.status === 'published' ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Link href={`/admin/posts/${post.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setPostToDelete(post);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">
                                            Aucun article trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer l&apos;article</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => postToDelete && deletePost(postToDelete)}
                        >
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 