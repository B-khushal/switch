import React from 'react';
import BookingLayout from './BookingLayout';
import CustomerInfoStep from '../steps/CustomerInfoStep';
import { CustomerDetails } from '../../../types/booking';
import { useNavigate } from '../../../router/router';

interface DetailsPageProps {
  customerDetails: CustomerDetails;
  onChangeDetails: (details: CustomerDetails) => void;
}

export default function DetailsPage({ customerDetails, onChangeDetails }: DetailsPageProps) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (!customerDetails.fullName.trim() || !customerDetails.email.includes('@')) {
      alert('Please fill in required fields (Full Name & Valid Email)');
      return;
    }
    navigate('/meet/review');
  };

  return (
    <BookingLayout
      currentStepIndex={3}
      stepTitle="Client Details"
      onBack={() => navigate('/meet/time')}
      onNext={handleNext}
      nextButtonText="Review Booking Summary"
    >
      <CustomerInfoStep
        customerDetails={customerDetails}
        onChange={onChangeDetails}
      />
    </BookingLayout>
  );
}
