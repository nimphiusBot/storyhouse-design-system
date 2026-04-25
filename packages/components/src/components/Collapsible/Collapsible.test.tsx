import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  it('renders trigger always visible', () => {
    render(<Collapsible trigger="Show Details"><p>Content</p></Collapsible>);
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });

  it('has content hidden by default (aria-expanded false)', () => {
    render(<Collapsible trigger="Show Details"><p>Hidden content</p></Collapsible>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows aria-expanded true when trigger is clicked', () => {
    render(<Collapsible trigger="Show Details"><p>Revealed content</p></Collapsible>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles aria-expanded when trigger is clicked again', () => {
    render(<Collapsible trigger="Toggle"><p>Content</p></Collapsible>);
    const trigger = screen.getByText('Toggle');
    fireEvent.click(trigger);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows aria-expanded attribute', () => {
    render(<Collapsible trigger="Toggle"><p>Content</p></Collapsible>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects controlled open state', () => {
    const { rerender } = render(<Collapsible open={false} trigger="Toggle"><p>Content</p></Collapsible>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

    rerender(<Collapsible open={true} trigger="Toggle"><p>Content</p></Collapsible>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onOpenChange callback', () => {
    const fn = vi.fn();
    render(<Collapsible trigger="Toggle" onOpenChange={fn}><p>Content</p></Collapsible>);
    fireEvent.click(screen.getByText('Toggle'));
    expect(fn).toHaveBeenCalledWith(true);
  });
});
