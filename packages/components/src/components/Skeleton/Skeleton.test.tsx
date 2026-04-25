import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<Skeleton className="h-4 w-48" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('animate-shimmer');
  });

  it('renders with custom dimensions', () => {
    const { container } = render(<Skeleton width={200} height={16} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('16px');
  });

  it('renders with string dimensions', () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('50%');
    expect(el.style.height).toBe('2rem');
  });

  it('renders multiple lines with count', () => {
    const { container } = render(<Skeleton count={3} />);
    expect(container.children.length).toBe(1); // wrapper
    expect(container.firstChild?.childNodes.length).toBe(3);
  });

  it('renders number of children equal to count', () => {
    const { container } = render(<Skeleton count={5} />);
    expect(container.firstChild?.childNodes.length).toBe(5);
  });
});
