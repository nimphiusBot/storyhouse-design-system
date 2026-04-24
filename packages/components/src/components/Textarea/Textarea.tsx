import React, { useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const textareaVariants = cva(
  'w-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
        filled: 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500 focus:bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800',
        error: 'border-red-300 bg-white text-gray-900 placeholder:text-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:bg-gray-800 dark:text-gray-100',
        success: 'border-green-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 dark:border-green-700 dark:bg-gray-800 dark:text-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-3 py-2 text-sm rounded-lg',
        lg: 'px-4 py-3 text-base rounded-xl',
      },
      focusRing: {
        default: 'focus:ring-2 focus:outline-none',
        none: 'focus:outline-none focus:ring-0',
        subtle: 'focus:ring-1 focus:outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      focusRing: 'default',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: React.ReactNode;
  /** Text error message displayed below the textarea */
  error?: string;
  /** Help text displayed below the textarea */
  helpText?: string;
  /** Whether the textarea spans the full width of its container */
  fullWidth?: boolean;
  /** Whether the textarea can be manually resized vertically */
  resize?: boolean;
  /** Whether the textarea auto-resizes based on content height */
  autoResize?: boolean;
  /** Show character count (works with maxLength or string value) */
  showCharCount?: boolean;
  /** Minimum number of rows to display */
  minRows?: number;
  /** Maximum number of rows before scrolling */
  maxRows?: number;
}

/**
 * Textarea
 *
 * A styled multi-line text input component with support for variants,
 * sizes, validation states, auto-resizing, character counting, and labels.
 * Follows accessibility best practices with proper aria attributes.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter a description..."
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   autoResize
 *   showCharCount
 *   maxLength={500}
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      focusRing,
      label,
      error,
      helpText,
      fullWidth = true,
      resize = false,
      autoResize = false,
      showCharCount = false,
      minRows = 3,
      maxRows,
      disabled,
      id,
      rows,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const effectiveVariant = error ? 'error' : variant;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';

        const scrollHeight = textarea.scrollHeight;
        const minHeight = minRows ? minRows * 24 : 72; // Approximate line height
        const maxHeight = maxRows ? maxRows * 24 : Infinity;

        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }, [value, autoResize, minRows, maxRows, textareaRef]);

    const charCount = typeof value === 'string' ? value.length : 0;
    const showCounter = showCharCount && (maxLength || typeof value === 'string');

    const errorId = error ? `${textareaId}-error` : undefined;
    const helpTextId = helpText ? `${textareaId}-help` : undefined;
    const counterId = showCounter ? `${textareaId}-counter` : undefined;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium',
              error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          id={textareaId}
          disabled={disabled}
          rows={rows || minRows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={[errorId, helpTextId, counterId].filter(Boolean).join(' ') || undefined}
          className={cn(
            'border',
            textareaVariants({ variant: effectiveVariant, size, focusRing }),
            resize && 'resize-y',
            className
          )}
          {...props}
        />

        {(error || helpText || showCounter) && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              {error && (
                <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
              )}

              {helpText && !error && (
                <p id={helpTextId} className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
              )}
            </div>

            {showCounter && (
              <p
                id={counterId}
                className={cn(
                  'text-xs tabular-nums',
                  maxLength && charCount > maxLength * 0.9
                    ? 'text-orange-600 font-medium dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {charCount}{maxLength && `/${maxLength}`}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
