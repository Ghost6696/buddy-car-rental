import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingLookupSchema, type BookingLookupData } from '@/utils/validators';
import { lookupReservation, cancelReservation } from '@/api/reservations';
import { formatPrice } from '@/utils/formatters';
import type { Reservation } from '@/types/booking';

const UPGRADE_OPTIONS = [
    {
        id: 'upgrade-bmw-i4',
        name: 'BMW i4 Gran Coupe',
        specs: 'Electric • Automatic • 5 Seats',
        extraPerDay: 24,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1Bgl50Q1Br5wlZFblubA8IST9-ussSuBeR8yt2vdPuKjMiZvOsdkBiN_imx-TLI-vVU7O4JMtit73OG4MGqHXR8e7PM12ndniJbtf5W87FBQJDkmeNb2ERTBTHZbpo0X9QKrgLw-_95B9lzJ6vhxxvZDN2xqlYUq7BpWhjxlZrAm8tX4FT1HFh5S4AH2QjVHjwQAAwYb8fEt9QcPENdW1htJPzF637dOyPz3a5N9OYpDDaP4m5BGTNzADJr6YdhPFaB34qwsvosZ',
    },
    {
        id: 'upgrade-tesla-y',
        name: 'Tesla Model Y',
        specs: 'Electric • Automatic • 5 Seats',
        extraPerDay: 30,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs02-9j0COIIE0PNF_mIIMhZ9Su_5u49o-ShyO3KSSKkqvyYwQ_v_TsseP9sMxvCDm7dQT7FfspBAMHBDCgj0qLbKU94xfjmHv-wyTTlzXTEuqTW2aqSSFRl8Uu7bWtiJMZd8WE-ZULVsOICJRSEXcSJUVxK0NeZYZ02b86OsmGvtya73c6cw9Ev20S0xf-FysX4woeaG5pSuJ5HCL05mPvbNcgpZMa3IKdv5vVlN0OYup4YrjLl0zhG76EH0EX-VvOVm2zBLbh2A0',
    },
];

