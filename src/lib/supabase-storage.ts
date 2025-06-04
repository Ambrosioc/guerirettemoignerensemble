import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const STORAGE_BUCKET = 'images';
const COVERS_BUCKET = 'covers';

export async function uploadImage(file: File) {
    try {
        const supabase = createClientComponentClient();

        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        // Upload the file
        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, file);

        if (error) {
            throw error;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);

        return {
            url: publicUrl,
            path: fileName
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export async function uploadCoverImage(file: File) {
    try {
        const supabase = createClientComponentClient();

        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        // Upload the file
        const { error } = await supabase.storage
            .from(COVERS_BUCKET)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from(COVERS_BUCKET)
            .getPublicUrl(fileName);

        return {
            url: publicUrl,
            path: fileName
        };
    } catch (error) {
        console.error('Error uploading cover image:', error);
        throw error;
    }
}

export async function deleteImage(path: string, bucket: 'images' | 'covers' = 'images') {
    try {
        const supabase = createClientComponentClient();
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
} 