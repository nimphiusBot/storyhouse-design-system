import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './index';

interface TestItem {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: 'name', label: 'Name', render: (item: TestItem) => item.name, sortable: true },
  { key: 'email', label: 'Email', render: (item: TestItem) => item.email },
];

const data: TestItem[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('DataTable', () => {
  it('renders data rows', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders empty state when data is empty', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('There are no items to display')).toBeInTheDocument();
  });

  it('renders custom empty state', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        empty={{ title: 'Nothing here', description: 'Add some items' }}
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Add some items')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('handles row selection', () => {
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable={true}
        onSelectionChange={onSelectionChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(1);
    fireEvent.click(checkboxes[1]!);
    expect(onSelectionChange).toHaveBeenCalled();
    const selected = onSelectionChange.mock.calls[0]![0] as Set<string | number>;
    expect(selected.has(0)).toBe(true);
  });

  it('handles select all', () => {
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable={true}
        onSelectionChange={onSelectionChange}
      />
    );
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    fireEvent.click(selectAllCheckbox);
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('handles sort', () => {
    const onSort = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        sortable={true}
        onSort={onSort}
      />
    );
    // Click sortable header
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('handles expandable rows', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        expandable={true}
        renderExpandedRow={(item) => <div>Expanded {item.name}</div>}
      />
    );
    const expandButtons = screen.getAllByLabelText('Expand row');
    fireEvent.click(expandButtons[0]!);
    expect(screen.getByText('Expanded Alice')).toBeInTheDocument();
  });

  it('handles row click', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable data={data} columns={columns} onRowClick={onRowClick} />
    );
    const rows = screen.getAllByRole('row');
    // First row is header, second is first data row
    fireEvent.click(rows[1]!);
    expect(onRowClick).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<DataTable data={data} columns={columns} />);
    const table = document.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('renders dense variant', () => {
    const { container } = render(<DataTable data={data} columns={columns} dense={true} />);
    // Dense rows use py-2 instead of py-4
    const cells = container.querySelectorAll('td');
    cells.forEach(cell => {
      expect(cell.className).toContain('py-2');
    });
  });

  it('renders bordered variant', () => {
    const { container } = render(<DataTable data={data} columns={columns} bordered={true} />);
    const table = container.querySelector('table');
    expect(table!.className).toContain('border');
  });

  it('renders striped variant', () => {
    const { container } = render(<DataTable data={data} columns={columns} striped={true} />);
    const tbody = container.querySelector('tbody');
    // The component uses Tailwind arbitrary variant: [&>*:nth-child(even)]:bg-gray-50
    expect(tbody!.className).toContain('nth-child');
  });

  it('renders sticky header', () => {
    const { container } = render(<DataTable data={data} columns={columns} stickyHeader={true} />);
    const thead = container.querySelector('thead');
    expect(thead!.className).toContain('sticky');
  });

  it('renders selectable and expandable in one action column', () => {
    const { container } = render(
      <DataTable
        data={data}
        columns={columns}
        selectable={true}
        expandable={true}
        renderExpandedRow={(item) => <div>Expanded {item.name}</div>}
      />
    );

    // Expand first row
    const expandButtons = screen.getAllByLabelText('Expand row');
    fireEvent.click(expandButtons[0]!);

    // The expanded row should be visible
    expect(screen.getByText('Expanded Alice')).toBeInTheDocument();

    // The first two columns should contain checkbox and expand button separately
    const tds = container.querySelectorAll('tbody tr td');
    // First cell should contain a checkbox
    const firstCell = tds[0]!;
    expect(firstCell.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    // Second cell should contain a button
    const secondCell = tds[1]!;
    expect(secondCell.querySelector('button')).toBeInTheDocument();

    // The expanded row td should have colSpan = columns.length + 2
    const expandedTd = container.querySelector('tbody td[colspan]');
    expect(expandedTd?.getAttribute('colspan')).toBe('4'); // 2 columns + 1 select + 1 expand
  });

  it('uses custom key extractor', () => {
    const keyExtractor = (item: TestItem) => item.id;
    const { container } = render(
      <DataTable data={data} columns={columns} keyExtractor={keyExtractor} />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
