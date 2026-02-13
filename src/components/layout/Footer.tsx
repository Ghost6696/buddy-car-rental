import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#212121]/5 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 no-underline mb-4">
                            <span className="text-xl font-extrabold tracking-tighter uppercase text-[#212121]">Buddy.</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 text-[#212121]">Rentals</span>
                        </Link>
                        <p className="text-sm text-[#212121]/50 leading-relaxed">
                            Your trusted car rental partner. Quality vehicles, transparent pricing, and exceptional service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/40 mb-4">Quick Links</h3>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {[
                                { to: '/vehicles', label: 'Our Fleet' },
                                { to: '/manage-booking', label: 'Manage Booking' },
                                { to: '/faq', label: 'FAQ' },
                                { to: '/contact', label: 'Contact Us' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-[#212121]/60 no-underline hover:text-[#212121] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/40 mb-4">Contact</h3>
                        <ul className="space-y-3 list-none p-0 m-0">
                            <li className="flex items-start gap-2 text-sm text-[#212121]/60">
                                <span className="material-icons text-base mt-0.5">call</span>
                                +354 555 1234
                            </li>
                            <li className="flex items-start gap-2 text-sm text-[#212121]/60">
                                <span className="material-icons text-base mt-0.5">mail</span>
                                info@buddycarrental.is
                            </li>
                            <li className="flex items-start gap-2 text-sm text-[#212121]/60">
                                <span className="material-icons text-base mt-0.5">place</span>
                                Keflavík Airport, Iceland
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/40 mb-4">Opening Hours</h3>
                        <ul className="space-y-2 list-none p-0 m-0 text-sm text-[#212121]/60">
                            <li className="flex justify-between">
                                <span>Mon–Fri</span>
                                <span>08:00 – 18:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span>09:00 – 16:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>10:00 – 14:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-[#212121]/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/30">
                        © {new Date().getFullYear()} Buddy Car Rental. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/faq" className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/30 no-underline hover:text-[#212121] transition-opacity">Privacy Policy</Link>
                        <Link to="/faq" className="text-[10px] font-bold uppercase tracking-widest text-[#212121]/30 no-underline hover:text-[#212121] transition-opacity">Terms of Service</Link>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-[#212121]/5 flex items-center justify-center hover:bg-[#212121]/10 transition-colors" aria-label="Facebook">
                            <span className="material-icons text-sm text-[#212121]">facebook</span>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#212121]/5 flex items-center justify-center hover:bg-[#212121]/10 transition-colors" aria-label="Instagram">
                            <span className="material-icons text-sm text-[#212121]">camera_alt</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
