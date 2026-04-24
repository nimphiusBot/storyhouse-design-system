import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * FormField Component
 *
 * A wrapper component for consistent form field layout and styling.
 * Handles labels, error messages, help text, and required/optional indicators.
 *
 * @example
 * ```tsx
 * <FormField label="Email" required error="Invalid email">
 *   <input type="email" className="..." />
 * </FormField>
 * ```
 */
const formFieldVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    layout: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row items-start gap-4',
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'vertical',
  },
});

const labelVariants = cva('font-medium select-none', {
  variants: {
    size: {
      sm: 'text-sm mb-1',
      md: 'text-sm mb-1.5',
      lg: 'text-base mb-2',
    },
    layout: {
      vertical: 'block',
      horizontal: 'min-w-[120px] pt-2',
    },
    error: {
      true: 'text-red-700',
      false: 'text-gray-700',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'vertical',
    error: false,
    disabled: false,
  },
});

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  /** Label text for the form field */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Help text to display below the field */
  helpText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to show optional indicator */
  showOptional?: boolean;
  /** HTML for attribute for label (should match input id) */
  htmlFor?: string;
  /** The form input/control to wrap */
  children: React.ReactNode;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom className for the label */
  labelClassName?: string;
  /** Custom className for the content wrapper */
  contentClassName?: string;
  /** Show asterisk for required fields */
  showRequiredIndicator?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      helpText,
      required = false,
      showOptional = false,
      htmlFor,
      children,
      disabled = false,
      className,
      labelClassName,
      contentClassName,
      size = 'md',
      layout = 'vertical',
      showRequiredIndicator = true,
      ...props
    },
    ref,
  ) => {
    const showRequired = required && showRequiredIndicator;
    const showOptionalText = !required && showOptional;

    return (
      <div ref={ref} className={cn(formFieldVariants({ size, layout }), className)} {...props}>
        {/* Label */}
        {label && (
          <label
            htmlFor={htmlFor}
            className={cn(labelVariants({ size, layout, error: !!error, disabled }), labelClassName)}
          >
            {label}
            {showRequired && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
            {showOptionalText && (
              <span className="text-gray-500 ml-1 font-normal text-sm">(optional)</span>
            )}
          </label>
        )}

        {/* Content wrapper for horizontal layout */}
        <div className={cn(layout === 'horizontal' && 'flex-1', contentClassName)}>
          {/* Children (form controls) */}
          {children}

          {/* Help text */}
          {helpText && !error && (
            <p
              className={cn(
                'mt-1.5',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-sm',
                disabled ? 'text-gray-400' : 'text-gray-500',
              )}
            >
              {helpText}
            </p>
          )}

          {/* Error message */}
          {error && (
            <p
              className={cn(
                'mt-1.5 text-red-600',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-sm',
              )}
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

FormField.displayName = 'FormField';

// FormGroup component for grouping related fields

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title for the form group */
  title?: string;
  /** Description for the form group */
  description?: string;
  /** Children form fields */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Add divider at bottom */
  divider?: boolean;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  className,
  divider = false,
  ...props
}) => {
  return (
    <div className={cn('space-y-4', divider && 'pb-6 border-b border-gray-200', className)} {...props}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

FormGroup.displayName = 'FormGroup';
