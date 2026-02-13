import { Link, useSearchParams } from 'react-router-dom';
import { useBookingStore } from '@/stores/bookingStore';
import { formatPrice } from '@/utils/formatters';

export default function BookingConfirmPage() {
    const [params] = useSearchParams();
    const code = params.get('code') || 'BUDDY-89234';
    const { selectedVehicle, dates, pickupLocation, dropoffLocation, totalPrice, customer } = useBookingStore();

    const vehicleName = selectedVehicle?.name || 'Your Vehicle';
    const vehicleCategory = selectedVehicle?.category || 'Standard';
    const vehicleImage = selectedVehicle?.image || selectedVehicle?.images?.[0] || '';
    const vehicleSpecs = selectedVehicle?.specs;
    const email = customer?.email || 'your email address';

    const pickupDate = dates.pickupDate || 'Set date';
    const pickupTime = dates.pickupTime || '10:00';
    const returnDate = dates.dropoffDate || 'Set date';
    const returnTime = dates.dropoffTime || '10:00';
    const pickupName = pickupLocation || 'Pickup Location';
    const dropoffName = dropoffLocation || pickupName;

    return (
        <div className="min-h-screen bg-[#ffffff]">
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* Hero / Confirmation Header */}
                <div className="relative text-center mb-12">
                    {/* Confetti dots */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                        <div className="absolute w-1.5 h-1.5 bg-black/20 rounded-full top-0 left-1/4" />
                        <div className="absolute w-1.5 h-1.5 bg-black/20 rounded-full top-10 right-1/3" />
                        <div className="absolute w-1.5 h-1.5 bg-black/20 rounded-full bottom-0 left-1/2" />
                        <div className="absolute w-1.5 h-1.5 bg-black/20 rounded-full top-20 left-10" />
                    </div>

                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mb-6">
                        <span className="material-symbols-outlined text-4xl font-light">check_circle</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your booking is confirmed</h1>

                    <p className="text-gray-500 mb-2 uppercase tracking-widest text-xs font-bold">Booking Reference</p>
                    <div className="inline-block px-6 py-2 bg-gray-50 border border-gray-100 rounded-full font-mono text-xl font-bold tracking-tighter">
                        #{code}
                    </div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column — Reservation Summary */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                            {/* Vehicle Info */}
                            <div className="p-8 border-b border-gray-50">
                                <h2 className="text-xl font-bold mb-6">Reservation Summary</h2>
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    {vehicleImage && (
                                        <div className="w-full md:w-1/2 rounded-xl overflow-hidden bg-gray-50">
                                            <img
                                                src={vehicleImage}
                                                alt={vehicleName}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            {vehicleCategory}
                                        </span>
                                        <h3 className="text-2xl font-bold">{vehicleName}</h3>
                                        <p className="text-gray-500 text-sm">
                                            {vehicleSpecs?.fuel || 'Petrol'} • {vehicleSpecs?.seats || 5} Seats • {vehicleSpecs?.transmission || 'Manual'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pickup / Dropoff + Total */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup Location</p>
                                        <p className="font-semibold">{pickupName}</p>
                                        <p className="text-sm text-gray-500">{pickupDate} • {pickupTime}</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-50">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dropoff Location</p>
                                        <p className="font-semibold">{dropoffName}</p>
                                        <p className="text-sm text-gray-500">{returnDate} • {returnTime}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl flex flex-col justify-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Amount Paid</p>
                                    <p className="text-3xl font-bold">{formatPrice(totalPrice || 0)}</p>
                                    <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                        <span className="material-icons text-sm">verified</span> Paid in full
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Manage Booking Dark Card */}
                        <div className="bg-[#1a1a1a] text-white p-8 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <span className="material-symbols-outlined text-white">settings</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Need to manage your booking?</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                        You can modify, upgrade, or cancel your reservation through our <span className="text-white font-medium">Manage Booking</span> portal. Use your booking reference and email to log in.
                                    </p>
                                    <Link
                                        to="/manage-booking"
                                        className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-8 hover:text-gray-200 transition-colors"
                                    >
                                        Go to Manage Booking <span className="material-icons text-sm">open_in_new</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — What's Next */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 sticky top-10">
                            <h3 className="font-bold text-lg mb-6">What's next?</h3>

                            <ul className="space-y-6 mb-8">
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">1</span>
                                    <div className="text-sm">
                                        <p className="font-bold">Check your email</p>
                                        <p className="text-gray-500">A confirmation voucher has been sent to {email}.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">2</span>
                                    <div className="text-sm">
                                        <p className="font-bold">Prepare your license</p>
                                        <p className="text-gray-500">Ensure you have a valid driver's license and credit card for the deposit upon arrival.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">3</span>
                                    <div className="text-sm">
                                        <p className="font-bold">Airport Pickup</p>
                                        <p className="text-gray-500">Follow the signs for "Rental Car Shuttle" at the airport terminal.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="space-y-4">
                                <button className="w-full bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined">download</span>
                                    Download PDF Receipt
                                </button>
                                <Link
                                    to="/"
                                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-black px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined">home</span>
                                    Back to Home
                                </Link>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400">Questions? Contact our 24/7 support at support@buddycarrental.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
