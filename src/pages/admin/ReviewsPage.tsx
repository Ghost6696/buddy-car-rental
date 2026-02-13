import { useState } from 'react';
import { mockReviews } from '@/api/mock-data';
import { Star, Check, X, Trash2 } from 'lucide-react';
import type { Review } from '@/types/review';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

    const filtered = reviews.filter(r => {
        if (filter === 'approved') return r.approved;
        if (filter === 'pending') return !r.approved;
        return true;
    });

    const approve = (id: string) => setReviews(rs => rs.map(r => r.id === id ? { ...r, approved: true } : r));
    const reject = (id: string) => setReviews(rs => rs.map(r => r.id === id ? { ...r, approved: false } : r));
    const remove = (id: string) => setReviews(rs => rs.filter(r => r.id !== id));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Reviews</h1>
                <div className="flex gap-2">
                    {(['all', 'approved', 'pending'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map(review => (
                    <div key={review.id} className="bg-white rounded-xl border border-[var(--color-border)] p-5 flex gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{review.customerName}</span>
                                <span className={`badge ${review.approved ? 'badge-success' : 'badge-warning'}`}>
                                    {review.approved ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[var(--color-border)]'}`} />
                                ))}
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-1">"{review.comment}"</p>
                            <p className="text-xs text-[var(--color-text-muted)]">{review.vehicleName} · {review.date}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                            {!review.approved && (
                                <button onClick={() => approve(review.id)} className="p-2 rounded-lg hover:bg-green-50 text-[var(--color-success)]" title="Approve">
                                    <Check className="w-4 h-4" />
                                </button>
                            )}
                            {review.approved && (
                                <button onClick={() => reject(review.id)} className="p-2 rounded-lg hover:bg-amber-50 text-[var(--color-accent-dark)]" title="Unapprove">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button onClick={() => remove(review.id)} className="p-2 rounded-lg hover:bg-red-50 text-[var(--color-error)]" title="Delete">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
