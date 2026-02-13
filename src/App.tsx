import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';

// Lazy-load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const VehicleListingPage = lazy(() => import('@/pages/VehicleListingPage'));
const VehicleDetailPage = lazy(() => import('@/pages/VehicleDetailPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const BookingConfirmPage = lazy(() => import('@/pages/BookingConfirmPage'));
const ManageBookingPage = lazy(() => import('@/pages/ManageBookingPage'));
const UpgradePage = lazy(() => import('@/pages/UpgradePage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Admin
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const BookingsPage = lazy(() => import('@/pages/admin/BookingsPage'));
const ContentPage = lazy(() => import('@/pages/admin/ContentPage'));
const ReviewsPage = lazy(() => import('@/pages/admin/ReviewsPage'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

function PageLoader() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route element={<Layout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/vehicles" element={<VehicleListingPage />} />
                            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/booking-confirmed" element={<BookingConfirmPage />} />
                            <Route path="/manage-booking" element={<ManageBookingPage />} />
                            <Route path="/upgrade" element={<UpgradePage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="bookings" element={<BookingsPage />} />
                            <Route path="content" element={<ContentPage />} />
                            <Route path="reviews" element={<ReviewsPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
