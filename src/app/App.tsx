import { FiInfo } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <Outlet />
      <Toaster
        gutter={12}
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--surface-elevated)',
            border: 'var(--border-width-hairline) solid var(--border-color)',
            borderLeft: '3px solid var(--color-primary-500)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-primary)',
            maxWidth: 'min(28rem, calc(100vw - 2rem))',
            overflowWrap: 'anywhere',
            padding: '12px 16px',
          },
          blank: {
            duration: 4000,
            icon: <FiInfo aria-hidden="true" className="size-5 shrink-0 text-primary-500" />,
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--surface)',
            },
            style: {
              borderLeftColor: 'var(--color-success)',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'var(--surface)',
            },
            style: {
              borderLeftColor: 'var(--color-danger)',
            },
          },
          loading: {
            duration: Infinity,
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
