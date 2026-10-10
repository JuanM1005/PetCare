import { FiBell, FiCalendar, FiFileText, FiHeart, FiHome, FiUsers } from 'react-icons/fi';
import type { IconType } from 'react-icons';

interface SidebarNavItem {
  badge?: number;
  icon: IconType;
  label: string;
  to: string;
}

export const sidebarNavItems = [
  { icon: FiHome, label: 'Panel', to: '/dashboard' },
  { icon: FiHeart, label: 'Pacientes', to: '/patients' },
  { badge: 8, icon: FiCalendar, label: 'Citas', to: '/appointments' },
  { icon: FiFileText, label: 'Historial clínico', to: '/medical-records' },
  { icon: FiUsers, label: 'Propietarios', to: '/owners' },
  { icon: FiBell, label: 'Notificaciones', to: '/notifications' },
] satisfies readonly SidebarNavItem[];
