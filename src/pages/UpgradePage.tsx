import { useNavigate, useLocation } from 'react-router-dom';

const UPGRADE_OPTIONS = [
    {
        id: 'upgrade-bmw-i4',
        name: 'BMW i4 Gran Coupe',
        category: 'Premium Electric',
        extraPerDay: 24,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1Bgl50Q1Br5wlZFblubA8IST9-ussSuBeR8yt2vdPuKjMiZvOsdkBiN_imx-TLI-vVU7O4JMtit73OG4MGqHXR8e7PM12ndniJbtf5W87FBQJDkmeNb2ERTBTHZbpo0X9QKrgLw-_95B9lzJ6vhxxvZDN2xqlYUq7BpWhjxlZrAm8tX4FT1HFh5S4AH2QjVHjwQAAwYb8fEt9QcPENdW1htJPzF637dOyPz3a5N9OYpDDaP4m5BGTNzADJr6YdhPFaB34qwsvosZ',
        features: [
            { icon: 'ev_station', label: '590km Range' },
            { icon: 'settings', label: 'Automatic' },
            { icon: 'person', label: '5 Seats' },
        ],
    },
    {
        id: 'upgrade-tesla-3',
        name: 'Tesla Model 3',
        category: 'Tech Performance',
        extraPerDay: 18.5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGelt-7Dg2WkVF_UIq85hCShXnLoj8sc_I8PkgBlmeln542v0yFrTtaysyGSzIoCJZAMdmkpMUidJV5NnMiHeu6nYYOIPw8-bsFKrHb0uPitejlLml2aJNDKfUzDz-2ZsEaxPK1VwE61oQkkqV2Zxti6BsUkJ7CL1YkQ0xA9MojR6QjyJehqrWRQihFQ1rHq5HbVKFU2QG0hpR1cCuHVZ7yglofDJL_qD3AV53wwIcSTDTrrNSAIGBWtQZcKWZU4-xF8KRqqngVZ7c',
        features: [
            { icon: 'bolt', label: 'Long Range' },
            { icon: 'smart_toy', label: 'Autopilot' },
            { icon: 'luggage', label: '2 Large Bags' },
        ],
    },
    {
        id: 'upgrade-defender',
        name: 'Land Rover Defender',
        category: 'Luxury Off-Road',
        extraPerDay: 42,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs02-9j0COIIE0PNF_mIIMhZ9Su_5u49o-ShyO3KSSKkqvyYwQ_v_TsseP9sMxvCDm7dQT7FfspBAMHBDCgj0qLbKU94xfjmHv-wyTTlzXTEuqTW2aqSSFRl8Uu7bWtiJMZd8WE-ZULVsOICJRSEXcSJUVxK0NeZYZ02b86OsmGvtya73c6cw9Ev20S0xf-FysX4woeaG5pSuJ5HCL05mPvbNcgpZMa3IKdv5vVlN0OYup4YrjLl0zhG76EH0EX-VvOVm2zBLbh2A0',
        features: [
            { icon: 'height', label: 'High Clearance' },
            { icon: 'ac_unit', label: '4x4 AWD' },
            { icon: 'weekend', label: 'Premium Leather' },
        ],
    },
];

interface UpgradeLocationState {
    vehicleName?: string;
    totalPrice?: number;
    confirmationCode?: string;
}

export default function UpgradePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state as UpgradeLocationState) || {};

    const vehicleName = state.vehicleName || 'Your Current Vehicle';
    const totalPrice = state.totalPrice || 0;
    const confirmationCode = state.confirmationCode || '';

    // Sample estimated new total using first upgrade as preview
    const estimatedNewTotal = totalPrice + UPGRADE_OPTIONS[0].extraPerDay * 7;

    return (
        <div className="bg-white min-h-screen">
            {/* Back nav */}
            <div className="max-w-7xl mx-auto px-6 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-[#64748b] hover:text-black transition-colors group"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                        arrow_back
                    </span>
                    Back to Booking
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 pb-32 lg:pb-12">
                {/* Header */}
                <header className="mb-16 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
                        {confirmationCode && `Reservation ${confirmationCode}`}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
                        Upgrade Your Ride
                    </h1>
                    <p className="text-[#64748b] text-lg">
                        Current selection:{' '}
                        <span className="text-black font-medium">{vehicleName}</span>
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Upgrade Cards (3/4) */}
                    <div className="lg:col-span-3 space-y-6">
                        {UPGRADE_OPTIONS.map(upgrade => (
                            <div
                                key={upgrade.id}
                                className="group bg-white border border-black/5 hover:border-black/20 transition-all rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center shadow-sm"
                            >
                                {/* Image */}
                                <div className="w-full md:w-64 h-40 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={upgrade.image}
                                        alt={upgrade.name}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-grow space-y-4 text-center md:text-left">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                                            {upgrade.category}
                                        </span>
                                        <h3 className="text-2xl font-bold">{upgrade.name}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        {upgrade.features.map(f => (
                                            <div
                                                key={f.label}
                                                className="flex items-center gap-1.5 text-[#64748b] text-sm"
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    {f.icon}
                                                </span>
                                                {f.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price + CTA */}
                                <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8">
                                    <div className="mb-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#64748b] mb-1">
                                            Added Daily Cost
                                        </p>
                                        <p className="text-2xl font-bold">
                                            +€{upgrade.extraPerDay.toFixed(2)}
                                        </p>
                                    </div>
                                    <button className="bg-[#2d2d2d] text-white text-xs font-bold py-4 px-8 rounded uppercase tracking-[0.2em] hover:bg-black transition-all w-full md:w-auto">
                                        Confirm Upgrade
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Comparison Sidebar (1/4) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-white rounded-xl shadow-xl border border-black/5 p-8">
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-8 pb-4 border-b border-black/5">
                                    Price Comparison
                                </h4>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2">
                                            Original Total
                                        </p>
                                        <p className="text-xl font-medium text-black/60 line-through">
                                            €{totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-black/5 rounded-lg border-l-4 border-black">
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2">
                                            Upgrade Impact
                                        </p>
                                        <p className="text-sm">
                                            Selecting a premium vehicle will update your total
                                            based on your rental days.
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-black/5">
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2">
                                            New Estimated Total
                                        </p>
                                        <p className="text-4xl font-bold">
                                            €{estimatedNewTotal.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">
                                                verified
                                            </span>
                                            Includes all taxes & fees
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-10 space-y-3">
                                    <p className="text-[10px] text-[#64748b] text-center italic">
                                        Changes are instantly applied to your card on file upon
                                        confirmation.
                                    </p>
                                </div>
                            </div>

                            {/* Buddy Guarantee */}
                            <div className="p-6 border border-dashed border-black/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="material-symbols-outlined text-black">
                                        shield
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        Buddy Guarantee
                                    </span>
                                </div>
                                <p className="text-xs text-[#64748b] leading-relaxed">
                                    Upgrading is seamless. Your current insurance and extras
                                    will automatically transfer to the new vehicle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#212121]/10 p-4 lg:hidden z-50 flex items-center justify-between safe-area-bottom shadow-lg">
                <div className="flex flex-col">
                    <span className="text-[10px] text-[#212121]/60 font-bold uppercase tracking-wider">Current Vehicle</span>
                    <span className="font-bold text-sm truncate max-w-[150px]">{vehicleName}</span>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-100 hover:bg-gray-200 text-[#212121] px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest"
                >
                    Keep Current
                </button>
            </div>
        </div>
    );
}
