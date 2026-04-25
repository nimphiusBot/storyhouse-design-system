import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const variantConfig = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  primary: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  outline: 'bg-transparent text-gray-700 border border-gray-300 dark:text-gray-300 dark:border-gray-600',
};

export type ChipVariant = keyof typeof variantConfig;

export interface ChipProps {
  /** Visual variant */
  variant?: ChipVariant;
  /** Size */
  size?: 'sm' | 'md';
  /** Optional left icon */
  icon?: React.ReactNode;
  /** Show avatar dot/indicator */
  dot?: boolean;
  /** Whether chip can be removed */
  removable?: boolean;
  /** Called when the chip is removed */
  onRemove?: () => void;
  /** Whether chip is interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive chips */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
};

const dotColors: Record<string, string> = {
  default: 'bg-gray-400 dark:bg-gray-500',
  primary: 'bg-blue-500 dark:bg-blue-400',
  success: 'bg-green-500 dark:bg-green-400',
  warning: 'bg-yellow-500 dark:bg-yellow-400',
  danger: 'bg-red-500 dark:bg-red-400',
  outline: 'bg-gray-400 dark:bg-gray-500',
};

/**
 * Chip
 *
 * Compact elements for displaying tags, filters, or selected options.
 * Supports six variants, two sizes, dot indicators, removal buttons,
 * and interactive (clickable) mode.
 *
 * @example
 * ```tsx
 * <Chip variant="primary" removable onRemove={() => {}}>
 *   TypeScript
 * </Chip>
 * <Chip variant="success" dot>Online</Chip>
 * <Chip variant="outline" interactive onClick={() => {}}>
 *   + Add Filter
 * </Chip>
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  removable = false,
  onRemove,
  interactive = false,
  onClick,
  children,
  className,
}) => {
  const content = (
    <>
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full flex-shrink-0',
            dotColors[variant]
          )}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  const common = cn(
    'inline-flex items-center font-medium rounded-full transition-colors',
    variantConfig[variant],
    sizeClasses[size],
    interactive && 'cursor-pointer hover:opacity-80',
    className
  );

  if (removable) {
    return (
      <span className={cn(common, 'pr-1')}>
        {content}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            'ml-0.5 rounded-full p-0.5 transition-colors',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
          )}
          aria-label={`Remove ${typeof children === 'string' ? children : 'tag'}`}
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    );
  }

  if (interactive && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={common}
      >
        {content}
      </button>
    );
  }

  return <span className={common}>{content}</span>;
};

Chip.displayName = 'Chip';
