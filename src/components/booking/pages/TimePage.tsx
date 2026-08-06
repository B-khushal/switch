import React from 'react';
import BookingLayout from './BookingLayout';
import TimeSelectionStep from '../steps/TimeSelectionStep';
import { useNavigate } from '../../../router/router';

interface TimePageProps {
  selectedDate: string;
  selectedTimeSlot: string;
  selectedTimezone: string;
  onSelectTimeSlot: (slot: string) => void;
}

export default function TimePage({
  selectedDate,
  selectedTimeSlot,
  selectedTimezone,
  onSelectTimeSlot,
}: TimePageProps) {
  const navigate = useNavigate();

  const handleTimeSelect = (slot: string) => {
    onSelectTimeSlot(slot);
    navigate('/meet/details');
  };

  return (
    <BookingLayout
      currentStepIndex={2}
      stepTitle="Select Time Slot"
      onBack={() => navigate('/meet/calendar')}
      onNext={() => navigate('/meet/details')}
      nextButtonText="Enter Client Details"
    >
      <TimeSelectionStep
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        selectedTimezone={selectedTimezone}
        onSelectTimeSlot={handleTimeSelect}
      />
    </BookingLayout>
  );
}
