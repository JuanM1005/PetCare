import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from '@/app/router/router';
import { AccentProvider } from '@/context/accent';
import '@/lib/i18n';
import '@/styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz de la aplicación.');
}

createRoot(rootElement).render(
  <StrictMode>
    <AccentProvider>
      <RouterProvider router={router} />
    </AccentProvider>
  </StrictMode>,
);
