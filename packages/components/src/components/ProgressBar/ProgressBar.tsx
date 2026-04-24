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
  /** Current numeric value */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position relative to the bar */
  labelPosition?: 'top' | 'bottom' | 'inline';
  /** Custom label text (overrides the default percentage) */
  label?: string;
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
 * percentage/value labels, and full accessibility via ARIA progressbar role.
 *
 * @example
 * ```tsx
 * <ProgressBar value={65} size="md" variant="primary" showLabel />
 * <ProgressBar
 *   value={85}
 *   thresholds={{ success: 50, warning: 80 }}
 *   showLabel
 * />
 * ```
 */
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size,
      variant: variantProp,
      showLabel = false,
      labelPosition = 'top',
      label: customLabel,
      thresholds,
      showValues = false,
      formatValue = (val) => val.toLocaleString(),
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Auto-calculate variant based on thresholds
    let variant = variantProp;
    if (thresholds && !variantProp) {
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

    // Determine label text
    const labelText = customLabel ||
      (showValues ? `${formatValue(value)} / ${formatValue(max)}` : `${percentage.toFixed(0)}%`);

    const renderLabel = () => {
      if (!showLabel && !customLabel) return null;

      return (
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          <span>{customLabel || 'Progress'}</span>
          <span className="font-medium">{showValues ? `${formatValue(value)} / ${formatValue(max)}` : `${percentage.toFixed(0)}%`}</span>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && labelPosition === 'top' && (
          <div className="mb-1">{renderLabel()}</div>
        )}

        <div className={progressBarVariants({ size, variant })}>
          <div
            className={progressFillVariants({ variant })}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={labelText}
          />
        </div>

        {showLabel && labelPosition === 'bottom' && (
          <div className="mt-1">{renderLabel()}</div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants, progressFillVariants };
export default ProgressBar;
