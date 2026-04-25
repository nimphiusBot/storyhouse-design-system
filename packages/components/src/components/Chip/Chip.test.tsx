import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>React</Chip>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders with dot indicator', () => {
    render(<Chip dot>Online</Chip>);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders removable chip', () => {
    render(<Chip removable>Tag</Chip>);
    expect(screen.getByLabelText('Remove Tag')).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', () => {
    const fn = vi.fn();
    render(<Chip removable onRemove={fn}>Tag</Chip>);
    fireEvent.click(screen.getByLabelText('Remove Tag'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('renders as button when interactive', () => {
    const fn = vi.fn();
    render(<Chip interactive onClick={fn}>Click me</Chip>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    render(<Chip icon={<span data-testid="chip-icon">★</span>}>Star</Chip>);
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    render(<Chip variant="primary">Primary</Chip>);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });
});
