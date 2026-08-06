import React from 'react';
import AdminLayout from './AdminLayout';
import AdminCalendarView from '../AdminCalendarView';
import { BookingRecord } from '../../../types/booking';

interface AdminCalendarPageProps {
  bookings: BookingRecord[];
}

export default function AdminCalendarPage({ bookings }: AdminCalendarPageProps) {
  return (
    <AdminLayout title="Master Calendar Schedule">
      <AdminCalendarView bookings={bookings} onSelectBooking={() => {}} />
    </AdminLayout>
  );
}
