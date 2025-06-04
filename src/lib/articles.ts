import { Article, CreateArticle, UpdateArticle } from '@/types/article';
import { createBrowserClient } from '@supabase/ssr';
import { deleteImage } from './supabase-storage';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getArticles() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
}

export async function getArticleBySlug(slug: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data as Article;
}

export async function createArticle(article: CreateArticle) {
    const { data, error } = await supabase
        .from('posts')
        .insert([article])
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function updateArticle(article: UpdateArticle) {
    const { id, ...updateData } = article;
    const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function deleteArticle(id: string, coverImagePath?: string) {
    // Delete cover image if it exists
    if (coverImagePath) {
        try {
            await deleteImage(coverImagePath, 'covers');
        } catch (error) {
            console.error('Failed to delete cover image:', error);
            // Continue with article deletion even if image deletion fails
        }
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function publishArticle(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .update({
            status: 'published',
            published_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function unpublishArticle(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .update({
            status: 'draft',
            published_at: null,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
} 