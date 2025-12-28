import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className }) => (
    <div className={clsx("bg-white rounded-xl shadow-sm border border-slate-200", className)}>
        {children}
    </div>
);
