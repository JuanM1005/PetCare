import { clsx } from 'clsx';
import { useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiSettings,
  FiUser,
  FiWifiOff,
} from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { Card } from '@/components/ui';

import { sidebarNavItems } from './Sidebar.config';
import type { SidebarProps } from './Sidebar.types';

const accountButtonClassName =
  'flex min-h-10 items-center rounded-md text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none';

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });
  const toggleLabel = t(isCollapsed ? 'expand' : 'collapse');
  const offlineLabel = `${t('offlineReady')}. ${t('pendingChanges', { count: 3 })}`;

  return (
    <aside
      className={clsx(
        'relative flex h-dvh shrink-0 flex-col overflow-visible border-r border-border bg-surface text-text-primary transition-[width] duration-200 motion-reduce:transition-none',
        isCollapsed ? 'w-24' : 'w-76',
        className,
      )}
    >
      <button
        aria-expanded={!isCollapsed}
        aria-label={toggleLabel}
        className="absolute right-0 top-6 z-20 flex size-8 translate-x-1/2 items-center justify-center rounded-full border-hairline border-border bg-surface-elevated text-text-muted shadow-sm transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
        onClick={() => setIsCollapsed((isCurrentlyCollapsed) => !isCurrentlyCollapsed)}
        title={toggleLabel}
        type="button"
      >
        {isCollapsed ? (
          <FiChevronRight aria-hidden="true" className="size-4 cursor-pointer" />
        ) : (
          <FiChevronLeft aria-hidden="true" className="size-4 cursor-pointer" />
        )}
      </button>

      <div className={clsx('shrink-0 border-b border-border', isCollapsed ? 'p-4' : 'p-6')}>
        <div className={clsx('flex items-center', isCollapsed ? 'justify-center' : 'gap-4')}>
          <span
            aria-label={isCollapsed ? 'PetCare' : undefined}
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-neutral-0 shadow-sm"
            role={isCollapsed ? 'img' : undefined}
          >
            <FaPaw aria-hidden="true" className="size-6" />
          </span>
          {!isCollapsed ? (
            <div className="min-w-0 transition-opacity duration-150 motion-reduce:transition-none">
              <p className="text-xl font-semibold leading-tight text-text-primary">PetCare</p>
              <p className="truncate text-sm font-medium uppercase text-text-muted">
                {t('clinic')}
              </p>
            </div>
          ) : null}
        </div>

        <Card
          className={clsx('mt-6', isCollapsed ? 'flex justify-center' : 'flex items-center gap-3')}
          padding="sm"
          title={
            isCollapsed ? `Dr. Carlos Lopez, ${t('doctorRole')}, ${t('disconnected')}` : undefined
          }
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-500 font-semibold text-neutral-0">
            CL
          </span>
          {!isCollapsed ? (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">Dr. Carlos Lopez</span>
                <span className="block truncate text-xs text-text-secondary">
                  {t('doctorRole')}
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border-hairline border-border bg-surface-subtle px-2 py-0.5 text-xs text-text-secondary">
                  <span aria-hidden="true" className="size-2 rounded-full bg-offline" />
                  {t('disconnected')}
                </span>
              </span>
              <FiChevronRight aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
            </>
          ) : null}
        </Card>
      </div>

      <nav
        aria-label={t('navigationLabel')}
        className={clsx(
          'min-h-0 flex-1 overflow-y-auto py-6 [scrollbar-color:var(--border-strong-color)_transparent] scrollbar-thin [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong [&::-webkit-scrollbar-thumb:hover]:bg-text-muted [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5',
          isCollapsed ? 'px-3' : 'px-6',
        )}
      >
        {!isCollapsed ? (
          <p className="mb-4 px-3 text-xs font-semibold uppercase text-text-muted">{t('main')}</p>
        ) : null}
        <ul className="flex flex-col gap-1.5">
          {sidebarNavItems.map(({ badge, icon: Icon, labelKey, to }) => {
            const label = t(labelKey);

            return (
              <li key={to}>
                <NavLink
                  aria-label={isCollapsed ? label : undefined}
                  className={({ isActive }) =>
                    clsx(
                      'group flex min-h-12 items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none',
                      isCollapsed ? 'justify-center px-2' : 'gap-3 px-3',
                      isActive
                        ? 'bg-primary-500 text-neutral-0 shadow-sm'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                    )
                  }
                  title={isCollapsed ? label : undefined}
                  to={to}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={clsx(
                          'flex size-9 shrink-0 items-center justify-center rounded-md transition-colors motion-reduce:transition-none',
                          isActive
                            ? 'bg-primary-400 text-neutral-0'
                            : 'bg-surface-subtle text-text-muted group-hover:text-text-primary',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      {!isCollapsed ? (
                        <>
                          <span className="min-w-0 flex-1 truncate">{label}</span>
                          {badge ? (
                            <span
                              aria-label={t('appointmentsCount', { count: badge })}
                              className={clsx(
                                'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                                isActive
                                  ? 'bg-neutral-0/20 text-neutral-0'
                                  : 'bg-primary-100 text-primary-700',
                              )}
                            >
                              {badge}
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={clsx('shrink-0 border-t border-border', isCollapsed ? 'p-3' : 'p-6')}>
        <div
          aria-label={offlineLabel}
          className={clsx(
            'flex items-center rounded-lg border-hairline border-border bg-surface-elevated',
            isCollapsed ? 'size-12 justify-center' : 'gap-3 p-3',
          )}
          role="status"
          title={isCollapsed ? offlineLabel : undefined}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-warning/10 text-warning">
            <FiWifiOff aria-hidden="true" className="size-5" />
          </span>
          {!isCollapsed ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{t('offlineReady')}</span>
              <span className="block truncate text-xs text-text-secondary">
                {t('pendingChanges', { count: 3 })}
              </span>
            </span>
          ) : null}
        </div>

        <section className="mt-3 border-t border-border pt-3" aria-label={t('account')}>
          {!isCollapsed ? (
            <p className="mb-1 px-2 text-xs font-semibold uppercase text-text-muted">
              {t('account')}
            </p>
          ) : null}
          <div className={clsx('flex', isCollapsed ? 'flex-col items-center gap-1' : 'flex-col')}>
            <button
              aria-label={t('profile')}
              className={clsx(
                accountButtonClassName,
                isCollapsed ? 'size-10 justify-center' : 'gap-3 px-2',
              )}
              title={isCollapsed ? t('profile') : undefined}
              type="button"
            >
              <FiUser aria-hidden="true" className="size-5 shrink-0" />
              {!isCollapsed ? <span>{t('profile')}</span> : null}
            </button>
            <button
              aria-label={t('settings')}
              className={clsx(
                accountButtonClassName,
                isCollapsed ? 'size-10 justify-center' : 'gap-3 px-2',
              )}
              title={isCollapsed ? t('settings') : undefined}
              type="button"
            >
              <FiSettings aria-hidden="true" className="size-5 shrink-0" />
              {!isCollapsed ? <span>{t('settings')}</span> : null}
            </button>
            <button
              aria-label={t('logout')}
              className={clsx(
                accountButtonClassName,
                isCollapsed ? 'size-10 justify-center' : 'gap-3 px-2',
              )}
              title={isCollapsed ? t('logout') : undefined}
              type="button"
            >
              <FiLogOut aria-hidden="true" className="size-5 shrink-0" />
              {!isCollapsed ? <span>{t('logout')}</span> : null}
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};
