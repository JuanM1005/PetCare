import type { ChangeEventHandler, MouseEventHandler } from 'react';

export interface HeaderProps {
  hasNotifications?: boolean;
  onGlobalClick?: MouseEventHandler<HTMLButtonElement>;
  onLanguageClick?: MouseEventHandler<HTMLButtonElement>;
  onNotificationsClick?: MouseEventHandler<HTMLButtonElement>;
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  onThemeClick?: MouseEventHandler<HTMLButtonElement>;
  searchPlaceholder?: string;
  subtitle?: string;
  title: string;
}
