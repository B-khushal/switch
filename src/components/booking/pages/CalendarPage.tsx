import React from 'react';
import BookingLayout from './BookingLayout';
import CalendarStep from '../steps/CalendarStep';
import { useNavigate } from '../../../router/router';

interface CalendarPageProps {
  selectedDate: string;
  selectedTimezone: string;
  onSelectDate: (date: string) => void;
  onSelectTimezone: (tz: string) => void;
}

export default function CalendarPage({
  selectedDate,
  selectedTimezone,
  onSelectDate,
  onSelectTimezone,
}: CalendarPageProps) {
  const navigate = useNavigate();

  const handleDateSelect = (date: string) => {
    onSelectDate(date);
    navigate('/meet/time');
  };

  return (
    <BookingLayout
      currentStepIndex={1}
      stepTitle="Select Date & Timezone"
      onBack={() => navigate('/meet/services')}
      onNext={() => navigate('/meet/time')}
      nextButtonText="Select Time Slot"
    >
      <CalendarStep
        selectedDate={selectedDate}
        selectedTimezone={selectedTimezone}
        onSelectDate={handleDateSelect}
        onSelectTimezone={onSelectTimezone}
      />
    </BookingLayout>
  );
}
