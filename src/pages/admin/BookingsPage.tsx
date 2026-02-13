import { useState, useEffect } from 'react';
import { getAllReservations } from '@/api/reservations';
import { formatPrice } from '@/utils/formatters';
import { Eye, Search } from 'lucide-react';
import type { Reservation } from '@/types/booking';

export default function BookingsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        getAllReservations().then(setReservations);
    }, []);

    const filtered = reservations.filter(r => {
        const matchesSearch = search === '' ||
            r.confirmationCode.toLowerCase().includes(search.toLowerCase()) ||
            r.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
            r.customer.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Bookings</h1>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                        className="input pl-10"
                        placeholder="Search by code, vehicle, or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="input w-auto"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[var(--color-surface)]">
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Code</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Vehicle</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Customer</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Pickup</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Return</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Total</th>
                            <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(res => (
                            <tr key={res.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]">
                                <td className="px-5 py-3 font-medium">{res.confirmationCode}</td>
                                <td className="px-5 py-3">{res.vehicleName}</td>
                                <td className="px-5 py-3">
                                    <p className="m-0">{res.customer.firstName} {res.customer.lastName}</p>
                                    <p className="m-0 text-xs text-[var(--color-text-muted)]">{res.customer.email}</p>
                                </td>
                                <td className="px-5 py-3 text-xs">{res.dates.pickupDate}</td>
                                <td className="px-5 py-3 text-xs">{res.dates.dropoffDate}</td>
                                <td className="px-5 py-3 font-medium">{formatPrice(res.totalPrice)}</td>
                                <td className="px-5 py-3">
                                    <span className={`badge ${res.status === 'confirmed' ? 'badge-success'
                                            : res.status === 'cancelled' ? 'badge-error'
                                                : res.status === 'completed' ? 'badge-info'
                                                    : 'badge-warning'
                                        }`}>
                                        {res.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={7} className="px-5 py-10 text-center text-[var(--color-text-muted)]">No bookings found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
