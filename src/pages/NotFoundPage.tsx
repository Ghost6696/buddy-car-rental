import { Link } from 'react-router-dom';
import { Car, Home } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] mb-6">
                    <Car className="w-10 h-10" />
                </div>
                <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-2">404</h1>
                <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
                <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm mx-auto">
                    Looks like you've taken a wrong turn. Let us help you find your way back.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link to="/" className="btn btn-primary">
                        <Home className="w-4 h-4" /> Back to Home
                    </Link>
                    <Link to="/vehicles" className="btn btn-secondary">
                        Browse Cars
                    </Link>
                </div>
            </div>
        </div>
    );
}
