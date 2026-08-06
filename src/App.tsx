import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import Services from './components/Services';
import Process from './components/Process';
import WorkShowcase from './components/WorkShowcase';
import ContentFlywheel from './components/ContentFlywheel';
import WorldClassEdits from './components/WorldClassEdits';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import AboutTeam from './components/AboutTeam';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

import { usePathname, useNavigate } from './router/router';
import { BookingRecord, MeetingType, CustomerDetails } from './types/booking';
import { INITIAL_MEETING_TYPES, generateInitialBookings } from './services/googleCalendarService';

// Full Page Booking Pages
import ServicesPage from './components/booking/pages/ServicesPage';
import CalendarPage from './components/booking/pages/CalendarPage';
import TimePage from './components/booking/pages/TimePage';
import DetailsPage from './components/booking/pages/DetailsPage';
import ReviewPage from './components/booking/pages/ReviewPage';
import SuccessPage from './components/booking/pages/SuccessPage';
import ReschedulePage from './components/booking/pages/ReschedulePage';
import CancelPage from './components/booking/pages/CancelPage';

// Full Page Admin Pages
import AdminLoginPage from './components/admin/pages/AdminLoginPage';
import AdminDashboardPage from './components/admin/pages/AdminDashboardPage';
import AdminMeetingsPage from './components/admin/pages/AdminMeetingsPage';
import AdminCalendarPage from './components/admin/pages/AdminCalendarPage';
import AdminTeamPage from './components/admin/pages/AdminTeamPage';
import AdminAvailabilityPage from './components/admin/pages/AdminAvailabilityPage';
import AdminGooglePage from './components/admin/pages/AdminGooglePage';
import AdminSettingsPage from './components/admin/pages/AdminSettingsPage';
import AdminAnalyticsPage from './components/admin/pages/AdminAnalyticsPage';
import AdminProfilePage from './components/admin/pages/AdminProfilePage';
import AdminSecurityPage from './components/admin/pages/AdminSecurityPage';
import AdminLogsPage from './components/admin/pages/AdminLogsPage';

export default function App() {
  const pathname = usePathname();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<BookingRecord[]>(generateInitialBookings());
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(INITIAL_MEETING_TYPES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
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

  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    setConfirmedBooking(newBooking);
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('switchit_live_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  // Dedicated Booking Routes (/meet/*)
  if (pathname === '/meet' || pathname === '/meet/services') {
    return <ServicesPage selectedType={selectedMeetingType} onSelectType={setSelectedMeetingType} />;
  }
  if (pathname === '/meet/calendar') {
    return (
      <CalendarPage
        selectedDate={selectedDate}
        selectedTimezone={selectedTimezone}
        onSelectDate={setSelectedDate}
        onSelectTimezone={setSelectedTimezone}
      />
    );
  }
  if (pathname === '/meet/time') {
    return (
      <TimePage
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        selectedTimezone={selectedTimezone}
        onSelectTimeSlot={setSelectedTimeSlot}
      />
    );
  }
  if (pathname === '/meet/details') {
    return <DetailsPage customerDetails={customerDetails} onChangeDetails={setCustomerDetails} />;
  }
  if (pathname === '/meet/review' && selectedMeetingType) {
    return (
      <ReviewPage
        meetingType={selectedMeetingType}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        selectedTimezone={selectedTimezone}
        customerDetails={customerDetails}
        onConfirmBooking={handleBookingConfirmed}
      />
    );
  }
  if (pathname === '/meet/success') {
    return <SuccessPage confirmedBooking={confirmedBooking} />;
  }
  if (pathname.startsWith('/meet/reschedule')) {
    return <ReschedulePage />;
  }
  if (pathname.startsWith('/meet/cancel')) {
    return <CancelPage />;
  }

  // Dedicated Admin Routes (/admin/*)
  if (pathname === '/admin/login') {
    return <AdminLoginPage />;
  }
  if (pathname === '/admin') {
    return <AdminDashboardPage bookings={bookings} />;
  }
  if (pathname === '/admin/meetings') {
    return <AdminMeetingsPage bookings={bookings} onUpdateBookings={setBookings} />;
  }
  if (pathname === '/admin/calendar') {
    return <AdminCalendarPage bookings={bookings} />;
  }
  if (pathname === '/admin/team') {
    return <AdminTeamPage />;
  }
  if (pathname === '/admin/availability') {
    return <AdminAvailabilityPage />;
  }
  if (pathname === '/admin/google') {
    return <AdminGooglePage />;
  }
  if (pathname === '/admin/settings') {
    return <AdminSettingsPage />;
  }
  if (pathname === '/admin/analytics') {
    return <AdminAnalyticsPage bookings={bookings} />;
  }
  if (pathname === '/admin/profile') {
    return <AdminProfilePage />;
  }
  if (pathname === '/admin/security') {
    return <AdminSecurityPage />;
  }
  if (pathname === '/admin/logs') {
    return <AdminLogsPage />;
  }

  // Default Landing Page (/)
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-body selection:bg-brand selection:text-white relative overflow-hidden flex flex-col">
        {/* Ambient Background Effects */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-brand-accent opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="noise-bg z-0" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar 
            onOpenScheduler={() => navigate('/meet/services')}
            onOpenAdmin={() => navigate('/admin')}
          />
          
          <main className="flex-1">
            <div className="relative w-full">
              {/* Continuous Grid Pattern for Hero -> Services */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
                <div className="absolute inset-0 h-full w-full">
                  <div
                    className="absolute inset-0 opacity-60 mix-blend-multiply"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'42\' height=\'42\' viewBox=\'0 0 42 42\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M.5 42V.5H42\' fill=\'none\' stroke=\'rgba(0,0,0,0.04)\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'repeat',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                    }}
                  />
                </div>
              </div>

              <Hero />
              <TrustMarquee />
              <Services />
            </div>
            <WorkShowcase />
            <WorldClassEdits />
            <ContentFlywheel />
            <Process />
            <AboutTeam />
            <Testimonials />
            <FAQ />
          </main>

          <Footer onOpenScheduler={() => navigate('/meet/services')} />
        </div>
      </div>
    </SmoothScroll>
  );
}
