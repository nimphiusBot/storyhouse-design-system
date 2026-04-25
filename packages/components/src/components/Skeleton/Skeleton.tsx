import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Additional class names */
  className?: string;
  /** Optional count of skeleton lines (for text blocks) */
  count?: number;
  /** Direction of lines (for text blocks) */
  direction?: 'row' | 'column';
  /** Gap between multiple items */
  gap?: string;
}

const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/**
 * Skeleton
 *
 * Loading placeholder that mimics the shape of content while it loads.
 * Supports custom dimensions, border radius, text block mode via `count`,
 * and automatic animation.
 *
 * @example
 * ```tsx
 * // Single skeleton
 * <Skeleton className="h-10 w-48" />
 *
 * // Text block skeleton (3 lines)
 * <Skeleton count={3} />
 *
 * // Avatar skeleton
 * <Skeleton className="h-10 w-10" rounded="full" />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  rounded = 'md',
  className,
  count,
  direction = 'column',
  gap = 'gap-3',
}) => {
  const baseClass = cn(
    'animate-pulse bg-gray-200 dark:bg-gray-700',
    roundedClasses[rounded],
    className
  );

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (count && count > 1) {
    return (
      <div className={cn('flex', direction === 'column' ? 'flex-col' : 'flex-row', gap)}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={baseClass}
            style={{
              ...style,
              width: width
                ? typeof width === 'number'
                  ? `${width}px`
                  : width
                : `${100 - i * 15}%`,
              height: height
                ? typeof height === 'number'
                  ? `${height}px`
                  : height
                : '0.75rem',
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClass} style={style} />;
};

Skeleton.displayName = 'Skeleton';
