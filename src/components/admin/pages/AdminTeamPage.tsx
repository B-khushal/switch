import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import TeamManagement from '../TeamManagement';
import { INITIAL_TEAM_MEMBERS } from '../../../services/googleCalendarService';
import { TeamMember } from '../../../types/booking';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  const handleToggleVacation = (id: string) => {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, vacationMode: !m.vacationMode } : m)));
  };

  return (
    <AdminLayout title="Team & Round Robin Assignment">
      <TeamManagement teamMembers={team} onToggleVacation={handleToggleVacation} />
    </AdminLayout>
  );
}
