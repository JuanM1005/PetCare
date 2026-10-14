import type { PatientDetailItem } from '../../patients.types';

/**
 * Contexto compartido por las rutas hijas del expediente del paciente.
 *
 * Evita que cada sección vuelva a resolver el paciente desde el parámetro dinámico.
 */
export interface PatientDetailOutletContext {
  patient: PatientDetailItem;
}
