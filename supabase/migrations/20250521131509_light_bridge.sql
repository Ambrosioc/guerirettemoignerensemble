/*
  # Fix Posts RLS Policies

  1. Changes
    - Drop existing RLS policies for posts table
    - Create new policies that properly handle user_id
    - Ensure user_id is set to authenticated user's ID for new posts
  
  2. Security
    - Maintain row-level security
    - Only allow users to manage their own posts
    - Ensure user_id is always set correctly
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
DROP POLICY IF EXISTS "Users can read own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;

-- Create new policies with proper user_id handling
CREATE POLICY "Users can read own posts"
ON posts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);