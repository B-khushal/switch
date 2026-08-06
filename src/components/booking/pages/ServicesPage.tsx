import React from 'react';
import BookingLayout from './BookingLayout';
import MeetingTypeStep from '../steps/MeetingTypeStep';
import { INITIAL_MEETING_TYPES } from '../../../services/googleCalendarService';
import { MeetingType } from '../../../types/booking';
import { useNavigate } from '../../../router/router';

interface ServicesPageProps {
  selectedType: MeetingType | null;
  onSelectType: (type: MeetingType) => void;
}

export default function ServicesPage({ selectedType, onSelectType }: ServicesPageProps) {
  const navigate = useNavigate();

  const handleSelect = (type: MeetingType) => {
    onSelectType(type);
    navigate('/meet/calendar');
  };

  return (
    <BookingLayout
      currentStepIndex={0}
      stepTitle="Select Meeting Type"
      onBack={() => navigate('/')}
      onNext={() => navigate('/meet/calendar')}
      nextButtonText="Select Date & Timezone"
    >
      <MeetingTypeStep
        meetingTypes={INITIAL_MEETING_TYPES}
        selectedType={selectedType}
        onSelect={handleSelect}
      />
    </BookingLayout>
  );
}
