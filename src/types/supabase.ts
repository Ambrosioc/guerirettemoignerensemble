export type Database = {
    public: {
        Tables: {
            clients: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    address: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    email: string;
                    address: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    email?: string;
                    address?: string;
                    created_at?: string;
                };
            };
            payments: {
                Row: {
                    id: string;
                    checkout_reference: string;
                    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
                    amount: number;
                    product_id: string;
                    client_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    checkout_reference: string;
                    status?: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
                    amount: number;
                    product_id: string;
                    client_id: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    checkout_reference?: string;
                    status?: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
                    amount?: number;
                    product_id?: string;
                    client_id?: string;
                    created_at?: string;
                };
            };
        };
    };
}; 