import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';
import { X } from 'lucide-react';

describe('IconButton', () => {
  it('renders with aria-label', () => {
    render(<IconButton aria-label="Close" icon={<X />} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const fn = vi.fn();
    render(<IconButton aria-label="Click" icon={<X />} onClick={fn} />);
    fireEvent.click(screen.getByLabelText('Click'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<IconButton aria-label="Disabled" icon={<X />} disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<IconButton aria-label="Loading" icon={<X />} isLoading />);
    const button = screen.getByLabelText('Loading');
    expect(button).toBeDisabled();
  });
});
