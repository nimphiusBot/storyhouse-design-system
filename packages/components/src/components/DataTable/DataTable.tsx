import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  ChevronDown as ExpandIcon,
  Database,
} from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Internal Checkbox component for DataTable to avoid circular deps
const DataTableCheckbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  'aria-label'?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ checked, indeterminate, onChange, ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
      {...rest}
    />
  );
};

export interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (item: T, index: number) => string | number;
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;
  sortable?: boolean;
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  expandable?: boolean;
  renderExpandedRow?: (item: T) => React.ReactNode;
  loading?: boolean;
  empty?: {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
  };
  stickyHeader?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor = (_, index) => index,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  sortable = false,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onSort,
  expandable = false,
  renderExpandedRow,
  loading = false,
  empty = {
    title: 'No data available',
    description: 'There are no items to display',
  },
  stickyHeader = false,
  striped = false,
  bordered = false,
  hoverable = true,
  dense = false,
  className,
  onRowClick,
}: DataTableProps<T>): React.ReactElement | null {
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    defaultSortDirection
  );
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(
    new Set()
  );

  const handleSort = (key: string) => {
    if (!sortable) return;
    let newDirection: 'asc' | 'desc' = sortDirection;
    if (sortKey === key) {
      // Toggle direction when clicking the same column
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    // else: clicking a new column preserves the previous direction
    setSortKey(key);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (selectedRows.size === data.length) {
      onSelectionChange(new Set());
    } else {
      const allKeys = new Set(
        data.map((item, index) => keyExtractor(item, index))
      );
      onSelectionChange(allKeys);
    }
  };

  const handleSelectRow = (key: string | number) => {
    if (!onSelectionChange) return;
    const newSelected = new Set(selectedRows);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    onSelectionChange(newSelected);
  };

  const handleToggleExpand = (key: string | number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const isSomeSelected =
    selectedRows.size > 0 && selectedRows.size < data.length;

  if (loading) {
    return (
      <div
        className={cn(
          'min-h-[300px] flex items-center justify-center',
          className
        )}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-orange-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading data...
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-16 text-center',
          className
        )}
      >
        {empty.icon || (
          <Database className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {empty.title || 'No data available'}
        </h3>
        {empty.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            {empty.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table
        className={cn(
          'min-w-full divide-y divide-gray-200 dark:divide-gray-800',
          bordered && 'border border-gray-200 dark:border-gray-700'
        )}
      >
        <thead
          className={cn(
            'bg-gray-50 dark:bg-gray-800',
            stickyHeader && 'sticky top-0 z-10'
          )}
        >
          <tr>
            {(selectable || expandable) && (
              <th className="px-6 py-3 w-12">
                {selectable && (
                  <div className="flex items-center gap-1">
                    {selectable && (
                      <DataTableCheckbox
                        checked={isAllSelected}
                        indeterminate={isSomeSelected}
                        onChange={handleSelectAll}
                        aria-label="Select all rows"
                      />
                    )}
                  </div>
                )}
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                  dense ? 'py-2' : 'py-3',
                  column.sortable &&
                    sortable &&
                    'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
                style={{ width: column.width }}
                onClick={() =>
                  column.sortable &&
                  sortable &&
                  handleSort(column.sortKey || column.key)
                }
              >
                <div className="flex items-center gap-1">
                  <span>{column.label}</span>
                  {column.sortable && sortable && (
                    <span className="ml-1">
                      {sortKey === (column.sortKey || column.key) ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={cn(
            'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800',
            striped &&
              '[&>*:nth-child(even)]:bg-gray-50 dark:[&>*:nth-child(even)]:bg-gray-800/50'
          )}
        >
          {data.map((item, index) => {
            const key = keyExtractor(item, index);
            const isSelected = selectedRows.has(key);
            const isExpanded = expandedRows.has(key);

            return (
              <React.Fragment key={key}>
                <tr
                  className={cn(
                    hoverable &&
                      'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                    isSelected && 'bg-orange-50 dark:bg-orange-900/20',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {(selectable || expandable) && (
                    <td className="px-6 py-4">
                      <div className={selectable && expandable ? 'flex items-center gap-1' : undefined}>
                        {selectable && (
                          <DataTableCheckbox
                            checked={isSelected}
                            onChange={() => handleSelectRow(key)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Select row ${index + 1}`}
                          />
                        )}
                        {expandable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleExpand(key);
                            }}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label={
                              isExpanded ? 'Collapse row' : 'Expand row'
                            }
                          >
                            {isExpanded ? (
                              <ExpandIcon className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-6 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300',
                        dense ? 'py-2' : 'py-4',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
                {expandable && isExpanded && renderExpandedRow && (
                  <tr>
                    <td
                      colSpan={
                        columns.length +
                        (selectable || expandable ? 1 : 0)
                      }
                      className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50"
                    >
                      {renderExpandedRow(item)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'DataTable';
