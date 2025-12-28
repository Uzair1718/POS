import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Save, Trash, UserPlus, Shield } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export const SettingsView = () => {
    const { settings, updateSettings, users, addUser, deleteUser, currentUser } = useStore();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saved, setSaved] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", pin: "", role: "staff" });
    const toast = useToast();

    const handleSave = (e) => {
        e.preventDefault();
        updateSettings(localSettings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        toast.success("Settings saved successfully");
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.pin) {
            toast.error("Please fill all fields");
            return;
        }
        if (users.some(u => u.pin === newUser.pin)) {
            toast.error("PIN already exists");
            return;
        }
        addUser(newUser);
        setNewUser({ name: "", pin: "", role: "staff" });
    };

    const handleDeleteUser = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-slate-800">System Administration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Store Settings */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                        <Save size={20} /> Store Details
                    </h3>
                    <Card className="p-6">
                        <form onSubmit={handleSave} className="space-y-6">
                            <Input
                                label="Store Name"
                                value={localSettings.storeName}
                                onChange={e => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                            />
                            <Input
                                label="Address"
                                value={localSettings.address}
                                onChange={e => setLocalSettings({ ...localSettings, address: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Phone"
                                    value={localSettings.phone}
                                    onChange={e => setLocalSettings({ ...localSettings, phone: e.target.value })}
                                />
                                <Input
                                    label="NTN"
                                    value={localSettings.ntn}
                                    onChange={e => setLocalSettings({ ...localSettings, ntn: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Tax Rate (%)"
                                    type="number"
                                    min="0" max="100"
                                    value={localSettings.taxRate}
                                    onChange={e => setLocalSettings({ ...localSettings, taxRate: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Receipt Footer</label>
                                <textarea
                                    className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 w-full"
                                    rows="2"
                                    value={localSettings.footerMessage}
                                    onChange={e => setLocalSettings({ ...localSettings, footerMessage: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={saved}>
                                {saved ? "Saved!" : "Save Changes"}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* User Management */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                        <Shield size={20} /> User Management
                    </h3>
                    <Card className="p-6 space-y-6">
                        {/* Add User Form */}
                        <form onSubmit={handleAddUser} className="bg-slate-50 p-4 rounded-lg space-y-4 border border-slate-100">
                            <h4 className="font-bold text-slate-700">Add New User</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                                <Input
                                    placeholder="PIN"
                                    maxLength={4}
                                    value={newUser.pin}
                                    onChange={e => setNewUser({ ...newUser, pin: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                <select
                                    className="p-2 rounded border border-slate-300 flex-1"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <Button type="submit" size="small" className="whitespace-nowrap">
                                    <UserPlus size={18} className="mr-2" /> Add User
                                </Button>
                            </div>
                        </form>

                        {/* User List */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-700">Active Users</h4>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {users.map(user => (
                                    <div key={user.id} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <Shield size={16} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{user.name}</p>
                                                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                                            </div>
                                        </div>
                                        {users.length > 1 && (
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                title="Delete User"
                                                disabled={user.id === currentUser?.id}
                                            >
                                                <Trash size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
