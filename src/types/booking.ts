export interface MeetingType {
  id: string;
  title: string;
  duration: number; // minutes
  description: string;
  benefits: string[];
  estimatedResponse: string;
  iconName: string;
  color: string;
  popular?: boolean;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  industry: string;
  marketingGoals: string[];
  notes: string;
}

export interface BookingRecord {
  id: string;
  meetingTypeId: string;
  meetingTitle: string;
  duration: number; // minutes
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  timezone: string;
  googleMeetLink: string;
  googleEventId: string;
  customer: CustomerDetails;
  assignedTeamMember: TeamMember;
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  email: string;
  timezone: string;
  isGoogleConnected: boolean;
  vacationMode: boolean;
  roundRobinWeight: number; // 1-10
  rating: number;
}

export interface WorkingHours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface AdminMetrics {
  totalBookings: number;
  upcomingCount: number;
  completedCount: number;
  cancelledCount: number;
  rescheduledCount: number;
  noShowCount: number;
  revenueInfluenced: string;
  conversionRate: string;
  avgDuration: number;
  utilizationRate: string;
}
