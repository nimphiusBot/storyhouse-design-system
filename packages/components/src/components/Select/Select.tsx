import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'w-full appearance-none transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-orange-500 hover:border-gray-400 dark:hover:border-gray-500',
        filled:
          'bg-gray-100 dark:bg-gray-700 border border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:border-orange-500 hover:bg-gray-200 dark:hover:bg-gray-600',
        error:
          'bg-white dark:bg-gray-800 border-2 border-red-500 dark:border-red-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-600',
        success:
          'bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-green-600',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md pr-9',
        md: 'px-3 py-2 text-base rounded-lg pr-10',
        lg: 'px-4 py-3 text-lg rounded-xl pr-12',
      },
      focusRing: {
        default: 'focus:ring-2 focus:ring-orange-500 focus:ring-offset-1',
        none: 'focus:ring-0',
        subtle: 'focus:ring-1 focus:ring-orange-300',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      focusRing: 'default',
    },
  }
);

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'value'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  options?: (SelectOption | SelectOptionGroup)[];
  placeholder?: string;
  fullWidth?: boolean;
  /** Controlled value (single selection only) */
  value?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size = 'md',
      focusRing,
      label,
      error,
      helpText,
      options = [],
      placeholder,
      fullWidth = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const id = props.id || `select-${Math.random().toString(36).substring(2, 9)}`;
    const effectiveVariant = error ? 'error' : variant;

    const renderOptions = () => {
      if (!options || options.length === 0) {
        return children;
      }

      return (
        <>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((item, index) => {
            if ('options' in item) {
              return (
                <optgroup key={index} label={item.label}>
                  {item.options.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              );
            }
            return (
              <option key={item.value} value={item.value} disabled={item.disabled}>
                {item.label}
              </option>
            );
          })}
        </>
      );
    };

    return (
      <div className={fullWidth ? 'w-full' : 'w-auto'}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            className={selectVariants({ variant: effectiveVariant, size, focusRing, className })}
            {...props}
          >
            {renderOptions()}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              size={iconSizeMap[size || 'md']}
              className={`text-gray-400 ${disabled ? 'opacity-50' : ''}`}
            />
          </div>
        </div>

        {helpText && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
