import type { PatientStatusFilter, SpeciesFilter } from '../../patients.types';

export interface PatientsToolbarProps {
  onSearchChange: (value: string) => void;
  onSpeciesChange: (value: SpeciesFilter) => void;
  onStatusChange: (value: PatientStatusFilter) => void;
  searchValue: string;
  species: SpeciesFilter;
  status: PatientStatusFilter;
}
