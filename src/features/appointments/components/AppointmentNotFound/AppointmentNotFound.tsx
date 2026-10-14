import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Card } from '@/components/ui';

export const AppointmentNotFound = () => {
  const { t } = useTranslation('appointments');

  return (
    <div className="flex min-h-full items-center justify-center p-6 text-text-primary">
      <Card className="w-full max-w-lg text-center" padding="lg">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
          <FiCalendar aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-text-primary">
          {t('detail.notFound.title')}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">{t('detail.notFound.description')}</p>
        <Link
          className="mt-6 inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-primary-action px-4 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          to="/appointments"
        >
          <FiArrowLeft aria-hidden="true" className="size-4" />
          {t('detail.back')}
        </Link>
      </Card>
    </div>
  );
};
