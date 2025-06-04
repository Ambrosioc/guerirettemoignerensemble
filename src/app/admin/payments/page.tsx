'use client';

import PaymentsTable from '@/components/admin/PaymentsTable';

export default function AdminPaymentsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Suivi des paiements</h1>
            <PaymentsTable />
        </div>
    );
} 