-- Drop existing types
DROP TYPE IF EXISTS payment_status CASCADE;


-- Recreate payment_status type
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED');

-- Create clients table
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies for clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Enable public read access" ON clients
    FOR SELECT
    TO PUBLIC
    USING (true);

-- Allow public insert access
CREATE POLICY "Enable public insert access" ON clients
    FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

-- Add foreign key to payments table
ALTER TABLE payments 
ADD COLUMN client_id UUID REFERENCES clients(id);

-- Create index for faster lookups
CREATE INDEX idx_payments_client_id ON payments(client_id);

-- Trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 