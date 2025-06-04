'use client';

import { PaymentStatus } from '@/types/payment';

interface PaymentsFiltersProps {
    status?: PaymentStatus;
    startDate?: Date;
    endDate?: Date;
}

export function PaymentsFilters({ status, startDate, endDate }: PaymentsFiltersProps) {
    return (
        <div className="flex gap-4">
            <select
                className="rounded-md border-gray-300"
                value={status || ''}
                onChange={(e) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('status', e.target.value);
                    window.location.href = url.toString();
                }}
            >
                <option value="">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="SUCCESSFUL">Réussi</option>
                <option value="FAILED">Échoué</option>
                <option value="CANCELLED">Annulé</option>
            </select>

            <input
                type="date"
                className="rounded-md border-gray-300"
                value={startDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('start_date', e.target.value);
                    window.location.href = url.toString();
                }}
            />

            <input
                type="date"
                className="rounded-md border-gray-300"
                value={endDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('end_date', e.target.value);
                    window.location.href = url.toString();
                }}
            />
        </div>
    );
} 