import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqCategories = [
    {
        title: 'Booking & Reservations',
        items: [
            {
                q: 'How does the reservation system work?',
                a: 'Our platform is fully integrated to provide real-time availability and instant booking confirmation. When you select a vehicle, the reservation is immediately locked in our global distribution system, ensuring your car is ready when you arrive.',
            },
            {
                q: 'Can I modify my booking after confirmation?',
                a: 'Yes, you can modify your booking up to 24 hours before pickup through the "Manage Booking" link in your confirmation email. Modifications are subject to vehicle availability and potential price adjustments based on new dates or locations.',
            },
            {
                q: 'What is your cancellation policy?',
                a: 'Free cancellation up to 48 hours before pickup. Cancellations within 48 hours may incur a fee equal to one day\'s rental charge.',
            },
            {
                q: 'Do I need to pay in advance?',
                a: 'A valid credit card is required to secure your booking, but the full amount is charged at pickup. No hidden fees.',
            },
        ],
    },
    {
        title: 'Insurance & Protection',
        items: [
            {
                q: 'What insurance coverage is included?',
                a: 'All rentals include standard Collision Damage Waiver (CDW) and Third Party Liability. We offer premium "Zero-Deductible" packages during the checkout process for total peace of mind, covering everything from glass to tires.',
            },
            {
                q: 'Is there a security deposit required?',
                a: 'Yes, a temporary authorization hold is placed on your credit card at the time of pickup. The amount varies depending on the vehicle category and your chosen insurance package. This hold is typically released within 3-5 business days after returning the vehicle.',
            },
            {
                q: 'What is NOT covered by the insurance?',
                a: 'Standard insurance does not cover: tire damage, windshield damage, driving under the influence, damage to the undercarriage, or driving on unauthorized roads.',
            },
        ],
    },
    {
        title: 'Fleet & Requirements',
        items: [
            {
                q: 'What is the minimum age to rent?',
                a: 'The minimum age is 21 for standard vehicles and 25 for our premium/exotic fleet. Drivers between 21-24 may be subject to a "Young Driver" daily fee depending on the location and vehicle class.',
            },
            {
                q: 'Are the cars in the photos the exact ones?',
                a: 'For our Premium and Exotic categories, we guarantee the specific make and model. For our Standard fleet, we guarantee the vehicle category and features, though the exact color or year might vary slightly based on local availability.',
            },
            {
                q: 'Can I drive on F-roads and highland tracks?',
                a: 'Only 4x4 vehicles are permitted on F-roads and highland tracks. Driving a non-4x4 vehicle on these roads voids your insurance coverage.',
            },
            {
                q: 'Is there a mileage limit?',
                a: 'Most of our vehicles come with unlimited mileage. Any exceptions will be clearly noted during the booking process.',
            },
        ],
    },
    {
        title: 'Pickup & Return',
        items: [
            {
                q: 'Where can I pick up my rental car?',
                a: 'Our main pickup locations are Keflavík Airport (KEF), Reykjavík Downtown, and Akureyri Airport. We also offer hotel delivery in the Reykjavík area.',
            },
            {
                q: 'Can I return the car at a different location?',
                a: 'Yes, one-way rentals are available. Select different pickup and return locations when booking. A small relocation fee may apply.',
            },
            {
                q: 'What documents do I need at pickup?',
                a: 'You\'ll need a valid driver\'s license (held for at least 1 year), passport/national ID, and the credit card used for booking.',
            },
        ],
    },
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true });

    const toggle = (key: string) => {
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredCategories = faqCategories
        .map(cat => ({
            ...cat,
            items: cat.items.filter(
                item =>
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter(cat => cat.items.length > 0);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="pt-20 pb-16 bg-[#f7f7f7]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
                        Help Center
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase mb-10">
                        Frequently Asked<br />Questions
                    </h1>
                    <div className="relative max-w-2xl mx-auto">
                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-black/30">
                            search
                        </span>
                        <input
                            type="text"
                            className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-xl shadow-xl shadow-black/5 focus:ring-2 focus:ring-black/10 text-sm md:text-base"
                            placeholder="Search for answers (e.g. insurance, booking confirmation, age requirements)"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    {filteredCategories.map((cat, catIdx) => (
                        <div key={cat.title} className="mb-16">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-8 border-b border-black/5 pb-4">
                                {cat.title}
                            </h2>
                            <div className="space-y-4">
                                {cat.items.map((item, itemIdx) => {
                                    const key = `${catIdx}-${itemIdx}`;
                                    const isOpen = !!openItems[key];
                                    return (
                                        <div
                                            key={key}
                                            className="bg-white border border-black/5 rounded-xl overflow-hidden"
                                        >
                                            <button
                                                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-black/[0.02] transition-colors text-left"
                                                onClick={() => toggle(key)}
                                                aria-expanded={isOpen}
                                            >
                                                <span className="font-bold uppercase tracking-tight text-lg pr-4">
                                                    {item.q}
                                                </span>
                                                <span
                                                    className={`material-symbols-outlined transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                                >
                                                    expand_more
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-6 text-black/60 text-sm leading-relaxed">
                                                    {item.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-black/40">No matching questions found. Try a different search term.</p>
                        </div>
                    )}

                    {/* Still Have Questions CTA */}
                    <div className="mt-24 p-12 bg-black text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-2">
                                Still have questions?
                            </h3>
                            <p className="text-white/60 text-sm uppercase tracking-widest">
                                Our concierge team is available 24/7 to assist you.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="bg-white text-black px-10 py-4 rounded font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/90 transition-all whitespace-nowrap"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
