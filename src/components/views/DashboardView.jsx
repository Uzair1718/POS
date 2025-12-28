import React from 'react';
import { DollarSign, ShoppingBag, Package, AlertTriangle } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { Card } from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DashboardView = () => {
    const { sales, products } = useStore();

    const today = new Date().toDateString();
    const todaysSales = sales.filter(s => new Date(s.date).toDateString() === today);
    const revenueToday = todaysSales.reduce((sum, s) => sum + s.total, 0);
    const itemsSoldToday = todaysSales.reduce((sum, s) => sum + s.items.reduce((is, i) => is + i.qty, 0), 0);

    const lowStockProducts = products.filter(p => p.stock < 20);

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 shadow-sm">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Today's Revenue</p>
                            <p className="text-3xl font-bold text-slate-800 tracking-tight">{formatCurrency(revenueToday)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-sm">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Transactions Today</p>
                            <p className="text-3xl font-bold text-slate-800 tracking-tight">{todaysSales.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-sm">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Items Sold Today</p>
                            <p className="text-3xl font-bold text-slate-800 tracking-tight">{itemsSoldToday}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stock Alerts */}
                <Card className="p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Stock Alerts</h3>
                        {lowStockProducts.length > 0 && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">Low Stock</span>
                        )}
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {lowStockProducts.length === 0 ? (
                            <p className="text-slate-500 italic text-center py-8">All stock levels are healthy.</p>
                        ) : (
                            lowStockProducts.map(p => (
                                <div key={p.id} className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle size={18} />
                                        <span className="font-medium truncate">{p.name}</span>
                                    </div>
                                    <span className="text-sm font-bold bg-white px-2 py-1 rounded border border-red-200 shadow-sm whitespace-nowrap">
                                        {p.stock} left
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                    </div>
                    <div className="overflow-hidden">
                        <div className="space-y-0 divide-y divide-slate-100">
                            {sales.slice(0, 5).map(sale => (
                                <div key={sale.id} className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="font-medium text-slate-800">Order #{sale.id.toString().slice(-4)}</p>
                                        <p className="text-xs text-slate-500">{formatDate(sale.date)}</p>
                                    </div>
                                    <p className="font-bold text-emerald-600">{formatCurrency(sale.total)}</p>
                                </div>
                            ))}
                            {sales.length === 0 && <p className="text-slate-500 italic text-center py-8">No sales yet.</p>}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
