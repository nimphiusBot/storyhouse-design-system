import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface ToggleSwitchProps {
  /** Whether the toggle is checked/on */
  checked: boolean;
  /** Callback fired when the toggle state changes */
  onChange: (checked: boolean) => void;
  /** Unique id for the toggle element */
  id?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Size of the toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Optional class name override */
  className?: string;
  /** Accessible label for the toggle (required for screen readers when no visible label) */
  'aria-label'?: string;
}

const sizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-10 h-5',
  lg: 'w-12 h-6',
} as const;

const thumbSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
} as const;

const translateClasses = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
} as const;

/**
 * ToggleSwitch
 *
 * A toggle switch component for binary on/off states. Supports three sizes (sm, md, lg),
 * disabled state, keyboard navigation (Enter/Space), and full accessibility via
 * role="switch" and aria-checked.
 *
 * @example
 * ```tsx
 * <ToggleSwitch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   size="md"
 * />
 * ```
 */
export const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  (
    {
      checked,
      onChange,
      id,
      disabled = false,
      size = 'md',
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        id={id}
        aria-label={ariaLabel}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          sizeClasses[size],
          checked ? 'bg-orange-600 dark:bg-orange-500' : 'bg-gray-300 dark:bg-gray-600',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full',
          'transition-colors ease-in-out duration-200',
          'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          className
        )}
      >
        <span className="sr-only">{ariaLabel || 'Toggle'}</span>
        <span
          className={cn(
            thumbSizeClasses[size],
            checked ? translateClasses[size] : 'translate-x-0',
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0',
            'transition ease-in-out duration-200'
          )}
        />
      </button>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
