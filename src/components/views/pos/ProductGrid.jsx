import React, { useState } from 'react';
import { Search, Plus, Package, ImageIcon } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { Card } from '../../common/Card';
import { formatCurrency } from '../../../utils/formatters';

export const ProductGrid = () => {
    const { products, addToCart } = useStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
            {/* Search & Filter Header */}
            <Card className="p-4 shrink-0">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${selectedCategory === cat
                                        ? "bg-slate-800 text-white"
                                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto pr-2 pb-20 lg:pb-0 scroll-smooth">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map(product => {
                        const isLowStock = product.stock > 0 && product.stock < 10;
                        const isOutOfStock = product.stock <= 0;

                        return (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                disabled={isOutOfStock}
                                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden text-left transition-all hover:shadow-lg hover:border-emerald-300 active:scale-95 disabled:opacity-60 disabled:pointer-events-none flex flex-col h-full"
                            >
                                {/* Image Area */}
                                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300?text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <ImageIcon size={48} />
                                        </div>
                                    )}

                                    {/* Stock Badges Over Image */}
                                    <div className="absolute top-2 right-2">
                                        {isOutOfStock ? (
                                            <span className="bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Out of Stock</span>
                                        ) : isLowStock ? (
                                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm animate-pulse">Low Stock: {product.stock}</span>
                                        ) : (
                                            <span className="bg-white/90 text-slate-700 text-xs font-bold px-2 py-1 rounded shadow-sm backdrop-blur-sm">{product.stock} Left</span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800 leading-tight mb-1 line-clamp-2">{product.name}</h3>
                                        <p className="text-xs text-slate-500 mb-2">{product.category}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                                        <span className="font-bold text-lg text-emerald-700">{formatCurrency(product.price)}</span>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            <Plus size={18} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                            <Package size={48} className="mb-4 opacity-50" />
                            <p>No products found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
