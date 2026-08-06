import React from 'react';
import { AdminMetrics } from '../../types/booking';
import { TrendingUp, Users, DollarSign, Clock, Award, BarChart2 } from 'lucide-react';

interface AnalyticsViewProps {
  metrics: AdminMetrics;
}

export default function AnalyticsView({ metrics }: AnalyticsViewProps) {
  const metricCards = [
    { title: 'Total Bookings', value: metrics.totalBookings, change: '+18% vs last month', icon: BarChart2, color: 'text-blue-500' },
    { title: 'Revenue Influenced', value: metrics.revenueInfluenced, change: 'High converting pipeline', icon: DollarSign, color: 'text-emerald-500' },
    { title: 'Conversion Rate', value: metrics.conversionRate, change: 'Industry leading', icon: TrendingUp, color: 'text-amber-500' },
    { title: 'Avg Session Length', value: `${metrics.avgDuration} mins`, change: 'Optimal engagement', icon: Clock, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-black/40">{card.title}</span>
                <div className={`p-2 rounded-xl bg-black/5 ${card.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-3xl font-bold text-[#111111] tracking-tight">{card.value}</div>
              <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Breakdown Visual Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-4">
          <h4 className="font-bold text-[#111111] text-base">Popular Meeting Slots</h4>
          <div className="space-y-3">
            {[
              { slot: '10:30 AM (Morning)', pct: 42, count: '18 Bookings' },
              { slot: '02:00 PM (Afternoon)', pct: 31, count: '14 Bookings' },
              { slot: '04:30 PM (Evening)', pct: 18, count: '8 Bookings' },
              { slot: '11:15 AM (Late Morning)', pct: 9, count: '4 Bookings' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-[#111111]">
                  <span>{item.slot}</span>
                  <span className="text-brand">{item.pct}% ({item.count})</span>
                </div>
                <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-black/5 shadow-sm space-y-4">
          <h4 className="font-bold text-[#111111] text-base">Client Industry Breakdown</h4>
          <div className="space-y-3">
            {[
              { name: 'SaaS & Technology', pct: 48 },
              { name: 'E-Commerce & D2C', pct: 28 },
              { name: 'Personal Brands & Creators', pct: 16 },
              { name: 'Agencies & Consulting', pct: 8 },
            ].map((ind, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-[#111111]">
                  <span>{ind.name}</span>
                  <span>{ind.pct}%</span>
                </div>
                <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${ind.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
