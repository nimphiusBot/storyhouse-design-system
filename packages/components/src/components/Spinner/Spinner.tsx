import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'default' | 'primary' | 'white';
  /** Whether to show a label below the spinner */
  label?: string;
  /** Label position */
  labelPosition?: 'bottom' | 'right';
  /** Additional class names */
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantClasses: Record<string, string> = {
  default: 'text-gray-500 dark:text-gray-400',
  primary: 'text-orange-500 dark:text-orange-400',
  white: 'text-white',
};

/**
 * Spinner
 *
 * A loading indicator component with animated rotation. Supports four sizes,
 * three color variants, optional label, and full-screen overlay mode.
 *
 * Built with accessibility — `role="status"` with a sr-only "Loading" text.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" label="Loading..." />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  label,
  labelPosition = 'bottom',
  className,
}) => {
  const spinner = (
    <Loader2
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );

  if (!label) {
    return (
      <div role="status">
        {spinner}
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center',
        labelPosition === 'bottom' ? 'flex-col gap-2' : 'flex-row gap-2'
      )}
      role="status"
    >
      {spinner}
      <span
        className={cn(
          'text-sm font-medium text-gray-500 dark:text-gray-400',
          variant === 'white' && 'text-white',
          variant === 'primary' && 'text-orange-600 dark:text-orange-400'
        )}
      >
        {label}
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';
