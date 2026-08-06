import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Calendar, CheckCircle, Shield } from 'lucide-react';
import { MeetingType, CustomerDetails, BookingRecord } from '../../types/booking';
import {
  INITIAL_MEETING_TYPES,
  INITIAL_TEAM_MEMBERS,
  generateGoogleMeetLink,
  selectRoundRobinMember,
} from '../../services/googleCalendarService';

import MeetingTypeStep from './steps/MeetingTypeStep';
import CalendarStep from './steps/CalendarStep';
import TimeSelectionStep from './steps/TimeSelectionStep';
import CustomerInfoStep from './steps/CustomerInfoStep';
import BookingReviewStep from './steps/BookingReviewStep';
import BookingSuccessStep from './steps/BookingSuccessStep';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed?: (newBooking: BookingRecord) => void;
}

export default function SchedulerModal({ isOpen, onClose, onBookingConfirmed }: SchedulerModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(INITIAL_MEETING_TYPES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Default tomorrow
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Kolkata (IST)');

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '$10,000 - $25,000 / mo',
    industry: 'Technology & SaaS',
    marketingGoals: ['Viral Short-Form Content'],
    notes: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!isOpen) return null;

  const steps = [
    'Meeting Type',
    'Date & Timezone',
    'Time Slot',
    'Customer Info',
    'Review Summary',
    'Confirmed',
  ];

  const handleNext = () => {
    if (currentStep === 3) {
      // Validate customer details
      if (!customerDetails.fullName.trim() || !customerDetails.email.includes('@')) {
        alert('Please fill in required fields (Full Name & Valid Email)');
        return;
      }
    }

    if (currentStep === 4) {
      // Final confirmation -> Generate Booking Record & Google Meet Link
      const assignedMember = selectRoundRobinMember(INITIAL_TEAM_MEMBERS);
      const meetLink = generateGoogleMeetLink();
      const bookingId = `BOK-${Math.floor(1000 + Math.random() * 9000)}`;

      const newBooking: BookingRecord = {
        id: bookingId,
        meetingTypeId: selectedMeetingType?.id || '15m-discovery',
        meetingTitle: selectedMeetingType?.title || '15 Min Discovery Call',
        duration: selectedMeetingType?.duration || 15,
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

      setConfirmedBooking(newBooking);
      if (onBookingConfirmed) onBookingConfirmed(newBooking);
      setCurrentStep(5); // Move to Success Step
      return;
    }

    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleResetAndClose = () => {
    setCurrentStep(0);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-4xl bg-[#FAFAFA] rounded-[32px] shadow-2xl border border-white/40 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img src="/image.png" alt="Switch Logo" className="h-8 w-auto mix-blend-multiply" />
              <span className="text-xs font-bold text-black/40 uppercase tracking-widest border-l border-black/10 pl-3">
                Booking Scheduler
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-10 h-10 rounded-full bg-[#FAFAFA] text-black/60 hover:text-black hover:bg-black/5 transition-colors flex items-center justify-center"
              aria-label="Close scheduler"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stepper Progress Bar (Only shown for steps 0-4) */}
          {currentStep < 5 && (
            <div className="px-6 md:px-8 pt-6 pb-2 bg-white/40 shrink-0">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-black/60 uppercase tracking-wider">
                <span>Step {currentStep + 1} of 5: {steps[currentStep]}</span>
                <span className="text-brand">{Math.round(((currentStep + 1) / 5) * 100)}% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Step Content Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {currentStep === 0 && (
              <MeetingTypeStep
                meetingTypes={INITIAL_MEETING_TYPES}
                selectedType={selectedMeetingType}
                onSelect={(type) => {
                  setSelectedMeetingType(type);
                  handleNext();
                }}
              />
            )}

            {currentStep === 1 && (
              <CalendarStep
                selectedDate={selectedDate}
                selectedTimezone={selectedTimezone}
                onSelectDate={(d) => {
                  setSelectedDate(d);
                  handleNext();
                }}
                onSelectTimezone={setSelectedTimezone}
              />
            )}

            {currentStep === 2 && (
              <TimeSelectionStep
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                selectedTimezone={selectedTimezone}
                onSelectTimeSlot={(slot) => {
                  setSelectedTimeSlot(slot);
                  handleNext();
                }}
              />
            )}

            {currentStep === 3 && (
              <CustomerInfoStep
                customerDetails={customerDetails}
                onChange={setCustomerDetails}
              />
            )}

            {currentStep === 4 && selectedMeetingType && (
              <BookingReviewStep
                meetingType={selectedMeetingType}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                selectedTimezone={selectedTimezone}
                customerDetails={customerDetails}
                assignedMember={INITIAL_TEAM_MEMBERS[0]}
                onEditStep={setCurrentStep}
              />
            )}

            {currentStep === 5 && confirmedBooking && (
              <BookingSuccessStep
                booking={confirmedBooking}
                onClose={handleResetAndClose}
              />
            )}
          </div>

          {/* Footer Controls (For Steps 0-4) */}
          {currentStep < 5 && (
            <div className="p-6 md:p-8 bg-white border-t border-black/5 flex items-center justify-between shrink-0">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  currentStep === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'bg-[#FAFAFA] hover:bg-black/5 text-[#111111]'
                }`}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#111111] hover:bg-brand text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-colors duration-300"
              >
                <span>{currentStep === 4 ? 'Confirm & Book Google Meet' : 'Continue'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
