import { Outlet } from 'react-router';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const AppLayout = () => {
  return (
    <div className="flex h-dvh min-h-dvh w-full bg-neutral-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          hasNotifications
          subtitle="Resumen operativo de la clínica para hoy"
          title="Panel"
        />
        <main id="main-content" className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-neutral-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
