import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Globe, Video, CheckCircle2, RefreshCw, Link2 } from 'lucide-react';

export default function AdminGooglePage() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <AdminLayout title="Google OAuth & Google Meet Integration">
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-8 rounded-[28px] border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-200">
                G
              </div>
              <div>
                <h4 className="font-bold text-base text-[#111111]">Google Calendar API Connection</h4>
                <p className="text-xs text-black/50">Primary calendar integration for automated Google Meet generation.</p>
              </div>
            </div>

            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">
              <CheckCircle2 size={15} /> Active OAuth 2.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/5 space-y-1">
              <span className="text-black/40 font-bold uppercase tracking-wider text-[10px]">Configured Client ID</span>
              <div className="font-mono text-xs text-[#111111] truncate" title={(import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '320378230483-r64h3rs9unc2e8k37p2hs2g1bglg6g5m.apps.googleusercontent.com'}>
                {(import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '320378230483-r64h3rs9unc2e8k37p2hs2g1bglg6g5m.apps.googleusercontent.com'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/5 space-y-1">
              <span className="text-black/40 font-bold uppercase tracking-wider text-[10px]">Client Secret Status</span>
              <div className="font-mono text-xs text-brand font-bold">
                {(import.meta as any).env?.VITE_GOOGLE_CLIENT_SECRET ? '✓ Secret Configured in .env' : '⚠️ Pending Client Secret in .env'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/5 space-y-1">
              <span className="text-black/40 font-bold uppercase tracking-wider text-[10px]">Connected Google Account</span>
              <div className="font-bold text-sm text-[#111111]">hello.switchit@gmail.com</div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/5 space-y-1">
              <span className="text-black/40 font-bold uppercase tracking-wider text-[10px]">Primary Google Calendar</span>
              <div className="font-bold text-sm text-brand">Switch It Master Booking Calendar</div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs text-black/50">Last automatic sync: Just now</span>
            <button
              onClick={handleSync}
              className="px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Google Calendar Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
