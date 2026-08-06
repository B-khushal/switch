import { MeetingType, TeamMember, BookingRecord, CustomerDetails, AdminMetrics } from '../types/booking';

export const INITIAL_MEETING_TYPES: MeetingType[] = [
  {
    id: '15m-discovery',
    title: '15 Min Discovery Call',
    duration: 15,
    description: 'Quick introductory call to explore alignment, understand your goals, and evaluate if Switch is the right growth partner.',
    benefits: ['Growth evaluation', 'Quick Q&A', 'Transparent fit check'],
    estimatedResponse: 'Instant Confirmation',
    iconName: 'Zap',
    color: 'from-amber-500 to-orange-500',
    popular: true,
  },
  {
    id: '30m-strategy',
    title: '30 Min Strategy Architecture',
    duration: 30,
    description: 'Deep dive into your current content system, traffic funnel, and conversion mechanics to map out a customized growth roadmap.',
    benefits: ['Funnel audit', 'Content strategy preview', 'ROAS roadmap'],
    estimatedResponse: 'Instant Confirmation',
    iconName: 'Compass',
    color: 'from-blue-500 to-indigo-500',
    popular: false,
  },
  {
    id: '60m-brand-audit',
    title: '60 Min Brand & Growth Audit',
    duration: 60,
    description: 'Full-spectrum audit of your brand strategy, video performance, website UX, and multi-channel acquisition system with our senior strategists.',
    benefits: ['Comprehensive audit', 'Actionable breakdown', 'Growth proposal'],
    estimatedResponse: 'Instant Confirmation',
    iconName: 'BarChart3',
    color: 'from-purple-500 to-pink-500',
    popular: false,
  },
  {
    id: '45m-kickoff',
    title: '45 Min Project Kickoff',
    duration: 45,
    description: 'Dedicated onboarding session for new Switch clients to align creative assets, production schedules, and tracking instrumentation.',
    benefits: ['Production timeline', 'Creative briefs', 'Channel setups'],
    estimatedResponse: 'Priority Booking',
    iconName: 'Rocket',
    color: 'from-emerald-500 to-teal-500',
    popular: false,
  },
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alex Rivera',
    role: 'Principal Growth Strategist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    department: 'Growth Strategy',
    email: 'alex@theswitchit.in',
    timezone: 'Asia/Kolkata (IST)',
    isGoogleConnected: true,
    vacationMode: false,
    roundRobinWeight: 9,
    rating: 4.9,
  },
  {
    id: 'team-2',
    name: 'Sarah Chen',
    role: 'Head of Content Production',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    department: 'Creative Media',
    email: 'sarah@theswitchit.in',
    timezone: 'Asia/Kolkata (IST)',
    isGoogleConnected: true,
    vacationMode: false,
    roundRobinWeight: 8,
    rating: 5.0,
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    role: 'Performance Marketing Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Paid Acquisition',
    email: 'marcus@theswitchit.in',
    timezone: 'America/New_York (EST)',
    isGoogleConnected: true,
    vacationMode: false,
    roundRobinWeight: 7,
    rating: 4.8,
  },
];

export function generateGoogleMeetLink(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const getRandomChars = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.google.com/${getRandomChars(3)}-${getRandomChars(4)}-${getRandomChars(3)}`;
}

export function selectRoundRobinMember(members: TeamMember[]): TeamMember {
  const activeMembers = members.filter((m) => !m.vacationMode && m.isGoogleConnected);
  if (activeMembers.length === 0) return members[0];
  const randomIndex = Math.floor(Math.random() * activeMembers.length);
  return activeMembers[randomIndex];
}

export function generateICSFile(booking: BookingRecord) {
  const startDate = new Date(`${booking.date} ${booking.timeSlot}`);
  const endDate = new Date(startDate.getTime() + booking.duration * 60000);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Switch It//Booking Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:booking-${booking.id}@theswitchit.in`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${booking.meetingTitle} with Switch It`,
    `DESCRIPTION:Google Meet Link: ${booking.googleMeetLink}\\nClient: ${booking.customer.fullName} (${booking.customer.company})`,
    `LOCATION:${booking.googleMeetLink}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `switch-booking-${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateInitialBookings(): BookingRecord[] {
  const stored = localStorage.getItem('switchit_live_bookings');
  return stored ? JSON.parse(stored) : [];
}

export function computeAdminMetrics(bookings: BookingRecord[]): AdminMetrics {
  const totalBookings = bookings.length;
  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;
  const rescheduledCount = bookings.filter((b) => b.status === 'rescheduled').length;
  const noShowCount = bookings.filter((b) => b.status === 'no-show').length;

  return {
    totalBookings,
    upcomingCount,
    completedCount,
    cancelledCount,
    rescheduledCount,
    noShowCount,
    revenueInfluenced: '₹50Cr+',
    conversionRate: '94.2%',
    avgDuration: 28,
    utilizationRate: '88%',
  };
}
