import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVehicle } from '@/api/vehicles';
import { useBookingStore } from '@/stores/bookingStore';
import { formatPrice } from '@/utils/formatters';
import { mockExtras, mockInsurances, mockReviews } from '@/api/mock-data';
import type { Vehicle } from '@/types/vehicle';
import type { Extra, Insurance } from '@/types/booking';

/* ── Material Icon helper ────────────────────────────────── */
const MI = ({ icon, className = '' }: { icon: string; className?: string }) => (
    <span className={`material-icons ${className}`}>{icon}</span>
);

/* ── Extras icon map ─────────────────────────────────────── */
const extrasIcons: Record<string, string> = {
    ext1: 'explore',
    ext2: 'child_care',
    ext3: 'child_friendly',
    ext4: 'person_add',
    ext5: 'wifi',
    ext6: 'inventory_2',
};

export default function VehicleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [heroIdx, setHeroIdx] = useState(0);
    const [selectedInsurance, setSelectedInsurance] = useState<Insurance>(mockInsurances[1]);
    const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

    const selectVehicle = useBookingStore(s => s.selectVehicle);
    const setInsurance = useBookingStore(s => s.setInsurance);
    const setExtras = useBookingStore(s => s.setExtras);

    useEffect(() => {
        if (id) {
            getVehicle(id).then(v => {
                setVehicle(v);
                setLoading(false);
            });
        }
    }, [id]);

    /* Simulated rental days */
    const rentalDays = 4;

    /* Merge images array */
    const heroImages = useMemo(() => {
        if (!vehicle) return [];
        const imgs = vehicle.images.length > 0 ? vehicle.images : [vehicle.image];
        return imgs;
    }, [vehicle]);

    const toggleExtra = (extId: string) => {
        setSelectedExtras(prev => {
            const next = new Set(prev);
            next.has(extId) ? next.delete(extId) : next.add(extId);
            return next;
        });
    };

    /* Price calculations */
    const basePrice = vehicle ? vehicle.pricePerDay * rentalDays : 0;
    const insurancePrice = selectedInsurance.pricePerDay * rentalDays;
    const extrasPrice = mockExtras
        .filter(e => selectedExtras.has(e.id))
        .reduce((sum, e) => sum + e.pricePerDay * rentalDays, 0);
    const totalPrice = basePrice + insurancePrice + extrasPrice;

    /* Reviews for this vehicle */
    const vehicleReviews = mockReviews.filter(r => r.vehicleId === id && r.approved);
    const allReviews = mockReviews.filter(r => r.approved);
    const displayReviews = vehicleReviews.length >= 2 ? vehicleReviews.slice(0, 3) : allReviews.slice(0, 3);

    const handleProceed = () => {
        if (!vehicle) return;
        selectVehicle(vehicle);
        setInsurance(selectedInsurance);
        const extrasWithSelection: Extra[] = mockExtras.map(e => ({
            ...e,
            selected: selectedExtras.has(e.id),
        }));
        setExtras(extrasWithSelection);
        navigate('/checkout');
    };

    /* ── Loading skeleton ─────────────────────────────────── */
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse">
                    <div className="w-full aspect-[21/9] bg-[#e0e0e0] rounded-xl mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-[#e0e0e0] rounded-lg" />)}
                            </div>
                            <div className="h-32 bg-[#e0e0e0] rounded-lg" />
                        </div>
                        <div className="h-96 bg-[#e0e0e0] rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
                <p className="text-[#212121]/60 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
                <Link to="/vehicles" className="inline-flex items-center gap-2 bg-[#212121] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-black transition-all no-underline">
                    Browse Our Fleet
                </Link>
            </div>
        );
    }

    const fuelIcon = vehicle.specs.fuel === 'Electric' ? 'bolt' : vehicle.specs.fuel === 'Hybrid' ? 'eco' : 'local_gas_station';

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-12">
            {/* ── Hero Carousel ────────────────────────────────── */}
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 group">
                <img
                    src={heroImages[heroIdx] || vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Overlay text */}
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${vehicle.available ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            {vehicle.available ? 'Available Now' : 'Unavailable'}
                        </span>
                        <span className="bg-[#212121]/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {vehicle.specs.fuel}
                        </span>
                        <span className="bg-[#212121]/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {vehicle.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">{vehicle.name}</h1>
                    <p className="text-white/80 text-sm mt-1">{vehicle.specs.transmission} · {vehicle.specs.seats} Seats · {vehicle.specs.doors} Doors</p>
                </div>

                {/* Nav arrows */}
                {heroImages.length > 1 && (
                    <>
                        <button
                            onClick={() => setHeroIdx(i => (i - 1 + heroImages.length) % heroImages.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                        >
                            <MI icon="chevron_left" />
                        </button>
                        <button
                            onClick={() => setHeroIdx(i => (i + 1) % heroImages.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                        >
                            <MI icon="chevron_right" />
                        </button>
                    </>
                )}

                {/* Carousel indicators */}
                {heroImages.length > 1 && (
                    <div className="absolute bottom-6 right-6 flex gap-2">
                        {heroImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroIdx(i)}
                                className={`w-8 h-1 rounded-full transition-colors ${i === heroIdx ? 'bg-white' : 'bg-white/40'}`}
                                aria-label={`Image ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── Main Grid: Details + Sidebar ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* ── Left Column: Details & Extras ─────────────── */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Spec Grid */}
                    <section>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MI icon="tune" className="text-[#212121]/40" />
                            Vehicle Specifications
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: 'event_seat', label: 'Seats', value: `${vehicle.specs.seats} Adults` },
                                { icon: 'work_outline', label: 'Luggage', value: `${vehicle.specs.luggage} Bag${vehicle.specs.luggage !== 1 ? 's' : ''}` },
                                { icon: 'settings_input_component', label: 'Transmission', value: vehicle.specs.transmission },
                                { icon: fuelIcon, label: vehicle.specs.fuel === 'Electric' ? 'Type' : 'Fuel', value: vehicle.specs.fuel },
                            ].map(spec => (
                                <div key={spec.label} className="bg-white p-4 rounded-lg border border-[#212121]/10 flex flex-col items-center text-center">
                                    <MI icon={spec.icon} className="text-[#212121]/60 mb-2" />
                                    <span className="text-xs text-[#212121]/60 uppercase">{spec.label}</span>
                                    <span className="font-bold">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Description */}
                    <section>
                        <h2 className="text-lg font-bold mb-4">About this vehicle</h2>
                        <p className="text-[#212121]/70 leading-relaxed">{vehicle.description}</p>
                        {vehicle.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {vehicle.features.map(f => (
                                    <span key={f} className="inline-flex items-center gap-1.5 text-xs bg-white border border-[#212121]/10 px-3 py-1.5 rounded-lg">
                                        <MI icon="check_circle" className="text-emerald-500 text-sm" />
                                        {f}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Insurance Packages */}
                    <section>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MI icon="verified_user" className="text-[#212121]/40" />
                            Insurance Packages
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockInsurances.map(ins => {
                                const isSelected = selectedInsurance.id === ins.id;
                                return (
                                    <label
                                        key={ins.id}
                                        className={`relative flex p-4 cursor-pointer rounded-lg border-2 bg-white transition-all ${isSelected ? 'border-[#212121]' : 'border-[#212121]/10 hover:border-[#212121]/40'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="insurance"
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => setSelectedInsurance(ins)}
                                        />
                                        <div className="flex-1">
                                            <span className="block text-sm font-bold">{ins.name}</span>
                                            <span className="block text-xs text-[#212121]/60">{ins.description}</span>
                                        </div>
                                        <div className={`text-right ${isSelected ? 'mr-6' : ''}`}>
                                            <span className="block text-sm font-bold">
                                                {ins.pricePerDay === 0 ? 'Included' : `€${ins.pricePerDay.toFixed(2)}`}
                                            </span>
                                            {ins.pricePerDay > 0 && (
                                                <span className="block text-[10px] text-[#212121]/60 uppercase">per day</span>
                                            )}
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <MI icon="check_circle" className="text-[#212121] text-sm" />
                                            </div>
                                        )}
                                        {ins.recommended && (
                                            <div className="absolute -top-2.5 left-4">
                                                <span className="bg-[#212121] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</span>
                                            </div>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    </section>

                    {/* Trip Add-ons */}
                    <section>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MI icon="add_circle_outline" className="text-[#212121]/40" />
                            Trip Add-ons
                        </h2>
                        <div className="space-y-3">
                            {mockExtras.map(ext => {
                                const isAdded = selectedExtras.has(ext.id);
                                return (
                                    <div key={ext.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#212121]/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#212121]/5 flex items-center justify-center">
                                                <MI icon={extrasIcons[ext.id] || 'extension'} className="text-[#212121]/70" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold">{ext.name}</h4>
                                                <p className="text-xs text-[#212121]/60">{ext.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold">€{ext.pricePerDay.toFixed(2)}</span>
                                            <button
                                                onClick={() => toggleExtra(ext.id)}
                                                className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${isAdded
                                                    ? 'bg-[#212121] text-white'
                                                    : 'border border-[#212121]/20 hover:bg-[#212121] hover:text-white'
                                                    }`}
                                                aria-label={isAdded ? `Remove ${ext.name}` : `Add ${ext.name}`}
                                            >
                                                <MI icon={isAdded ? 'check' : 'add'} className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* ── Right Column: Sticky Sidebar ─────────────── */}
                <aside className="sticky top-24">
                    <div className="bg-white rounded-xl border border-[#212121]/10 shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-[#212121]/5 bg-[#212121]/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-[#212121]/60 uppercase">Reservation Summary</span>
                                <span className="text-xs bg-white px-2 py-0.5 rounded shadow-sm">{rentalDays} Days</span>
                            </div>
                            <h3 className="text-lg font-bold">{vehicle.name}</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Itinerary */}
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#212121]" />
                                        <div className="w-px flex-1 bg-[#212121]/20 my-1" />
                                        <div className="w-2 h-2 rounded-full border border-[#212121]" />
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[10px] text-[#212121]/60 uppercase font-bold">Pick-up</p>
                                            <p className="text-sm font-medium">Reykjavik City, Oct 12, 10:00</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#212121]/60 uppercase font-bold">Drop-off</p>
                                            <p className="text-sm font-medium">Keflavik Airport, Oct 16, 14:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 pt-6 border-t border-[#212121]/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#212121]/60">Base Price ({rentalDays} days)</span>
                                    <span>{formatPrice(basePrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#212121]/60">{selectedInsurance.name}</span>
                                    <span>{insurancePrice > 0 ? formatPrice(insurancePrice) : 'Included'}</span>
                                </div>
                                {mockExtras.filter(e => selectedExtras.has(e.id)).map(ext => (
                                    <div key={ext.id} className="flex justify-between text-sm">
                                        <span className="text-[#212121]/60">{ext.name}</span>
                                        <span>{formatPrice(ext.pricePerDay * rentalDays)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-sm font-bold pt-4 border-t border-[#212121]/10">
                                    <span className="text-lg">Total</span>
                                    <span className="text-lg">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleProceed}
                                disabled={!vehicle.available}
                                className="w-full bg-[#212121] hover:bg-black disabled:bg-[#212121]/30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group"
                            >
                                {vehicle.available ? 'Proceed to Checkout' : 'Currently Unavailable'}
                                {vehicle.available && <MI icon="arrow_forward" className="group-hover:translate-x-1 transition-transform" />}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-[#212121]/40 font-medium uppercase tracking-widest">
                                <MI icon="lock" className="text-xs" />
                                Secure Booking
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* ── Customer Reviews ────────────────────────────── */}
            <section className="mt-20 pt-10 border-t border-[#212121]/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4].map(i => <MI key={i} icon="star" />)}
                                <MI icon="star_half" />
                            </div>
                            <span className="font-bold">4.8 / 5</span>
                            <span className="text-[#212121]/40 text-sm">({allReviews.length} verified rentals)</span>
                        </div>
                    </div>
                    <Link to="/contact" className="text-sm font-bold border-b-2 border-[#212121] pb-1 no-underline text-[#212121]">
                        Read all reviews
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayReviews.map(review => {
                        const initials = review.customerName.split(' ').map(w => w[0]).join('').toUpperCase();
                        return (
                            <div key={review.id} className="p-6 bg-white rounded-xl border border-[#212121]/5">
                                <div className="flex justify-between mb-4">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-8 h-8 bg-[#212121]/10 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                                            {initials}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold">{review.customerName}</h4>
                                            <p className="text-[10px] text-[#212121]/40 italic">Verified Rental</p>
                                        </div>
                                    </div>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <MI key={i} icon={i < review.rating ? 'star' : 'star_outline'} className="text-sm" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-[#212121]/70 italic leading-relaxed">
                                    "{review.comment}"
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#212121]/10 p-4 lg:hidden z-50 flex items-center justify-between safe-area-bottom shadow-lg">
                <div>
                    <p className="text-[10px] text-[#212121]/60 font-bold uppercase tracking-wider">Total for {rentalDays} days</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
                <button
                    onClick={handleProceed}
                    disabled={!vehicle.available}
                    className="bg-[#212121] active:bg-black text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                >
                    {vehicle.available ? 'Book Now' : 'Sold Out'}
                    {vehicle.available && <MI icon="arrow_forward" className="text-sm" />}
                </button>
            </div>
        </main>
    );
}
