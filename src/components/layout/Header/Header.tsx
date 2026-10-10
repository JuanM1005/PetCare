import { FiBell, FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { LanguageToggle, ThemeToggle } from '@/components/ui';

import type { HeaderProps } from './Header.types';

const iconButtonClassName =
  'relative flex size-10 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none';

export const Header = ({
  hasNotifications = false,
  onNotificationsClick,
  onSearchChange,
  searchPlaceholder,
  subtitle,
  title,
}: HeaderProps) => {
  const { t } = useTranslation('layout');
  const resolvedSearchPlaceholder = searchPlaceholder ?? t('header.searchPlaceholder');

  return (
    <header className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 border-b border-border bg-surface px-6 py-3">
      <div className="min-w-48 flex-1">
        <h1 className="text-lg font-semibold leading-tight text-primary-700">{title}</h1>
        {subtitle ? <p className="mt-1 text-xs text-text-muted">{subtitle}</p> : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none">
        <label className="relative min-w-28 flex-1 sm:w-52 sm:flex-none">
          <span className="sr-only">{t('header.search')}</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          />
          <input
            aria-label={t('header.search')}
            className="min-h-10 w-full rounded-md border-hairline border-border-strong bg-surface py-2 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            onChange={onSearchChange}
            placeholder={resolvedSearchPlaceholder}
            type="search"
          />
        </label>

        <ThemeToggle />
        <button
          aria-label={t('header.notifications')}
          className={iconButtonClassName}
          onClick={onNotificationsClick}
          type="button"
        >
          <FiBell aria-hidden="true" className="size-5" />
          {hasNotifications ? (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-surface"
            />
          ) : null}
        </button>
        <LanguageToggle />
      </div>
    </header>
  );
};
