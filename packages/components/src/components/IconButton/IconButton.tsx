import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible label for the button (required for icon-only button) */
  'aria-label': string;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Color variant */
  color?: 'default' | 'primary' | 'danger';
  /** The icon element */
  icon: React.ReactNode;
  /** Show loading spinner */
  isLoading?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

const iconSizes: Record<string, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const variantConfig: Record<string, Record<string, string>> = {
  solid: {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    primary: 'bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
  },
  outline: {
    default: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800',
    primary: 'bg-transparent text-orange-600 border border-orange-300 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-950',
    danger: 'bg-transparent text-red-600 border border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950',
  },
  ghost: {
    default: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    primary: 'bg-transparent text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950',
    danger: 'bg-transparent text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950',
  },
};

/**
 * IconButton
 *
 * A circular button designed for icon-only actions. Requires an `aria-label`
 * for accessibility. Supports three sizes, three visual variants, and three
 * color variants.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="Close dialog" icon={<X />} variant="ghost" />
 * <IconButton aria-label="Edit" icon={<Pencil />} variant="outline" size="sm" />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = 'md',
      variant = 'ghost',
      color = 'default',
      icon,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'flex-shrink-0',
          sizeClasses[size],
          variantConfig[variant]![color]!,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span
            className={cn(
              'animate-spin rounded-full border-2 border-current border-t-transparent',
              iconSizes[size]
            )}
          />
        ) : (
          <span className={cn('flex items-center justify-center', iconSizes[size])}>
            {icon}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
