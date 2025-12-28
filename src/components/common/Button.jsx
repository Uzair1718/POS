import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, onClick, variant = "primary", className, disabled = false, ...props }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:bg-slate-50",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
        outline: "border border-slate-300 text-slate-600 hover:bg-slate-50"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(baseStyle, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
