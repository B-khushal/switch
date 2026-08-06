import React from 'react';
import AdminLayout from './AdminLayout';
import AnalyticsView from '../AnalyticsView';
import { BookingRecord } from '../../../types/booking';
import { computeAdminMetrics } from '../../../services/googleCalendarService';

interface AdminAnalyticsPageProps {
  bookings: BookingRecord[];
}

export default function AdminAnalyticsPage({ bookings }: AdminAnalyticsPageProps) {
  const metrics = computeAdminMetrics(bookings);
  return (
    <AdminLayout title="Analytics & Booking Conversion">
      <AnalyticsView metrics={metrics} />
    </AdminLayout>
  );
}
