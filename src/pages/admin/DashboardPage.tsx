import { useState, useEffect } from 'react';
import { Car, BookOpen, Star, DollarSign } from 'lucide-react';
import { getAllReservations } from '@/api/reservations';
import { mockVehicles, mockReviews } from '@/api/mock-data';
import { formatPrice } from '@/utils/formatters';
import type { Reservation } from '@/types/booking';

export default function DashboardPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        getAllReservations().then(setReservations);
    }, []);

    const totalRevenue = reservations
        .filter(r => r.status !== 'cancelled')
        .reduce((sum, r) => sum + r.totalPrice, 0);

    const stats = [
        { icon: <Car className="w-5 h-5" />, label: 'Vehicles', value: mockVehicles.length, color: 'bg-blue-100 text-[var(--color-primary)]' },
        { icon: <BookOpen className="w-5 h-5" />, label: 'Bookings', value: reservations.length, color: 'bg-green-100 text-[var(--color-success)]' },
        { icon: <Star className="w-5 h-5" />, label: 'Reviews', value: mockReviews.length, color: 'bg-amber-100 text-[var(--color-accent-dark)]' },
        { icon: <DollarSign className="w-5 h-5" />, label: 'Revenue', value: formatPrice(totalRevenue), color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl border border-[var(--color-border)] p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text-muted)] mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl border border-[var(--color-border)]">
                <div className="p-5 border-b border-[var(--color-border)]">
                    <h2 className="font-semibold">Recent Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[var(--color-surface)]">
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Code</th>
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Vehicle</th>
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Customer</th>
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Dates</th>
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Total</th>
                                <th className="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(res => (
                                <tr key={res.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]">
                                    <td className="px-5 py-3 font-medium">{res.confirmationCode}</td>
                                    <td className="px-5 py-3">{res.vehicleName}</td>
                                    <td className="px-5 py-3">{res.customer.firstName} {res.customer.lastName}</td>
                                    <td className="px-5 py-3 text-xs">{res.dates.pickupDate} → {res.dates.dropoffDate}</td>
                                    <td className="px-5 py-3 font-medium">{formatPrice(res.totalPrice)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`badge ${res.status === 'confirmed' ? 'badge-success'
                                                : res.status === 'cancelled' ? 'badge-error'
                                                    : 'badge-warning'
                                            }`}>
                                            {res.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {reservations.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-10 text-center text-[var(--color-text-muted)]">No bookings yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
