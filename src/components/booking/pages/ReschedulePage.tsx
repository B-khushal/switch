import React, { useState } from 'react';
import BookingLayout from './BookingLayout';
import CalendarStep from '../steps/CalendarStep';
import TimeSelectionStep from '../steps/TimeSelectionStep';
import { useNavigate } from '../../../router/router';

export default function ReschedulePage() {
  const navigate = useNavigate();
  const [subStep, setSubStep] = useState<'calendar' | 'time' | 'done'>('calendar');
  const [selectedDate, setSelectedDate] = useState('2026-08-10');
  const [selectedSlot, setSelectedSlot] = useState('11:15 AM');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata (IST)');

  return (
    <BookingLayout currentStepIndex={1} stepTitle="Reschedule Session" showFooterControls={false}>
      <div className="space-y-6">
        <div className="text-center max-w-lg mx-auto mb-6">
          <h3 className="text-3xl font-bold text-[#111111] tracking-tight mb-2">
            Reschedule Meeting
          </h3>
          <p className="text-sm text-black/60">
            Pick a new date and time for your booking reservation.
          </p>
        </div>

        {subStep === 'calendar' && (
          <div>
            <CalendarStep
              selectedDate={selectedDate}
              selectedTimezone={selectedTimezone}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setSubStep('time');
              }}
              onSelectTimezone={setSelectedTimezone}
            />
          </div>
        )}

        {subStep === 'time' && (
          <div>
            <TimeSelectionStep
              selectedDate={selectedDate}
              selectedTimeSlot={selectedSlot}
              selectedTimezone={selectedTimezone}
              onSelectTimeSlot={(slot) => {
                setSelectedSlot(slot);
                setSubStep('done');
              }}
            />
          </div>
        )}

        {subStep === 'done' && (
          <div className="text-center bg-white p-8 rounded-[28px] border border-black/5 shadow-xl space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-[#111111]">Rescheduled Successfully</h4>
            <p className="text-xs text-black/60">
              Your meeting has been moved to <span className="font-bold text-[#111111]">{selectedDate} @ {selectedSlot}</span>.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#111111] text-white font-bold text-sm shadow-md"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </BookingLayout>
  );
}
