import { useTranslation } from 'react-i18next';
import { Outlet, useMatches } from 'react-router';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface HeaderRouteMetadata {
  subtitleKey?: string;
  titleKey: string;
}

const getHeaderRouteMetadata = (handle: unknown): HeaderRouteMetadata | undefined => {
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
  const { t } = useTranslation('layout');
  const matches = useMatches();
  const headerMetadata = matches.reduce<HeaderRouteMetadata | undefined>(
    (currentMetadata, match) => getHeaderRouteMetadata(match.handle) ?? currentMetadata,
    undefined,
  );
  const title = t(headerMetadata?.titleKey ?? 'header.title');
  const subtitle = t(headerMetadata?.subtitleKey ?? 'header.subtitle');

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
