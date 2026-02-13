import { format } from 'date-fns';

/** Format price with currency symbol */
export function formatPrice(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/** Format a date string */
export function formatDate(date: string): string {
    return format(new Date(date), 'MMM dd, yyyy');
}

/** Format date with time */
export function formatDateTime(date: string, time: string): string {
    return `${format(new Date(date), 'MMM dd, yyyy')} at ${time}`;
}

/** Get star rating string */
export function getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

/** Truncate text */
export function truncate(text: string, length: number = 100): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
}
