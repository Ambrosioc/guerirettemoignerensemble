'use client';

import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface Payment {
    id: string;
    client_full_name: string;
    email: string;
    checkout_reference: string;
    transaction_code: string | null;
    amount: number;
    status: 'SUCCESSFUL' | 'PENDING' | 'CANCELLED' | 'FAILED';
    created_at: string;
}

const statusConfig = {
    SUCCESSFUL: {
        label: 'Payé',
        className: 'bg-green-100 text-green-800'
    },
    PENDING: {
        label: 'En attente',
        className: 'bg-yellow-100 text-yellow-800'
    },
    CANCELLED: {
        label: 'Annulé',
        className: 'bg-red-100 text-red-800'
    },
    FAILED: {
        label: 'Échoué',
        className: 'bg-red-100 text-red-800'
    }
};

export default function PaymentsTable() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('payments_with_clients')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPayments(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[200px] flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Référence
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Montant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {payment.client_full_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {payment.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {payment.checkout_reference}
                                </div>
                                {payment.transaction_code && (
                                    <div className="text-sm text-gray-500">
                                        {payment.transaction_code}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {new Intl.NumberFormat('fr-FR', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    }).format(payment.amount)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[payment.status].className}`}>
                                    {statusConfig[payment.status].label}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {format(new Date(payment.created_at), 'PPP à HH:mm', { locale: fr })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {payments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Aucun paiement trouvé
                </div>
            )}
        </div>
    );
} 