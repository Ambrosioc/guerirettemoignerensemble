/*
  # Fix RLS policies for posts table

  1. Changes
    - Drop existing policies
    - Create new policies with proper user_id handling
    - Ensure authenticated users can manage their own posts

  2. Security
    - Maintain RLS enabled
    - Add explicit policies for CRUD operations
    - Ensure user_id matches auth.uid() for all operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
DROP POLICY IF EXISTS "Users can read own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Enable delete access for own posts" ON posts;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable read access for own posts" ON posts;
DROP POLICY IF EXISTS "Enable update access for own posts" ON posts;

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