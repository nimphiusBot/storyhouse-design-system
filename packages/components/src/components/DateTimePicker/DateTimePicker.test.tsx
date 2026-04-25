import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateTimePicker, DateRangePicker } from './index';

describe('DateTimePicker', () => {
  it('renders with default props (date mode)', () => {
    render(<DateTimePicker />);
    const input = document.querySelector('input[type="date"]');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DateTimePicker label="Start Date" />);
    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<DateTimePicker error="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('renders with help text', () => {
    render(<DateTimePicker helpText="Select your birth date" />);
    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('renders in time mode', () => {
    render(<DateTimePicker mode="time" />);
    const input = document.querySelector('input[type="time"]');
    expect(input).toBeInTheDocument();
  });

  it('renders in datetime mode', () => {
    render(<DateTimePicker mode="datetime" />);
    const input = document.querySelector('input[type="datetime-local"]');
    expect(input).toBeInTheDocument();
  });

  it('shows icon by default', () => {
    const { container } = render(<DateTimePicker label="Date" />);
    // Calendar icon should be present in date mode
    const icon = container.querySelector('.lucide-calendar');
    expect(icon).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    const { container } = render(<DateTimePicker label="Date" showIcon={false} />);
    const icon = container.querySelector('.lucide-calendar');
    expect(icon).not.toBeInTheDocument();
  });

  it('shows clear button when value is present', () => {
    const now = new Date().toISOString();
    const { container } = render(<DateTimePicker value={now} clearable />);
    const clearButton = container.querySelector('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears value on clear button click', () => {
    const onChange = vi.fn();
    const now = new Date().toISOString();
    render(<DateTimePicker value={now} onChange={onChange} clearable />);
    const clearButton = document.querySelector('button[type="button"]');
    fireEvent.click(clearButton!);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('renders disabled state', () => {
    render(<DateTimePicker label="Disabled" disabled />);
    const input = document.querySelector('input');
    expect(input).toBeDisabled();
  });

  it('renders required indicator', () => {
    render(<DateTimePicker label="Required" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('has accessible error with role="alert"', () => {
    render(<DateTimePicker label="Test" error="Error message" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Error message');
  });

  it('renders different sizes', () => {
    const { container, rerender } = render(<DateTimePicker label="Test" size="sm" />);
    let input = container.querySelector('input');
    expect(input!.className).toContain('h-8');

    rerender(<DateTimePicker label="Test" size="lg" />);
    input = container.querySelector('input');
    expect(input!.className).toContain('h-12');
  });
});

describe('DateRangePicker', () => {
  it('renders two date pickers', () => {
    render(<DateRangePicker />);
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
  });

  it('renders custom labels', () => {
    render(<DateRangePicker startLabel="From" endLabel="To" />);
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();
  });

  it('handles start change', () => {
    const onStartChange = vi.fn();
    render(<DateRangePicker onStartChange={onStartChange} />);
    const inputs = document.querySelectorAll('input[type="date"]');
    expect(inputs.length).toBe(2);
  });
});
