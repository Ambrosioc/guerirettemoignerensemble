-- Add excerpt column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt text;

-- Update existing rows to have an empty excerpt
UPDATE posts SET excerpt = '' WHERE excerpt IS NULL; 