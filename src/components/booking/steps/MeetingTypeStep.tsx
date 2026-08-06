import React from 'react';
import { motion } from 'motion/react';
import { Zap, Compass, BarChart3, Rocket, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { MeetingType } from '../../../types/booking';

interface MeetingTypeStepProps {
  meetingTypes: MeetingType[];
  selectedType: MeetingType | null;
  onSelect: (type: MeetingType) => void;
}

const iconMap: Record<string, any> = {
  Zap,
  Compass,
  BarChart3,
  Rocket,
};

export default function MeetingTypeStep({ meetingTypes, selectedType, onSelect }: MeetingTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-2">
          Select Meeting Type
        </h3>
        <p className="text-sm text-black/60">
          Choose the session format that best fits your current business stage and growth objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {meetingTypes.map((type) => {
          const Icon = iconMap[type.iconName] || Zap;
          const isSelected = selectedType?.id === type.id;

          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(type)}
              className={`relative p-6 rounded-[24px] cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-brand shadow-xl shadow-orange-500/10 ring-2 ring-brand/20'
                  : 'bg-white/80 backdrop-blur-sm border-black/5 hover:border-black/15 shadow-sm hover:shadow-md'
              }`}
            >
              {type.popular && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20 text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${type.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#111111] tracking-tight">{type.title}</h4>
                    <div className="flex items-center gap-1 text-xs font-semibold text-black/50 mt-0.5">
                      <Clock size={13} className="text-brand" />
                      <span>{type.duration} Minutes</span>
                      <span className="mx-1">•</span>
                      <span>{type.estimatedResponse}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-black/60 leading-relaxed mb-4">
                  {type.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  {type.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-black/75">
                      <CheckCircle2 size={13} className="text-brand shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-bold text-brand uppercase tracking-wider">Select Session</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-brand text-white' : 'bg-black/5 text-black/40'}`}>
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
