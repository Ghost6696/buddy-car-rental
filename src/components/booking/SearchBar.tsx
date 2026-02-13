import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search } from 'lucide-react';

interface SearchBarProps {
    variant?: 'hero' | 'compact';
}

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
    const navigate = useNavigate();
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (pickupDate) params.set('pickup', pickupDate);
        if (dropoffDate) params.set('dropoff', dropoffDate);
        if (location) params.set('location', location);
        navigate(`/vehicles?${params.toString()}`);
    };

    const isHero = variant === 'hero';

    return (
        <form
            onSubmit={handleSearch}
            className={`${isHero
                    ? 'bg-white rounded-2xl shadow-xl p-6 md:p-8'
                    : 'bg-white rounded-xl shadow-md p-4'
                }`}
        >
            <div className={`grid gap-4 ${isHero ? 'md:grid-cols-4' : 'md:grid-cols-4'} items-end`}>
                {/* Pickup Location */}
                <div>
                    <label className="label flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        Pickup Location
                    </label>
                    <select
                        className="input"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    >
                        <option value="">Any location</option>
                        <option value="loc1">Keflavík Airport (KEF)</option>
                        <option value="loc2">Reykjavík Downtown</option>
                        <option value="loc3">Akureyri Airport</option>
                        <option value="loc4">Hotel Pickup</option>
                    </select>
                </div>

                {/* Pickup Date */}
                <div>
                    <label className="label flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        Pickup Date
                    </label>
                    <input
                        type="date"
                        className="input"
                        value={pickupDate}
                        onChange={e => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Dropoff Date */}
                <div>
                    <label className="label flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        Return Date
                    </label>
                    <input
                        type="date"
                        className="input"
                        value={dropoffDate}
                        onChange={e => setDropoffDate(e.target.value)}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className={`btn btn-primary ${isHero ? 'btn-lg' : ''} w-full`}
                >
                    <Search className="w-4 h-4" />
                    Search Cars
                </button>
            </div>
        </form>
    );
}
