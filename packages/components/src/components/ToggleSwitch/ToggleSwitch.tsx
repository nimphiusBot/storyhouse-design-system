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
  /** Unique id for the toggle element. Auto-generated if not provided when a `label` is used. */
  id?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Size of the toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Optional class name override */
  className?: string;
  /** Visible label rendered next to the toggle switch. Associates via `htmlFor`/`id`. */
  label?: string;
  /** Accessible label for screen readers (used when no `label` prop is provided). */
  ariaLabel?: string;
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

let toggleIdCounter = 0;
function generateToggleId(): string {
  toggleIdCounter += 1;
  return `toggle-switch-${toggleIdCounter}-${Date.now().toString(36)}`;
}

/**
 * ToggleSwitch
 *
 * A toggle switch component for binary on/off states. Supports three sizes (sm, md, lg),
 * disabled state, keyboard navigation (Enter/Space), and full accessibility via
 * role="switch" and aria-checked.
 *
 * When a `label` is provided, it renders as a visible `<label>` element associated with
 * the toggle via `htmlFor` for improved accessibility. Without a label, use `ariaLabel`
 * for screen-reader-only labeling.
 *
 * @example
 * ```tsx
 * // With visible label
 * <ToggleSwitch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 *
 * // Screen-reader only label
 * <ToggleSwitch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   ariaLabel="Notifications toggle"
 * />
 * ```
 */
export const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  (
    {
      checked,
      onChange,
      id: externalId,
      disabled = false,
      size = 'md',
      className,
      label,
      ariaLabel,
    },
    ref
  ) => {
    const [generatedId] = React.useState(generateToggleId);
    const id = externalId || (label ? generatedId : undefined);

    const labelElement = label ? (
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-medium cursor-pointer select-none text-gray-700 dark:text-gray-300',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {label}
      </label>
    ) : null;

    const srLabel = ariaLabel || label || 'Toggle';

    return (
      <div className={cn('inline-flex items-center gap-3', className)}>
        {labelElement}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          id={id}
          aria-label={!label ? ariaLabel : undefined}
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            sizeClasses[size],
            checked ? 'bg-orange-600 dark:bg-orange-500' : 'bg-gray-300 dark:bg-gray-600',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full',
            'transition-colors ease-in-out duration-200',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
            label ? '' : className
          )}
        >
          <span className="sr-only">{srLabel}</span>
          <span
            className={cn(
              thumbSizeClasses[size],
              checked ? translateClasses[size] : 'translate-x-0',
              'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0',
              'transition ease-in-out duration-200'
            )}
          />
        </button>
      </div>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
