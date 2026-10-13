import type { OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';

import type { PatientListItem, PatientStatusFilter, SpeciesFilter } from '../../patients.types';

export interface PatientsTableProps {
  onPaginationChange: OnChangeFn<PaginationState>;
  onSortingChange: OnChangeFn<SortingState>;
  pagination: PaginationState;
  patients: PatientListItem[];
  searchValue: string;
  sorting: SortingState;
  species: SpeciesFilter;
  status: PatientStatusFilter;
}
