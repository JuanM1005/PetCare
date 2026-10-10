import { createBrowserRouter, Navigate } from 'react-router';

import { App } from '@/app/App';
import { DesignSystemPreviewPage } from '@/app/dev/DesignSystemPreviewPage';
import { SidebarPreviewPage } from '@/app/dev/SidebarPreviewPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { RouteErrorPage } from '@/app/pages/RouteErrorPage';
import { AppLayout } from '@/components/layout';
import { DashboardPage } from '@/features/dashboard';

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
                    subtitleKey: 'header.subtitle',
                    titleKey: 'header.title',
                  },
                },
              },
              {
                path: '*',
                Component: NotFoundPage,
                handle: {
                  header: {
                    subtitleKey: 'header.notFound.subtitle',
                    titleKey: 'header.notFound.title',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
