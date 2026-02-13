import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/utils/validators';
import { useState } from 'react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = (data: ContactFormData) => {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="bg-[#f7f7f7] min-h-screen">
            {/* Hero */}
            <section className="pt-24 pb-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-black/5 text-black/60 text-xs font-bold uppercase tracking-widest">
                        <span className="material-icons text-sm">support_agent</span>
                        Concierge Support
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-black/40 text-lg max-w-2xl font-medium">
                        Have questions about your rental or need assistance? Our premium support team is available 24/7 to ensure your journey is seamless.
                    </p>
                </div>
            </section>

            {/* Form + Contact Info */}
            <section className="pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left — Contact Form */}
                        <div className="space-y-12">
                            {submitted && (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                                    <p className="text-sm text-emerald-600 font-medium">
                                        Message sent! We'll get back to you within 2 hours.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full bg-white border-gray-200 rounded-none border-t-0 border-x-0 border-b-2 focus:ring-0 focus:border-black px-0 py-4 transition-all duration-300 ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="John Doe"
                                            {...register('name')}
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
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
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full bg-white border-gray-200 rounded-none border-t-0 border-x-0 border-b-2 focus:ring-0 focus:border-black px-0 py-4 transition-all duration-300 ${errors.subject ? 'border-red-500' : ''}`}
                                        placeholder="Rental Inquiry"
                                        {...register('subject')}
                                    />
                                    {errors.subject && (
                                        <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">
                                        Message
                                    </label>
                                    <textarea
                                        className={`w-full bg-white border-gray-200 rounded-none border-t-0 border-x-0 border-b-2 focus:ring-0 focus:border-black px-0 py-4 transition-all duration-300 resize-none ${errors.message ? 'border-red-500' : ''}`}
                                        placeholder="How can we help you today?"
                                        rows={4}
                                        {...register('message')}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-black text-white w-full py-5 rounded-none text-sm font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
                                >
                                    Send Message
                                    <span className="material-icons text-sm">north_east</span>
                                </button>
                            </form>
                        </div>

                        {/* Right — Contact Info + Map */}
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-black/5 rounded">
                                        <span className="material-symbols-outlined text-black/60">corporate_fare</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Headquarters</h3>
                                        <p className="text-sm text-black/60 leading-relaxed">
                                            Keflavík Airport Terminal<br />
                                            Reykjanesbaer, Iceland<br />
                                            235, Iceland
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-black/5 rounded">
                                        <span className="material-symbols-outlined text-black/60">call</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Direct Line</h3>
                                        <p className="text-sm text-black/60 leading-relaxed">
                                            +354 555 1234<br />
                                            Mon–Sun, 24/7 Support
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-black/5 rounded">
                                        <span className="material-symbols-outlined text-black/60">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Email Support</h3>
                                        <p className="text-sm text-black/60 leading-relaxed">
                                            concierge@buddy.rentals<br />
                                            partners@buddy.rentals
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-black/5 rounded">
                                        <span className="material-symbols-outlined text-black/60">terminal</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Integration</h3>
                                        <p className="text-sm text-black/60 leading-relaxed">

                                            API Status: Operational
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative w-full h-[400px] bg-zinc-100 overflow-hidden group rounded-lg">
                                <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-black/10">map</span>
                                </div>
                                <div className="absolute inset-0 pointer-events-none border border-black/5" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute w-12 h-12 bg-black/20 rounded-full animate-ping" />
                                        <div className="relative w-4 h-4 bg-black rounded-full border-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
