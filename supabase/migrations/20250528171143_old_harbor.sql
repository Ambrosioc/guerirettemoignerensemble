-- Create the storage bucket
insert into storage.buckets (id, name, public)
values ('posts', 'posts', true);

-- Policy to allow public read access to files
create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'posts' );

-- Policy to allow authenticated users to upload files
create policy "Authenticated users can upload files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'posts'
  and owner = auth.uid()
);

-- Policy to allow users to update and delete their own files
create policy "Users can update their own files"
on storage.objects for update
to authenticated
using ( bucket_id = 'posts' and owner = auth.uid() )
with check ( bucket_id = 'posts' and owner = auth.uid() );

create policy "Users can delete their own files"
on storage.objects for delete
to authenticated
using ( bucket_id = 'posts' and owner = auth.uid() );