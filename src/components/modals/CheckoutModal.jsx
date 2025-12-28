import React, { useState } from 'react';
import { X, DollarSign, CreditCard } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ReceiptModal } from './ReceiptModal';

export const CheckoutModal = ({ onClose }) => {
    const { cart, grandTotal, taxAmount, completeSale } = useStore();
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [finalOrder, setFinalOrder] = useState(null);

    const handleCheckout = () => {
        try {
            if (paymentMethod === 'Card') {
                setIsProcessing(true);
                // Simulate processing delay
                setTimeout(() => {
                    const order = completeSale("Card");
                    if (order) {
                        setFinalOrder(order);
                    }
                    setIsProcessing(false);
                }, 1500);
            } else {
                const order = completeSale("Cash");
                if (order) {
                    setFinalOrder(order);
                }
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            setIsProcessing(false);
        }
    };

    if (finalOrder) {
        return <ReceiptModal order={finalOrder} onClose={() => { setFinalOrder(null); onClose(); }} />;
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

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setPaymentMethod("Cash")}
                            className={`p-4 border-2 rounded-lg font-bold flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'Cash' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}
                        >
                            <DollarSign size={24} /> Cash
                        </button>
                        <button
                            onClick={() => setPaymentMethod("Card")}
                            className={`p-4 border-2 rounded-lg font-bold flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'Card' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}
                        >
                            <CreditCard size={24} /> Card
                        </button>
                    </div>

                    {paymentMethod === 'Card' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={cardDetails.name}
                                    onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength="19"
                                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                                    value={cardDetails.number}
                                    onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                                        value={cardDetails.expiry}
                                        onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">CVC</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        maxLength="3"
                                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                                        value={cardDetails.cvc}
                                        onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        className={`w-full py-3 text-lg ${paymentMethod === 'Card' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay ${formatCurrency(grandTotal)}`}
                    </Button>
                </div>
            </Card>
        </div>
    );
};
