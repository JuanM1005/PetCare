import { createBrowserRouter } from 'react-router';

import { App } from '@/app/App';
import { DesignSystemPreviewPage } from '@/app/dev/DesignSystemPreviewPage';
import { SidebarPreviewPage } from '@/app/dev/SidebarPreviewPage';
import { PetCarePage } from '@/app/pages/PetCarePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: PetCarePage,
      },
      {
        path: 'design-system',
        Component: DesignSystemPreviewPage,
      },
      {
        path: 'sidebar-preview',
        Component: SidebarPreviewPage,
      },
    ],
  },
]);
