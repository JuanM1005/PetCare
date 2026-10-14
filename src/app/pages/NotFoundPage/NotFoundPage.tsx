import { FaPaw } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { Button, Card } from '@/components/ui';

const dashboardLinkClassName =
  'inline-flex min-h-9 items-center justify-center rounded-md bg-primary-action px-4 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common', { keyPrefix: 'errors.notFound' });

  return (
    <section className="flex min-h-full items-center justify-center p-6">
      <Card className="w-full max-w-xl text-center" padding="lg">
        <span className="mx-auto flex size-16 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
          <FaPaw aria-hidden="true" className="size-8" />
        </span>

        <p aria-hidden="true" className="mt-6 text-5xl font-bold text-primary-600">
          {t('code')}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-text-primary">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-md whitespace-pre-line text-sm text-text-secondary">
          {t('description')}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className={dashboardLinkClassName} to="/dashboard">
            {t('backToDashboard')}
          </Link>
          <Button onClick={() => navigate(-1)} variant="secondary">
            {t('goBack')}
          </Button>
        </div>
      </Card>
    </section>
  );
};
