import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { App } from '@/app/App';
import { SidebarPreviewPage } from '@/app/dev/SidebarPreviewPage';
import { RouteErrorPage } from '@/app/pages/RouteErrorPage';
import { AppLayout } from '@/components/layout';

import type { AppRouteHandle } from './router.types';

const loadAppointmentRoutes = () => import('@/features/appointments');
const loadPatientRoutes = () => import('@/features/patients');

const createLazyRoute =
  <TComponent extends ComponentType>(loadComponent: () => Promise<TComponent>) =>
  async () => ({ Component: await loadComponent() });

const loadDashboardRoute = createLazyRoute(() =>
  import('@/features/dashboard/DashboardPage').then(({ DashboardPage }) => DashboardPage),
);
const loadAppointmentsRoute = createLazyRoute(() =>
  loadAppointmentRoutes().then(({ AppointmentsPage }) => AppointmentsPage),
);
const loadRegisterAppointmentRoute = createLazyRoute(() =>
  loadAppointmentRoutes().then(({ RegisterAppointmentPage }) => RegisterAppointmentPage),
);
const loadEditAppointmentRoute = createLazyRoute(() =>
  loadAppointmentRoutes().then(({ EditAppointmentPage }) => EditAppointmentPage),
);
const loadAppointmentDetailRoute = createLazyRoute(() =>
  loadAppointmentRoutes().then(({ AppointmentDetailPage }) => AppointmentDetailPage),
);
const loadPatientsRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ PatientsPage }) => PatientsPage),
);
const loadRegisterPatientRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ RegisterPatientPage }) => RegisterPatientPage),
);
const loadEditPatientRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ EditPatientPage }) => EditPatientPage),
);
const loadPatientDetailRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ PatientDetailLayout }) => PatientDetailLayout),
);
const loadPatientSummaryRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ PatientSummaryPage }) => PatientSummaryPage),
);
const loadPatientHistoryRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ PatientHistoryPage }) => PatientHistoryPage),
);
const loadPatientAppointmentsRoute = createLazyRoute(() =>
  loadPatientRoutes().then(({ PatientAppointmentsPage }) => PatientAppointmentsPage),
);
const loadSettingsRoute = createLazyRoute(() =>
  import('@/features/settings/SettingsPage').then(({ SettingsPage }) => SettingsPage),
);
const loadDesignSystemRoute = createLazyRoute(() =>
  import('@/app/dev/DesignSystemPreviewPage').then(
    ({ DesignSystemPreviewPage }) => DesignSystemPreviewPage,
  ),
);
const loadNotFoundRoute = createLazyRoute(() =>
  import('@/app/pages/NotFoundPage/NotFoundPage').then(({ NotFoundPage }) => NotFoundPage),
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <RouteErrorPage fullViewport />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: 'design-system',
        lazy: loadDesignSystemRoute,
      },
      {
        path: 'sidebar-preview',
        Component: SidebarPreviewPage,
      },
      {
        Component: AppLayout,
        errorElement: <RouteErrorPage fullViewport />,
        children: [
          {
            errorElement: <RouteErrorPage />,
            children: [
              {
                path: 'dashboard',
                lazy: loadDashboardRoute,
                handle: {
                  header: {
                    subtitleKey: 'dashboard:header.subtitle',
                    titleKey: 'dashboard:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'appointments',
                lazy: loadAppointmentsRoute,
                handle: {
                  header: {
                    subtitleKey: 'appointments:header.subtitle',
                    titleKey: 'appointments:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'appointments/register',
                lazy: loadRegisterAppointmentRoute,
                handle: {
                  header: {
                    subtitleKey: 'appointments:header.registerSubtitle',
                    titleKey: 'appointments:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'appointments/:appointmentId/edit',
                lazy: loadEditAppointmentRoute,
                handle: {
                  header: {
                    subtitleKey: 'appointments:header.editSubtitle',
                    titleKey: 'appointments:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'appointments/:appointmentId',
                lazy: loadAppointmentDetailRoute,
                handle: {
                  header: {
                    subtitleKey: 'appointments:header.detailSubtitle',
                    titleKey: 'appointments:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients',
                lazy: loadPatientsRoute,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.subtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients/register',
                lazy: loadRegisterPatientRoute,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.registerSubtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients/:patientId/edit',
                lazy: loadEditPatientRoute,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.editSubtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients/:patientId',
                lazy: loadPatientDetailRoute,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.detailSubtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
                children: [
                  {
                    index: true,
                    lazy: loadPatientSummaryRoute,
                  },
                  {
                    path: 'history',
                    lazy: loadPatientHistoryRoute,
                  },
                  {
                    path: 'appointments',
                    lazy: loadPatientAppointmentsRoute,
                  },
                ],
              },
              {
                path: 'settings',
                lazy: loadSettingsRoute,
                handle: {
                  header: {
                    subtitleKey: 'settings:header.subtitle',
                    titleKey: 'settings:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: '*',
                lazy: loadNotFoundRoute,
                handle: {
                  header: {
                    subtitleKey: 'layout:header.notFound.subtitle',
                    titleKey: 'layout:header.notFound.title',
                  },
                } satisfies AppRouteHandle,
              },
            ],
          },
        ],
      },
    ],
  },
]);
