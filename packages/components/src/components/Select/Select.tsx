import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Check } from 'lucide-react';

const selectTriggerVariants = cva(
  'w-full flex items-center justify-between transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-3 py-2 text-base rounded-lg',
        lg: 'px-4 py-3 text-lg rounded-xl',
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

const optionFontSizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

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

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  options?: (SelectOption | SelectOptionGroup)[];
  placeholder?: string;
  fullWidth?: boolean;
  /** Controlled value (single selection only) */
  value?: string;
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Class name override for the trigger */
  className?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Mark as required */
  required?: boolean;
  /** The id of the select */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Children as options (alternative to options prop) */
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
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
      placeholder = 'Select...',
      fullWidth = true,
      disabled = false,
      required = false,
      value,
      defaultValue,
      onChange,
      id,
      name,
      children,
    },
    ref
  ) => {
    const generatedId = useRef(`select-${Math.random().toString(36).substring(2, 9)}`).current;
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const effectiveVariant = error ? 'error' : variant;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value ?? defaultValue);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Sync controlled value
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Build flat list of options for keyboard navigation
    const flatOptions = React.useMemo(() => {
      if (children) return [];
      const flat: { value: string; label: string; disabled?: boolean; groupLabel?: string }[] = [];
      for (const item of options) {
        if ('options' in item) {
          for (const opt of item.options) {
            flat.push({ ...opt, groupLabel: item.label });
          }
        } else {
          flat.push(item);
        }
      }
      return flat;
    }, [options, children]);

    // Find selected label
    useEffect(() => {
      if (children) return;
      const selected = flatOptions.find((o) => o.value === selectedValue);
      setSelectedLabel(selected?.label ?? '');
    }, [selectedValue, flatOptions, children]);

    // Resolve current value
    const currentValue = value !== undefined ? value : selectedValue;

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            setIsOpen((prev) => !prev);
            if (!isOpen) {
              const idx = flatOptions.findIndex((o) => o.value === currentValue);
              setFocusedIndex(idx >= 0 ? idx : 0);
            }
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(0);
            } else {
              setFocusedIndex((prev) => {
                const max = flatOptions.length - 1;
                return prev < max ? prev + 1 : 0;
              });
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(flatOptions.length - 1);
            } else {
              setFocusedIndex((prev) => {
                const max = flatOptions.length - 1;
                return prev > 0 ? prev - 1 : max;
              });
            }
            break;
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
          case 'Home':
            e.preventDefault();
            setFocusedIndex(0);
            break;
          case 'End':
            e.preventDefault();
            setFocusedIndex(flatOptions.length - 1);
            break;
        }
      },
      [disabled, isOpen, flatOptions, currentValue]
    );

    const selectOption = useCallback(
      (option: { value: string; label: string; disabled?: boolean }) => {
        if (option.disabled) return;
        const newValue = option.value;
        setSelectedValue(newValue);
        setSelectedLabel(option.label);
        onChange?.(newValue);
        setIsOpen(false);
        triggerRef.current?.focus();
      },
      [onChange]
    );

    const handleListKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedIndex >= 0 && focusedIndex < flatOptions.length) {
              const opt = flatOptions[focusedIndex];
              if (opt) selectOption(opt);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
          case 'ArrowDown':
            e.preventDefault();
            setFocusedIndex((prev) => {
              const max = flatOptions.length - 1;
              return prev < max ? prev + 1 : 0;
            });
            break;
          case 'ArrowUp':
            e.preventDefault();
            setFocusedIndex((prev) => {
              const max = flatOptions.length - 1;
              return prev > 0 ? prev - 1 : max;
            });
            break;
          case 'Home':
            e.preventDefault();
            setFocusedIndex(0);
            break;
          case 'End':
            e.preventDefault();
            setFocusedIndex(flatOptions.length - 1);
            break;
          case 'Tab':
            setIsOpen(false);
            break;
        }
      },
      [disabled, flatOptions, focusedIndex, selectOption]
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          listRef.current &&
          !listRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    // Focus management on list open
    useEffect(() => {
      if (isOpen && listRef.current && focusedIndex >= 0) {
        const items = listRef.current.querySelectorAll<HTMLLIElement>('[role="option"]');
        items[focusedIndex]?.focus();
      }
    }, [isOpen, focusedIndex]);

    const renderOptionList = () => {
      if (children) return children;

      if (!options || options.length === 0) {
        return (
          <li className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500 italic cursor-default" role="option" aria-disabled="true">
            {placeholder || 'No options'}
          </li>
        );
      }

      let globalIndex = -1;

      return options.map((item, groupIdx) => {
        if ('options' in item) {
          return (
            <li key={`group-${groupIdx}`} role="presentation">
              <div
                className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50"
                role="presentation"
              >
                {item.label}
              </div>
              <ul role="presentation" className="list-none p-0 m-0">
                {item.options.map((opt) => {
                  globalIndex++;
                  const idx = globalIndex;
                  const isSelected = opt.value === currentValue;
                  const isFocused = idx === focusedIndex;

                  return renderOptionItem(opt, idx, isSelected, isFocused);
                })}
              </ul>
            </li>
          );
        }

        globalIndex++;
        const idx = globalIndex;
        const isSelected = item.value === currentValue;
        const isFocused = idx === focusedIndex;

        return renderOptionItem(item, idx, isSelected, isFocused);
      });
    };

    const renderOptionItem = (
      opt: SelectOption,
      idx: number,
      isSelected: boolean,
      isFocused: boolean
    ) => {
      const sizeFontClass = optionFontSizeMap[size || 'md'];

      return (
        <li
          key={opt.value}
          id={`${listboxId}-option-${idx}`}
          role="option"
          aria-selected={isSelected}
          aria-disabled={opt.disabled || undefined}
          tabIndex={-1}
          className={`${sizeFontClass} px-3 py-2 cursor-pointer flex items-center justify-between transition-colors ${
            opt.disabled
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : isSelected
              ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-medium'
              : isFocused && !opt.disabled
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
          onMouseEnter={() => !opt.disabled && setFocusedIndex(idx)}
          onMouseDown={(e) => {
            e.preventDefault();
            selectOption(opt);
          }}
        >
          <span>{opt.label}</span>
          {isSelected && !opt.disabled && (
            <Check size={16} className="text-orange-500 flex-shrink-0 ml-2" />
          )}
        </li>
      );
    };

    return (
      <div ref={ref} className={fullWidth ? 'w-full' : 'w-auto'}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          <button
            ref={triggerRef}
            id={selectId}
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={
              focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined
            }
            aria-invalid={!!error || undefined}
            aria-required={required || undefined}
            aria-disabled={disabled || undefined}
            aria-label={label || undefined}
            disabled={disabled}
            name={name}
            className={selectTriggerVariants({
              variant: effectiveVariant,
              size,
              focusRing,
              className,
            })}
            onClick={(e) => {
              if (disabled) return;
              e.preventDefault();
              setIsOpen((prev) => !prev);
              if (!isOpen) {
                const idx = flatOptions.findIndex((o) => o.value === currentValue);
                setFocusedIndex(idx >= 0 ? idx : 0);
              }
            }}
            onKeyDown={handleTriggerKeyDown}
          >
            <span className={selectedLabel ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}>
              {selectedLabel || placeholder}
            </span>
            <ChevronDown
              size={iconSizeMap[size || 'md']}
              className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'opacity-50' : ''}`}
            />
          </button>

          {isOpen && (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label || 'Select options'}
              tabIndex={-1}
              onKeyDown={handleListKeyDown}
              onBlur={(e) => {
                // Don't close if focus moves within the listbox
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsOpen(false);
                }
              }}
              className={`absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-auto max-h-60 focus:outline-none ${
                optionFontSizeMap[size || 'md']
              }`}
            >
              {renderOptionList()}
            </ul>
          )}
        </div>

        {helpText && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
        )}

        {/* Hidden native select for form submission */}
        {name && (
          <select
            name={name}
            value={currentValue || ''}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            aria-readonly="true"
            onChange={() => {}} // Prevent React warning
          >
            {flatOptions.map((opt) => (
              <option key={opt.value} value={opt.value} />
            ))}
          </select>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
