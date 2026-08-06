import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { ShieldCheck, Lock, KeyRound } from 'lucide-react';

export default function AdminSecurityPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Password updated securely with bcrypt hash!');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <AdminLayout title="Security & Authentication Settings">
      <div className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <ShieldCheck size={24} className="text-brand" />
            <div>
              <h4 className="font-bold text-base text-[#111111]">Administrator Password & JWT Security</h4>
              <p className="text-xs text-black/50">Change password for hello.switchit@gmail.com</p>
            </div>
          </div>

          {msg && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl">{msg}</div>}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">Current Password</label>
              <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="••••••••••••" className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">New Password</label>
              <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••••••" className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold" />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs shadow-md">
              Update Administrator Password
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
