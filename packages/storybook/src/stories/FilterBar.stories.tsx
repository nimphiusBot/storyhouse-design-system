import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar, type FilterConfig, type ActiveFilter } from '@storyhouse/components';

const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

const categoryOptions = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'marketing', label: 'Marketing' },
];

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
    const [featured, setFeatured] = useState(false);

    const filters: FilterConfig[] = [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: statusOptions,
        value: status,
        onChange: (val) => {
          setStatus(val as string);
          setActiveFilters((prev) => {
            const filtered = prev.filter((f) => f.key !== 'status');
            if (val) {
              const opt = statusOptions.find((o) => o.value === val);
              return [...filtered, { key: 'status', label: 'Status', value: val as string, displayValue: opt?.label }];
            }
            return filtered;
          });
        },
      },
      {
        key: 'featured',
        label: 'Featured',
        type: 'boolean',
        value: featured,
        onChange: (val) => {
          setFeatured(val as boolean);
          setActiveFilters((prev) => {
            const filtered = prev.filter((f) => f.key !== 'featured');
            if (val) {
              return [...filtered, { key: 'featured', label: 'Featured', value: 'true', displayValue: 'Enabled' }];
            }
            return filtered;
          });
        },
      },
    ];

    return (
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
        activeFilters={activeFilters}
        onRemoveFilter={(key) => {
          if (key === 'status') setStatus('');
          if (key === 'featured') setFeatured(false);
          setActiveFilters((prev) => prev.filter((f) => f.key !== key));
        }}
        onClearAll={() => {
          setStatus('');
          setFeatured(false);
          setActiveFilters([]);
        }}
      />
    );
  },
};

export const WithPresets: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

    const filters: FilterConfig[] = [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: statusOptions,
        value: status,
        onChange: (val) => {
          setStatus(val as string);
          setActiveFilters((prev) => {
            const filtered = prev.filter((f) => f.key !== 'status');
            if (val) {
              const opt = statusOptions.find((o) => o.value === val);
              return [...filtered, { key: 'status', label: 'Status', value: val as string, displayValue: opt?.label }];
            }
            return filtered;
          });
        },
      },
    ];

    return (
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
        activeFilters={activeFilters}
        onRemoveFilter={(key) => {
          if (key === 'status') setStatus('');
          setActiveFilters((prev) => prev.filter((f) => f.key !== key));
        }}
        presets={[
          { label: 'Recent', onClick: () => setSearch('recent') },
          { label: 'Popular', onClick: () => setSearch('popular') },
        ]}
      />
    );
  },
};
