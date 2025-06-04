/*
  # Add public read access to published posts

  1. Security Changes
    - Add policy to allow public read access to published posts
    - Keep existing policies for authenticated users

  2. Notes
    - Public users can only read posts with status = 'published'
    - Authenticated users can still read all their own posts (published or draft)
*/

-- Add policy for public read access to published posts
CREATE POLICY "Public can read published posts"
    ON posts FOR SELECT
    TO public
    USING (status = 'published');