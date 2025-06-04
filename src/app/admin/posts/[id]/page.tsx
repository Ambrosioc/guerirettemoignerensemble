'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import * as Select from '@radix-ui/react-select';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Check, ChevronDown, ChevronUp, Italic, List, ListOrdered, Quote, Save, Upload, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import slugify from 'slugify';

interface PostFormData {
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    status: 'draft' | 'published';
    category: string;
    meta_title: string;
    meta_description: string;
}

const initialFormData: PostFormData = {
    title: '',
    slug: '',
    content: '',
    cover_image: '',
    status: 'draft',
    category: '',
    meta_title: '',
    meta_description: ''
};

const categories = [
    { value: 'spiritualite', label: 'Spiritualité' },
    { value: 'developpement-personnel', label: 'Développement Personnel' },
    { value: 'temoignages', label: 'Témoignages' },
    { value: 'reflexions', label: 'Réflexions' },
    { value: 'actualites', label: 'Actualités' }
];

export default function PostEditor() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { session } = useAuth();
    const [formData, setFormData] = useState<PostFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const editor = useEditor({
        extensions: [StarterKit],
        content: formData.content,
        onUpdate: ({ editor }) => {
            setFormData(prev => ({
                ...prev,
                content: editor.getHTML()
            }));
        }
    });

    useEffect(() => {
        if (id !== 'new') {
            fetchPost();
        }
    }, [id]);

    useEffect(() => {
        if (formData.cover_image) {
            setImagePreview(formData.cover_image);
        }
    }, [formData.cover_image]);

    async function fetchPost() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData(data);
                editor?.commands.setContent(data.content || '');
            }
        } catch (err) {
            console.error('Error fetching post:', err);
            setError('Failed to load post');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'title' && {
                slug: slugify(value, { lower: true, strict: true }),
                meta_title: value
            })
        }));
    };

    const handleStatusChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            status: value as 'draft' | 'published'
        }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            category: value
        }));
    };

    const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageSelect(file);
        }
    }, []);

    const handleImageSelect = (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setError('Image size must be less than 10MB');
            return;
        }

        if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
            setError('Please select a valid image file (JPG, PNG, or WebP)');
            return;
        }

        setImageFile(file);
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        setError(null);
    };

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${slugify(formData.title, { lower: true, strict: true })}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('posts')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('posts')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!session?.user?.id) {
            setError('You must be logged in to perform this action');
            setLoading(false);
            return;
        }

        try {
            let coverImageUrl = formData.cover_image;

            if (imageFile) {
                coverImageUrl = await uploadImage(imageFile);
            }

            const { error } = id !== 'new'
                ? await supabase
                    .from('posts')
                    .update({
                        ...formData,
                        cover_image: coverImageUrl,
                        updated_at: new Date().toISOString(),
                        published_at: formData.status === 'published' ? new Date().toISOString() : null
                    })
                    .eq('id', id)
                : await supabase
                    .from('posts')
                    .insert([{
                        ...formData,
                        cover_image: coverImageUrl,
                        user_id: session.user.id,
                        published_at: formData.status === 'published' ? new Date().toISOString() : null
                    }]);

            if (error) throw error;
            router.push('/admin');
        } catch (err) {
            console.error('Error saving post:', err);
            setError('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl font-serif">
                        {id !== 'new' ? 'Modifier l&apos;article' : 'Nouvel article'}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/admin')}
                            className="gap-2"
                        >
                            <X className="w-4 h-4" />
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Separator className="my-6" />

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Catégorie</Label>
                                    <Select.Root value={formData.category} onValueChange={handleCategoryChange}>
                                        <Select.Trigger
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm flex items-center justify-between"
                                        >
                                            <Select.Value placeholder="Sélectionner une catégorie" />
                                            <Select.Icon>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content className="bg-white rounded-md shadow-lg">
                                                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                                                    <ChevronUp className="h-4 w-4" />
                                                </Select.ScrollUpButton>
                                                <Select.Viewport className="p-1">
                                                    {categories.map(category => (
                                                        <Select.Item
                                                            key={category.value}
                                                            value={category.value}
                                                            className="relative flex items-center px-8 py-2 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 outline-none cursor-pointer"
                                                        >
                                                            <Select.ItemText>{category.label}</Select.ItemText>
                                                            <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                                                <Check className="h-4 w-4" />
                                                            </Select.ItemIndicator>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Viewport>
                                                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                                                    <ChevronDown className="h-4 w-4" />
                                                </Select.ScrollDownButton>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                </div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-4">
                            <Label>Image de couverture</Label>
                            <div
                                className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-[#d4af37] transition-colors"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleImageDrop}
                                onClick={() => document.getElementById('cover-image-input')?.click()}
                            >
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Cover preview"
                                            className="mx-auto max-h-64 rounded-lg object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImagePreview(null);
                                                setImageFile(null);
                                                setFormData(prev => ({ ...prev, cover_image: '' }));
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <div className="text-sm text-gray-600">
                                            <span className="text-[#d4af37]">Cliquez pour uploader</span> ou glissez-déposez
                                            <div className="mt-1 text-gray-500">PNG, JPG, WebP jusqu&apos;à 10MB</div>
                                        </div>
                                    </div>
                                )}
                                <input
                                    id="cover-image-input"
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImageSelect(file);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="space-y-4">
                            <Label>Contenu</Label>
                            <Card>
                                <CardContent className="p-0">
                                    <div className="border-b p-2 flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleBold().run()}
                                            className={editor?.isActive('bold') ? 'bg-accent' : ''}
                                        >
                                            <Bold className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                                            className={editor?.isActive('italic') ? 'bg-accent' : ''}
                                        >
                                            <Italic className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                            className={editor?.isActive('bulletList') ? 'bg-accent' : ''}
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                            className={editor?.isActive('orderedList') ? 'bg-accent' : ''}
                                        >
                                            <ListOrdered className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                                            className={editor?.isActive('blockquote') ? 'bg-accent' : ''}
                                        >
                                            <Quote className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <EditorContent editor={editor} className="prose max-w-none p-4" />
                                </CardContent>
                            </Card>
                        </div>

                        {/* SEO Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">SEO</h3>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        name="meta_title"
                                        value={formData.meta_title}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        name="meta_description"
                                        value={formData.meta_description}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Publication Status */}
                        <div className="space-y-4">
                            <Label htmlFor="status">Statut</Label>
                            <Select.Root value={formData.status} onValueChange={handleStatusChange}>
                                <Select.Trigger
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm flex items-center justify-between"
                                >
                                    <Select.Value>
                                        {formData.status === 'published' ? 'Publié' : 'Brouillon'}
                                    </Select.Value>
                                    <Select.Icon>
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className="bg-white rounded-md shadow-lg">
                                        <Select.Viewport className="p-1">
                                            <Select.Item
                                                value="draft"
                                                className="relative flex items-center px-8 py-2 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 outline-none cursor-pointer"
                                            >
                                                <Select.ItemText>Brouillon</Select.ItemText>
                                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                                    <Check className="h-4 w-4" />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                            <Select.Item
                                                value="published"
                                                className="relative flex items-center px-8 py-2 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 outline-none cursor-pointer"
                                            >
                                                <Select.ItemText>Publié</Select.ItemText>
                                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                                    <Check className="h-4 w-4" />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 