-- Add transaction_code column to payments table
ALTER TABLE payments ADD COLUMN transaction_code text;

-- Create or update the view for payments with client information
CREATE OR REPLACE VIEW payments_with_clients AS
SELECT 
    p.*,
    c.first_name,
    c.last_name,
    c.email,
    CONCAT(c.first_name, ' ', c.last_name) as client_full_name
FROM payments p
LEFT JOIN clients c ON p.client_id = c.id; 