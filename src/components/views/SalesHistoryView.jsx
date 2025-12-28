import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Card } from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ReceiptModal } from '../modals/ReceiptModal';
import { FileText } from 'lucide-react';

export const SalesHistoryView = () => {
    const { sales } = useStore();
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Sales History</h2>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium whitespace-nowrap">Order ID</th>
                                <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                                <th className="px-6 py-4 font-medium whitespace-nowrap">Items</th>
                                <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Total</th>
                                <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {sales.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No history available</td>
                                </tr>
                            ) : sales.map(sale => (
                                <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">#{sale.id}</td>
                                    <td className="px-6 py-4 text-slate-800 whitespace-nowrap">{formatDate(sale.date)}</td>
                                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                                        {sale.items.length} items
                                        <span className="text-slate-400 text-xs ml-1">({sale.items.reduce((s, i) => s + i.qty, 0)} qty)</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-700 whitespace-nowrap">{formatCurrency(sale.total)}</td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <button
                                            onClick={() => setSelectedOrder(sale)}
                                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded transition-colors text-xs font-bold"
                                        >
                                            <FileText size={14} /> View Receipt
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedOrder && (
                <ReceiptModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
};
