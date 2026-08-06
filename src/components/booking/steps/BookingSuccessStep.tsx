import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Video, Calendar, Download, RefreshCw, XCircle, Share2, ArrowRight } from 'lucide-react';
import { BookingRecord } from '../../../types/booking';
import { generateICSFile } from '../../../services/googleCalendarService';

interface BookingSuccessStepProps {
  booking: BookingRecord;
  onClose: () => void;
  onReschedule?: () => void;
}

export default function BookingSuccessStep({ booking, onClose, onReschedule }: BookingSuccessStepProps) {
  useEffect(() => {
    // Simulating celebratory confetti trigger or window notification
    console.log('Booking confirmed successfully:', booking.id);
  }, [booking]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(booking.googleMeetLink);
    alert('Google Meet link copied to clipboard!');
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto py-2">
      {/* Animated Success Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25"
      >
        <CheckCircle2 size={44} strokeWidth={2.5} />
      </motion.div>

      <div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
          Booking Confirmed #{booking.id}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
          You're All Set!
        </h3>
        <p className="text-sm text-black/60 mt-1 max-w-md mx-auto">
          A calendar invite with Google Meet conference details has been dispatched to <span className="font-bold text-[#111111]">{booking.customer.email}</span>.
        </p>
      </div>

      {/* Google Meet Preview Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-[24px] text-white shadow-xl shadow-blue-500/20 text-left space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
            <Video size={18} />
            <span>Google Meet Conference</span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">Live Room</span>
        </div>

        <div className="text-lg md:text-xl font-mono font-bold tracking-tight bg-white/10 p-3.5 rounded-xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
          <a
            href={booking.googleMeetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:underline text-white font-mono"
            title="Click to launch Google Meet room"
          >
            {booking.googleMeetLink}
          </a>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
            >
              Copy Link
            </button>
            <a
              href={booking.googleMeetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <Video size={14} />
              <span>Join Meeting Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Session Details Summary */}
      <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-md text-left space-y-3">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Session</span>
          <span className="text-sm font-bold text-[#111111]">{booking.meetingTitle} ({booking.duration} mins)</span>
        </div>
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Date & Time</span>
          <span className="text-sm font-bold text-brand">{booking.date} @ {booking.timeSlot} ({booking.timezone})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Assigned Host</span>
          <div className="flex items-center gap-2">
            <img src={booking.assignedTeamMember.avatar} alt={booking.assignedTeamMember.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-bold text-[#111111]">{booking.assignedTeamMember.name}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          onClick={() => generateICSFile(booking)}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white border border-black/10 hover:border-brand text-xs font-bold text-[#111111] shadow-sm hover:shadow transition-all"
        >
          <Download size={15} className="text-brand shrink-0" />
          <span>Download .ICS</span>
        </button>

        <a
          href={booking.adminGoogleCalendarUrl || `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.meetingTitle)}&add=hello.switchit@gmail.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-brand text-white border border-brand hover:bg-orange-600 text-xs font-bold shadow-md transition-all"
          title="Schedule automatically in Admin Google Calendar (hello.switchit@gmail.com)"
        >
          <Calendar size={15} className="shrink-0" />
          <span>Add Admin Calendar</span>
        </a>

        <a
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.meetingTitle)}&dates=${booking.date.replace(/-/g, '')}/${booking.date.replace(/-/g, '')}&details=${encodeURIComponent(booking.googleMeetLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white border border-black/10 hover:border-brand text-xs font-bold text-[#111111] shadow-sm hover:shadow transition-all"
        >
          <Calendar size={15} className="text-brand shrink-0" />
          <span>Add Client Calendar</span>
        </a>
      </div>

      {/* Close & Continue Button */}
      <button
        onClick={onClose}
        className="w-full py-4 px-6 rounded-2xl bg-[#111111] hover:bg-brand text-white font-bold text-sm shadow-xl transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <span>Back to Switch Website</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
