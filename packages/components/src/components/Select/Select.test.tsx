import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectOption, SelectOptionGroup } from './index';

describe('Select', () => {
  it('renders a custom dropdown button', () => {
    render(<Select />);
    const trigger = document.querySelector('[role="combobox"]');
    expect(trigger).toBeInTheDocument();
  });

  it('renders options from options prop', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} />);
    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('renders placeholder text when no option selected', () => {
    render(<Select placeholder="Choose..." options={[]} />);
    expect(screen.getByText('Choose...')).toBeInTheDocument();
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

  it('calls onChange when option is selected', () => {
    const onChange = vi.fn();
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Option B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders disabled state', () => {
    render(<Select disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies variant classes', () => {
    const { container, rerender } = render(<Select variant="error" />);
    let trigger = container.querySelector('[role="combobox"]')!;
    expect(trigger.className).toContain('border-red-500');

    rerender(<Select variant="success" />);
    trigger = container.querySelector('[role="combobox"]')!;
    expect(trigger.className).toContain('border-green-500');
  });

  it('applies size classes', () => {
    const { container, rerender } = render(<Select size="sm" />);
    let trigger = container.querySelector('[role="combobox"]')!;
    expect(trigger.className).toContain('px-3 py-1.5');

    rerender(<Select size="lg" />);
    trigger = container.querySelector('[role="combobox"]')!;
    expect(trigger.className).toContain('px-4 py-3');
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
    const { container } = render(<Select className="custom-class" />);
    const trigger = container.querySelector('[role="combobox"]');
    expect(trigger).toHaveClass('custom-class');
  });

  it('uses provided id on label htmlFor', () => {
    render(<Select id="my-select" label="Fruit" />);
    const label = screen.getByText('Fruit').closest('label');
    expect(label).toHaveAttribute('for', 'my-select');
  });

  it('opens dropdown on trigger click', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
    ];
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes dropdown on option select', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Option A' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown on outside click', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
    ];
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects value and updates display', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Option B' }));
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('shows selected option with check icon', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select options={options} value="a" />);
    fireEvent.click(screen.getByRole('combobox'));
    const option = screen.getByRole('option', { name: 'Option A' });
    expect(option).toHaveAttribute('aria-selected', 'true');
    // Check icon should be visible for selected option
    expect(option.querySelector('.lucide-check')).toBeInTheDocument();
  });

  it('renders disabled option from options array', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A', disabled: true },
    ];
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    const option = screen.getByRole('option', { name: 'Option A' });
    expect(option).toHaveAttribute('aria-disabled', 'true');
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
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByText('Group 1')).toBeInTheDocument();
  });

  it('sets combobox aria-expanded correctly', () => {
    render(<Select options={[{ value: 'a', label: 'A' }]} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders hidden native select for form submission when name is provided', () => {
    render(<Select name="fruit" value="a" options={[{ value: 'a', label: 'Apple' }]} />);
    const hiddenSelect = document.querySelector('select.sr-only');
    expect(hiddenSelect).toBeInTheDocument();
    expect(hiddenSelect).toHaveAttribute('name', 'fruit');
    expect(hiddenSelect).toHaveValue('a');
  });

  it('supports uncontrolled defaultValue', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(<Select defaultValue="b" options={options} />);
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('opens and closes on keyboard Enter', () => {
    const options: SelectOption[] = [{ value: 'a', label: 'A' }];
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');

    // Open with Enter
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Close with Escape
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates options with ArrowDown and ArrowUp', () => {
    const options: SelectOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ];
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');

    fireEvent.click(trigger);
    const listbox = screen.getByRole('listbox');

    // Arrow down should move focus
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(trigger).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-1'));

    // Arrow up should move focus back
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(trigger).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-0'));
  });
});
