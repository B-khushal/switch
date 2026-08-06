import React from 'react';
import { motion } from 'motion/react';
import { Sun, Sunset, Moon, Clock, Check } from 'lucide-react';

interface TimeSelectionStepProps {
  selectedDate: string;
  selectedTimeSlot: string;
  selectedTimezone: string;
  onSelectTimeSlot: (slot: string) => void;
}

const morningSlots = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'];
const afternoonSlots = ['01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM'];
const eveningSlots = ['05:30 PM', '06:15 PM', '07:00 PM'];

export default function TimeSelectionStep({
  selectedDate,
  selectedTimeSlot,
  selectedTimezone,
  onSelectTimeSlot,
}: TimeSelectionStepProps) {
  const renderSlotGroup = (title: string, icon: any, slots: string[]) => {
    const Icon = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50 border-b border-black/5 pb-2">
          <Icon size={16} className="text-brand" />
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {slots.map((slot) => {
            const isSelected = selectedTimeSlot === slot;
            return (
              <motion.button
                key={slot}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectTimeSlot(slot)}
                className={`p-3.5 rounded-2xl flex items-center justify-between border font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-brand text-white border-brand shadow-lg shadow-orange-500/20 ring-2 ring-brand/30'
                    : 'bg-white text-[#111111] border-black/5 hover:border-brand/40 hover:bg-orange-50/50 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock size={14} className={isSelected ? 'text-white' : 'text-brand'} />
                  <span>{slot}</span>
                </div>
                {isSelected && <Check size={16} className="text-white" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-2">
          Available Time Slots
        </h3>
        <p className="text-sm text-black/60">
          Showing available session windows for <span className="font-bold text-[#111111]">{selectedDate}</span> in <span className="font-bold text-brand">{selectedTimezone}</span>.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[28px] border border-black/5 shadow-xl shadow-black/5">
        {renderSlotGroup('Morning Sessions', Sun, morningSlots)}
        {renderSlotGroup('Afternoon Sessions', Sunset, afternoonSlots)}
        {renderSlotGroup('Evening Sessions', Moon, eveningSlots)}
      </div>
    </div>
  );
}
