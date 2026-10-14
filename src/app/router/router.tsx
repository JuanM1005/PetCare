import { createBrowserRouter, Navigate } from 'react-router';

import { App } from '@/app/App';
import { DesignSystemPreviewPage } from '@/app/dev/DesignSystemPreviewPage';
import { SidebarPreviewPage } from '@/app/dev/SidebarPreviewPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { RouteErrorPage } from '@/app/pages/RouteErrorPage';
import { AppLayout } from '@/components/layout';
import { DashboardPage } from '@/features/dashboard';
import {
  PatientDetailLayout,
  PatientAppointmentsPage,
  PatientHistoryPage,
  PatientsPage,
  PatientSummaryPage,
} from '@/features/patients';

import type { AppRouteHandle } from './router.types';

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
        Component: DesignSystemPreviewPage,
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
                Component: DashboardPage,
                handle: {
                  header: {
                    subtitleKey: 'dashboard:header.subtitle',
                    titleKey: 'dashboard:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients',
                Component: PatientsPage,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.subtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
              },
              {
                path: 'patients/:patientId',
                Component: PatientDetailLayout,
                handle: {
                  header: {
                    subtitleKey: 'patients:header.detailSubtitle',
                    titleKey: 'patients:header.title',
                  },
                } satisfies AppRouteHandle,
                children: [
                  {
                    index: true,
                    Component: PatientSummaryPage,
                  },
                  {
                    path: 'history',
                    Component: PatientHistoryPage,
                  },
                  {
                    path: 'appointments',
                    Component: PatientAppointmentsPage,
                  },
                ],
              },
              {
                path: '*',
                Component: NotFoundPage,
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
