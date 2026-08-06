import React from 'react';
import { Calendar, Clock, Globe, Video, User, Building2, Edit2, ShieldCheck, CheckCircle } from 'lucide-react';
import { MeetingType, CustomerDetails, TeamMember } from '../../../types/booking';

interface BookingReviewStepProps {
  meetingType: MeetingType;
  selectedDate: string;
  selectedTimeSlot: string;
  selectedTimezone: string;
  customerDetails: CustomerDetails;
  assignedMember: TeamMember;
  onEditStep: (stepIndex: number) => void;
}

export default function BookingReviewStep({
  meetingType,
  selectedDate,
  selectedTimeSlot,
  selectedTimezone,
  customerDetails,
  assignedMember,
  onEditStep,
}: BookingReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-2">
          Review Booking Summary
        </h3>
        <p className="text-sm text-black/60">
          Double-check all session details before confirming your Google Meet reservation.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Session Card */}
        <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-xl shadow-black/5 relative">
          <button
            onClick={() => onEditStep(0)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAFA] text-black/60 hover:text-brand hover:bg-orange-50 transition-colors"
            title="Edit Session Type"
          >
            <Edit2 size={16} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-brand text-white flex items-center justify-center font-bold text-sm">
              {meetingType.duration}m
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#111111]">{meetingType.title}</h4>
              <p className="text-xs text-black/50">{meetingType.description}</p>
            </div>
          </div>
        </div>

        {/* Date & Time Card */}
        <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-xl shadow-black/5 relative">
          <button
            onClick={() => onEditStep(1)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAFA] text-black/60 hover:text-brand hover:bg-orange-50 transition-colors"
            title="Edit Date & Time"
          >
            <Edit2 size={16} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-brand shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Date</div>
                <div className="text-sm font-bold text-[#111111]">{selectedDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={18} className="text-brand shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Time</div>
                <div className="text-sm font-bold text-[#111111]">{selectedTimeSlot}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={18} className="text-brand shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Timezone</div>
                <div className="text-xs font-bold text-[#111111] truncate">{selectedTimezone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Team Member & Google Meet */}
        <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-xl shadow-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={assignedMember.avatar}
              alt={assignedMember.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-brand/20"
            />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Assigned Strategist</div>
              <div className="text-sm font-bold text-[#111111]">{assignedMember.name}</div>
              <div className="text-xs text-black/50">{assignedMember.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-200/50">
            <Video size={16} />
            <span>Google Meet Auto-Generated</span>
          </div>
        </div>

        {/* Client Details Summary */}
        <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-xl shadow-black/5 relative space-y-3">
          <button
            onClick={() => onEditStep(3)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAFA] text-black/60 hover:text-brand hover:bg-orange-50 transition-colors"
            title="Edit Client Information"
          >
            <Edit2 size={16} />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/40 border-b border-black/5 pb-2">
            <User size={15} className="text-brand" />
            <span>Contact Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-black/40 font-semibold">Name: </span>
              <span className="font-bold text-[#111111]">{customerDetails.fullName}</span>
            </div>
            <div>
              <span className="text-black/40 font-semibold">Email: </span>
              <span className="font-bold text-[#111111]">{customerDetails.email}</span>
            </div>
            <div>
              <span className="text-black/40 font-semibold">Phone: </span>
              <span className="font-bold text-[#111111]">{customerDetails.phone || 'N/A'}</span>
            </div>
            <div>
              <span className="text-black/40 font-semibold">Company: </span>
              <span className="font-bold text-[#111111]">{customerDetails.company || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Terms notice */}
        <div className="flex items-center gap-2 text-xs text-black/50 justify-center">
          <ShieldCheck size={16} className="text-brand shrink-0" />
          <span>By confirming, you agree to our 15-minute cancellation policy and terms of service.</span>
        </div>
      </div>
    </div>
  );
}
