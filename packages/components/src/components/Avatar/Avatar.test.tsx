import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.jpg" alt="User" />);
    const img = screen.getByAltText('User');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.jpg');
  });

  it('renders initials from name', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders fallback icon when no src or name', () => {
    render(<Avatar />);
    const avatar = screen.getByRole('img', { name: /user avatar/i });
    expect(avatar).toBeInTheDocument();
    expect(avatar.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar name="Test" size="xs" />);
    expect(screen.getByRole('img', { name: /test/i })).toHaveStyle({ width: '24px', height: '24px' });
    rerender(<Avatar name="Test" size="xl" />);
    expect(screen.getByRole('img', { name: /test/i })).toHaveStyle({ width: '72px', height: '72px' });
  });

  it('applies circle variant by default', () => {
    render(<Avatar name="Test" />);
    expect(screen.getByRole('img', { name: /test/i })).toHaveClass('rounded-full');
  });

  it('applies square variant', () => {
    render(<Avatar name="Test" variant="square" />);
    expect(screen.getByRole('img', { name: /test/i })).toHaveClass('rounded-lg');
  });

  it('renders with custom fallback', () => {
    render(<Avatar fallback={<span>FB</span>} />);
    expect(screen.getByText('FB')).toBeInTheDocument();
  });
});