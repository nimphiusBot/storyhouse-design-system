import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Inline keyframes for the shimmer animation.
 * These are injected via a <style> tag so the animation works even when
 * the consuming app doesn't have the Tailwind shimmer keyframe configured.
 */
const SHIMMER_KEYFRAMES = `
@keyframes skeleton-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-skeleton-shimmer {
  animation: skeleton-shimmer 1.5s infinite;
}
`;

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
    'relative overflow-hidden bg-gray-200 dark:bg-gray-700',
    roundedClasses[rounded],
    'animate-skeleton-shimmer',
    className
  );

  const shimmerClass = cn(
    'absolute inset-0 -translate-x-full',
    'bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent',
  );

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  const skeletonItem = (key: number, itemWidth?: string | number) => (
    <div
      key={key}
      className={cn(
        'relative overflow-hidden bg-gray-200 dark:bg-gray-700',
        roundedClasses[rounded],
        'animate-skeleton-shimmer',
      )}
      style={{
        ...style,
        width: itemWidth !== undefined
          ? typeof itemWidth === 'number' ? `${itemWidth}px` : itemWidth
          : style.width,
        height: height
          ? typeof height === 'number' ? `${height}px` : height
          : '0.75rem',
      }}
    >
      <div className={shimmerClass} />
    </div>
  );

  const skeletonEl = count && count > 1 ? (
    <div className={cn('flex', direction === 'column' ? 'flex-col' : 'flex-row', gap)}>
      {Array.from({ length: count }).map((_, i) =>
        skeletonItem(
          i,
          width
            ? typeof width === 'number' ? `${width}px` : width
            : `${100 - i * 15}%`
        )
      )}
    </div>
  ) : (
    <div className={baseClass} style={style}>
      <div className={shimmerClass} />
    </div>
  );

  return (
    <>
      {/* Inject shimmer keyframes once into <head> */}
      <style>{SHIMMER_KEYFRAMES}</style>
      {skeletonEl}
    </>
  );
};

Skeleton.displayName = 'Skeleton';
