import { Link, useNavigate } from 'react-router-dom';
import { mockVehicles } from '@/api/mock-data';
import { formatPrice } from '@/utils/formatters';

export default function HomePage() {
    const navigate = useNavigate();
    const featuredVehicles = mockVehicles.filter(v => v.available).slice(0, 3);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/vehicles');
    };

    return (
        <>
            {/* ─── Split Hero ─── */}
            <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Headline + Search */}
                    <div className="z-10 py-12">


                        <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tighter uppercase text-[#212121]">
                            Rent Smart.<br />
                            <span className="text-[#212121]/30">Drive Today.</span>
                        </h1>

                        {/* Search Module */}
                        <form
                            onSubmit={handleSearch}
                            className="bg-white p-8 rounded-xl shadow-2xl shadow-[#212121]/5 border border-[#212121]/5 max-w-xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block px-1">
                                        Pickup Location
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#212121]/30 text-lg">location_on</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-[#f7f7f7] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#212121]/20 outline-none"
                                            placeholder="City, Airport or ZIP"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block px-1">
                                        Drop-off Location
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#212121]/30 text-lg">sync_alt</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-[#f7f7f7] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#212121]/20 outline-none"
                                            placeholder="Same as pickup"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block px-1">
                                        Pickup Date
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#212121]/30 text-lg">calendar_today</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-[#f7f7f7] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#212121]/20 outline-none"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block px-1">
                                        Drop-off Date
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#212121]/30 text-lg">calendar_today</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-[#f7f7f7] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#212121]/20 outline-none"
                                            type="date"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#212121] text-white py-4 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                            >
                                Search Available Cars
                                <span className="material-icons text-sm">arrow_forward</span>
                            </button>
                        </form>
                    </div>

                    {/* Right — Hero Image */}
                    <div className="hidden lg:flex relative h-full items-center justify-center lg:justify-end">
                        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[120%] h-[70%] bg-[#212121]/5 rounded-full blur-[120px]" />
                        <img
                            alt="Premium rental car"
                            className="relative z-10 w-full max-w-2xl drop-shadow-2xl rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACLujG3xAL-_HyEGyXhjwx2x2MNonoA64px46qykGZpsDmmlg2oSEWVEQfdYqMZDRN0vIta20MSQdZ6V7TNQM3mNpSOOfaglOuLTmStkjY7FFQMJTgwoAEoSJxYpEtlwE-pI822dIdTxsfc6udASe1yt6VRk9GFojIkWo0vwgFLn1JtO4ZLPnV1Dt6YD4KUQr13tYNaOZ_ITDF0Hrd07tgxZAhjrAnLpsBwTK5HNomk6E87IPiaOu5-X8XLBcv4s8DAImj8W6EcaHw"
                        />
                    </div>
                </div>
            </section>

            {/* ─── Featured Vehicles ─── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#212121]/40 mb-2 block">Our Fleet</span>
                        <h2 className="text-4xl font-extrabold tracking-tighter uppercase text-[#212121]">Featured Vehicles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredVehicles.map(vehicle => (
                            <Link
                                key={vehicle.id}
                                to={`/vehicles/${vehicle.id}`}
                                className="group bg-[#f7f7f7] rounded-xl overflow-hidden border border-[#212121]/5 hover:shadow-xl transition-all no-underline text-[#212121]"
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        alt={vehicle.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={vehicle.images[0]}
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {formatPrice(vehicle.pricePerDay)}/day
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-extrabold uppercase tracking-tight">{vehicle.name}</h3>
                                        <p className="text-xs font-medium text-[#212121]/40 uppercase tracking-widest">
                                            {vehicle.category}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t border-[#212121]/5 pt-4">
                                        <div className="flex items-center gap-2 opacity-60">
                                            <span className="material-icons text-lg">event_seat</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{vehicle.specs.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-60">
                                            <span className="material-icons text-lg">settings</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{vehicle.specs.transmission}</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-60">
                                            <span className="material-icons text-lg">local_gas_station</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{vehicle.specs.fuel}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/vehicles"
                            className="h-12 px-8 rounded-full bg-[#212121] text-white flex items-center justify-center hover:bg-[#212121]/90 transition-all text-sm font-bold uppercase tracking-widest no-underline shadow-lg shadow-[#212121]/20 hover:shadow-xl hover:shadow-[#212121]/30 hover:-translate-y-0.5"
                        >
                            View All Vehicles
                            <span className="material-icons text-sm ml-2">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── How It Works (Dark) ─── */}
            <section id="how-it-works" className="py-24 bg-[#212121] text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center">
                                <span className="material-icons">touch_app</span>
                            </div>
                            <h4 className="text-lg font-bold uppercase tracking-widest">Book Online</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Choose your dream car through our integrated platform in under 60 seconds.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center">
                                <span className="material-icons">key</span>
                            </div>
                            <h4 className="text-lg font-bold uppercase tracking-widest">Express Pickup</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Zero paperwork at the counter. Verified digital identity for instant key collection.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center">
                                <span className="material-icons">verified_user</span>
                            </div>
                            <h4 className="text-lg font-bold uppercase tracking-widest">Premium Support</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                24/7 dedicated concierge service for all our premium renters across the country.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* ─── Visit Us / Map ─── */}
            < section className="py-24 bg-[#f7f7f7]" >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="lg:w-1/3 p-12 space-y-8">
                            <div>
                                <h3 className="text-3xl font-extrabold tracking-tighter uppercase mb-4 text-[#212121]">Visit Us</h3>
                                <p className="text-[#212121]/60 text-sm">
                                    Experience the Buddy difference in person at our flagship location.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="material-icons text-[#212121]/30">place</span>
                                    <div>
                                        <p className="font-bold uppercase text-xs tracking-widest mb-1 text-[#212121]">Headquarters</p>
                                        <p className="text-sm opacity-70 italic text-[#212121]">Keflavík International Airport, Iceland</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="material-icons text-[#212121]/30">call</span>
                                    <div>
                                        <p className="font-bold uppercase text-xs tracking-widest mb-1 text-[#212121]">Direct Line</p>
                                        <p className="text-sm opacity-70 text-[#212121]">+354 555 1234</p>
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/contact"
                                className="inline-block border border-[#212121] px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#212121] hover:text-white transition-all no-underline text-[#212121]"
                            >
                                Get Directions
                            </Link>
                        </div>
                        <div className="lg:w-2/3 h-96 lg:h-auto bg-zinc-200">
                            <img
                                alt="Map showing Buddy Car Rental location"
                                className="w-full h-full object-cover grayscale opacity-80"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjQW3XiINvR7EBZrJ-09XvvfJGsJ6eJD_-vyMeZOD1Ke1j2DGqbW8TLyUz7CAq23GtDYbMcZo0GG8ne6U6PZvxlfgpHqKWY9Ya0KdLqqcXjSGTPXciT1vHnxkpgt3D60_HQdwxqo2bDz1Tw7Wj0M9dsvwhBE1JOUzykZug070zl4f00XmbiZMIAajSkzn38RGuEryONYSUF4TijXJEQJ4AzjCKR8X9-ImcTHZlj6CAdmQMp1RQSKNGfhqTEz70VGucuhLdJz25nHUa"
                            />
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
