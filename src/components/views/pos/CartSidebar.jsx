import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { Button } from '../../common/Button';
import { formatCurrency } from '../../../utils/formatters';
import { CheckoutModal } from '../../modals/CheckoutModal';

export const CartSidebar = () => {
    const { cart, updateQty, clearCart, cartTotal, taxAmount, grandTotal, settings } = useStore();
    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <>
            <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl lg:h-full h-[calc(100vh-200px)]">
                {/* Cart Header */}
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                    <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <ShoppingCart size={20} /> Current Order
                    </h2>
                    <button
                        onClick={clearCart}
                        disabled={cart.length === 0}
                        className="text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors disabled:opacity-50"
                    >
                        Clear All
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                            <ShoppingBag size={64} className="mb-4" />
                            <p>Basket is empty</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-3 items-center bg-slate-50 p-2 pr-3 rounded-lg group border border-slate-100 hover:border-emerald-200 transition-colors animate-fade-in-up">
                                {/* Mini Thumbnail */}
                                <div className="w-12 h-12 bg-white rounded-md border border-slate-200 shrink-0 overflow-hidden">
                                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-800 text-sm truncate">{item.name}</p>
                                    <p className="text-xs text-slate-500">{formatCurrency(item.price)} x {item.qty}</p>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <p className="font-bold text-slate-800 text-sm">{formatCurrency(item.price * item.qty)}</p>
                                    <div className="flex items-center gap-1 bg-white rounded-md border border-slate-200 p-0.5 shadow-sm">
                                        <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-slate-100 rounded text-slate-600">
                                            {item.qty === 1 ? <Trash2 size={12} className="text-red-500" /> : <Minus size={12} />}
                                        </button>
                                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-slate-100 rounded text-slate-600">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Summary */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                        {settings.taxRate > 0 && (
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Tax ({settings.taxRate}%)</span>
                                <span>{formatCurrency(taxAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                            <span>Total</span>
                            <span>{formatCurrency(grandTotal)}</span>
                        </div>
                    </div>
                    <Button
                        className="w-full py-3 text-lg shadow-lg shadow-emerald-900/10"
                        onClick={() => setShowCheckout(true)}
                        disabled={cart.length === 0}
                    >
                        Checkout {cartTotal > 0 && `• ${formatCurrency(grandTotal)}`}
                    </Button>
                </div>
            </div>

            {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
        </>
    );
};
