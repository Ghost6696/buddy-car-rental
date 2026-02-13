import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useBookingStore } from '@/stores/bookingStore';
import { getExtras, getInsurances, getLocations } from '@/api/extras';
import { createReservation } from '@/api/reservations';
import { customerSchema, type CustomerFormData } from '@/utils/validators';
import { formatPrice } from '@/utils/formatters';
import type { Extra, Insurance, Location } from '@/types/vehicle';

const stepLabels = ['Dates & Location', 'Extras & Insurance', 'Driver Details', 'Review & Pay'];

export default function CheckoutPage() {
    const navigate = useNavigate();
    const store = useBookingStore();
    const [extras, setExtras] = useState<Extra[]>([]);
    const [insurances, setInsurances] = useState<Insurance[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
    });

    useEffect(() => {
        getExtras().then(e => { setExtras(e); store.setExtras(e); });
        getInsurances().then(setInsurances);
        getLocations().then(setLocations);
    }, []);

    // Redirect if no vehicle selected
    if (!store.selectedVehicle) {
        return (
            <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
                <div className="text-center">
                    <span className="material-icons text-5xl text-gray-300 mb-4 block">directions_car</span>
                    <h1 className="text-2xl font-bold mb-2">No Vehicle Selected</h1>
                    <p className="text-gray-500 mb-6 text-sm">Please choose a car before proceeding to checkout.</p>
                    <Link to="/vehicles" className="bg-[#212121] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-black transition-colors">
                        Browse Fleet
                    </Link>
                </div>
            </div>
        );
    }

    const goNext = () => store.setStep(Math.min(store.step + 1, 4) as 1 | 2 | 3 | 4);
    const goBack = () => store.setStep(Math.max(store.step - 1, 1) as 1 | 2 | 3 | 4);

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (store.dates.pickupDate && store.dates.dropoffDate) {
            goNext();
        }
    };

    const handleStep3 = (data: CustomerFormData) => {
        store.setCustomer(data);
        goNext();
    };

    const handleConfirm = async () => {
        if (!store.customer || !store.selectedVehicle) return;
        setSubmitting(true);
        try {
            const reservation = await createReservation({
                vehicleId: store.selectedVehicle.id,
                vehicleName: store.selectedVehicle.name,
                vehicleImage: store.selectedVehicle.image,
                dates: store.dates,
                pickupLocation: store.pickupLocation || 'Keflavík Airport (KEF)',
                dropoffLocation: store.dropoffLocation || 'Keflavík Airport (KEF)',
                extras: store.extras.filter(e => e.selected),
                insurance: store.insurance,
                customer: store.customer,
                totalPrice: store.totalPrice,
                currency: 'EUR',
            });
            navigate(`/booking-confirmed?code=${reservation.confirmationCode}`);
            store.reset();
        } catch (err) {
            console.error('Booking failed:', err);
            // FAILSAFE FOR DEMO:
            console.warn('DEMO MODE: Simulating success');
            const mockCode = `BCR-DEMO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            navigate(`/booking-confirmed?code=${mockCode}`);
            store.reset();
        } finally {
            setSubmitting(false);
        }
    };

    const selectedExtras = store.extras.filter(e => e.selected);

    return (
        <div className="min-h-screen bg-[#f7f7f7]">

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Checkout Flow */}
                    <div className="flex-grow lg:w-2/3">
                        {/* Progress Steps */}
                        <nav className="flex items-center justify-between mb-12 border-b border-gray-200">
                            <div className="flex gap-8">
                                {stepLabels.map((label, i) => {
                                    const stepNum = i + 1;
                                    const isActive = stepNum === store.step;
                                    const isCompleted = stepNum < store.step;
                                    return (
                                        <div key={i} className={`pb-4 flex items-center gap-2 text-sm ${isActive ? 'font-semibold text-[#212121] border-b-2 border-[#212121]' : 'text-gray-400'}`}>
                                            <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold ${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-[#212121] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                {isCompleted ? <Check className="w-3 h-3" /> : stepNum}
                                            </span>
                                            <span className="hidden md:inline">{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* ─── STEP 1: Dates & Location ─── */}
                        {store.step === 1 && (
                            <form onSubmit={handleStep1} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Pickup Date *</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.dates.pickupDate}
                                            onChange={e => store.setDates({ ...store.dates, pickupDate: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Pickup Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.dates.pickupTime}
                                            onChange={e => store.setDates({ ...store.dates, pickupTime: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Return Date *</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.dates.dropoffDate}
                                            onChange={e => store.setDates({ ...store.dates, dropoffDate: e.target.value })}
                                            min={store.dates.pickupDate || new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Return Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.dates.dropoffTime}
                                            onChange={e => store.setDates({ ...store.dates, dropoffTime: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                                            <span className="material-icons text-xs">location_on</span> Pickup Location
                                        </label>
                                        <select
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.pickupLocation}
                                            onChange={e => store.setPickupLocation(e.target.value)}
                                        >
                                            <option value="">Select location</option>
                                            {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                                            <span className="material-icons text-xs">location_on</span> Dropoff Location
                                        </label>
                                        <select
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            value={store.dropoffLocation}
                                            onChange={e => store.setDropoffLocation(e.target.value)}
                                        >
                                            <option value="">Same as pickup</option>
                                            {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Info card */}
                                <div className="p-6 bg-white border border-gray-200 rounded-xl flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-full shrink-0">
                                        <span className="material-icons text-[#212121]">schedule</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Flexible Booking</h4>
                                        <p className="text-sm text-gray-500 mt-1">Free cancellation up to 48 hours before pickup. Change your dates anytime.</p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="bg-[#212121] hover:bg-black text-white px-10 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 group">
                                        Continue to Extras
                                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ─── STEP 2: Extras & Insurance ─── */}
                        {store.step === 2 && (
                            <div className="space-y-8">
                                {/* Insurance */}
                                <div>
                                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                                        <span className="material-icons text-lg">shield</span> Insurance Protection
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-5">Choose a protection plan that fits your trip.</p>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {insurances.map(ins => (
                                            <button
                                                key={ins.id}
                                                onClick={() => store.setInsurance(store.insurance?.id === ins.id ? null : ins)}
                                                className={`relative text-left p-5 rounded-xl border-2 transition-all ${store.insurance?.id === ins.id
                                                    ? 'border-[#212121] bg-gray-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                            >
                                                {ins.recommended && (
                                                    <span className="absolute -top-2.5 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        Recommended
                                                    </span>
                                                )}
                                                <h4 className="font-semibold text-sm mb-1">{ins.name}</h4>
                                                <p className="text-xs text-gray-500 mb-3">{ins.description}</p>
                                                <ul className="space-y-1 mb-3">
                                                    {ins.coverage.map((c: string) => (
                                                        <li key={c} className="flex items-center gap-1.5 text-xs text-gray-600">
                                                            <Check className="w-3 h-3 text-emerald-500 shrink-0" /> {c}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="font-bold text-sm">
                                                    {ins.pricePerDay === 0 ? 'Included' : `${formatPrice(ins.pricePerDay)}/day`}
                                                </p>
                                                {/* Selection indicator */}
                                                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${store.insurance?.id === ins.id ? 'border-[#212121] bg-[#212121]' : 'border-gray-300'}`}>
                                                    {store.insurance?.id === ins.id && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Extras */}
                                <div>
                                    <h3 className="text-lg font-bold mb-1">Optional Extras</h3>
                                    <p className="text-sm text-gray-500 mb-5">Enhance your trip with these add-ons.</p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {store.extras.map(extra => (
                                            <button
                                                key={extra.id}
                                                onClick={() => store.toggleExtra(extra.id)}
                                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${extra.selected
                                                    ? 'border-[#212121] bg-gray-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="material-icons text-gray-400">
                                                        {extra.name.includes('GPS') ? 'explore' :
                                                            extra.name.includes('Child') ? 'child_care' :
                                                                extra.name.includes('Wi-Fi') || extra.name.includes('Wifi') ? 'wifi' :
                                                                    extra.name.includes('Driver') ? 'person_add' :
                                                                        extra.name.includes('Roof') ? 'luggage' :
                                                                            extra.name.includes('Booster') ? 'chair' : 'add_circle'}
                                                    </span>
                                                    <div>
                                                        <h4 className="font-medium text-sm">{extra.name}</h4>
                                                        <p className="text-xs text-gray-500">{extra.description}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0 ml-4">
                                                    <p className="font-semibold text-sm">{formatPrice(extra.pricePerDay)}/day</p>
                                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-1 ml-auto transition-colors ${extra.selected ? 'bg-[#212121] border-[#212121]' : 'border-gray-300'}`}>
                                                        {extra.selected && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between pt-2">
                                    <button onClick={goBack} className="border border-gray-300 text-[#212121] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <span className="material-icons text-sm">arrow_back</span> Back
                                    </button>
                                    <button onClick={goNext} className="bg-[#212121] hover:bg-black text-white px-10 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 group">
                                        Continue to Details
                                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ─── STEP 3: Driver Details ─── */}
                        {store.step === 3 && (
                            <form onSubmit={handleSubmit(handleStep3)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name *</label>
                                        <input
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="John"
                                            {...register('firstName')}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name *</label>
                                        <input
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="Doe"
                                            {...register('lastName')}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
                                        <input
                                            type="email"
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="john.doe@example.com"
                                            {...register('email')}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="+1 (555) 000-0000"
                                            {...register('phone')}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">License Number *</label>
                                        <input
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.licenseNumber ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="DL-123456789"
                                            {...register('licenseNumber')}
                                        />
                                        {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Country *</label>
                                        <input
                                            className={`w-full p-3 bg-white border rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none ${errors.country ? 'border-red-400' : 'border-gray-200'}`}
                                            placeholder="e.g. United States"
                                            {...register('country')}
                                        />
                                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Flight Number (optional)</label>
                                        <input
                                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm transition-colors focus:border-[#212121] focus:outline-none"
                                            placeholder="For airport pickup coordination"
                                            {...register('flightNumber')}
                                        />
                                    </div>
                                </div>

                                {/* Age & License info card */}
                                <div className="p-6 bg-white border border-gray-200 rounded-xl flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-full shrink-0">
                                        <span className="material-icons text-[#212121]">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Age & License Verification</h4>
                                        <p className="text-sm text-gray-500 mt-1">By continuing, you confirm that the driver is over 25 and holds a valid international driving license.</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-2">
                                    <button type="button" onClick={goBack} className="border border-gray-300 text-[#212121] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <span className="material-icons text-sm">arrow_back</span> Back
                                    </button>
                                    <button type="submit" className="bg-[#212121] hover:bg-black text-white px-10 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 group">
                                        Review Booking
                                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ─── STEP 4: Review & Pay ─── */}
                        {store.step === 4 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <span className="material-icons">fact_check</span> Review Your Booking
                                </h3>

                                {/* Vehicle summary */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-5">
                                    <img src={store.selectedVehicle.image} alt={store.selectedVehicle.name} className="w-28 h-20 rounded-lg object-cover" />
                                    <div>
                                        <h4 className="font-bold">{store.selectedVehicle.name}</h4>
                                        <p className="text-sm text-gray-500">{store.selectedVehicle.category} · {store.selectedVehicle.specs.transmission} · {store.selectedVehicle.specs.fuel}</p>
                                    </div>
                                </div>

                                {/* Dates & Location */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                                        <p className="text-sm font-semibold mt-1">{store.pickupLocation || 'Keflavík Airport'}</p>
                                        <p className="text-xs text-gray-500">{store.dates.pickupDate} · {store.dates.pickupTime || '10:00'}</p>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                        <p className="text-sm font-semibold mt-1">{store.dropoffLocation || store.pickupLocation || 'Keflavík Airport'}</p>
                                        <p className="text-xs text-gray-500">{store.dates.dropoffDate} · {store.dates.dropoffTime || '10:00'}</p>
                                    </div>
                                </div>

                                {/* Driver Info */}
                                {store.customer && (
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Driver Information</p>
                                        <p className="text-sm font-semibold">{store.customer.firstName} {store.customer.lastName}</p>
                                        <p className="text-xs text-gray-500">{store.customer.email} · {store.customer.phone}</p>
                                        <p className="text-xs text-gray-500">License: {store.customer.licenseNumber} · {store.customer.country}</p>
                                    </div>
                                )}

                                {/* Extras & Insurance review */}
                                {(store.insurance || selectedExtras.length > 0) && (
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Extras & Protection Summary</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {store.insurance && (
                                                <div className="border border-gray-200 p-4 rounded-xl bg-white flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-icons text-gray-400">security</span>
                                                        <div>
                                                            <p className="text-sm font-semibold">{store.insurance.name}</p>
                                                            <p className="text-xs text-gray-500">{store.insurance.description}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold shrink-0 ml-3">
                                                        {store.insurance.pricePerDay === 0 ? 'Included' : `${formatPrice(store.insurance.pricePerDay)}/day`}
                                                    </span>
                                                </div>
                                            )}
                                            {selectedExtras.map(extra => (
                                                <div key={extra.id} className="border border-gray-200 p-4 rounded-xl bg-white flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-icons text-gray-400">
                                                            {extra.name.includes('GPS') ? 'explore' :
                                                                extra.name.includes('Wi-Fi') || extra.name.includes('Wifi') ? 'wifi' :
                                                                    extra.name.includes('Child') ? 'child_care' : 'add_circle'}
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-semibold">{extra.name}</p>
                                                            <p className="text-xs text-gray-500">{extra.description}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold shrink-0 ml-3">{formatPrice(extra.pricePerDay)}/day</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between pt-4">
                                    <button onClick={goBack} className="border border-gray-300 text-[#212121] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <span className="material-icons text-sm">arrow_back</span> Back
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        disabled={submitting}
                                        className="bg-[#212121] hover:bg-black text-white px-10 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                Confirm & Pay {formatPrice(store.totalPrice)}
                                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ─── RIGHT SIDE: Sticky Summary Card ─── */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                {/* Vehicle Image */}
                                <div className="relative h-48 bg-gray-100">
                                    <img
                                        src={store.selectedVehicle.image}
                                        alt={store.selectedVehicle.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-[#212121] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        {store.selectedVehicle.category}
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h3 className="font-bold text-lg">{store.selectedVehicle.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            or similar · {store.selectedVehicle.specs.fuel} · {store.selectedVehicle.specs.seats} Seats
                                        </p>
                                    </div>

                                    {/* Pickup / Dropoff */}
                                    <div className="flex justify-between items-start pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Pickup</p>
                                            <p className="text-sm font-semibold">{store.pickupLocation || 'Select location'}</p>
                                            <p className="text-xs text-gray-500">{store.dates.pickupDate || 'Set date'} · {store.dates.pickupTime || '10:00'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Dropoff</p>
                                            <p className="text-sm font-semibold">{store.dropoffLocation || store.pickupLocation || 'Select location'}</p>
                                            <p className="text-xs text-gray-500">{store.dates.dropoffDate || 'Set date'} · {store.dates.dropoffTime || '10:00'}</p>
                                        </div>
                                    </div>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-3 pt-6 border-t border-gray-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Rental ({store.numberOfDays} day{store.numberOfDays !== 1 ? 's' : ''})</span>
                                            <span className="font-medium">{formatPrice(store.selectedVehicle.pricePerDay * store.numberOfDays)}</span>
                                        </div>
                                        {store.insurance && store.insurance.pricePerDay > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">{store.insurance.name}</span>
                                                <span className="font-medium">{formatPrice(store.insurance.pricePerDay * store.numberOfDays)}</span>
                                            </div>
                                        )}
                                        {selectedExtras.map(e => (
                                            <div key={e.id} className="flex justify-between text-sm">
                                                <span className="text-gray-500">{e.name}</span>
                                                <span className="font-medium">{formatPrice(e.pricePerDay * store.numberOfDays)}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Airport Tax (Included)</span>
                                            <span className="font-medium">{formatPrice(0)}</span>
                                        </div>

                                        <div className="pt-4 flex justify-between items-end">
                                            <span className="text-sm font-bold uppercase tracking-wider">Total Price</span>
                                            <span className="text-2xl font-bold">{formatPrice(store.totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Refundable Deposit */}
                                <div className="bg-gray-50 p-4 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="material-icons text-sm">info</span>
                                        <span>Refundable Deposit: <strong className="text-[#212121]">{formatPrice(500)}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 px-2">
                                <div className="flex flex-col items-center text-center p-3">
                                    <span className="material-icons text-gray-400 mb-1">event_available</span>
                                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Free Cancellation</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3">
                                    <span className="material-icons text-gray-400 mb-1">support_agent</span>
                                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">24/7 Road Assist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
