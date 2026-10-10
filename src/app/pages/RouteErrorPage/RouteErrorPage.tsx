import { clsx } from 'clsx';
import { useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useRouteError } from 'react-router';

import { Button, Card } from '@/components/ui';

interface RouteErrorPageProps {
  fullViewport?: boolean;
}

const dashboardLinkClassName =
  'inline-flex min-h-9 items-center justify-center rounded-md border-hairline border-border-strong bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

export const RouteErrorPage = ({ fullViewport = false }: RouteErrorPageProps) => {
  const error: unknown = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('common', { keyPrefix: 'errors.route' });
  const Heading = fullViewport ? 'h1' : 'h2';

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error('PetCare route error:', error);
    }
  }, [error]);

  const handleRetry = () => {
    navigate(`${location.pathname}${location.search}${location.hash}`, { replace: true });
  };

  return (
    <section
      className={clsx(
        'flex items-center justify-center bg-app-background p-6',
        fullViewport ? 'min-h-dvh' : 'min-h-full',
      )}
    >
      <Card className="w-full max-w-xl text-center" padding="lg" role="alert">
        <span className="mx-auto flex size-16 items-center justify-center rounded-xl bg-danger/10 text-danger">
          <FiAlertTriangle aria-hidden="true" className="size-8" />
        </span>

        <Heading className="mt-6 text-2xl font-semibold text-text-primary">{t('title')}</Heading>
        <p className="mx-auto mt-3 max-w-md whitespace-pre-line text-sm text-text-secondary">
          {t('description')}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={handleRetry}>{t('retry')}</Button>
          <Link className={dashboardLinkClassName} to="/dashboard">
            {t('backToDashboard')}
          </Link>
        </div>
      </Card>
    </section>
  );
};
