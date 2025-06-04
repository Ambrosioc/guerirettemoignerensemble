/*
  # Fix Posts RLS Policies

  1. Changes
    - Drop existing RLS policies for posts table
    - Create new, more specific RLS policies for posts table
    - Ensure user_id is properly handled in policies

  2. Security
    - Maintain row-level security on posts table
    - Add clear policies for CRUD operations
    - Ensure authenticated users can only access their own posts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
DROP POLICY IF EXISTS "Users can read own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;

-- Create new policies
CREATE POLICY "Enable read access for own posts"
    ON posts FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id
    );

CREATE POLICY "Enable insert access for authenticated users"
    ON posts FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = user_id
    );

CREATE POLICY "Enable update access for own posts"
    ON posts FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = user_id
    )
    WITH CHECK (
        auth.uid() = user_id
    );

CREATE POLICY "Enable delete access for own posts"
    ON posts FOR DELETE
    TO authenticated
    USING (
        auth.uid() = user_id
    );