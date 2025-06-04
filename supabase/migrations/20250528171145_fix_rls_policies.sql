-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for own posts" ON posts;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable update access for own posts" ON posts;
DROP POLICY IF EXISTS "Enable delete access for own posts" ON posts;

-- Create new policies
CREATE POLICY "Enable read access for own posts"
    ON posts FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
    ON posts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for own posts"
    ON posts FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete access for own posts"
    ON posts FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id); 