import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Calendar,
  Users,
  BarChart3,
  Video,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  Trash2,
  UserCheck,
  RefreshCw,
} from 'lucide-react';
import { BookingRecord, TeamMember } from '../../types/booking';
import {
  generateInitialBookings,
  INITIAL_TEAM_MEMBERS,
  computeAdminMetrics,
} from '../../services/googleCalendarService';

import AdminCalendarView from './AdminCalendarView';
import TeamManagement from './TeamManagement';
import AnalyticsView from './AnalyticsView';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onUpdateBookings: (bookings: BookingRecord[]) => void;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  bookings,
  onUpdateBookings,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'meetings' | 'calendar' | 'team' | 'analytics'>('meetings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [selectedMeeting, setSelectedMeeting] = useState<BookingRecord | null>(null);

  if (!isOpen) return null;

  const metrics = computeAdminMetrics(bookings);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.customer.company && b.customer.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleToggleVacation = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, vacationMode: !m.vacationMode } : m))
    );
  };

  const handleCancelMeeting = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
      onUpdateBookings(updated);
      setSelectedMeeting(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-0"
        />

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative z-10 w-full max-w-6xl bg-[#FAFAFA] rounded-[32px] shadow-2xl border border-white/40 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar Header */}
          <div className="p-6 md:p-8 bg-[#111111] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <img src="/image_copy.png" alt="Switch Logo" className="h-8 w-auto mix-blend-screen" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand border-l border-white/20 pl-3">
                Enterprise Admin Portal
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl">
              {[
                { id: 'meetings', label: 'Bookings', icon: Clock },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'team', label: 'Team & Availability', icon: Users },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive ? 'bg-brand text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors flex items-center justify-center self-end md:self-auto"
            >
              <X size={20} />
            </button>
          </div>

          {/* Overview Stat Cards Bar */}
          <div className="p-6 md:px-8 bg-white border-b border-black/5 grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
            <div className="p-3.5 bg-[#FAFAFA] rounded-2xl border border-black/5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Total Meetings</div>
              <div className="text-2xl font-bold text-[#111111] mt-0.5">{metrics.totalBookings}</div>
            </div>
            <div className="p-3.5 bg-[#FAFAFA] rounded-2xl border border-black/5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Upcoming</div>
              <div className="text-2xl font-bold text-brand mt-0.5">{metrics.upcomingCount}</div>
            </div>
            <div className="p-3.5 bg-[#FAFAFA] rounded-2xl border border-black/5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Completed</div>
              <div className="text-2xl font-bold text-emerald-600 mt-0.5">{metrics.completedCount}</div>
            </div>
            <div className="p-3.5 bg-[#FAFAFA] rounded-2xl border border-black/5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/40">Pipeline Influenced</div>
              <div className="text-2xl font-bold text-indigo-600 mt-0.5">{metrics.revenueInfluenced}</div>
            </div>
          </div>

          {/* Main Tab Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {activeTab === 'meetings' && (
              <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                  <div className="relative w-full sm:w-80">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                      type="text"
                      placeholder="Search client, email, company, ID..."
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

                {/* Bookings Table View */}
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAFAFA] border-b border-black/5 text-[11px] font-bold uppercase tracking-wider text-black/50">
                          <th className="py-4 px-6">ID & Session</th>
                          <th className="py-4 px-6">Client</th>
                          <th className="py-4 px-6">Date & Time</th>
                          <th className="py-4 px-6">Assigned Host</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 text-xs font-medium">
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-orange-50/30 transition-colors">
                            <td className="py-4 px-6 font-bold text-[#111111]">
                              <span className="text-brand font-mono">{b.id}</span>
                              <div className="text-[11px] font-semibold text-black/50">{b.meetingTitle}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-bold text-[#111111]">{b.customer.fullName}</div>
                              <div className="text-[11px] text-black/40">{b.customer.email}</div>
                            </td>
                            <td className="py-4 px-6 font-bold text-[#111111]">
                              {b.date}
                              <div className="text-[11px] font-semibold text-brand">{b.timeSlot}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <img
                                  src={b.assignedTeamMember.avatar}
                                  alt={b.assignedTeamMember.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="font-semibold text-[#111111]">{b.assignedTeamMember.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                b.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                b.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                'bg-red-50 text-red-700 border border-red-200'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedMeeting(b)}
                                  className="p-1.5 rounded-lg bg-[#FAFAFA] hover:bg-brand hover:text-white text-black/60 transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={15} />
                                </button>
                                {b.status === 'upcoming' && (
                                  <button
                                    onClick={() => handleCancelMeeting(b.id)}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                                    title="Cancel Booking"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <AdminCalendarView bookings={bookings} onSelectBooking={setSelectedMeeting} />
            )}

            {activeTab === 'team' && (
              <TeamManagement teamMembers={teamMembers} onToggleVacation={handleToggleVacation} />
            )}

            {activeTab === 'analytics' && <AnalyticsView metrics={metrics} />}
          </div>

          {/* Meeting Detail Modal Drawer */}
          {selectedMeeting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-[28px] max-w-lg w-full shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-lg text-[#111111]">Booking Details #{selectedMeeting.id}</h4>
                  <button onClick={() => setSelectedMeeting(null)} className="p-1 text-black/40 hover:text-black">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-black/40">Client: </span>
                    <span className="font-bold text-[#111111]">{selectedMeeting.customer.fullName}</span> ({selectedMeeting.customer.email})
                  </div>
                  <div>
                    <span className="font-semibold text-black/40">Company: </span>
                    <span className="font-bold text-[#111111]">{selectedMeeting.customer.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black/40">Session: </span>
                    <span className="font-bold text-brand">{selectedMeeting.meetingTitle} ({selectedMeeting.duration}m)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black/40">Date & Time: </span>
                    <span className="font-bold text-[#111111]">{selectedMeeting.date} @ {selectedMeeting.timeSlot} ({selectedMeeting.timezone})</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black/40">Google Meet Link: </span>
                    <a href={selectedMeeting.googleMeetLink} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">
                      {selectedMeeting.googleMeetLink}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-black/40">Notes: </span>
                    <p className="p-3 bg-[#FAFAFA] rounded-xl text-black/70 mt-1">{selectedMeeting.customer.notes || 'No extra notes provided.'}</p>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedMeeting(null)}
                    className="px-4 py-2 rounded-xl bg-black text-white font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
