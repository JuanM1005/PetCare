import { createBrowserRouter, Navigate } from 'react-router';

import { App } from '@/app/App';
import { DashboardPlaceholderPage } from '@/app/dev/DashboardPlaceholderPage';
import { DesignSystemPreviewPage } from '@/app/dev/DesignSystemPreviewPage';
import { SidebarPreviewPage } from '@/app/dev/SidebarPreviewPage';
import { AppLayout } from '@/components/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
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
        children: [
          {
            path: 'dashboard',
            Component: DashboardPlaceholderPage,
          },
        ],
      },
    ],
  },
]);
