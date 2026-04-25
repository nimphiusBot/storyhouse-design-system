import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Search, X, Filter as FilterIcon, SlidersHorizontal, Check, ChevronDown } from 'lucide-react';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface FilterConfig {
  /** Unique filter key */
  key: string;
  /** Display label */
  label: string;
  /** Filter type: 'select' (single), 'multi-select' (checkboxes), or 'boolean' (toggle) */
  type: 'select' | 'multi-select' | 'boolean';
  /** Select/multi-select options */
  options?: Array<{ value: string; label: string }>;
  /** Current filter value: string for 'select', boolean for 'boolean', string[] for 'multi-select' */
  value: unknown;
  /** Change handler: receives string for 'select', boolean for 'boolean', string[] for 'multi-select' */
  onChange: (value: unknown) => void;
}

export interface ActiveFilter {
  /** Unique filter key */
  key: string;
  /** Display label */
  label: string;
  /** Current value */
  value: string;
  /** Optional display value override */
  displayValue?: string;
}

export interface FilterPreset {
  /** Preset label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Optional icon */
  icon?: React.ReactNode;
}

export interface FilterBarProps {
  /** Current search value */
  searchValue?: string;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Filter configurations */
  filters?: FilterConfig[];
  /** Currently active filters */
  activeFilters?: ActiveFilter[];
  /** Clear all active filters callback */
  onClearAll?: () => void;
  /** Remove individual filter callback */
  onRemoveFilter?: (key: string) => void;
  /** Quick filter presets */
  presets?: FilterPreset[];
  /** Show active filter count */
  showFilterCount?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Internal multi-select dropdown component for FilterBar.
 * Renders a dropdown with checkboxes for selecting multiple options.
 */
const MultiSelectFilter: React.FC<{
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
}> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const displayText = value.length === 0
    ? label
    : value.length === 1
      ? options.find((o) => o.value === value[0])?.label || label
      : `${label} (${value.length})`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-3 py-2 rounded-lg text-sm',
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-orange-500',
          'text-gray-900 dark:text-gray-100',
          value.length > 0 && 'border-orange-500 bg-orange-50 dark:bg-orange-950/30',
        )}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className={cn(
          'absolute z-50 mt-1 w-full min-w-[200px]',
          'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg',
          'p-1 max-h-[240px] overflow-y-auto',
        )}>
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-400">No options</div>
          )}
          {options.map((option) => {
            const selected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  selected && 'bg-orange-50 dark:bg-orange-950/50',
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded border flex items-center justify-center flex-shrink-0',
                  selected
                    ? 'bg-orange-600 border-orange-600 text-white'
                    : 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700',
                )}>
                  {selected && <Check className="w-3 h-3" />}
                </div>
                <span className={cn(
                  'flex-1',
                  selected ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300',
                )}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * FilterBar - Advanced filtering and search component
 *
 * A comprehensive filter bar with search, dropdown filters, boolean toggles,
 * multi-select dropdowns, quick presets, and active filter badges. Responsive
 * on mobile with collapsible filter panel.
 *
 * Features:
 * - Search input with clear button
 * - Select, boolean, and multi-select filter types
 * - Mobile-responsive collapse/expand
 * - Active filter badges with removal
 * - Quick filter presets
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <FilterBar
 *   searchValue={search}
 *   onSearchChange={setSearch}
 *   filters={filterConfigs}
 *   activeFilters={activeFilters}
 *   onClearAll={() => setActiveFilters([])}
 * />
 * ```
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  searchPlaceholder = 'Search...',
  onSearchChange,
  filters = [],
  activeFilters = [],
  onClearAll,
  onRemoveFilter,
  presets = [],
  showFilterCount = true,
  className,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleRemoveFilter = (key: string) => {
    if (onRemoveFilter) {
      onRemoveFilter(key);
    }
  };

  const activeFilterCount = activeFilters.length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        {onSearchChange && (
          <div className="flex-1">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              rightIcon={
                searchValue ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-gray-400 hover:text-gray-600"
                    type="button"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : undefined
              }
            />
          </div>
        )}

        {/* Filter Toggle Button (Mobile) */}
        {filters.length > 0 && (
          <div className="sm:hidden">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
            >
              <FilterIcon className="w-4 h-4" />
              Filters
              {showFilterCount && activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-orange-500 text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Desktop Filters */}
        {filters.length > 0 && (
          <div className="hidden sm:flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <div key={filter.key} className="min-w-[180px]">
                {filter.type === 'select' && (
                  <Select
                    value={filter.value as string}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filter.onChange(e.target.value)}
                    size="md"
                  >
                    <option value="">{filter.label}</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
                {filter.type === 'boolean' && (
                  <Button
                    variant={filter.value ? 'primary' : 'secondary'}
                    size="md"
                    onClick={() => filter.onChange(!filter.value)}
                  >
                    {filter.label}
                  </Button>
                )}
                {filter.type === 'multi-select' && (
                  <MultiSelectFilter
                    label={filter.label}
                    options={filter.options || []}
                    value={Array.isArray(filter.value) ? filter.value as string[] : []}
                    onChange={(value) => filter.onChange(value)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Presets */}
        {presets.length > 0 && (
          <div className="hidden sm:flex gap-2">
            {presets.map((preset, index) => (
              <Button
                key={index}
                variant="ghost"
                size="md"
                onClick={preset.onClick}
              >
                {preset.icon}
                {preset.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters (Collapsible) */}
      {showFilters && filters.length > 0 && (
        <div className="sm:hidden space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
              type="button"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {filters.map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {filter.label}
              </label>
              {filter.type === 'select' && (
                <Select
                  value={filter.value as string}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filter.onChange(e.target.value)}
                  size="md"
                  className="w-full"
                >
                  <option value="">All</option>
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
              {filter.type === 'boolean' && (
                <Button
                  variant={filter.value ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => filter.onChange(!filter.value)}
                  className="w-full"
                >
                  {filter.value ? 'Enabled' : 'Disabled'}
                </Button>
              )}
              {filter.type === 'multi-select' && (
                <div className="space-y-1">
                  {(filter.options || []).map((option) => {
                    const selected = Array.isArray(filter.value) && (filter.value as string[]).includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {
                            const current = Array.isArray(filter.value) ? [...(filter.value as string[])] : [];
                            if (selected) {
                              filter.onChange(current.filter((v: string) => v !== option.value));
                            } else {
                              filter.onChange([...current, option.value]);
                            }
                          }}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {presets.length > 0 && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Filters
              </label>
              <div className="space-y-2">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="md"
                    onClick={() => {
                      preset.onClick();
                      setShowFilters(false);
                    }}
                    className="w-full justify-start"
                  >
                    {preset.icon}
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={`${filter.key}-${filter.value}`}
              variant="neutral"
              size="md"
              removable
              onRemove={() => handleRemoveFilter(filter.key)}
            >
              <span className="font-medium">{filter.label}:</span>{' '}
              {filter.displayValue || filter.value}
            </Badge>
          ))}
          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 px-2 py-1 rounded transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

FilterBar.displayName = 'FilterBar';

export default FilterBar;
