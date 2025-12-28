import React from 'react';

export const Input = ({ label, className, ...props }) => (
    <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-medium text-slate-600">{label}</label>}
        <input
            className={`px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors w-full ${className || ''}`}
            {...props}
        />
    </div>
);
