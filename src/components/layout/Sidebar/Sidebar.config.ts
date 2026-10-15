import { FiCalendar, FiFileText, FiHeart, FiHome, FiUsers } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import { appointments } from '@/features/appointments/appointments.mock';
import { getActiveAppointmentsCount } from '@/features/appointments/appointments.selectors';

interface SidebarNavItem {
  badge?: number;
  icon: IconType;
  labelKey:
    | 'navigation.dashboard'
    | 'navigation.patients'
    | 'navigation.appointments'
    | 'navigation.medicalRecords'
    | 'navigation.owners';
  to: string;
}

const appointmentsCount = getActiveAppointmentsCount(appointments);

export const sidebarNavItems = [
  { icon: FiHome, labelKey: 'navigation.dashboard', to: '/dashboard' },
  { icon: FiHeart, labelKey: 'navigation.patients', to: '/patients' },
  {
    badge: appointmentsCount,
    icon: FiCalendar,
    labelKey: 'navigation.appointments',
    to: '/appointments',
  },
  { icon: FiFileText, labelKey: 'navigation.medicalRecords', to: '/medical-records' },
  { icon: FiUsers, labelKey: 'navigation.owners', to: '/owners' },
] satisfies readonly SidebarNavItem[];
