import { Star } from 'lucide-react';
import type { Review } from '@/types/review';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[var(--color-border)]'
                            }`}
                    />
                ))}
            </div>

            {/* Comment */}
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 m-0">
                "{review.comment}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-sm text-[var(--color-text)] m-0">{review.customerName}</p>
                    <p className="text-xs text-[var(--color-text-muted)] m-0">{review.vehicleName}</p>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">{review.date}</span>
            </div>
        </div>
    );
}
