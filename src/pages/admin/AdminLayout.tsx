import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Star, LogOut, Car, Menu, X } from 'lucide-react';

export default function AdminLayout() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') setAuthenticated(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password gate — replace with real auth in production
        if (password === 'buddy2026') {
            setAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-6">
                <form onSubmit={handleLogin} className="bg-white rounded-xl border border-[var(--color-border)] p-8 w-full max-w-sm">
                    <div className="flex items-center justify-center gap-2 text-[var(--color-primary)] mb-6">
                        <Car className="w-7 h-7" />
                        <span className="font-bold text-xl">Buddy Admin</span>
                    </div>
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input mb-4"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                    />
                    <button type="submit" className="btn btn-primary w-full">Sign In</button>
                </form>
            </div>
        );
    }

    const navItems = [
        { to: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', end: true },
        { to: '/admin/bookings', icon: <BookOpen className="w-4 h-4" />, label: 'Bookings' },
        { to: '/admin/content', icon: <FileText className="w-4 h-4" />, label: 'Content' },
        { to: '/admin/reviews', icon: <Star className="w-4 h-4" />, label: 'Reviews' },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'fixed inset-0 z-50' : 'hidden'} lg:static lg:block lg:w-60 bg-white border-r border-[var(--color-border)] shrink-0`}>
                <div className="p-5 flex items-center justify-between border-b border-[var(--color-border)]">
                    <Link to="/admin" className="flex items-center gap-2 text-[var(--color-primary)] font-bold no-underline">
                        <Car className="w-5 h-5" /> Buddy Admin
                    </Link>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="p-3 space-y-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${isActive
                                    ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                                }`
                            }
                        >
                            {item.icon} {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--color-border)]">
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-[var(--color-error)] transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                    <Link to="/" className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg text-xs text-[var(--color-text-muted)] no-underline hover:bg-[var(--color-surface)]">
                        ← Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[var(--color-border)]">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="font-semibold text-sm">Buddy Admin</span>
                    <div className="w-5" />
                </div>

                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
