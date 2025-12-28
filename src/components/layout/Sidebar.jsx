import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, History, Settings, X, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

import logo from '../../assets/logo.png';

export const Sidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/pos', icon: ShoppingCart, label: 'POS Terminal' },
        { path: '/inventory', icon: Package, label: 'Inventory' },
        { path: '/history', icon: History, label: 'Sales History' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={clsx(
                "fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col shadow-2xl lg:shadow-none",
                isOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <img src={logo} alt="POS" className="w-8 h-8 rounded-lg shadow-lg shadow-emerald-500/20" />
                    <h1 className="font-bold text-white tracking-wide text-lg">POS System</h1>
                    <button onClick={onClose} className="lg:hidden ml-auto text-slate-400 hover:text-white"><X size={20} /></button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                            className={({ isActive }) => clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                                    : 'hover:bg-slate-800 hover:text-white'
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={20} className={clsx("transition-transform duration-300", isActive && "scale-110")} />
                                    <span className="font-medium relative z-10">{item.label}</span>
                                    {isActive && (
                                        <ChevronRight size={16} className="ml-auto opacity-50 animate-pulse" />
                                    )}
                                    {/* Hover effect background */}
                                    {!isActive && <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner ${currentUser?.role === 'admin' ? 'bg-gradient-to-tr from-purple-500 to-indigo-400' : 'bg-gradient-to-tr from-emerald-500 to-teal-400'}`}>
                            {currentUser?.name?.substring(0, 2).toUpperCase() || 'US'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{currentUser?.name || 'User'}</p>
                            <p className="text-slate-500 text-xs truncate capitalize">{currentUser?.role || 'Staff'}</p>
                        </div>
                        <button
                            onClick={logout}
                            title="Sign Out"
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
