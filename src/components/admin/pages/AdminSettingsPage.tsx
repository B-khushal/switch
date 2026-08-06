import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Settings, Bell, Palette, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout title="Platform Settings">
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-6">
          <h4 className="font-bold text-base text-[#111111] border-b border-black/5 pb-3">Branding & Notification Rules</h4>
          
          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">Company Name</label>
              <input type="text" defaultValue="Switch It Agency" className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold" />
            </div>

            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">Confirmation Email Sender</label>
              <input type="text" defaultValue="contact@theswitchit.in" className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-black/5">
              <span>Send 24-Hour Automated Email Reminder</span>
              <input type="checkbox" defaultChecked className="accent-brand rounded" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-black/5">
              <span>Send 1-Hour Automated WhatsApp Reminder</span>
              <input type="checkbox" defaultChecked className="accent-brand rounded" />
            </div>
          </div>

          <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs shadow-md">
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
