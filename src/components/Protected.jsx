import React, { useState } from 'react';
import { ShieldAlert, Asterisk, Unlock, User } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { useToast } from '../contexts/ToastContext';

export const Protected = ({ children, requiredRole }) => {
    const { currentUser, login } = useStore();
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    // 1. Check if user is logged in
    if (!currentUser) {
        const handleLogin = (e) => {
            e.preventDefault();
            setLoading(true);
            // Small delay for UX
            setTimeout(() => {
                if (!login(pin)) {
                    setPin("");
                }
                setLoading(false);
            }, 500);
        };

        return (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)] animate-fade-in">
                <Card className="max-w-sm w-full p-8 shadow-xl border-t-4 border-t-emerald-500">
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="p-4 bg-emerald-50 rounded-full text-emerald-600">
                            <ShieldAlert size={40} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-800">System Locked</h2>
                            <p className="text-slate-500 mt-1">Enter PIN to access.</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Unlock size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter PIN"
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-center font-mono text-xl tracking-[0.5em]"
                                value={pin}
                                onChange={e => setPin(e.target.value)}
                                maxLength={4}
                                autoFocus
                            />
                        </div>

                        <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
                            {loading ? "Verifying..." : "Unlock System"}
                        </Button>
                    </form>
                    <p className="mt-6 text-center text-xs text-slate-400">Default: 1234</p>
                </Card>
            </div>
        );
    }

    // 2. Check Role (if required)
    if (requiredRole && currentUser.role !== requiredRole && currentUser.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] animate-fade-in gap-4">
                <div className="p-4 bg-red-50 rounded-full text-red-500">
                    <ShieldAlert size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
                <p className="text-slate-500">You do not have permission to view this page.</p>
                <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    return children;
};
