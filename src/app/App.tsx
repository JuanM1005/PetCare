import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-neutral-0)',
            border: 'var(--border-width-hairline) solid var(--color-neutral-200)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'none',
            color: 'var(--color-neutral-900)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--color-neutral-0)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'var(--color-neutral-0)',
            },
          },
          loading: {
            iconTheme: {
              primary: 'var(--color-primary-500)',
              secondary: 'var(--color-neutral-200)',
            },
          },
        }}
      />
    </>
  );
};
