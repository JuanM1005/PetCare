import { useTranslation } from 'react-i18next';
import { Outlet, useMatches } from 'react-router';

import type { AppRouteHeaderMetadata } from '@/app/router/router.types';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

const getHeaderRouteMetadata = (handle: unknown): AppRouteHeaderMetadata | undefined => {
  if (!handle || typeof handle !== 'object' || !('header' in handle)) {
    return undefined;
  }

  const header = handle.header;

  if (!header || typeof header !== 'object' || !('titleKey' in header)) {
    return undefined;
  }

  const { titleKey } = header;
  const subtitleKey = 'subtitleKey' in header ? header.subtitleKey : undefined;

  if (
    typeof titleKey !== 'string' ||
    (subtitleKey !== undefined && typeof subtitleKey !== 'string')
  ) {
    return undefined;
  }

  return { subtitleKey, titleKey };
};

export const AppLayout = () => {
  const { t } = useTranslation(['layout', 'dashboard', 'appointments', 'patients', 'settings']);
  const matches = useMatches();
  const headerMetadata = matches.reduce<AppRouteHeaderMetadata | undefined>(
    (currentMetadata, match) => getHeaderRouteMetadata(match.handle) ?? currentMetadata,
    undefined,
  );
  const title = t(headerMetadata?.titleKey ?? 'dashboard:header.title');
  const subtitle = t(headerMetadata?.subtitleKey ?? 'dashboard:header.subtitle');

  return (
    <div className="flex h-dvh min-h-dvh w-full bg-app-background">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header hasNotifications subtitle={subtitle} title={title} />
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
