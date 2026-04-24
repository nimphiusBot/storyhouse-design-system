import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { Calendar, Clock, X } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * DateTimePicker Component
 *
 * A flexible date and time picker component with multiple modes.
 * Supports date-only, time-only, and combined date-time selection.
 *
 * @example
 * ```tsx
 * <DateTimePicker
 *   label="Select Date"
 *   mode="date"
 *   value={date}
 *   onChange={setDate}
 * />
 * ```
 */
const dateTimePickerVariants = cva(
  'w-full px-3 py-2 border rounded-lg transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 bg-white text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500',
        filled:
          'border-transparent bg-gray-100 text-gray-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500',
        error:
          'border-red-300 bg-red-50 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-500',
        success:
          'border-green-300 bg-green-50 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500',
      },
      size: {
        sm: 'text-sm h-8',
        md: 'text-base h-10',
        lg: 'text-lg h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type DateTimeMode = 'date' | 'time' | 'datetime';

export interface DateTimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'min' | 'max'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  helpText?: string;
  /** Picker mode */
  mode?: DateTimeMode;
  /** Current value (ISO string or Date) */
  value?: string | Date | null;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'filled' | 'error' | 'success';
  /** Change handler */
  onChange?: (value: string | null) => void;
  /** Show clear button */
  clearable?: boolean;
  /** Minimum date (ISO string or Date) */
  min?: string | Date;
  /** Maximum date (ISO string or Date) */
  max?: string | Date;
  /** Custom format display (placeholder for future enhancement) */
  format?: string;
  /** Show icon */
  showIcon?: boolean;
}

export const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  (
    {
      label,
      error,
      helpText,
      mode = 'date',
      value,
      onChange,
      clearable = true,
      min,
      max,
      format,
      showIcon = true,
      variant = 'default',
      size = 'md',
      className,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Determine input type based on mode
    const inputType = mode === 'date' ? 'date' : mode === 'time' ? 'time' : 'datetime-local';

    // Convert value to appropriate format
    useEffect(() => {
      if (value) {
        const dateObj = typeof value === 'string' ? new Date(value) : value;

        if (mode === 'date') {
          const splitDate = dateObj.toISOString().split('T');
          setInternalValue(splitDate[0] ?? '');
        } else if (mode === 'time') {
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          setInternalValue(`${hours}:${minutes}`);
        } else {
          // datetime-local format: YYYY-MM-DDTHH:mm
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          setInternalValue(`${year}-${month}-${day}T${hours}:${minutes}`);
        }
      } else {
        setInternalValue('');
      }
    }, [value, mode]);

    // Convert min/max to appropriate format
    const minValue = (min
      ? typeof min === 'string'
        ? min
        : (min.toISOString().split('T')[0] ?? '')
      : undefined) as string | undefined;

    const maxValue = (max
      ? typeof max === 'string'
        ? max
        : (max.toISOString().split('T')[0] ?? '')
      : undefined) as string | undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      if (onChange) {
        if (newValue) {
          // Convert to ISO string
          if (mode === 'time') {
            // For time-only, create a date with today's date
            const today = new Date();
            const timeParts = newValue.split(':');
            const hours = timeParts[0] ?? '0';
            const minutes = timeParts[1] ?? '0';
            today.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            onChange(today.toISOString());
          } else {
            onChange(new Date(newValue).toISOString());
          }
        } else {
          onChange(null);
        }
      }
    };

    const handleClear = () => {
      setInternalValue('');
      if (onChange) {
        onChange(null);
      }
    };

    const effectiveVariant = error ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-1.5',
              error ? 'text-red-700' : 'text-gray-700',
              disabled && 'opacity-50',
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {showIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none',
                size === 'sm' && 'left-2',
                size === 'lg' && 'left-4',
              )}
            >
              {mode === 'time' ? (
                <Clock
                  className={cn(
                    'text-gray-400',
                    size === 'sm' && 'h-3 w-3',
                    size === 'md' && 'h-4 w-4',
                    size === 'lg' && 'h-5 w-5',
                  )}
                />
              ) : (
                <Calendar
                  className={cn(
                    'text-gray-400',
                    size === 'sm' && 'h-3 w-3',
                    size === 'md' && 'h-4 w-4',
                    size === 'lg' && 'h-5 w-5',
                  )}
                />
              )}
            </div>
          )}

          <input
            ref={ref || inputRef}
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            min={minValue}
            max={maxValue}
            disabled={disabled}
            required={required}
            className={cn(
              dateTimePickerVariants({ variant: effectiveVariant, size }),
              showIcon && 'pl-10',
              clearable && internalValue && 'pr-10',
              className,
            )}
            {...props}
          />

          {clearable && internalValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors',
                size === 'sm' && 'right-2',
                size === 'lg' && 'right-4',
              )}
              tabIndex={-1}
            >
              <X
                className={cn(
                  size === 'sm' && 'h-3 w-3',
                  size === 'md' && 'h-4 w-4',
                  size === 'lg' && 'h-5 w-5',
                )}
              />
            </button>
          )}
        </div>

        {helpText && !error && (
          <p className={cn('mt-1.5 text-sm text-gray-500', disabled && 'opacity-50')}>
            {helpText}
          </p>
        )}

        {error && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';

// DateRangePicker Component

export interface DateRangePickerProps extends Omit<DateTimePickerProps, 'value' | 'onChange'> {
  /** Start date value */
  startValue?: string | Date | null;
  /** End date value */
  endValue?: string | Date | null;
  /** Change handler for start date */
  onStartChange?: (value: string | null) => void;
  /** Change handler for end date */
  onEndChange?: (value: string | null) => void;
  /** Label for start date */
  startLabel?: string;
  /** Label for end date */
  endLabel?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  startLabel = 'Start Date',
  endLabel = 'End Date',
  variant,
  size,
  error,
  helpText,
  disabled,
  required,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <DateTimePicker
        label={startLabel}
        value={startValue}
        onChange={onStartChange}
        max={endValue || undefined}
        variant={variant}
        size={size}
        disabled={disabled}
        required={required}
        {...props}
      />

      <DateTimePicker
        label={endLabel}
        value={endValue}
        onChange={onEndChange}
        min={startValue || undefined}
        variant={variant}
        size={size}
        error={error}
        helpText={helpText}
        disabled={disabled}
        required={required}
        {...props}
      />
    </div>
  );
};

DateRangePicker.displayName = 'DateRangePicker';
