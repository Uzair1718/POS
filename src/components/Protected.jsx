import React, { useState } from 'react';
import { ShieldAlert, Asterisk, Unlock } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Input } from './common/Input';

export const Protected = ({ children }) => {
    const { isAuthenticated, login } = useStore();
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    if (isAuthenticated) {
        return children;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(pin)) {
            setError(false);
        } else {
            setError(true);
            setPin("");
        }
    };

    return (
        <div className="flex items-center justify-center h-full min-h-[50vh] animate-fade-in">
            <Card className="max-w-md w-full p-8 border-t-4 border-t-emerald-500 shadow-xl">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 mb-2">
                        <ShieldAlert size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Admin Access Required</h2>
                    <p className="text-slate-500 text-center text-sm">Use <b>1234</b> as default PIN.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Unlock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Enter Admin PIN"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-center font-mono text-lg tracking-widest"
                            value={pin}
                            onChange={e => setPin(e.target.value)}
                            maxLength={4}
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center font-medium animate-pulse">Incorrect PIN. Try again.</p>}

                    <Button type="submit" className="w-full py-3 text-lg">
                        Verify Access
                    </Button>
                </form>
            </Card>
        </div>
    );
};
