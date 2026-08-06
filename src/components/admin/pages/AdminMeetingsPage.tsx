import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { BookingRecord } from '../../../types/booking';
import { Search, Filter, Eye, Trash2, Video } from 'lucide-react';

interface AdminMeetingsPageProps {
  bookings: BookingRecord[];
  onUpdateBookings: (bookings: BookingRecord[]) => void;
}

export default function AdminMeetingsPage({ bookings, onUpdateBookings }: AdminMeetingsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancel = (id: string) => {
    if (confirm('Cancel this meeting booking?')) {
      const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
      onUpdateBookings(updated);
      setSelectedBooking(null);
    }
  };

  return (
    <AdminLayout title="Meeting Management">
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search by client name, email, booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-xs font-semibold text-[#111111] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-black/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-black/10 text-xs font-semibold text-[#111111] py-2 px-3.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-black/5 text-[11px] font-bold uppercase tracking-wider text-black/50">
                <th className="py-4 px-6">ID & Session</th>
                <th className="py-4 px-6">Client Profile</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6">Host</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-xs font-medium">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#111111]">
                    <span className="text-brand font-mono">{b.id}</span>
                    <div className="text-[11px] text-black/50">{b.meetingTitle}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#111111]">{b.customer.fullName}</div>
                    <div className="text-[11px] text-black/40">{b.customer.email}</div>
                  </td>
                  <td className="py-4 px-6 font-bold text-[#111111]">
                    {b.date}
                    <div className="text-[11px] text-brand font-semibold">{b.timeSlot}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <img src={b.assignedTeamMember.avatar} alt={b.assignedTeamMember.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-semibold">{b.assignedTeamMember.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="p-1.5 rounded-lg bg-[#FAFAFA] hover:bg-brand hover:text-white text-black/60 transition-colors mr-2"
                    >
                      <Eye size={15} />
                    </button>
                    {b.status === 'upcoming' && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Booking Details Card */}
        {selectedBooking && (
          <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-base text-[#111111]">Booking Details #{selectedBooking.id}</h4>
              <button onClick={() => setSelectedBooking(null)} className="text-xs font-bold text-black/40 hover:text-black">
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div><span className="text-black/40 font-semibold">Client:</span> <span className="font-bold">{selectedBooking.customer.fullName} ({selectedBooking.customer.email})</span></div>
              <div><span className="text-black/40 font-semibold">Company:</span> <span className="font-bold">{selectedBooking.customer.company || 'N/A'}</span></div>
              <div><span className="text-black/40 font-semibold">Session:</span> <span className="font-bold text-brand">{selectedBooking.meetingTitle}</span></div>
              <div><span className="text-black/40 font-semibold">Google Meet:</span> <a href={selectedBooking.googleMeetLink} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">{selectedBooking.googleMeetLink}</a></div>
            </div>

            <div className="pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                ✓ Auto-Synced for hello.switchit@gmail.com
              </span>
              <a
                href={selectedBooking.adminGoogleCalendarUrl || `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedBooking.meetingTitle)}&add=hello.switchit@gmail.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs shadow-md hover:bg-orange-600 transition-colors"
              >
                + Add to Admin Google Calendar
              </a>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
