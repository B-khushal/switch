import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Clock, Calendar, CheckCircle2, Save } from 'lucide-react';

export default function AdminAvailabilityPage() {
  const [bufferTime, setBufferTime] = useState(15);
  const [maxWindow, setMaxWindow] = useState(60);
  const [saved, setSaved] = useState(false);

  const days = [
    { day: 'Monday', enabled: true, start: '09:00 AM', end: '06:00 PM' },
    { day: 'Tuesday', enabled: true, start: '09:00 AM', end: '06:00 PM' },
    { day: 'Wednesday', enabled: true, start: '09:00 AM', end: '06:00 PM' },
    { day: 'Thursday', enabled: true, start: '09:00 AM', end: '06:00 PM' },
    { day: 'Friday', enabled: true, start: '09:00 AM', end: '06:00 PM' },
    { day: 'Saturday', enabled: false, start: '10:00 AM', end: '03:00 PM' },
    { day: 'Sunday', enabled: false, start: 'Closed', end: 'Closed' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout title="Working Hours & Buffer Settings">
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div>
              <h4 className="font-bold text-base text-[#111111]">Weekly Schedule Configuration</h4>
              <p className="text-xs text-black/50">Set standard booking windows for team availability.</p>
            </div>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <Save size={16} />
              <span>{saved ? 'Saved!' : 'Save Schedule'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {days.map((item) => (
              <div key={item.day} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-black/5 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked={item.enabled} className="accent-brand rounded" />
                  <span className="w-24 font-bold text-[#111111]">{item.day}</span>
                </div>

                <div className="flex items-center gap-2 text-black/70 font-mono">
                  <span>{item.start}</span>
                  <span>-</span>
                  <span>{item.end}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buffer & Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-[#111111]">Meeting Buffer Time</h4>
            <p className="text-xs text-black/50">Minimum quiet time required between sessions.</p>
            <select
              value={bufferTime}
              onChange={(e) => setBufferTime(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-xs font-bold"
            >
              <option value={10}>10 Minutes Buffer</option>
              <option value={15}>15 Minutes Buffer (Recommended)</option>
              <option value={30}>30 Minutes Buffer</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-[#111111]">Maximum Advance Booking</h4>
            <p className="text-xs text-black/50">How far into the future clients can reserve.</p>
            <select
              value={maxWindow}
              onChange={(e) => setMaxWindow(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-xs font-bold"
            >
              <option value={30}>30 Days Ahead</option>
              <option value={60}>60 Days Ahead (Default)</option>
              <option value={90}>90 Days Ahead</option>
            </select>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
