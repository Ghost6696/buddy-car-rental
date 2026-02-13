import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { getVehicles } from '@/api/vehicles';
import type { Vehicle, VehicleFilter, VehicleCategory } from '@/types/vehicle';

const categories: VehicleCategory[] = ['Economy', 'Compact', 'Mid-Size', 'SUV', '4x4', 'Premium', 'Van'];
const transmissions = ['Automatic', 'Manual'] as const;

export default function VehicleListingPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filter, setFilter] = useState<VehicleFilter>({
        sortBy: 'price-asc',
    });

    useEffect(() => {
        loadVehicles();
    }, [filter]);

    async function loadVehicles() {
        setLoading(true);
        try {
            const data = await getVehicles(filter);
            setVehicles(data);
        } finally {
            setLoading(false);
        }
    }

    const toggleCategory = (cat: VehicleCategory) => {
        setFilter(prev => ({
            ...prev,
            category: prev.category === cat ? undefined : cat,
        }));
    };

    const toggleTransmission = (t: 'Automatic' | 'Manual') => {
        setFilter(prev => ({
            ...prev,
            transmission: prev.transmission === t ? undefined : t,
        }));
    };

    /* ─── Sidebar Filter Panel (shared between desktop & mobile) ─── */
    const filterPanel = (
        <div className="space-y-8">
            {/* Price Range */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#212121]/40 mb-4">Price Range</h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="50"
                        max="500"
                        className="w-full accent-[#212121]"
                        defaultValue={500}
                    />
                    <div className="flex justify-between text-xs font-bold">
                        <span>€50/day</span>
                        <span>€500/day</span>
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#212121]/40 mb-2">Category</h3>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filter.category === cat}
                                onChange={() => toggleCategory(cat)}
                                className="rounded border-[#212121]/20 text-[#212121] focus:ring-[#212121] h-4 w-4"
                            />
                            <span className="text-sm font-medium">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#212121]/40 mb-2">Transmission</h3>
                <div className="flex flex-wrap gap-2">
                    {transmissions.map(t => (
                        <button
                            key={t}
                            onClick={() => toggleTransmission(t)}
                            className={`px-4 py-2 border border-[#212121]/10 rounded-lg text-xs font-bold uppercase transition-colors ${filter.transmission === t
                                ? 'bg-[#212121] text-white'
                                : 'bg-white hover:bg-[#212121]/5'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Need Help CTA */}
            <div className="p-6 bg-[#212121] rounded-xl text-white">
                <h4 className="font-bold text-lg leading-tight mb-2">Need Help?</h4>
                <p className="text-sm text-white/70 mb-4 font-light">
                    Contact our premium concierge service for personalized vehicle matching.
                </p>
                <Link
                    to="/contact"
                    className="block w-full bg-white text-[#212121] py-2 rounded font-bold text-xs uppercase tracking-wider text-center no-underline"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-[#f7f7f7] min-h-screen">
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32 lg:pb-8">
                {/* ─── Results Header ─── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[#212121]/10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#212121]">Available Vehicles</h1>
                        <p className="text-[#212121]/60 mt-1 flex items-center text-sm md:text-base">
                            <span className="material-icons text-sm mr-1">location_on</span>
                            Reykjavik, Iceland
                        </p>
                    </div>
                    {/* Desktop Controls */}
                    <div className="hidden lg:flex mt-4 md:mt-0 items-center space-x-4">
                        <div className="flex items-center bg-white border border-[#212121]/10 px-4 py-2 rounded-lg">
                            <span className="text-xs font-semibold uppercase text-[#212121]/40 mr-3">Sort by</span>
                            <select
                                className="bg-transparent text-sm font-semibold border-none focus:ring-0 p-0 pr-8 cursor-pointer outline-none"
                                value={filter.sortBy || 'price-asc'}
                                onChange={e => setFilter({ ...filter, sortBy: e.target.value as VehicleFilter['sortBy'] })}
                            >
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name A–Z</option>
                            </select>
                        </div>
                        <div className="text-sm font-medium text-[#212121]/60">
                            <span className="text-[#212121] font-bold">{vehicles.length}</span> vehicles found
                        </div>
                    </div>
                </header>

                {/* ─── Mobile Filters Drawer ─── */}
                {showMobileFilters && (
                    <div className="lg:hidden fixed inset-0 z-[60] bg-white overflow-y-auto p-6 animate-in slide-in-from-bottom-10 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-lg">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#212121]/5"
                            >
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                        {filterPanel}
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full mt-8 bg-[#212121] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest"
                        >
                            Show Results
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ─── Sidebar Filters (Desktop) ─── */}
                    <aside className="hidden lg:block col-span-3">
                        {filterPanel}
                    </aside>

                    {/* ─── Vehicle Grid ─── */}
                    <section className="col-span-1 lg:col-span-9">
                        {/* Mobile result count */}
                        <div className="lg:hidden mb-4 text-xs font-medium text-[#212121]/60">
                            Showing <span className="text-[#212121] font-bold">{vehicles.length}</span> vehicles
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="bg-white border border-[#212121]/10 rounded-xl overflow-hidden">
                                        <div className="h-48 bg-[#212121]/5 animate-pulse" />
                                        <div className="p-5 space-y-3">
                                            <div className="h-5 w-3/4 bg-[#212121]/5 rounded animate-pulse" />
                                            <div className="h-4 w-1/2 bg-[#212121]/5 rounded animate-pulse" />
                                            <div className="h-10 w-full bg-[#212121]/5 rounded animate-pulse mt-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : vehicles.length === 0 ? (
                            <div className="text-center py-20">
                                <span className="material-icons text-5xl text-[#212121]/20 mb-4 block">search_off</span>
                                <p className="text-lg font-bold mb-2 text-[#212121]">No vehicles found</p>
                                <p className="text-[#212121]/60 text-sm">Try adjusting your filters or search criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {vehicles.map(v => (
                                    <VehicleCard key={v.id} vehicle={v} />
                                ))}
                            </div>
                        )}

                        {/* ─── Pagination ─── */}
                        {!loading && vehicles.length > 0 && (
                            <div className="mt-12 flex items-center justify-center space-x-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded border border-[#212121]/10 hover:bg-[#212121]/5 transition-colors">
                                    <span className="material-icons">chevron_left</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-[#212121] text-white font-bold text-sm tracking-widest">
                                    1
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded border border-[#212121]/10 hover:bg-[#212121]/5 transition-colors font-bold text-sm">
                                    2
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded border border-[#212121]/10 hover:bg-[#212121]/5 transition-colors">
                                    <span className="material-icons">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </section>
                </div>

                {/* Mobile Sticky Filter/Sort Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#212121]/10 p-4 lg:hidden z-50 grid grid-cols-2 gap-4 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center justify-center gap-2 bg-white border border-[#212121]/10 text-[#212121] py-3 rounded-lg font-bold text-xs uppercase tracking-widest"
                    >
                        <span className="material-icons text-sm">tune</span>
                        Filters
                    </button>
                    <div className="relative">
                        <select
                            className="absolute inset-0 w-full h-full opacity-0 z-10"
                            value={filter.sortBy || 'price-asc'}
                            onChange={e => setFilter({ ...filter, sortBy: e.target.value as VehicleFilter['sortBy'] })}
                        >
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name">Name A–Z</option>
                        </select>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#212121] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest">
                            <span className="material-icons text-sm">sort</span>
                            Sort
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
