import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { useMemo } from 'react';
import { FiChevronDown, FiChevronRight, FiChevronUp, FiChevronsDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Badge, Button, Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type { PatientListItem, PatientStatus } from '../../patients.types';
import { getPatientAgeParts } from '../../patients.utils';
import { PatientAvatar } from '../PatientAvatar';
import type { PatientsTableProps } from './PatientsTable.types';

const patientTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text },
});

const patientGlobalFilter: FilterFn<typeof patientTableFeatures, PatientListItem> = (
  row,
  _columnId,
  filterValue: unknown,
) => {
  const query = String(filterValue).trim().toLocaleLowerCase();
  const patient = row.original;

  return [patient.name, patient.owner.name, patient.breed].some((value) =>
    value.toLocaleLowerCase().includes(query),
  );
};

const exactValueFilter: FilterFn<typeof patientTableFeatures, PatientListItem> = (
  row,
  columnId,
  filterValue: unknown,
) => {
  return row.getValue(columnId) === filterValue;
};

export const PatientsTable = ({
  onPaginationChange,
  onSortingChange,
  pagination,
  patients,
  searchValue,
  sorting,
  species,
  status,
}: PatientsTableProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageLocales[language], {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    [language],
  );

  const columns = useMemo<ColumnDef<typeof patientTableFeatures, PatientListItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('columns.patient'),
        sortFn: 'text',
        cell: ({ row }) => (
          <div className="flex min-w-48 items-center gap-3">
            <PatientAvatar initials={row.original.initials} name={row.original.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                {row.original.name}
              </p>
              <p className="truncate text-xs text-text-muted">{row.original.breed}</p>
            </div>
          </div>
        ),
      },
      {
        id: 'owner',
        accessorFn: (patient) => patient.owner.name,
        header: t('columns.owner'),
        sortFn: 'text',
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text-secondary">
            {row.original.owner.name}
          </span>
        ),
      },
      {
        accessorKey: 'species',
        header: t('columns.species'),
        enableSorting: false,
        filterFn: exactValueFilter,
        cell: ({ getValue }) => (
          <span className="text-sm text-text-secondary">
            {t(`species.${getValue<PatientListItem['species']>()}`)}
          </span>
        ),
      },
      {
        accessorKey: 'birthDate',
        header: t('columns.age'),
        enableSorting: false,
        cell: ({ getValue }) => {
          const { months, years } = getPatientAgeParts(getValue<string>());

          return (
            <span className="whitespace-nowrap text-sm text-text-secondary">
              {years > 0 ? t('age.years', { count: years }) : t('age.months', { count: months })}
            </span>
          );
        },
      },
      {
        id: 'lastVisit',
        accessorFn: (patient) => patient.lastVisit ?? undefined,
        header: t('columns.lastVisit'),
        sortFn: 'text',
        sortUndefined: 'last',
        cell: ({ row }) => {
          const { lastVisit } = row.original;

          return (
            <span className="whitespace-nowrap text-sm text-text-secondary">
              {lastVisit
                ? dateFormatter.format(new Date(`${lastVisit}T00:00:00`))
                : t('lastVisit.empty')}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: t('columns.status'),
        enableSorting: false,
        filterFn: exactValueFilter,
        cell: ({ getValue }) => {
          const patientStatus = getValue<PatientStatus>();

          return (
            <Badge variant={patientStatus === 'active' ? 'success' : 'neutral'}>
              {t(`status.${patientStatus}`)}
            </Badge>
          );
        },
      },
      {
        id: 'action',
        header: t('columns.action'),
        enableSorting: false,
        cell: ({ row }) => (
          <Link
            aria-label={t('actions.viewPatient', { name: row.original.name })}
            className="flex size-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            to={`/patients/${row.original.id}`}
          >
            <FiChevronRight aria-hidden="true" className="size-4" />
          </Link>
        ),
      },
    ],
    [dateFormatter, t],
  );

  const table = useTable({
    autoResetPageIndex: false,
    columns,
    data: patients,
    features: patientTableFeatures,
    getRowId: (patient) => patient.id,
    globalFilterFn: patientGlobalFilter,
    onPaginationChange,
    onSortingChange,
    state: {
      columnFilters: [
        ...(species === 'all' ? [] : [{ id: 'species', value: species }]),
        ...(status === 'all' ? [] : [{ id: 'status', value: status }]),
      ],
      globalFilter: searchValue,
      pagination,
      sorting,
    },
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const pageCount = Math.max(table.getPageCount(), 1);
  const firstVisibleRow =
    filteredRows.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const lastVisibleRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    filteredRows.length,
  );
  const hasActiveFilters = Boolean(searchValue.trim()) || species !== 'all' || status !== 'all';

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden" padding="none">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-4xl border-collapse">
          <thead className="bg-surface-subtle">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted();
                  const headerContent = flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  );
                  const sortLabel =
                    typeof header.column.columnDef.header === 'string'
                      ? header.column.columnDef.header
                      : '';

                  return (
                    <th
                      aria-sort={
                        header.column.getCanSort()
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : sortDirection === 'desc'
                              ? 'descending'
                              : 'none'
                          : undefined
                      }
                      className="px-4 py-3 text-left text-xs font-semibold uppercase text-text-muted"
                      key={header.id}
                      scope="col"
                    >
                      {header.column.getCanSort() ? (
                        <button
                          aria-label={t('sorting.sortBy', { column: sortLabel })}
                          className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          {headerContent}
                          {sortDirection === 'asc' ? (
                            <FiChevronUp aria-hidden="true" className="size-4" />
                          ) : sortDirection === 'desc' ? (
                            <FiChevronDown aria-hidden="true" className="size-4" />
                          ) : (
                            <FiChevronsDown aria-hidden="true" className="size-4" />
                          )}
                        </button>
                      ) : (
                        headerContent
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-surface-hover"
                  key={row.id}
                >
                  {row.getAllCells().map((cell) => (
                    <td className="px-4 py-3" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-16 text-center" colSpan={columns.length}>
                  <p className="text-base font-semibold text-text-primary">
                    {t(hasActiveFilters ? 'empty.filteredTitle' : 'empty.title')}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    {t(hasActiveFilters ? 'empty.filteredDescription' : 'empty.description')}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        aria-label={t('pagination.label')}
        className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-4 py-3"
        role="navigation"
      >
        <p className="text-sm text-text-secondary">
          {t('pagination.summary', {
            count: filteredRows.length,
            from: firstVisibleRow,
            to: lastVisibleRow,
          })}
        </p>
        <div className="flex items-center gap-3">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() =>
              onPaginationChange({
                ...pagination,
                pageIndex: pagination.pageIndex - 1,
              })
            }
            size="sm"
            variant="secondary"
          >
            {t('pagination.previous')}
          </Button>
          <span className="min-w-24 text-center text-sm font-medium text-text-secondary">
            {t('pagination.current', {
              current: pagination.pageIndex + 1,
              total: pageCount,
            })}
          </span>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              onPaginationChange({
                ...pagination,
                pageIndex: pagination.pageIndex + 1,
              });
            }}
            size="sm"
            variant="secondary"
          >
            {t('pagination.next')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
