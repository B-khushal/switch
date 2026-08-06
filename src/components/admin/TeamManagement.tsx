import React from 'react';
import { TeamMember } from '../../types/booking';
import { Users, CheckCircle2, AlertCircle, Shield, Sun } from 'lucide-react';

interface TeamManagementProps {
  teamMembers: TeamMember[];
  onToggleVacation: (memberId: string) => void;
}

export default function TeamManagement({ teamMembers, onToggleVacation }: TeamManagementProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
        <div>
          <h4 className="font-bold text-[#111111] text-base">Round Robin & Team Availability</h4>
          <p className="text-xs text-black/60 mt-0.5">
            Manage Google Calendar connections, round-robin weights, and vacation modes for your strategists.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs shadow-md hover:bg-orange-600 transition-colors">
          + Add Strategist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand/20 shadow-sm"
                />
                <div>
                  <h5 className="font-bold text-[#111111] text-base">{member.name}</h5>
                  <p className="text-xs text-brand font-semibold">{member.role}</p>
                  <p className="text-[11px] text-black/40 font-mono mt-0.5">{member.email}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-black/5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-black/50 font-semibold">Google Calendar:</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600">
                    <CheckCircle2 size={14} /> Connected
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black/50 font-semibold">Round Robin Weight:</span>
                  <span className="font-bold text-[#111111] bg-black/5 px-2.5 py-0.5 rounded-md">
                    {member.roundRobinWeight}/10
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black/50 font-semibold">Rating:</span>
                  <span className="font-bold text-amber-500">★ {member.rating}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-bold text-black/70">Vacation Mode</span>
              <button
                onClick={() => onToggleVacation(member.id)}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                  member.vacationMode ? 'bg-amber-500' : 'bg-black/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    member.vacationMode ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
