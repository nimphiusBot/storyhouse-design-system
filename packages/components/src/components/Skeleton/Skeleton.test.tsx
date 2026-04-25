import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  /**
   * Helper to get the skeleton element within the fragment.
   * The Fragment wraps: <style> then <div> skeleton.
   */
  const getSkeletonEl = (container: HTMLElement): HTMLElement =>
    container.children[1] as HTMLElement;

  it('renders with default classes', () => {
    const { container } = render(<Skeleton className="h-4 w-48" />);
    const el = getSkeletonEl(container);
    expect(el.className).toContain('animate-skeleton-shimmer');
  });

  it('renders with custom dimensions', () => {
    const { container } = render(<Skeleton width={200} height={16} />);
    const el = getSkeletonEl(container);
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('16px');
  });

  it('renders with string dimensions', () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    const el = getSkeletonEl(container);
    expect(el.style.width).toBe('50%');
    expect(el.style.height).toBe('2rem');
  });

  it('renders multiple lines with count', () => {
    const { container } = render(<Skeleton count={3} />);
    expect(container.children.length).toBe(2); // style + wrapper
    const wrapper = getSkeletonEl(container);
    expect(wrapper.childNodes.length).toBe(3);
  });

  it('renders number of children equal to count', () => {
    const { container } = render(<Skeleton count={5} />);
    const wrapper = getSkeletonEl(container);
    expect(wrapper.childNodes.length).toBe(5);
  });
});
