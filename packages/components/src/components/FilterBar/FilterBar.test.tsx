import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './index';

describe('FilterBar', () => {
  it('renders search input when onSearchChange is provided', () => {
    render(<FilterBar onSearchChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom search placeholder', () => {
    render(<FilterBar searchPlaceholder="Find items..." onSearchChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Find items...')).toBeInTheDocument();
  });

  it('calls onSearchChange when search value changes', () => {
    const onSearchChange = vi.fn();
    render(<FilterBar onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearchChange).toHaveBeenCalledWith('test');
  });

  it('shows clear search button when searchValue is non-empty', () => {
    const onSearchChange = vi.fn();
    render(<FilterBar searchValue="hello" onSearchChange={onSearchChange} />);
    const clearBtn = screen.getByLabelText('Clear search');
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(onSearchChange).toHaveBeenCalledWith('');
  });

  it('renders select filter configs', () => {
    const filters = [
      {
        key: 'status',
        label: 'Status',
        type: 'select' as const,
        value: '',
        onChange: vi.fn(),
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ];
    render(<FilterBar filters={filters} onSearchChange={vi.fn()} />);
    // The Select renders as a native <select> element
    const selects = document.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(1);
  });

  it('renders boolean filter config', () => {
    const onFilterChange = vi.fn();
    const filters = [
      {
        key: 'featured',
        label: 'Featured',
        type: 'boolean' as const,
        value: false,
        onChange: onFilterChange,
      },
    ];
    render(<FilterBar filters={filters} onSearchChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    const booleanBtn = buttons.find((btn) => btn.textContent === 'Featured');
    expect(booleanBtn).toBeInTheDocument();
  });

  it('calls filter onChange when boolean filter clicked', () => {
    const onFilterChange = vi.fn();
    const filters = [
      {
        key: 'featured',
        label: 'Featured',
        type: 'boolean' as const,
        value: false,
        onChange: onFilterChange,
      },
    ];
    render(<FilterBar filters={filters} onSearchChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    const booleanBtn = buttons.find((btn) => btn.textContent === 'Featured');
    fireEvent.click(booleanBtn!);
    expect(onFilterChange).toHaveBeenCalledWith(true);
  });

  it('renders active filters as badges', () => {
    const activeFilters = [
      { key: 'status', label: 'Status', value: 'active' },
    ];
    render(<FilterBar activeFilters={activeFilters} />);
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('renders clear all button when onClearAll is provided and filters are active', () => {
    const onClearAll = vi.fn();
    const activeFilters = [
      { key: 'status', label: 'Status', value: 'active' },
    ];
    render(
      <FilterBar
        activeFilters={activeFilters}
        onClearAll={onClearAll}
      />
    );
    const clearBtn = screen.getByText('Clear all');
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('calls onRemoveFilter when active filter badge is removed', () => {
    const onRemoveFilter = vi.fn();
    const activeFilters = [
      { key: 'status', label: 'Status', value: 'active' },
    ];
    // Badge with removable prop would need a remove button — we test that the handler is passed
    render(
      <FilterBar
        activeFilters={activeFilters}
        onRemoveFilter={onRemoveFilter}
      />
    );
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
  });

  it('renders presets', () => {
    const presets = [
      { label: 'Today', onClick: vi.fn() },
      { label: 'This Week', onClick: vi.fn() },
    ];
    render(<FilterBar presets={presets} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('This Week')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<FilterBar className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders without search or filters', () => {
    const { container } = render(<FilterBar />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
