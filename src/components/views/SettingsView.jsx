import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Save } from 'lucide-react';

export const SettingsView = () => {
    const { settings, updateSettings } = useStore();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        updateSettings(localSettings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Store Settings</h2>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Phone Number"
                            value={localSettings.phone}
                            onChange={e => setLocalSettings({ ...localSettings, phone: e.target.value })}
                        />
                        <Input
                            label="NTN Number"
                            value={localSettings.ntn}
                            onChange={e => setLocalSettings({ ...localSettings, ntn: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Tax Rate (%)"
                            type="number"
                            min="0" max="100"
                            value={localSettings.taxRate}
                            onChange={e => setLocalSettings({ ...localSettings, taxRate: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-600">Receipt Footer Message</label>
                        <textarea
                            className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 w-full"
                            rows="3"
                            value={localSettings.footerMessage}
                            onChange={e => setLocalSettings({ ...localSettings, footerMessage: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={saved}>
                        {saved ? (
                            <span className="flex items-center gap-2 text-white"><Save size={18} /> Settings Saved!</span>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
};
