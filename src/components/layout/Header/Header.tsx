import { FiBell, FiGlobe, FiMoon, FiSearch } from 'react-icons/fi';

import type { HeaderProps } from './Header.types';

const iconButtonClassName =
  'relative flex size-10 shrink-0 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none';

export const Header = ({
  hasNotifications = false,
  onGlobalClick,
  onLanguageClick,
  onNotificationsClick,
  onSearchChange,
  onThemeClick,
  searchPlaceholder = 'Buscar pacientes...',
  subtitle,
  title,
}: HeaderProps) => {
  return (
    <header className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 border-b border-neutral-200 bg-neutral-0 px-6 py-3">
      <div className="min-w-48 flex-1">
        <h1 className="text-lg font-semibold leading-tight text-primary-700">{title}</h1>
        {subtitle ? <p className="mt-1 text-xs text-neutral-500">{subtitle}</p> : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none">
        <label className="relative min-w-28 flex-1 sm:w-52 sm:flex-none">
          <span className="sr-only">Buscar</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          />
          <input
            aria-label="Buscar"
            className="min-h-10 w-full rounded-md border-hairline border-neutral-300 bg-neutral-0 py-2 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            type="search"
          />
        </label>

        <button
          aria-label="Configuración global"
          className={iconButtonClassName}
          onClick={onGlobalClick}
          type="button"
        >
          <FiGlobe aria-hidden="true" className="size-5" />
        </button>
        <button
          aria-label="Cambiar tema"
          className={iconButtonClassName}
          onClick={onThemeClick}
          type="button"
        >
          <FiMoon aria-hidden="true" className="size-5" />
        </button>
        <button
          aria-label="Notificaciones"
          className={iconButtonClassName}
          onClick={onNotificationsClick}
          type="button"
        >
          <FiBell aria-hidden="true" className="size-5" />
          {hasNotifications ? (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-neutral-0"
            />
          ) : null}
        </button>
        <button
          aria-label="Idioma actual: Español"
          className="flex min-h-8 shrink-0 items-center justify-center rounded-md border-hairline border-neutral-300 bg-neutral-0 px-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
          onClick={onLanguageClick}
          type="button"
        >
          ES
        </button>
      </div>
    </header>
  );
};
