import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

export const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { settings } = useStore();

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Mobile Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between lg:hidden shrink-0 z-10 sticky top-0">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="/src/assets/logo.png" alt="Logo" className="w-6 h-6 rounded" />
                        <span className="font-bold text-slate-800">{settings.storeName}</span>
                    </div>
                    <div className="w-8"></div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-auto p-4 lg:p-8 relative scroll-smooth">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
