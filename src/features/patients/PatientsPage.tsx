import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';

import { PatientsTable } from './components/PatientsTable';
import { PatientsToolbar } from './components/PatientsToolbar';
import { patients } from './patients.mock';
import type { PatientStatusFilter, SpeciesFilter } from './patients.types';

const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

export const PatientsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [species, setSpecies] = useState<SpeciesFilter>('all');
  const [status, setStatus] = useState<PatientStatusFilter>('all');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>(initialPagination);

  const resetToFirstPage = () => {
    setPagination((currentPagination) => ({ ...currentPagination, pageIndex: 0 }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    resetToFirstPage();
  };

  const handleSpeciesChange = (value: SpeciesFilter) => {
    setSpecies(value);
    resetToFirstPage();
  };

  const handleStatusChange = (value: PatientStatusFilter) => {
    setStatus(value);
    resetToFirstPage();
  };

  return (
    <div className="flex min-h-full flex-col gap-4 p-6 text-text-primary">
      <PatientsToolbar
        onSearchChange={handleSearchChange}
        onSpeciesChange={handleSpeciesChange}
        onStatusChange={handleStatusChange}
        searchValue={searchValue}
        species={species}
        status={status}
      />
      <PatientsTable
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        pagination={pagination}
        patients={patients}
        searchValue={searchValue}
        sorting={sorting}
        species={species}
        status={status}
      />
    </div>
  );
};
