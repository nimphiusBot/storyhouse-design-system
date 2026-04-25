import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio, RadioGroup, RadioCard } from './index';

describe('Radio', () => {
  it('renders radio input with sr-only class', () => {
    render(<Radio />);
    const radio = document.querySelector('input[type="radio"]');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass('sr-only');
  });

  it('renders with label', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Radio label="Option A" description="This is option A" />);
    expect(screen.getByText('This is option A')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Radio label="Option A" error="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Radio label="Option A" value="a" name="group" onChange={onChange} />);
    const radio = document.querySelector('input[type="radio"]')!;
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders checked state', () => {
    const { container } = render(<Radio checked onChange={vi.fn()} />);
    const radio = document.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it('renders disabled state', () => {
    render(<Radio disabled label="Disabled" />);
    const radio = document.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(radio.disabled).toBe(true);
  });

  it('applies error variant when error is provided', () => {
    render(<Radio label="Option" error="Error" />);
    const label = screen.getByText('Option');
    expect(label.className).toContain('text-red-700');
  });

  it('applies size variant', () => {
    const { container, rerender } = render(<Radio size="sm" label="Small" />);
    let radioLabel = document.querySelector('input[type="radio"] + label');
    expect(radioLabel?.className).toContain('h-4');

    rerender(<Radio size="lg" label="Large" />);
    radioLabel = document.querySelector('input[type="radio"] + label');
    expect(radioLabel?.className).toContain('h-6');
  });

  it('renders without label as standalone radio', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });
});

describe('RadioGroup', () => {
  it('renders with role radiogroup', () => {
    render(
      <RadioGroup name="plan">
        <Radio value="free" label="Free" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders group label', () => {
    render(
      <RadioGroup name="plan" label="Select Plan">
        <Radio value="free" label="Free" />
      </RadioGroup>
    );
    expect(screen.getByText('Select Plan')).toBeInTheDocument();
  });

  it('renders group description', () => {
    render(
      <RadioGroup name="plan" description="Choose your subscription">
        <Radio value="free" label="Free" />
      </RadioGroup>
    );
    expect(screen.getByText('Choose your subscription')).toBeInTheDocument();
  });

  it('renders group error', () => {
    render(
      <RadioGroup name="plan" error="Please select a plan">
        <Radio value="free" label="Free" />
      </RadioGroup>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Please select a plan');
  });

  it('marks checked radio based on value', () => {
    render(
      <RadioGroup name="plan" value="pro">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
    const radios = document.querySelectorAll('input[type="radio"]');
    expect((radios[0] as HTMLInputElement).checked).toBe(false);
    expect((radios[1] as HTMLInputElement).checked).toBe(true);
  });

  it('calls onChange when radio is clicked', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup name="plan" value="free" onChange={onChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
    const radios = document.querySelectorAll('input[type="radio"]');
    fireEvent.click(radios[1]);
    expect(onChange).toHaveBeenCalledWith('pro');
  });

  it('renders with horizontal orientation', () => {
    const { container } = render(
      <RadioGroup name="plan" orientation="horizontal">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
    // The RadioGroup renders: <div role="radiogroup"> -> {label} {description} <div class="flex flex-wrap gap-4">{children}</div> {error}
    // Find the inner div that has the flex classes (it's a child of radiogroup, not a sibling via +)
    const innerDiv = container.querySelector('[role="radiogroup"] > div:not([role])');
    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv!.className).toContain('flex');
  });

  it('renders with vertical orientation', () => {
    const { container } = render(
      <RadioGroup name="plan" orientation="vertical">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
    const innerDiv = container.querySelector('[role="radiogroup"] > div:not([role])');
    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv!.className).toContain('flex');
    expect(innerDiv!.className).toContain('flex-col');
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup name="plan" className="custom-class">
        <Radio value="free" label="Free" />
      </RadioGroup>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes name to all radio children', () => {
    render(
      <RadioGroup name="plan">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
    const radios = document.querySelectorAll('input[type="radio"]');
    expect((radios[0] as HTMLInputElement).name).toBe('plan');
    expect((radios[1] as HTMLInputElement).name).toBe('plan');
  });
});

describe('RadioCard', () => {
  it('renders title', () => {
    render(<RadioCard title="Pro Plan" />);
    expect(screen.getByText('Pro Plan')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<RadioCard title="Pro Plan" description="$29/mo" />);
    expect(screen.getByText('$29/mo')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<RadioCard title="Pro Plan" icon={<span data-testid="icon">⭐</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<RadioCard title="Pro Plan" badge={<span>Popular</span>} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('renders checked state', () => {
    const { container } = render(<RadioCard title="Pro Plan" checked onChange={vi.fn()} />);
    const label = container.querySelector('label');
    expect(label?.className).toContain('border-orange-500');
  });

  it('renders disabled state', () => {
    render(<RadioCard title="Pro Plan" disabled />);
    const label = document.querySelector('label');
    expect(label?.className).toContain('opacity-50');
    expect(label?.className).toContain('cursor-not-allowed');
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<RadioCard title="Pro Plan" value="pro" name="plan" onChange={onChange} />);
    const radio = document.querySelector('input[type="radio"]')!;
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
