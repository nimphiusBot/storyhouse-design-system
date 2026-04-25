import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectOption, SelectOptionGroup } from './index';

describe('Select', () => {
  it('renders a native select element', () => {
    render(<Select />);
    const select = document.querySelector('select')!;
    expect(select).toBeInTheDocument();
  });

  it('renders options from options prop', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} />);
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('renders children as options when provided', () => {
    render(
      <Select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    );
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('renders optgroup when options contain groups', () => {
    const options: SelectOptionGroup[] = [
      {
        label: 'Group 1',
        options: [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ],
      },
    ];
    render(<Select options={options} />);
    const optgroup = document.querySelector('optgroup');
    expect(optgroup).toBeInTheDocument();
    expect(optgroup).toHaveAttribute('label', 'Group 1');
  });

  it('renders placeholder as disabled option', () => {
    render(<Select placeholder="Choose..." options={[]} />);
    const select = document.querySelector('select')!;
    const placeholderOption = select.querySelector('option[value=""]');
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toBeDisabled();
  });

  it('renders label', () => {
    render(<Select label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Select error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders help text', () => {
    render(<Select helpText="Select your favorite" />);
    expect(screen.getByText('Select your favorite')).toBeInTheDocument();
  });

  it('hides help text when error is present', () => {
    render(<Select helpText="Select your favorite" error="Required" />);
    expect(screen.queryByText('Select your favorite')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} onChange={onChange} />);
    const select = document.querySelector('select')!;
    fireEvent.change(select, { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    render(<Select disabled />);
    const select = document.querySelector('select') as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Select variant="error" />);
    let select = document.querySelector('select')!;
    expect(select.className).toContain('border-red-500');

    rerender(<Select variant="success" />);
    select = document.querySelector('select')!;
    expect(select.className).toContain('border-green-500');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Select size="sm" />);
    let select = document.querySelector('select')!;
    expect(select.className).toContain('px-3 py-1.5');

    rerender(<Select size="lg" />);
    select = document.querySelector('select')!;
    expect(select.className).toContain('px-4 py-3');
  });

  it('renders ChevronDown icon', () => {
    const { container } = render(<Select />);
    const chevron = container.querySelector('.lucide-chevron-down');
    expect(chevron).toBeInTheDocument();
  });

  it('applies fullWidth by default', () => {
    const { container } = render(<Select />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('renders without fullWidth when false', () => {
    const { container } = render(<Select fullWidth={false} />);
    expect(container.firstChild).toHaveClass('w-auto');
  });

  it('applies custom className', () => {
    render(<Select className="custom-class" />);
    const select = document.querySelector('select')!;
    expect(select.className).toContain('custom-class');
  });

  it('uses provided id on label htmlFor', () => {
    render(<Select id="my-select" label="Fruit" />);
    const label = screen.getByText('Fruit').closest('label');
    expect(label).toHaveAttribute('for', 'my-select');
  });

  it('renders disabled option from options array', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A', disabled: true },
    ];
    render(<Select options={options} />);
    const option = screen.getByRole('option', { name: 'Option A' }) as HTMLOptionElement;
    expect(option.disabled).toBe(true);
  });
});
