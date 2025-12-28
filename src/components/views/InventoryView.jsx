import React, { useState } from 'react';
import { Plus, X, Search, Edit2, Trash2, ImageIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';

export const InventoryView = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    const handleSave = (e) => {
        e.preventDefault();
        const productData = {
            ...editForm,
            id: editForm.id || Date.now(),
            price: parseFloat(editForm.price),
            stock: parseInt(editForm.stock),
        };

        if (isEditing && editForm.id) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsEditing(false);
        setEditForm({});
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
                <Button onClick={() => { setEditForm({ category: "Essentials" }); setIsEditing(true); }}>
                    <Plus size={20} /> Add New Item
                </Button>
            </div>

            {/* Add/Edit Modal Overlay */}
            {(isEditing || editForm.category) && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                    <Card className="w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => { setIsEditing(false); setEditForm({}); }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h3 className="text-xl font-bold mb-4">{editForm.id ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">

                            {/* Image Preview in Form */}
                            <div className="flex justify-center mb-4">
                                <div className="w-32 h-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                                    {editForm.image ? (
                                        <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-slate-400 p-2">
                                            <ImageIcon className="mx-auto mb-1" />
                                            <span className="text-[10px]">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Input
                                label="Product Name"
                                value={editForm.name || ''}
                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                required
                                placeholder="e.g. Shan Masala"
                            />

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Product Image</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setEditForm({ ...editForm, image: reader.result });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-emerald-50 file:text-emerald-700
                                        hover:file:bg-emerald-100
                                      "
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">OR</span>
                                        <input
                                            className="w-full pl-10 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                                            value={editForm.image || ''}
                                            onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                                            placeholder="Paste Image URL..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Price (PKR)"
                                    type="number"
                                    min="0"
                                    value={editForm.price || ''}
                                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Stock Qty"
                                    type="number"
                                    value={editForm.stock || ''}
                                    onChange={e => setEditForm({ ...editForm, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Category</label>
                                <select
                                    className="px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full"
                                    value={editForm.category || ''}
                                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                    required
                                >
                                    <option value="">Select Category...</option>
                                    <option value="Essentials">Essentials</option>
                                    <option value="Grains">Grains</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Condiments">Condiments</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Spices">Spices</option>
                                    <option value="Personal Care">Personal Care</option>
                                    <option value="Snacks">Snacks</option>
                                </select>
                            </div>
                            <Button className="w-full mt-2" type="submit">
                                {editForm.id ? 'Update Product' : 'Add to Inventory'}
                            </Button>
                        </form>
                    </Card>
                </div>
            )}

            <Card className="overflow-hidden border-t-4 border-t-emerald-500">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium">Item</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium text-right">Price</th>
                                <th className="px-6 py-4 font-medium text-center">Stock Level</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                                {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <span className="truncate max-w-[200px]">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        <span className="px-2 py-1 rounded bg-slate-100 text-xs font-semibold whitespace-nowrap">{p.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-emerald-700 whitespace-nowrap">{formatCurrency(p.price)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1 w-24 mx-auto">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${p.stock <= 0 ? 'bg-slate-800 text-white' :
                                                p.stock < 20 ? 'bg-red-100 text-red-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {p.stock <= 0 ? 'Out of Stock' : `${p.stock} Units`}
                                            </span>
                                            {/* Visual Bar */}
                                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${p.stock < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditForm(p); setIsEditing(true); }}
                                                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan="5" className="p-8 text-center text-slate-400 italic">Inventory is empty.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
