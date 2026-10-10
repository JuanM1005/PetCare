import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const AppLayout = () => {
  const { t } = useTranslation('layout');

  return (
    <div className="flex h-dvh min-h-dvh w-full bg-app-background">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header hasNotifications subtitle={t('header.subtitle')} title={t('header.title')} />
        <main
          id="main-content"
          className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-app-background"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
