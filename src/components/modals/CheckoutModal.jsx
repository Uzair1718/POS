import React, { useState } from 'react';
import { X, DollarSign, CreditCard } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ReceiptModal } from './ReceiptModal';

export const CheckoutModal = ({ onClose }) => {
    const { cart, grandTotal, taxAmount, completeSale } = useStore();
    const [completedOrder, setCompletedOrder] = useState(null);

    const handleCheckout = () => {
        const order = completeSale("Cash");
        setCompletedOrder(order);
    };

    if (completedOrder) {
        return <ReceiptModal order={completedOrder} onClose={() => { setCompletedOrder(null); onClose(); }} />;
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-md p-0 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-lg">Confirm Payment</h3>
                    <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="text-center space-y-1">
                        <p className="text-slate-500">Total Payable Amount</p>
                        <p className="text-4xl font-bold text-emerald-600">{formatCurrency(grandTotal)}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Items Count</span>
                            <span className="font-medium">{cart.reduce((a, b) => a + b.qty, 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Tax</span>
                            <span className="font-medium">{formatCurrency(taxAmount)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 border-2 border-emerald-500 bg-emerald-50 text-emerald-700 rounded-lg font-bold flex flex-col items-center justify-center gap-2 transition-all hover:bg-emerald-100">
                            <DollarSign size={24} /> Cash
                        </button>
                        <button className="p-4 border border-slate-200 bg-white text-slate-400 rounded-lg font-bold flex flex-col items-center justify-center gap-2 cursor-not-allowed opacity-60">
                            <span className="text-xs bg-slate-100 px-2 rounded">Coming Soon</span>
                            <div className="flex flex-col items-center">
                                <CreditCard size={24} /> Card
                            </div>
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100">
                    <Button className="w-full py-3 text-lg" onClick={handleCheckout}>
                        Complete Transaction
                    </Button>
                </div>
            </Card>
        </div>
    );
};
