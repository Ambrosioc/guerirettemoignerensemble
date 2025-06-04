-- Drop existing types
DROP TYPE IF EXISTS payment_status CASCADE;

-- Drop existing tables and dependencies
DROP TABLE IF EXISTS payments CASCADE;

-- Create enum for payment status
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED', 'CANCELLED');

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    checkout_reference TEXT UNIQUE NOT NULL,
    status payment_status DEFAULT 'PENDING' NOT NULL,
    amount DECIMAL(10,2) NOT NULL, -- Montant en euros avec 2 décimales
    currency TEXT DEFAULT 'EUR' NOT NULL,
    product_id TEXT, -- Changé en TEXT au lieu de UUID REFERENCES products(id)
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Informations supplémentaires du checkout SumUp
    transaction_id TEXT,
    merchant_code TEXT,
    payment_method TEXT,
    error_message TEXT,

    -- Protection RLS
    user_id UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_checkout_reference ON payments(checkout_reference);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- Trigger for updating updated_at
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

-- RLS Policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy pour les utilisateurs authentifiés
CREATE POLICY "Users can view their own payments"
    ON payments FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy pour les admins
CREATE POLICY "Admins can view all payments"
    ON payments FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'ADMIN'
        )
    );

-- Policy pour la création via webhook
CREATE POLICY "Allow webhook to create payments"
    ON payments FOR INSERT
    WITH CHECK (true);

-- Policy pour la mise à jour via webhook
CREATE POLICY "Allow webhook to update payments"
    ON payments FOR UPDATE
    USING (true)
    WITH CHECK (true); 