export type ArticleStatus = 'draft' | 'published';

export interface Article {
    id: string;
    title: string;
    slug: string;
    content: string | null;
    cover_image: string | null;
    category: string;
    status: ArticleStatus;
    meta_title: string | null;
    meta_description: string | null;
    views: number;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    user_id: string;
    excerpt: string;
    published: boolean;
}

export interface CreateArticle {
    title: string;
    slug: string;
    content?: string;
    cover_image?: string;
    category: string;
    status: ArticleStatus;
    meta_title?: string;
    meta_description?: string;
}

export interface UpdateArticle extends Partial<CreateArticle> {
    id: string;
}

export type CreateArticleDTO = Pick<Article, 'title' | 'content' | 'excerpt' | 'slug'>; 