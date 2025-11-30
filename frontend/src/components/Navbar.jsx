import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <nav className="border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-display font-bold tracking-tight">
                        Ventur<span className="text-primary">ify</span>
                    </span>
                </Link>

                {token ? (
                    <div className="flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            to="/evaluate"
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/evaluate') ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            New Idea
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-red-400 transition-colors ml-4"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Login</Link>
                        <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
