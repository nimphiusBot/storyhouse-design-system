import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch', () => {
  it('renders with default accessible label via sr-only', () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('renders with ariaLabel for screen readers', () => {
    render(
      <ToggleSwitch checked={false} onChange={() => {}} ariaLabel="Notifications" />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-label', 'Notifications');
  });

  it('renders with a visible label element', () => {
    const { container } = render(
      <ToggleSwitch checked={false} onChange={() => {}} label="Enable dark mode" />
    );
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBe(1);
    expect(labels[0]).toHaveTextContent('Enable dark mode');
  });

  it('associates label with toggle via htmlFor/id', () => {
    const { container } = render(
      <ToggleSwitch checked={false} onChange={() => {}} label="Enable dark mode" />
    );
    const labelElement = container.querySelector('label');
    const toggle = screen.getByRole('switch');
    expect(labelElement).toHaveAttribute('for');
    expect(toggle).toHaveAttribute('id');
    expect(labelElement!.getAttribute('for')).toBe(toggle.getAttribute('id'));
  });

  it('uses provided id when label is present', () => {
    const { container } = render(
      <ToggleSwitch
        checked={false}
        onChange={() => {}}
        label="Dark mode"
        id="dark-mode-toggle"
      />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('id', 'dark-mode-toggle');
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('for', 'dark-mode-toggle');
  });

  it('sets aria-label when ariaLabel is provided without a visible label', () => {
    render(
      <ToggleSwitch checked={false} onChange={() => {}} ariaLabel="Volume control" />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-label', 'Volume control');
  });

  it('does not set aria-label on the button when a visible label is present', () => {
    render(
      <ToggleSwitch checked={false} onChange={() => {}} label="Dark mode" />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toHaveAttribute('aria-label');
  });

  it('applies disabled styles to label when toggle is disabled', () => {
    const { container } = render(
      <ToggleSwitch checked={false} onChange={() => {}} label="Dark mode" disabled />
    );
    const labelElement = container.querySelector('label');
    expect(labelElement!.className).toContain('opacity-50');
  });

  it('toggles checked state on click', () => {
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} ariaLabel="Test" />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles checked state when label is clicked', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ToggleSwitch checked={false} onChange={onChange} label="Dark mode" />
    );
    const label = container.querySelector('label')!;
    fireEvent.click(label);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(
      <ToggleSwitch checked={false} onChange={onChange} disabled ariaLabel="Test" />
    );
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with accessibility attributes: role="switch" and aria-checked', () => {
    render(<ToggleSwitch checked={true} onChange={() => {}} ariaLabel="Test" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('renders size classes correctly', () => {
    const { container, rerender } = render(
      <ToggleSwitch checked={false} onChange={() => {}} size="sm" ariaLabel="Sm" />
    );
    let button = container.querySelector('button');
    expect(button?.className).toContain('w-8');

    rerender(
      <ToggleSwitch checked={false} onChange={() => {}} size="lg" ariaLabel="Lg" />
    );
    button = container.querySelector('button');
    expect(button?.className).toContain('w-12');
  });
});
