import React from 'react';
import AdminLayout from './AdminLayout';
import { BookingRecord } from '../../../types/booking';
import { computeAdminMetrics } from '../../../services/googleCalendarService';
import { Calendar, Clock, Video, TrendingUp, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from '../../../router/router';

interface AdminDashboardPageProps {
  bookings: BookingRecord[];
}

export default function AdminDashboardPage({ bookings }: AdminDashboardPageProps) {
  const navigate = useNavigate();
  const metrics = computeAdminMetrics(bookings);

  return (
    <AdminLayout title="Overview Dashboard">
      <div className="space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Total Bookings</span>
            <div className="text-3xl font-bold text-[#111111]">{metrics.totalBookings}</div>
            <div className="text-[11px] font-semibold text-emerald-600">Active Pipeline</div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Upcoming Sessions</span>
            <div className="text-3xl font-bold text-brand">{metrics.upcomingCount}</div>
            <div className="text-[11px] font-semibold text-brand">Next up today</div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Conversion Rate</span>
            <div className="text-3xl font-bold text-emerald-600">{metrics.conversionRate}</div>
            <div className="text-[11px] font-semibold text-emerald-600">High efficiency</div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Pipeline Value</span>
            <div className="text-3xl font-bold text-indigo-600">{metrics.revenueInfluenced}</div>
            <div className="text-[11px] font-semibold text-indigo-600">Growth revenue</div>
          </div>
        </div>

        {/* Quick Actions & Recent Meetings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="font-bold text-base text-[#111111]">Upcoming Meeting Schedule</h3>
              <button
                onClick={() => navigate('/admin/meetings')}
                className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
              >
                <span>View All</span> <ArrowRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigate('/admin/meetings')}
                  className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/5 hover:border-brand/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand font-bold text-xs flex flex-col items-center justify-center">
                      <span>{b.duration}m</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#111111]">{b.customer.fullName}</div>
                      <div className="text-xs text-black/50">{b.meetingTitle} • {b.date} @ {b.timeSlot}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#111111] border-b border-black/5 pb-4">Quick Admin Actions</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/admin/meetings')}
                className="w-full text-left p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 hover:text-brand font-bold text-xs border border-black/5 transition-all flex items-center justify-between"
              >
                <span>Manage Meetings</span>
                <Clock size={16} />
              </button>
              <button
                onClick={() => navigate('/admin/team')}
                className="w-full text-left p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 hover:text-brand font-bold text-xs border border-black/5 transition-all flex items-center justify-between"
              >
                <span>Round Robin Team</span>
                <Users size={16} />
              </button>
              <button
                onClick={() => navigate('/admin/google')}
                className="w-full text-left p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 hover:text-brand font-bold text-xs border border-black/5 transition-all flex items-center justify-between"
              >
                <span>Google OAuth & Meet</span>
                <Video size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
