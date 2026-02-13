import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { to: '/vehicles', label: 'Vehicles' },
    { to: '/manage-booking', label: 'Manage Booking' },
    { to: '/faq', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#212121]/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <span className="text-2xl font-extrabold tracking-tighter uppercase text-[#212121]">Buddy.</span>
                    <span className="text-xs font-medium tracking-widest uppercase opacity-40 text-[#212121]">Rentals</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-sm font-medium uppercase tracking-wide no-underline transition-colors ${isActive
                                    ? 'text-[#212121]'
                                    : 'text-[#212121] hover:text-[#212121]/60'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/vehicles"
                        className="bg-[#212121] text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-widest hover:bg-[#212121]/90 transition-all no-underline"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden p-2 -mr-2 text-[#212121]"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[#212121]/5 bg-white">
                    <nav className="container mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded text-sm font-medium uppercase tracking-wide no-underline transition-colors ${isActive
                                        ? 'bg-[#f7f7f7] text-[#212121]'
                                        : 'text-[#212121]/60 hover:bg-[#f7f7f7]'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/vehicles"
                            onClick={() => setMobileOpen(false)}
                            className="bg-[#212121] text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-widest text-center no-underline mt-2"
                        >
                            Book Now
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
