import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders a basic input', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('w-full');
  });

  it('renders with a label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text', () => {
    render(<Input label="Password" helperText="Min 8 characters" />);
    expect(screen.getByText('Min 8 characters')).toBeInTheDocument();
  });

  it('does not show helper text when error exists', () => {
    render(<Input label="Password" helperText="Min 8 characters" error="Required" />);
    expect(screen.queryByText('Min 8 characters')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('px-3 py-1.5 text-sm');
    rerender(<Input size="lg" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('px-6 py-3 text-lg');
  });

  it('applies full width class', () => {
    render(<Input fullWidth placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input.closest('div > div')?.parentElement).toHaveClass('w-full');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});