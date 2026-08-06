import React, { useState } from 'react';
import { BookingRecord } from '../../types/booking';
import { Calendar, Clock, Video, User, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminCalendarViewProps {
  bookings: BookingRecord[];
  onSelectBooking: (booking: BookingRecord) => void;
}

export default function AdminCalendarView({ bookings, onSelectBooking }: AdminCalendarViewProps) {
  const [viewMode, setViewMode] = useState<'agenda' | 'day' | 'week'>('agenda');

  return (
    <div className="space-y-6">
      {/* View Switcher Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-brand" />
          <h4 className="font-bold text-[#111111] text-sm">Meeting Schedule Calendar</h4>
        </div>

        <div className="flex items-center gap-2">
          {(['agenda', 'day', 'week'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === mode
                  ? 'bg-brand text-white'
                  : 'bg-[#FAFAFA] text-black/60 hover:bg-black/5'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Agenda List View */}
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-black/5 text-black/40 text-sm">
            No scheduled meetings for this view.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => onSelectBooking(booking)}
              className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-md hover:border-brand/30 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand font-bold text-sm flex flex-col items-center justify-center border border-brand/20 shrink-0">
                  <span>{booking.duration}m</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-black/60">
                      {booking.id}
                    </span>
                    <span className="text-xs font-bold text-brand uppercase tracking-wider">
                      {booking.meetingTitle}
                    </span>
                  </div>

                  <h5 className="font-bold text-[#111111] text-base">{booking.customer.fullName}</h5>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-black/60 mt-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <Building2 size={13} className="text-brand" /> {booking.customer.company || 'Private Client'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock size={13} className="text-brand" /> {booking.date} @ {booking.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200/50">
                  <Video size={14} />
                  <span>Google Meet</span>
                </div>
                <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
