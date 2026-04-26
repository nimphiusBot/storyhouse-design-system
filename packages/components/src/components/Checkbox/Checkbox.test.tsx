import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxGroup } from './index';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders checked state', () => {
    render(<Checkbox label="Checked" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders with description', () => {
    render(<Checkbox label="Option" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Checkbox label="Option" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders indeterminate state', () => {
    render(<Checkbox indeterminate label="Indeterminate" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('handles onChange via onCheckedChange', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Click me" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByLabelText('Click me'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('handles native onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Native" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Native'));
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders with different sizes', () => {
    const { container, rerender } = render(<Checkbox size="sm" />);
    let label = container.querySelector('label');
    expect(label!.className).toContain('h-4');

    rerender(<Checkbox size="lg" />);
    label = container.querySelector('label');
    expect(label!.className).toContain('h-6');
  });

  it('has accessible attributes', () => {
    render(<Checkbox label="Accessible" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(screen.getByText('Accessible')).toBeInTheDocument();
  });
});

describe('CheckboxGroup', () => {
  it('renders children', () => {
    render(
      <CheckboxGroup label="Group">
        <Checkbox label="Option A" />
        <Checkbox label="Option B" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <CheckboxGroup label="Group" error="Select at least one">
        <Checkbox label="Option A" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Select at least one')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <CheckboxGroup label="Group" description="Choose wisely">
        <Checkbox label="Option A" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  it('renders horizontal orientation', () => {
    const { container } = render(
      <CheckboxGroup label="Group" orientation="horizontal">
        <Checkbox label="A" />
      </CheckboxGroup>
    );
    const innerDiv = container.querySelector('.gap-4');
    expect(innerDiv!.className).toContain('flex');
    expect(innerDiv!.className).toContain('flex-wrap');
  });
});
