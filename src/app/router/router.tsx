import { createBrowserRouter } from 'react-router';

import { App } from '@/app/App';
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
    ],
  },
]);
