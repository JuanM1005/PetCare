import { FiCalendar, FiFileText, FiHeart, FiHome, FiUsers } from 'react-icons/fi';
import type { IconType } from 'react-icons';

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

export const sidebarNavItems = [
  { icon: FiHome, labelKey: 'navigation.dashboard', to: '/dashboard' },
  { icon: FiHeart, labelKey: 'navigation.patients', to: '/patients' },
  { badge: 8, icon: FiCalendar, labelKey: 'navigation.appointments', to: '/appointments' },
  { icon: FiFileText, labelKey: 'navigation.medicalRecords', to: '/medical-records' },
  { icon: FiUsers, labelKey: 'navigation.owners', to: '/owners' },
] satisfies readonly SidebarNavItem[];
