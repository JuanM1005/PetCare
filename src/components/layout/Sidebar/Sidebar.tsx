import { clsx } from 'clsx';
import { useState } from 'react';
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiShield,
  FiWifiOff,
} from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';

import { Card } from '@/components/ui';

import { sidebarNavItems } from './Sidebar.config';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleLabel = isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral';

  return (
    <aside
      className={clsx(
        'relative flex h-dvh shrink-0 flex-col overflow-visible border-r border-neutral-200 bg-neutral-50 text-neutral-900 transition-[width] duration-200 motion-reduce:transition-none',
        isCollapsed ? 'w-24' : 'w-76',
        className,
      )}
    >
      <button
        aria-expanded={!isCollapsed}
        aria-label={toggleLabel}
        className="absolute right-0 top-6 z-20 flex size-8 translate-x-1/2 items-center justify-center rounded-full border-hairline border-neutral-200 bg-neutral-0 text-neutral-500 shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
        onClick={() => setIsCollapsed((isCurrentlyCollapsed) => !isCurrentlyCollapsed)}
        title={toggleLabel}
        type="button"
      >
        {isCollapsed ? (
          <FiChevronRight aria-hidden="true" className="size-4" />
        ) : (
          <FiChevronLeft aria-hidden="true" className="size-4" />
        )}
      </button>

      <div className={clsx('shrink-0 border-b border-neutral-200', isCollapsed ? 'p-4' : 'p-6')}>
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
              <p className="text-xl font-semibold leading-tight text-neutral-950">PetCare</p>
              <p className="truncate text-sm font-medium uppercase text-neutral-400">
                Clínica veterinaria
              </p>
            </div>
          ) : null}
        </div>

        <Card
          className={clsx('mt-6', isCollapsed ? 'flex justify-center' : 'flex items-center gap-3')}
          padding="sm"
          title={isCollapsed ? 'Dr. Carlos Lopez, Veterinario clínico, Desconectado' : undefined}
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-500 font-semibold text-neutral-0">
            CL
          </span>
          {!isCollapsed ? (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">Dr. Carlos Lopez</span>
                <span className="block truncate text-xs text-neutral-600">Veterinario clínico</span>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border-hairline border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                  <span aria-hidden="true" className="size-2 rounded-full bg-offline" />
                  Desconectado
                </span>
              </span>
              <FiChevronRight aria-hidden="true" className="size-4 shrink-0 text-neutral-400" />
            </>
          ) : null}
        </Card>
      </div>

      <nav
        aria-label="Navegación principal"
        className={clsx(
          'min-h-0 flex-1 overflow-y-auto py-6 [scrollbar-color:var(--color-neutral-300)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5',
          isCollapsed ? 'px-3' : 'px-6',
        )}
      >
        {!isCollapsed ? (
          <p className="mb-4 px-3 text-xs font-semibold uppercase text-neutral-400">Principal</p>
        ) : null}
        <ul className="flex flex-col gap-1.5">
          {sidebarNavItems.map(({ badge, icon: Icon, label, to }) => (
            <li key={to}>
              <NavLink
                aria-label={isCollapsed ? label : undefined}
                className={({ isActive }) =>
                  clsx(
                    'group flex min-h-12 items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none',
                    isCollapsed ? 'justify-center px-2' : 'gap-3 px-3',
                    isActive
                      ? 'bg-primary-500 text-neutral-0 shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
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
                          : 'bg-neutral-100 text-neutral-500 group-hover:text-neutral-700',
                      )}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {!isCollapsed ? (
                      <>
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                        {badge ? (
                          <span
                            aria-label={`${badge} citas`}
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
          ))}
        </ul>
      </nav>

      <div className={clsx('shrink-0 border-t border-neutral-200', isCollapsed ? 'p-3' : 'p-6')}>
        {isCollapsed ? (
          <Link
            aria-label="Crear cita"
            className="flex size-12 items-center justify-center rounded-lg bg-neutral-900 text-neutral-0 transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
            title="Crear cita"
            to="/appointments/new"
          >
            <FiCalendar aria-hidden="true" className="size-5" />
          </Link>
        ) : (
          <section
            className="rounded-xl bg-neutral-900 p-3 text-neutral-0"
            aria-label="Acción rápida"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-neutral-800">
                <FiCalendar aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">Nueva consulta</span>
                <span className="block text-xs text-neutral-300">Agenda rápida</span>
              </span>
            </div>
            <Link
              className="mt-3 flex min-h-10 w-full items-center justify-center rounded-md bg-neutral-0 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
              to="/appointments/new"
            >
              Crear cita
            </Link>
          </section>
        )}

        <div
          aria-label="Modo offline listo. 3 cambios pendientes de sincronización"
          className={clsx(
            'mt-3 flex items-center rounded-lg border-hairline border-neutral-200 bg-neutral-0',
            isCollapsed ? 'size-12 justify-center' : 'gap-3 p-3',
          )}
          role="status"
          title={
            isCollapsed ? 'Modo offline listo. 3 cambios pendientes de sincronización' : undefined
          }
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-warning/10 text-warning">
            <FiWifiOff aria-hidden="true" className="size-5" />
          </span>
          {!isCollapsed ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">Modo offline listo</span>
              <span className="block truncate text-xs text-neutral-600">
                3 cambios pendientes de sincronización
              </span>
            </span>
          ) : null}
        </div>

        <div
          className={clsx(
            'mt-3 flex border-t border-neutral-200 pt-3',
            isCollapsed ? 'flex-col items-center gap-2' : 'items-center justify-between',
          )}
        >
          <NavLink
            aria-label={isCollapsed ? 'Seguridad' : undefined}
            className={({ isActive }) =>
              clsx(
                'flex min-h-10 items-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none',
                isCollapsed ? 'size-10 justify-center' : 'gap-2 px-2',
                isActive ? 'text-primary-700' : 'text-neutral-600 hover:text-neutral-900',
              )
            }
            title={isCollapsed ? 'Seguridad' : undefined}
            to="/security"
          >
            <FiShield aria-hidden="true" className="size-5 shrink-0" />
            {!isCollapsed ? <span>Seguridad</span> : null}
          </NavLink>
          <button
            aria-label="Cerrar sesión"
            className="flex size-10 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
            title="Cerrar sesión"
            type="button"
          >
            <FiLogOut aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
