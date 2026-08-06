import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { getAdminUser } from '../../../services/authService';

export default function AdminProfilePage() {
  const admin = getAdminUser();
  const [saved, setSaved] = useState(false);

  return (
    <AdminLayout title="Administrator Profile">
      <div className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <img src={admin.avatar} alt={admin.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand" />
            <div>
              <h4 className="font-bold text-lg text-[#111111]">{admin.name}</h4>
              <p className="text-xs text-brand font-bold">{admin.role}</p>
              <p className="text-xs text-black/50">{admin.email}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-medium pt-4 border-t border-black/5">
            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">Full Name</label>
              <input type="text" defaultValue={admin.name} className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-black/70 uppercase tracking-wider text-[11px] mb-1">Administrator Email</label>
              <input type="email" defaultValue={admin.email} disabled className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 font-bold opacity-60 cursor-not-allowed" />
            </div>
          </div>

          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs shadow-md">
            {saved ? 'Profile Updated!' : 'Update Profile'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
