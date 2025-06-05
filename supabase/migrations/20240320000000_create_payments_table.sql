-- Clean up existing elements
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

-- Create payment status enum
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED', 'CANCELLED');

-- Create clients table
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checkout_reference TEXT UNIQUE NOT NULL,
    transaction_id TEXT,
    transaction_code TEXT,
    status payment_status DEFAULT 'PENDING' NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR' NOT NULL,
    product_id TEXT,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    customer_email TEXT,
    customer_name TEXT,
    customer_address TEXT,
    payment_method TEXT,
    error_message TEXT,
    merchant_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Create user roles table
CREATE TABLE user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_checkout_reference ON payments(checkout_reference);
CREATE INDEX idx_payments_transaction_code ON payments(transaction_code);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS and create policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Policies for clients
CREATE POLICY "clients: insert all" ON clients FOR INSERT WITH CHECK (true);
CREATE POLICY "clients: select own" ON clients FOR SELECT USING (true);

-- Policies for payments
CREATE POLICY "users can insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "users can update own payments" ON payments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);

-- Policy for admin access
CREATE POLICY "admin can view all payments"
    ON payments FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'ADMIN'
        )
    );

-- Add comments for better documentation
COMMENT ON TABLE payments IS 'Table storing payment transactions with status tracking and user relations';
COMMENT ON COLUMN payments.transaction_code IS 'Unique internal or external transaction reference code';
COMMENT ON COLUMN payments.checkout_reference IS 'Unique reference for the checkout session';
COMMENT ON COLUMN payments.status IS 'Current status of the payment (PENDING, SUCCESSFUL, FAILED, CANCELLED)';

-- Create view for payments with client information
CREATE OR REPLACE VIEW payments_with_clients AS
SELECT 
    p.*,
    c.first_name,
    c.last_name,
    c.email as client_email,
    c.phone as client_phone,
    c.address as client_address,
    u.email as user_email,
    ur.role as user_role
FROM payments p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN auth.users u ON p.user_id = u.id
LEFT JOIN user_roles ur ON u.id = ur.user_id;

-- Add RLS policy for the view
ALTER VIEW payments_with_clients SET (security_invoker = true);

-- Add comment for the view
COMMENT ON VIEW payments_with_clients IS 'Vue complète des paiements avec informations clients, utilisateurs et rôles'; 

ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
