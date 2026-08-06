import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Globe, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarStepProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTimezone: string;
  onSelectDate: (date: string) => void;
  onSelectTimezone: (tz: string) => void;
}

const timezones = [
  'Asia/Kolkata (IST)',
  'America/New_York (EST)',
  'America/Los_Angeles (PST)',
  'Europe/London (GMT)',
  'Asia/Dubai (GST)',
  'Asia/Singapore (SGT)',
];

export default function CalendarStep({
  selectedDate,
  selectedTimezone,
  onSelectDate,
  onSelectTimezone,
}: CalendarStepProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-2">
          Select Date & Timezone
        </h3>
        <p className="text-sm text-black/60">
          Pick your preferred date on the interactive calendar. Unavailable & past dates are disabled automatically.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-[28px] p-6 md:p-8 border border-black/5 shadow-xl shadow-black/5 space-y-6">
        {/* Timezone Switcher Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/5">
          <div className="flex items-center gap-2 text-xs font-bold text-black/70 uppercase tracking-wider">
            <Globe size={16} className="text-brand" />
            <span>Timezone:</span>
          </div>
          <select
            value={selectedTimezone}
            onChange={(e) => onSelectTimezone(e.target.value)}
            className="bg-[#FAFAFA] border border-black/10 text-xs font-semibold text-[#111111] py-2 px-3.5 rounded-xl outline-none focus:border-brand transition-colors cursor-pointer"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Month Header Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon size={20} className="text-brand" />
            <h4 className="text-xl font-bold text-[#111111] tracking-tight">
              {monthNames[month]} {year}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/5 text-[#111111] hover:bg-brand hover:text-white transition-colors flex items-center justify-center"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/5 text-[#111111] hover:bg-brand hover:text-white transition-colors flex items-center justify-center"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          {/* Day Name Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {dayNames.map((d) => (
              <div key={d} className="text-[11px] font-bold uppercase tracking-wider text-black/40 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {/* Blank leading cells */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="h-11 md:h-12" />
            ))}

            {/* Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(year, month, dayNum);
              const formattedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              
              const isPast = dateObj < today;
              const isSunday = dateObj.getDay() === 0;
              const isDisabled = isPast || isSunday;
              const isSelected = selectedDate === formattedDateStr;
              const isToday = dateObj.toDateString() === today.toDateString();

              return (
                <motion.button
                  key={`day-${dayNum}`}
                  whileHover={isDisabled ? {} : { scale: 1.08 }}
                  whileTap={isDisabled ? {} : { scale: 0.95 }}
                  disabled={isDisabled}
                  onClick={() => onSelectDate(formattedDateStr)}
                  className={`h-11 md:h-12 rounded-2xl flex flex-col items-center justify-center font-bold text-sm transition-all duration-200 relative ${
                    isDisabled
                      ? 'text-black/20 cursor-not-allowed bg-transparent'
                      : isSelected
                      ? 'bg-brand text-white shadow-lg shadow-orange-500/25 ring-2 ring-brand/30'
                      : 'bg-[#FAFAFA] text-[#111111] hover:bg-orange-50 hover:text-brand hover:border-brand/20 border border-black/5'
                  }`}
                >
                  <span>{dayNum}</span>
                  {isToday && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand absolute bottom-1.5" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
