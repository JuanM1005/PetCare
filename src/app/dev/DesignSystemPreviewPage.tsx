import { useState } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Radio,
  Select,
  Spinner,
  Textarea,
} from '@/components/ui';

interface PreviewSectionProps {
  children: ReactNode;
  title: string;
}

const PreviewSection = ({ children, title }: PreviewSectionProps) => {
  return (
    <section className="rounded-lg border-hairline border-neutral-200 bg-neutral-0 p-6">
      <h2 className="mb-6 border-l-4 border-primary-500 bg-neutral-100 px-4 py-3 text-lg font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
};

const selectOptions = [
  { label: 'Perro', value: 'dog' },
  { label: 'Gato', value: 'cat' },
] as const;

type ModalExample = 'basic' | 'protected' | 'delete';

export const DesignSystemPreviewPage = () => {
  const [openModal, setOpenModal] = useState<ModalExample | null>(null);
  const closeModal = () => setOpenModal(null);
  const handleDeletePatient = () => {
    closeModal();
    toast.success('Paciente eliminado correctamente');
  };
  const handleLoadingToast = () => {
    const toastId = toast.loading('Guardando paciente...');

    window.setTimeout(() => {
      toast.success('Paciente guardado', { id: toastId });
    }, 700);
  };

  return (
    <main className="min-h-svh bg-neutral-50 px-5 py-8 text-neutral-900 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium text-primary-600">PetCare</p>
          <h1 className="text-2xl font-semibold">Design System — componentes base</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Vista temporal para comprobar variantes, estados y accesibilidad.
          </p>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-2">
          <PreviewSection title="Button">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled>Disabled</Button>
                <Button isLoading loadingText="Guardando...">
                  Guardar
                </Button>
                <Button variant="danger" isLoading loadingText="Eliminando...">
                  Eliminar
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Button fullWidth>Acción de ancho completo</Button>
                <Button fullWidth variant="secondary">
                  Cancelar
                </Button>
              </div>
            </div>
          </PreviewSection>

          <PreviewSection title="Input">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Nombre de la mascota" placeholder="Ej: Firulais" fullWidth />
              <Input label="Peso (kg)" placeholder="0.00" fullWidth />
              <div className="sm:col-span-2">
                <Input
                  label="Email del dueño"
                  placeholder="correo@ejemplo.com"
                  hint="Usaremos este correo para recordatorios de citas"
                  fullWidth
                />
              </div>
              <Input label="Teléfono" defaultValue="abc" error="Debe ser un teléfono válido" />
              <Input label="ID del paciente" defaultValue="PET-001" disabled />
            </div>
          </PreviewSection>

          <PreviewSection title="Textarea">
            <div className="flex flex-col gap-5">
              <Textarea
                label="Observaciones generales"
                placeholder="Escribe aquí las observaciones..."
              />
              <Textarea
                label="Diagnóstico"
                placeholder="Detalle del diagnóstico..."
                hint="Sé lo más específico posible para el historial clínico"
              />
              <Textarea
                label="Notas de consulta"
                defaultValue="a"
                error="Las notas deben tener al menos 10 caracteres"
              />
              <Textarea
                label="Instrucciones al dueño"
                placeholder="Administrar medicamento cada 8 horas..."
                maxLength={200}
                showCount
              />
              <Textarea label="Notas anteriores" defaultValue="Consulta de rutina." disabled />
            </div>
          </PreviewSection>

          <PreviewSection title="Select">
            <div className="flex flex-col gap-5">
              <Select
                label="Especie"
                placeholder="Selecciona una especie..."
                options={selectOptions}
              />
              <Select
                label="Estado de la cita"
                placeholder="Selecciona un estado..."
                hint="Puedes cambiar el estado después de la consulta"
                options={[
                  { label: 'Programada', value: 'scheduled' },
                  { label: 'Completada', value: 'completed' },
                ]}
                fullWidth
              />
              <Select
                label="Especie"
                placeholder="Selecciona una especie..."
                error="Debes seleccionar una especie para continuar"
                options={selectOptions}
                fullWidth
              />
              <Select
                label="Especie del paciente"
                defaultValue="dog"
                options={selectOptions}
                disabled
              />
            </div>
          </PreviewSection>

          <PreviewSection title="Checkbox">
            <div className="flex flex-col gap-4">
              <Checkbox label="Paciente vacunado" />
              <Checkbox label="Paciente esterilizado" defaultChecked />
              <Checkbox
                label="Acepto los términos y condiciones"
                error="Debes aceptar los términos para continuar"
              />
              <Checkbox label="Requiere ayuno (no editable)" disabled />
              <Checkbox label="Tratamiento completado (no editable)" defaultChecked disabled />
            </div>
          </PreviewSection>

          <PreviewSection title="Radio">
            <div className="flex flex-col gap-6">
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 text-sm font-medium">Sexo del paciente</legend>
                <Radio label="Macho" name="sex" value="male" defaultChecked />
                <Radio label="Hembra" name="sex" value="female" />
              </fieldset>
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 text-sm font-medium">Tipo de seguro veterinario</legend>
                <Radio label="Básico" name="insurance" value="basic" />
                <Radio label="Premium" name="insurance" value="premium" />
                <Radio
                  label="Sin seguro"
                  name="insurance"
                  value="none"
                  error="Debes seleccionar un tipo de seguro"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-3" disabled>
                <legend className="mb-1 text-sm font-medium text-neutral-500">
                  Estado del expediente
                </legend>
                <Radio label="Activo" name="record-status" value="active" defaultChecked disabled />
                <Radio label="Archivado" name="record-status" value="archived" disabled />
              </fieldset>
            </div>
          </PreviewSection>

          <PreviewSection title="Card">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <strong className="font-medium">Default</strong>
                <p className="mt-1 text-sm text-neutral-600">Con sombra y borde</p>
              </Card>
              <Card variant="outline">
                <strong className="font-medium">Outline</strong>
                <p className="mt-1 text-sm text-neutral-600">Solo borde</p>
              </Card>
              <Card variant="ghost">
                <strong className="font-medium">Ghost</strong>
                <p className="mt-1 text-sm text-neutral-600">Sin borde ni sombra</p>
              </Card>
              <Card interactive variant="outline">
                <strong className="font-medium">Interactive</strong>
                <p className="mt-1 text-sm text-neutral-600">Respuesta visual al hover</p>
              </Card>
              <Card padding="none" className="overflow-hidden">
                <div className="bg-neutral-100 p-3 text-sm">Padding none</div>
              </Card>
              <Card padding="sm">Padding small</Card>
              <Card padding="md">Padding medium</Card>
              <Card padding="lg">Padding large</Card>
            </div>
          </PreviewSection>

          <PreviewSection title="Badge">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Activo</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="danger">Urgente</Badge>
                <Badge variant="primary">Rutina</Badge>
                <Badge variant="neutral">Inactivo</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success" withPing>
                  En línea
                </Badge>
                <Badge variant="danger" withPing>
                  Emergencia activa
                </Badge>
                <Badge variant="primary" withPing>
                  Consulta en curso
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">
                  Small
                </Badge>
                <Badge variant="primary" size="md">
                  Medium
                </Badge>
              </div>
            </div>
          </PreviewSection>

          <PreviewSection title="Spinner">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-end gap-6">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Spinner size="sm" label="Buscando..." />
                <Spinner label="Cargando pacientes..." />
                <Spinner size="lg" label="Preparando dashboard..." />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Spinner variant="primary" />
                <Spinner variant="success" />
                <Spinner variant="warning" />
                <Spinner variant="danger" />
                <Spinner variant="neutral" />
              </div>
            </div>
          </PreviewSection>

          <PreviewSection title="Modal">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-3 text-sm font-medium text-neutral-600">BÁSICO</p>
                <Button onClick={() => setOpenModal('basic')}>Abrir modal básico</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-neutral-600">SIN CIERRE POR OVERLAY</p>
                <Button variant="secondary" onClick={() => setOpenModal('protected')}>
                  Abrir modal protegido
                </Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-neutral-600">
                  EJEMPLO REAL: CONFIRMACIÓN DE ELIMINACIÓN
                </p>
                <Button variant="danger" onClick={() => setOpenModal('delete')}>
                  Eliminar paciente
                </Button>
              </div>
            </div>

            <Modal
              isOpen={openModal === 'basic'}
              onClose={closeModal}
              title="Modal básico"
              description="Ejemplo del comportamiento estándar del componente Modal."
              footer={<Button onClick={closeModal}>Entendido</Button>}
            >
              <p>
                Puedes cerrarlo con Escape, haciendo click en el overlay, mediante el botón de
                cierre o con la acción del footer.
              </p>
            </Modal>

            <Modal
              isOpen={openModal === 'protected'}
              onClose={closeModal}
              title="Modal protegido"
              description="Este flujo requiere una decisión explícita."
              closeOnEscape={false}
              closeOnOverlayClick={false}
              showCloseButton={false}
              footer={
                <>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancelar
                  </Button>
                  <Button onClick={closeModal}>Continuar</Button>
                </>
              }
            >
              <p>Escape y el overlay están desactivados para este ejemplo.</p>
            </Modal>

            <Modal
              isOpen={openModal === 'delete'}
              onClose={closeModal}
              title="Eliminar paciente"
              description="¿Estás seguro de que deseas eliminar este paciente?"
              footer={
                <>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancelar
                  </Button>
                  <Button variant="danger" onClick={handleDeletePatient}>
                    Eliminar
                  </Button>
                </>
              }
            >
              <p>Esta acción no se puede deshacer.</p>
            </Modal>
          </PreviewSection>

          <PreviewSection title="Notifications">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Paciente guardado correctamente')}>
                Mostrar success
              </Button>
              <Button
                variant="danger"
                onClick={() => toast.error('No fue posible guardar los cambios')}
              >
                Mostrar error
              </Button>
              <Button variant="secondary" onClick={handleLoadingToast}>
                Mostrar loading
              </Button>
            </div>
          </PreviewSection>
        </div>
      </div>
    </main>
  );
};
