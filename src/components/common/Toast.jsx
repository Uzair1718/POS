import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
};

const styles = {
    success: "bg-white border-l-4 border-emerald-500 text-slate-800",
    error: "bg-white border-l-4 border-red-500 text-slate-800",
    info: "bg-white border-l-4 border-blue-500 text-slate-800",
};

export const Toast = ({ id, type = 'info', message, onClose }) => {
    const Icon = icons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 4000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={clsx(
                "flex items-center gap-3 p-4 rounded-lg shadow-xl min-w-[300px] pointer-events-auto",
                styles[type]
            )}
        >
            <Icon size={20} className={clsx(
                type === 'success' && "text-emerald-500",
                type === 'error' && "text-red-500",
                type === 'info' && "text-blue-500"
            )} />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
            </button>
        </motion.div>
    );
};
