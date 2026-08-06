import React from 'react';
import BookingLayout from './BookingLayout';
import BookingSuccessStep from '../steps/BookingSuccessStep';
import { BookingRecord } from '../../../types/booking';
import { useNavigate } from '../../../router/router';

interface SuccessPageProps {
  confirmedBooking: BookingRecord | null;
}

export default function SuccessPage({ confirmedBooking }: SuccessPageProps) {
  const navigate = useNavigate();

  if (!confirmedBooking) {
    return (
      <BookingLayout currentStepIndex={5} stepTitle="Confirmation" showFooterControls={false}>
        <div className="text-center py-12">
          <p className="text-black/60 font-semibold mb-4">No active booking session found.</p>
          <button
            onClick={() => navigate('/meet/services')}
            className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm"
          >
            Start New Booking
          </button>
        </div>
      </BookingLayout>
    );
  }

  return (
    <BookingLayout currentStepIndex={5} stepTitle="Confirmation" showFooterControls={false}>
      <BookingSuccessStep
        booking={confirmedBooking}
        onClose={() => navigate('/')}
      />
    </BookingLayout>
  );
}
