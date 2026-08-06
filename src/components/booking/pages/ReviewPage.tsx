import React from 'react';
import BookingLayout from './BookingLayout';
import BookingReviewStep from '../steps/BookingReviewStep';
import { MeetingType, CustomerDetails, BookingRecord } from '../../../types/booking';
import { INITIAL_TEAM_MEMBERS, generateGoogleMeetLink, selectRoundRobinMember, buildGoogleCalendarUrl } from '../../../services/googleCalendarService';
import { useNavigate } from '../../../router/router';

interface ReviewPageProps {
  meetingType: MeetingType;
  selectedDate: string;
  selectedTimeSlot: string;
  selectedTimezone: string;
  customerDetails: CustomerDetails;
  onConfirmBooking: (booking: BookingRecord) => void;
}

export default function ReviewPage({
  meetingType,
  selectedDate,
  selectedTimeSlot,
  selectedTimezone,
  customerDetails,
  onConfirmBooking,
}: ReviewPageProps) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const assignedMember = selectRoundRobinMember(INITIAL_TEAM_MEMBERS);
    const meetLink = generateGoogleMeetLink();
    const bookingId = `BOK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: bookingId,
      meetingTypeId: meetingType.id,
      meetingTitle: meetingType.title,
      duration: meetingType.duration,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      timezone: selectedTimezone,
      googleMeetLink: meetLink,
      googleEventId: `evt_${bookingId.toLowerCase()}`,
      customer: customerDetails,
      assignedTeamMember: assignedMember,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    const adminCalUrl = buildGoogleCalendarUrl(newBooking, 'hello.switchit@gmail.com');
    newBooking.adminGoogleCalendarUrl = adminCalUrl;
    newBooking.adminGoogleCalendarSynced = true;

    onConfirmBooking(newBooking);
    navigate('/meet/success');
  };

  return (
    <BookingLayout
      currentStepIndex={4}
      stepTitle="Review & Confirm"
      onBack={() => navigate('/meet/details')}
      onNext={handleConfirm}
      nextButtonText="Confirm & Generate Google Meet"
    >
      <BookingReviewStep
        meetingType={meetingType}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        selectedTimezone={selectedTimezone}
        customerDetails={customerDetails}
        assignedMember={INITIAL_TEAM_MEMBERS[0]}
        onEditStep={(stepIdx) => {
          const routes = ['/meet/services', '/meet/calendar', '/meet/time', '/meet/details'];
          navigate(routes[stepIdx] || '/meet/services');
        }}
      />
    </BookingLayout>
  );
}
