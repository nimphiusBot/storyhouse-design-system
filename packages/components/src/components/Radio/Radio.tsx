import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const radioVariants = cva(
  'relative flex items-center justify-center border rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-orange-600 hover:border-orange-500 focus:ring-orange-500',
        primary: 'border-orange-500 bg-white dark:bg-gray-800 text-orange-600 hover:border-orange-600 focus:ring-orange-500',
        success: 'border-green-500 bg-white dark:bg-gray-800 text-green-600 hover:border-green-600 focus:ring-green-500',
        error: 'border-red-500 bg-white dark:bg-gray-800 text-red-600 hover:border-red-600 focus:ring-red-500',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  /** Label text displayed next to the radio button */
  label?: React.ReactNode;
  /** Additional description text shown below the label */
  description?: string;
  /** Error message displayed below the radio */
  error?: string;
}

/**
 * Radio
 *
 * A styled radio button component for selecting one option from a set.
 * Supports multiple sizes (sm, md, lg), color variants (default, primary,
 * success, error), descriptions, and error states. Can be used standalone
 * or within a RadioGroup for coordinated selection.
 *
 * @example
 * ```tsx
 * <Radio label="Option A" name="group" value="a" />
 * <Radio label="Option B" name="group" value="b" checked />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant,
      size = 'md',
      label,
      description,
      error,
      disabled,
      checked,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
    const effectiveVariant = error ? 'error' : variant;

    const dotSize = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    }[size || 'md'];

    const dotBg = effectiveVariant === 'error' ? 'bg-red-600' :
      effectiveVariant === 'success' ? 'bg-green-600' :
      'bg-orange-600';

    // If no label, return just the radio
    if (!label && !description) {
      return (
        <div className="relative inline-flex">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={radioId}
            className={cn(
              radioVariants({ variant: effectiveVariant, size }),
              'cursor-pointer peer-focus:ring-2 peer-focus:ring-offset-1 dark:peer-focus:ring-offset-gray-900',
              className
            )}
            aria-label={props['aria-label']}
          >
            {checked && (
              <div
                className={cn(
                  'rounded-full transition-all',
                  dotSize,
                  dotBg
                )}
              />
            )}
          </label>
        </div>
      );
    }

    // With label/description
    const errorId = error ? `${radioId}-error` : undefined;

    return (
      <div className="flex items-start gap-3">
        <div className="relative inline-flex pt-0.5">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={errorId}
            {...props}
          />
          <label
            htmlFor={radioId}
            className={cn(
              radioVariants({ variant: effectiveVariant, size }),
              'cursor-pointer peer-focus:ring-2 peer-focus:ring-offset-1 dark:peer-focus:ring-offset-gray-900',
              className
            )}
          >
            {checked && (
              <div
                className={cn(
                  'rounded-full transition-all',
                  dotSize,
                  dotBg
                )}
              />
            )}
          </label>
        </div>

        <div className="flex-1">
          <label
            htmlFor={radioId}
            className={cn(
              'text-sm font-medium cursor-pointer select-none',
              error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>

          {description && (
            <p className={cn(
              'text-sm mt-0.5',
              error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400',
              disabled && 'opacity-50'
            )}>
              {description}
            </p>
          )}

          {error && (
            <p id={errorId} className="text-sm text-red-600 dark:text-red-400 mt-1" role="alert">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// RadioGroup Component
export interface RadioGroupProps {
  /** Label for the group */
  label?: string;
  /** Description text for the group */
  description?: string;
  /** Error message for the group */
  error?: string;
  /** Radio components as children */
  children: React.ReactNode;
  /** Optional class name override */
  className?: string;
  /** Orientation of the radio group */
  orientation?: 'vertical' | 'horizontal';
  /** Name attribute shared by all radio children */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Callback when the selected value changes */
  onChange?: (value: string) => void;
}

/**
 * RadioGroup
 *
 * A wrapper component that coordinates a set of Radio buttons.
 * Injects the `name`, `checked`, and `onChange` props into child Radio components
 * so that only one option can be selected at a time.
 *
 * @example
 * ```tsx
 * <RadioGroup name="plan" value={selected} onChange={setSelected}>
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  description,
  error,
  children,
  className,
  orientation = 'vertical',
  name,
  value,
  onChange,
}) => {
  // Clone children and inject name, checked, and onChange props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
      const radioProps = child.props as RadioProps;
      return React.cloneElement(child, {
        name,
        checked: String(radioProps.value) === String(value),
        onChange: onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked && radioProps.value !== undefined) {
            onChange(String(radioProps.value));
          }
        } : radioProps.onChange,
      } as Partial<RadioProps>);
    }
    return child;
  });

  const errorId = error ? `radiogroup-${name}-error` : undefined;

  return (
    <div
      className={cn('space-y-2', className)}
      role="radiogroup"
      aria-label={label}
      aria-describedby={errorId}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}

      <div className={cn(
        'gap-4',
        orientation === 'vertical' ? 'flex flex-col' : 'flex flex-wrap'
      )}>
        {enhancedChildren}
      </div>

      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
      )}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

// RadioCard Component for card-style radio buttons
export interface RadioCardProps extends Omit<RadioProps, 'variant'> {
  /** Title text for the card */
  title: string;
  /** Description text for the card */
  description?: string;
  /** Icon element to display on the left side */
  icon?: React.ReactNode;
  /** Badge element to display on the right side */
  badge?: React.ReactNode;
}

/**
 * RadioCard
 *
 * A card-style radio button for richer selection interfaces.
 * Displays as a bordered card with radio indicator, icon, title,
 * description, and optional badge. Supports checked, disabled, and
 * focus states.
 *
 * @example
 * ```tsx
 * <RadioCard
 *   title="Pro Plan"
 *   description="$29/mo - Full access to all features"
 *   name="plan"
 *   value="pro"
 *   checked={selected === 'pro'}
 * />
 * ```
 */
export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  (
    {
      className,
      size = 'md',
      title,
      description,
      icon,
      badge,
      disabled,
      checked,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-card-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="relative">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={radioId}
          className={cn(
            'flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all',
            'hover:border-orange-300 hover:bg-orange-50/50 dark:hover:border-orange-700 dark:hover:bg-orange-900/10',
            'peer-focus:ring-2 peer-focus:ring-orange-500 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-gray-900',
            checked ? 'border-orange-500 bg-orange-50 dark:border-orange-600 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
            disabled && 'opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-white dark:hover:border-gray-700 dark:hover:bg-gray-800',
            className
          )}
        >
          {/* Radio indicator */}
          <div className="flex-shrink-0 pt-0.5">
            <div
              className={cn(
                'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                checked ? 'border-orange-600' : 'border-gray-300 dark:border-gray-600'
              )}
            >
              {checked && (
                <div className="h-2.5 w-2.5 rounded-full bg-orange-600" />
              )}
            </div>
          </div>

          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className={cn(
                'font-medium',
                checked ? 'text-orange-900 dark:text-orange-200' : 'text-gray-900 dark:text-gray-100'
              )}>
                {title}
              </p>
              {badge && (
                <div className="flex-shrink-0">
                  {badge}
                </div>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </label>
      </div>
    );
  }
);

RadioCard.displayName = 'RadioCard';
