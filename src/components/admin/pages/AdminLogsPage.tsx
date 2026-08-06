import React from 'react';
import AdminLayout from './AdminLayout';
import { FileText, Shield, CheckCircle2 } from 'lucide-react';

export default function AdminLogsPage() {
  const logs = [
    { id: 'LOG-991', event: 'Admin Session Authenticated', user: 'hello.switchit@gmail.com', time: 'Just now', ip: '127.0.0.1' },
    { id: 'LOG-990', event: 'Google Calendar Sync Triggered', user: 'System Worker', time: '10 minutes ago', ip: 'OAuth Bot' },
    { id: 'LOG-989', event: 'New Booking Created #BOK-9421', user: 'Vikram Mehta', time: '1 hour ago', ip: '49.207.18.2' },
    { id: 'LOG-988', event: 'Google Meet Conference Generated', user: 'Google API Worker', time: '1 hour ago', ip: 'API Subsystem' },
    { id: 'LOG-987', event: 'Administrator Login Attempt Success', user: 'hello.switchit@gmail.com', time: '3 hours ago', ip: '127.0.0.1' },
  ];

  return (
    <AdminLayout title="System Activity & Audit Logs">
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white rounded-[28px] border border-black/5 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-black/5 text-[11px] font-bold uppercase tracking-wider text-black/50">
                <th className="py-4 px-6">Log ID</th>
                <th className="py-4 px-6">Event Description</th>
                <th className="py-4 px-6">User / Source</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-xs font-medium">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-brand">{log.id}</td>
                  <td className="py-4 px-6 font-bold text-[#111111]">{log.event}</td>
                  <td className="py-4 px-6 text-black/60">{log.user}</td>
                  <td className="py-4 px-6 text-black/50">{log.time}</td>
                  <td className="py-4 px-6 font-mono text-right text-black/40">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
