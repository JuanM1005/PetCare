import { Sidebar } from '@/components/layout';

export const SidebarPreviewPage = () => {
  return (
    <div className="flex h-dvh min-w-80 overflow-hidden bg-neutral-50">
      <Sidebar />
      <main className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto p-6 text-center">
        <section className="max-w-xl">
          <p className="text-sm font-medium text-primary-600">PetCare</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-950">Vista previa de Layout</h1>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Por ahora esta vista valida únicamente el Sidebar. El contenido principal y el resto del
            layout se implementarán en etapas posteriores.
          </p>
        </section>
      </main>
    </div>
  );
};
