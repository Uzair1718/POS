import React from 'react';
import { X, Printer } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useStore } from '../../contexts/StoreContext';

export const ReceiptModal = ({ order, onClose }) => {
    const { settings } = useStore();
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Controls */}
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-lg">
                    <h3 className="font-bold text-slate-700">Receipt Preview</h3>
                    <div className="flex gap-2">
                        <button onClick={() => window.print()} className="p-2 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors">
                            <Printer size={18} />
                        </button>
                        <button onClick={onClose} className="p-2 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Printable Area */}
                <div className="p-8 print-area bg-white text-slate-900 text-sm font-mono leading-relaxed" id="receipt">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-bold uppercase tracking-wider mb-2">{settings.storeName}</h1>
                        <p className="text-xs text-slate-500">{settings.address}</p>
                        <p className="text-xs text-slate-500">Tel: {settings.phone}</p>
                        {settings.ntn && <p className="text-xs text-slate-500">NTN: {settings.ntn}</p>}
                    </div>

                    <div className="border-b-2 border-dashed border-slate-300 mb-4 pb-2">
                        <div className="flex justify-between text-xs">
                            <span>Order #: {order.id.toString().slice(-6)}</span>
                            <span>{formatDate(order.date)}</span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-xs text-slate-500">{item.qty} x {item.price}</p>
                                </div>
                                <span className="font-bold">{item.qty * item.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 border-dashed border-slate-300 pt-4 mb-6 space-y-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        {order.tax > 0 && (
                            <div className="flex justify-between text-slate-500">
                                <span>Tax</span>
                                <span>{formatCurrency(order.tax)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-2 mt-2">
                            <span>Total</span>
                            <span>{formatCurrency(order.total)}</span>
                        </div>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                        <p>{settings.footerMessage}</p>
                        <p className="mt-2 text-[10px] uppercase">Software by Gemini</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
