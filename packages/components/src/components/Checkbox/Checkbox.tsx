import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const checkboxVariants = cva(
  'relative flex items-center justify-center border rounded transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-orange-600 hover:border-orange-500 focus:ring-orange-500',
        primary: 'border-orange-500 bg-white dark:bg-gray-700 text-orange-600 hover:border-orange-600 focus:ring-orange-500',
        success: 'border-green-500 bg-white dark:bg-gray-700 text-green-600 hover:border-green-600 focus:ring-green-500',
        error: 'border-red-500 bg-white dark:bg-gray-700 text-red-600 hover:border-red-600 focus:ring-red-500',
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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size = 'md',
      label,
      description,
      error,
      indeterminate = false,
      disabled,
      checked,
      onChange,
      onCheckedChange,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    const effectiveVariant = error ? 'error' : variant;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const iconSize = {
      sm: 12,
      md: 14,
      lg: 16,
    }[size || 'md'];

    const checkedBg = () => {
      switch (effectiveVariant) {
        case 'error':
          return 'bg-red-600 border-red-600';
        case 'success':
          return 'bg-green-600 border-green-600';
        case 'primary':
          return 'bg-orange-600 border-orange-600';
        default:
          return 'bg-orange-600 border-orange-600';
      }
    };

    if (!label && !description) {
      return (
        <div className="relative inline-flex">
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              checkboxVariants({ variant: effectiveVariant, size }),
              'cursor-pointer peer-focus:ring-2 peer-focus:ring-offset-1',
              checked && checkedBg(),
              className
            )}
          >
            {indeterminate ? (
              <Minus size={iconSize} className="text-white" strokeWidth={3} />
            ) : checked ? (
              <Check size={iconSize} className="text-white" strokeWidth={3} />
            ) : null}
          </label>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-3">
        <div className="relative inline-flex pt-0.5">
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              checkboxVariants({ variant: effectiveVariant, size }),
              'cursor-pointer peer-focus:ring-2 peer-focus:ring-offset-1',
              checked && checkedBg(),
              className
            )}
          >
            {indeterminate ? (
              <Minus size={iconSize} className="text-white" strokeWidth={3} />
            ) : checked ? (
              <Check size={iconSize} className="text-white" strokeWidth={3} />
            ) : null}
          </label>
        </div>

        <div className="flex-1">
          <label
            htmlFor={checkboxId}
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
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  description,
  error,
  children,
  className,
  orientation = 'vertical',
}) => {
  return (
    <div className={cn('space-y-2', className)}>
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
        {children}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
