-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published posts
CREATE POLICY "Public can view published posts" ON posts
FOR SELECT
USING (status = 'published');

-- Policy for authenticated admin to do everything
CREATE POLICY "Admin has full access" ON posts
FOR ALL
USING (
    auth.uid() IN (
        SELECT user_id 
        FROM users 
        WHERE role = 'admin'
    )
)
WITH CHECK (
    auth.uid() IN (
        SELECT user_id 
        FROM users 
        WHERE role = 'admin'
    )
);

-- By default, deny all other operations
ALTER TABLE posts FORCE ROW LEVEL SECURITY; 