import type { ChangeEventHandler, MouseEventHandler } from 'react';

export interface HeaderProps {
  hasNotifications?: boolean;
  onNotificationsClick?: MouseEventHandler<HTMLButtonElement>;
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  searchPlaceholder?: string;
  subtitle?: string;
  title: string;
}
