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
            background: 'var(--surface-elevated)',
            border: 'var(--border-width-hairline) solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'none',
            color: 'var(--text-primary)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--surface)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'var(--surface)',
            },
          },
          loading: {
            iconTheme: {
              primary: 'var(--color-primary-500)',
              secondary: 'var(--border-color)',
            },
          },
        }}
      />
    </>
  );
};
