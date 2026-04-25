import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const progressBarVariants = cva(
  'w-full rounded-full overflow-hidden transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-4',
      },
      variant: {
        default: 'bg-gray-200 dark:bg-gray-700',
        success: 'bg-green-200 dark:bg-green-900/30',
        warning: 'bg-yellow-200 dark:bg-yellow-900/30',
        error: 'bg-red-200 dark:bg-red-900/30',
        info: 'bg-orange-200 dark:bg-orange-900/30',
        primary: 'bg-orange-200 dark:bg-orange-900/30',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const progressFillVariants = cva(
  'h-full rounded-full transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-gray-600 dark:bg-gray-400',
        success: 'bg-green-600 dark:bg-green-500',
        warning: 'bg-yellow-600 dark:bg-yellow-500',
        error: 'bg-red-600 dark:bg-red-500',
        info: 'bg-orange-600 dark:bg-orange-500',
        primary: 'bg-orange-600 dark:bg-orange-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof progressBarVariants> {
  /** Current numeric value (ignored when indeterminate) */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position relative to the bar */
  labelPosition?: 'top' | 'bottom' | 'inline';
  /** Custom label text (overrides the default percentage) */
  label?: string;
  /** ID of an external element to use as the accessible label via aria-labelledby */
  labelledBy?: string;
  /** ID of an external element to use as the accessible description via aria-describedby */
  describedBy?: string;
  /** When true, renders an indeterminate progress bar (spinner-like animation) */
  indeterminate?: boolean;
  /** Accessible value text for screen readers (overrides default percentage/value readout) */
  valueText?: string;
  /** Auto-calculate variant based on percentage thresholds */
  thresholds?: {
    /** Below this value is success (default: 50) */
    success?: number;
    /** Below this value is warning (default: 80). Values above this are error. */
    warning?: number;
  };
  /** Show used/max values instead of percentage */
  showValues?: boolean;
  /** Custom value formatter function */
  formatValue?: (value: number) => string;
}

/**
 * ProgressBar
 *
 * Displays the progress of a task or operation as a horizontal bar.
 * Supports multiple sizes (sm, md, lg), color variants (default, success,
 * warning, error, info, primary), automatic threshold-based variant selection,
 * percentage/value labels, indeterminate mode, and full accessibility via
 * WAI-ARIA progressbar role attributes.
 *
 * Accessibility:
 * - The outer track container carries `role="progressbar"` along with
 *   `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
 * - When `indeterminate={true}`, the component sets `aria-busy="true"` and
 *   omits `aria-valuenow` per the ARIA spec.
 * - Use `label` or `valueText` to provide a clear accessible name and value
 *   readout for screen readers.
 * - Use `labelledBy` to reference an external element ID as the accessible
 *   name via `aria-labelledby`.
 * - Use `describedBy` to reference an external element ID as an accessible
 *   description via `aria-describedby`.
 * - When `showLabel={true}`, the visible label text is automatically linked
 *   to the progressbar via `aria-labelledby`.
 * - The inner fill bar is `aria-hidden="true"` to prevent redundant
 *   screen-reader announcements.
 *
 * @example
 * ```tsx
 * <ProgressBar value={65} size="md" variant="primary" showLabel />
 * <ProgressBar
 *   value={85}
 *   thresholds={{ success: 50, warning: 80 }}
 *   showLabel
 * />
 * <ProgressBar indeterminate size="md" label="Loading..." />
 * <ProgressBar
 *   value={60}
 *   labelledBy="my-label-id"
 *   describedBy="my-desc-id"
 * />
 * ```
 */
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant: variantProp,
      showLabel = false,
      labelPosition = 'top',
      label: customLabel,
      labelledBy,
      describedBy,
      indeterminate = false,
      valueText,
      thresholds,
      showValues = false,
      formatValue = (val) => val.toLocaleString(),
      ...props
    },
    ref
  ) => {
    // Calculate percentage (0 when indeterminate)
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = indeterminate ? 0 : Math.min(Math.max((clampedValue / max) * 100, 0), 100);

    // Auto-calculate variant based on thresholds
    let variant = variantProp;
    if (!indeterminate && thresholds && !variantProp) {
      const successThreshold = thresholds.success ?? 50;
      const warningThreshold = thresholds.warning ?? 80;

      if (percentage < successThreshold) {
        variant = 'success';
      } else if (percentage < warningThreshold) {
        variant = 'warning';
      } else {
        variant = 'error';
      }
    }

    // Unique ID for associating the visible label with the progressbar
    const labelId = React.useId();

    // Accessible label text
    const accessibleLabel = customLabel || `Progress`;

    // Compute aria-labelledby: prefer explicit labelledBy, else link to visible label when shown
    const ariaLabelledby = labelledBy ?? (showLabel || customLabel ? labelId : undefined);

    // ARIA value text for screen readers
    const ariaValueText = valueText ??
      (showValues
        ? `${formatValue(clampedValue)} of ${formatValue(max)}`
        : undefined);

    const renderLabelChildren = () => {
      if (!showLabel && !customLabel) return null;

      return (
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          <span>{customLabel || 'Progress'}</span>
          <span className="font-medium">
            {indeterminate
              ? 'Loading...'
              : showValues
                ? `${formatValue(clampedValue)} / ${formatValue(max)}`
                : `${percentage.toFixed(0)}%`}
          </span>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || customLabel) && labelPosition === 'top' && (
          <div id={labelId} className="mb-1">{renderLabelChildren()}</div>
        )}

        {/* The outer track container carries the progressbar role per WAI-ARIA spec */}
        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={labelledBy || ariaLabelledby ? undefined : accessibleLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={describedBy}
          aria-valuetext={ariaValueText}
          aria-busy={indeterminate ? true : undefined}
          className={progressBarVariants({ size, variant })}
        >
          <div
            aria-hidden="true"
            className={cn(
              progressFillVariants({ variant }),
              indeterminate && 'animate-pulse',
              indeterminate && 'w-1/2'
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>

        {(showLabel || customLabel) && labelPosition === 'bottom' && (
          <div id={labelId} className="mt-1">{renderLabelChildren()}</div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants, progressFillVariants };
export default ProgressBar;
