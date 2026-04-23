import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="success">Done</Badge>);
    expect(screen.getByText('Done')).toHaveClass('bg-green-100');
    rerender(<Badge variant="danger">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-red-100');
    rerender(<Badge variant="warning">Pending</Badge>);
    expect(screen.getByText('Pending')).toHaveClass('bg-yellow-100');
  });

  it('renders sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('text-xs');
    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('text-sm');
  });

  it('renders with dot indicator', () => {
    render(<Badge dot>Online</Badge>);
    expect(screen.getByText('Online').querySelector('span')).toBeInTheDocument();
  });

  it('renders removable with close button', () => {
    const onRemove = vi.fn();
    render(<Badge removable onRemove={onRemove}>Tag</Badge>);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies rounded-full class', () => {
    render(<Badge>Rounded</Badge>);
    expect(screen.getByText('Rounded')).toHaveClass('rounded-full');
  });
});