export default function ManageBookingPage() {
    const navigate = useNavigate();
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    // Editable date/time fields
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');

    useEffect(() => {
        if (reservation) {
            setPickupDate(reservation.dates.pickupDate);
            setPickupTime(reservation.dates.pickupTime);
            setReturnDate(reservation.dates.dropoffDate);
            setReturnTime(reservation.dates.dropoffTime);
        }
    }, [reservation]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingLookupData>({
        resolver: zodResolver(bookingLookupSchema),
    });

    const onSearch = async (data: BookingLookupData) => {
        setLoading(true);
        setNotFound(false);
        setReservation(null);
        try {
            const result = await lookupReservation(data.confirmationCode, data.email);
            if (result) {
                setReservation(result);
            } else {
                setNotFound(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!reservation) return;
        setCancelling(true);
        try {
            await cancelReservation(reservation.id);
            setReservation({ ...reservation, status: 'cancelled' });
            setShowCancel(false);
        } finally {
            setCancelling(false);
        }
    };

    // Lookup view
    if (!reservation) {
        return (
            <div className="bg-[#f7f7f7] min-h-screen">
                {/* Hero */}
                <section className="pt-24 pb-12 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
                            Reservation Portal
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase mb-4">
                            Manage Your<br />Booking
                        </h1>
                        <p className="text-black/40 text-lg max-w-xl mx-auto font-medium">
                            Enter your confirmation code and email to view, modify, or cancel your reservation.
                        </p>
                    </div>
                </section>

                {/* Lookup Form */}
                <section className="py-16">
                    <div className="max-w-xl mx-auto px-6">
                        <form
                            onSubmit={handleSubmit(onSearch)}
                            className="bg-white rounded-2xl shadow-xl shadow-black/5 p-10 space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">
                                    Confirmation Code
                                </label>
                                <input
                                    type="text"
                                    className={`w-full bg-white border-gray-200 rounded-none border-t-0 border-x-0 border-b-2 focus:ring-0 focus:border-black px-0 py-4 transition-all duration-300 font-mono uppercase ${errors.confirmationCode ? 'border-red-500' : ''}`}
                                    placeholder="BCR-2026-001"
                                    {...register('confirmationCode')}
                                />
                                {errors.confirmationCode && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmationCode.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className={`w-full bg-white border-gray-200 rounded-none border-t-0 border-x-0 border-b-2 focus:ring-0 focus:border-black px-0 py-4 transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="john@example.com"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-black text-white w-full py-5 rounded-none text-sm font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <span className="material-icons text-sm">search</span>
                                {loading ? 'Searching...' : 'Find My Booking'}
                            </button>
                        </form>

                        {/* Not Found */}
                        {notFound && (
                            <div className="mt-8 bg-white border border-red-200 rounded-xl p-6 text-center">
                                <span className="material-icons text-red-400 text-3xl mb-2">error_outline</span>
                                <p className="text-sm text-red-600 font-medium">
                                    Booking not found. Please check your confirmation code and email, then try again.
                                </p>
                            </div>
                        )}

                        {/* Help Text */}
                        <div className="mt-8 p-6 bg-black/5 rounded-xl flex items-start gap-4">
                            <span className="material-icons text-black/30 text-xl mt-0.5">help_outline</span>
                            <div>
                                <p className="text-sm text-black/60 leading-relaxed">
                                    Your confirmation code was included in the booking confirmation email. It typically looks like <span className="font-mono font-bold">BCR-XXXX-XXX</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Status badge
    const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
        confirmed: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500', label: 'Confirmed & Paid' },
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', label: 'Pending' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500', label: 'Cancelled' },
        completed: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500', label: 'Completed' },
    };
    const status = statusConfig[reservation.status] || statusConfig.confirmed;

    // Selected extras for display
    const selectedExtras = reservation.extras?.filter(e => e.selected) || [];

    // Dashboard view
    return (
        <div className="bg-[#f7f7f7] min-h-screen">
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Dashboard Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight">Manage Your Reservation</h1>
                        <p className="text-[#64748b] mt-2 flex items-center gap-2">
                            Booking Reference:{' '}
                            <span className="font-mono font-bold text-black uppercase">
                                {reservation.confirmationCode}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`px-4 py-1.5 ${status.bg} ${status.text} text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-2`}
                        >
                            <span className={`w-2 h-2 ${status.dot} rounded-full animate-pulse`} />
                            {status.label}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area (Left 2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Modify Trip Section */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-black/5">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="material-icons text-black/40">event</span>
                                    Modify Trip
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                        Pickup Date
                                    </label>
                                    <input
                                        className="w-full bg-[#f7f7f7] border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black text-sm font-medium"
                                        type="date"
                                        value={pickupDate}
                                        onChange={e => setPickupDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                        Pickup Time
                                    </label>
                                    <input
                                        className="w-full bg-[#f7f7f7] border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black text-sm font-medium"
                                        type="time"
                                        value={pickupTime}
                                        onChange={e => setPickupTime(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                        Return Date
                                    </label>
                                    <input
                                        className="w-full bg-[#f7f7f7] border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black text-sm font-medium"
                                        type="date"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                        Return Time
                                    </label>
                                    <input
                                        className="w-full bg-[#f7f7f7] border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black text-sm font-medium"
                                        type="time"
                                        value={returnTime}
                                        onChange={e => setReturnTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-black/5 rounded-lg flex items-start gap-3">
                                <span className="material-icons text-black text-xl">info</span>
                                <p className="text-sm text-[#64748b]">
                                    Changes to dates or times may affect the final rental price based on current availability.
                                </p>
                            </div>
                        </section>

                        {/* Add/Remove Extras */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-black/5">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-icons text-black/40">add_circle_outline</span>
                                Extras & Protection
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Insurance */}
                                {reservation.insurance && (
                                    <div className="p-4 rounded-lg border-2 border-black bg-black/5 relative group">
                                        <span className="absolute top-2 right-2 material-icons text-black text-lg">
                                            check_circle
                                        </span>
                                        <span className="material-icons text-black/60 mb-2">security</span>
                                        <h3 className="font-bold text-sm">{reservation.insurance.name}</h3>
                                        <p className="text-xs text-[#64748b] mt-1">
                                            {formatPrice(reservation.insurance.pricePerDay)} / day
                                        </p>
                                    </div>
                                )}

                                {/* Selected Extras */}
                                {selectedExtras.map(extra => (
                                    <div
                                        key={extra.id}
                                        className="p-4 rounded-lg border-2 border-black bg-black/5 relative group"
                                    >
                                        <span className="absolute top-2 right-2 material-icons text-black text-lg">
                                            check_circle
                                        </span>
                                        <span className="material-icons text-black/60 mb-2">
                                            {extra.icon || 'add_circle'}
                                        </span>
                                        <h3 className="font-bold text-sm">{extra.name}</h3>
                                        <p className="text-xs text-[#64748b] mt-1">
                                            {formatPrice(extra.pricePerDay)} / day
                                        </p>
                                    </div>
                                ))}

                                {/* Empty state extras */}
                                {!reservation.insurance && selectedExtras.length === 0 && (
                                    <div className="p-4 rounded-lg border border-black/10 col-span-full text-center py-8">
                                        <span className="material-icons text-black/20 text-3xl mb-2">
                                            add_shopping_cart
                                        </span>
                                        <p className="text-sm text-[#64748b]">No extras or protection added</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Available Upgrades */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-black/5 overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="material-icons text-black/40">trending_up</span>
                                    Available Upgrades
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {UPGRADE_OPTIONS.map(upgrade => (
                                    <div
                                        key={upgrade.id}
                                        className="flex items-center gap-6 p-4 rounded-lg bg-[#f7f7f7] border border-transparent hover:border-black/20 transition-all"
                                    >
                                        <img
                                            className="w-32 h-20 object-cover rounded-md bg-zinc-200"
                                            src={upgrade.image}
                                            alt={upgrade.name}
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-lg">{upgrade.name}</h3>
                                            <p className="text-sm text-[#64748b]">{upgrade.specs}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold uppercase text-[#64748b] mb-1">
                                                +€{upgrade.extraPerDay.toFixed(2)} / day
                                            </p>
                                            <button
                                                onClick={() => navigate('/upgrade', {
                                                    state: {
                                                        vehicleName: reservation.vehicleName,
                                                        totalPrice: reservation.totalPrice,
                                                        confirmationCode: reservation.confirmationCode,
                                                    },
                                                })}
                                                className="bg-black text-white text-xs font-bold py-2 px-6 rounded uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                                            >
                                                Upgrade
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Subtle Actions */}
                        <div className="pt-4 flex justify-between items-center">
                            {reservation.status === 'confirmed' && (
                                <>
                                    {!showCancel ? (
                                        <button
                                            onClick={() => setShowCancel(true)}
                                            className="text-[#64748b] hover:text-red-600 transition-colors text-sm font-medium flex items-center gap-2"
                                        >
                                            <span className="material-icons text-sm">cancel</span>
                                            Cancel Booking
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setShowCancel(false)}
                                                className="text-sm text-[#64748b] hover:text-black transition-colors"
                                            >
                                                Keep Booking
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={cancelling}
                                                className="bg-red-600 text-white text-xs font-bold py-2 px-6 rounded uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50"
                                            >
                                                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                            {reservation.status === 'cancelled' && (
                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                    <span className="material-icons text-sm">cancel</span>
                                    This booking has been cancelled
                                </span>
                            )}
                            <p className="text-xs text-[#64748b]">

                            </p>
                        </div>
                    </div>

                    {/* Booking Summary Sidebar (Right 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl shadow-lg border border-black/5 overflow-hidden">
                                {/* Vehicle Image */}
                                <div className="h-48 relative">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={reservation.vehicleImage}
                                        alt={reservation.vehicleName}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div className="text-white">
                                            <h2 className="text-xl font-bold">{reservation.vehicleName}</h2>
                                            <p className="text-xs opacity-80 uppercase tracking-widest">
                                                Automatic
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Details */}
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <span className="material-icons text-black/40">location_on</span>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                                    Pickup & Return
                                                </p>
                                                <p className="text-sm font-medium">{reservation.pickupLocation}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="material-icons text-black/40">calendar_today</span>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                                                    Duration
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {reservation.dates.pickupDate} – {reservation.dates.dropoffDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-black/5" />

                                    {/* Pricing */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#64748b]">Base Rental</span>
                                            <span>{formatPrice(reservation.totalPrice)}</span>
                                        </div>
                                        {reservation.insurance && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748b]">{reservation.insurance.name}</span>
                                                <span>{formatPrice(reservation.insurance.pricePerDay)}/day</span>
                                            </div>
                                        )}
                                        {selectedExtras.map(extra => (
                                            <div key={extra.id} className="flex justify-between text-sm">
                                                <span className="text-[#64748b]">{extra.name}</span>
                                                <span>{formatPrice(extra.pricePerDay)}/day</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-end pt-4">
                                            <span className="font-bold text-lg">Total</span>
                                            <div className="text-right">
                                                <p className="text-xs text-green-600 font-bold uppercase">Fully Paid</p>
                                                <p className="text-2xl font-bold">
                                                    {formatPrice(reservation.totalPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-black text-white font-bold py-4 rounded uppercase tracking-[0.2em] text-sm hover:bg-zinc-800 transition-colors shadow-lg">
                                        Download Voucher
                                    </button>
                                </div>
                            </div>

                            {/* Need Help */}
                            <div className="bg-black p-6 rounded-xl text-white">
                                <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Need Help?</h4>
                                <p className="text-xs text-white/70 mb-4 leading-relaxed">
                                    Our premium support line is available 24/7 for active reservations.
                                </p>
                                <a
                                    className="flex items-center gap-2 text-sm font-bold border-b border-white/20 pb-1 w-fit"
                                    href="tel:+3545550192"
                                >
                                    <span className="material-icons text-sm">phone</span>
                                    +354 555-0192
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
