import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface FormatOption {
  format: string;
  intent: string;
  emoji?: string;
  description?: string;
  sources: unknown[];
  defaultAspectRatio?: string;
  generationModel?: string;
}

export interface FormatSelectProps {
  options: FormatOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * FormatSelect - A rich custom select dropdown using Radix UI.
 *
 * Features:
 * - Rich content in menu items (description, badges, metadata)
 * - Smooth animations and hover states
 * - Keyboard navigation (arrow keys, type to search)
 * - Accessible (ARIA, screen reader support)
 * - Visual unity — all format info in one component
 */
export const FormatSelect: React.FC<FormatSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select a format...',
  disabled = false,
  className,
}) => {
  const selectedOption = options.find((opt) => opt.format === value);

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-4 py-3 rounded-lg',
          'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
          'border border-transparent',
          'focus:bg-white dark:focus:bg-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1',
          'transition-all duration-200',
          'text-left text-gray-900 dark:text-gray-100',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&>span[data-placeholder]]:text-gray-500',
          className,
        )}
        aria-label="Story format"
      >
        <div className="flex items-center justify-between gap-2 flex-1">
          <SelectPrimitive.Value placeholder={placeholder} asChild={!!selectedOption}>
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.emoji && <span className="text-lg">{selectedOption.emoji}</span>}
                <span className="font-medium">{selectedOption.format}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">{selectedOption.intent}</span>
              </div>
            ) : undefined}
          </SelectPrimitive.Value>
        </div>
        <SelectPrimitive.Icon>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'overflow-hidden',
            'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg',
            'z-50',
          )}
          position="popper"
          sideOffset={4}
          align="start"
          style={{ width: 'var(--radix-select-trigger-width)' }}
        >
          <SelectPrimitive.Viewport className="p-1 max-h-[320px]">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.format}
                value={option.format}
                className={cn(
                  'relative flex items-start justify-between gap-2',
                  'px-3 py-2 rounded-md',
                  'cursor-pointer select-none outline-none',
                  'transition-all duration-150',
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  'focus:bg-orange-50 dark:focus:bg-orange-950',
                  'data-[state=checked]:bg-orange-50 dark:data-[state=checked]:bg-orange-950',
                  'group',
                )}
              >
                {/* Left: Format Info */}
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {option.emoji && (
                    <span className="text-base flex-shrink-0 mt-0.5">{option.emoji}</span>
                  )}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    {/* Format Name */}
                    <SelectPrimitive.ItemText className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {option.format}
                    </SelectPrimitive.ItemText>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>{option.intent}</span>
                      <span className="text-gray-300">•</span>
                      <span>{option.sources.length} sources</span>
                      {option.defaultAspectRatio && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>{option.defaultAspectRatio}</span>
                        </>
                      )}
                      {option.generationModel && (
                        <>
                          <span className="text-gray-300">•</span>
                          <Badge variant="neutral" size="sm" className="text-[10px] px-1 py-0">
                            {option.generationModel}
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Description (1 line, truncated) */}
                    {option.description && (
                      <p className="text-xs text-gray-500 truncate">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Checkmark */}
                <SelectPrimitive.ItemIndicator className="flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-orange-600" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

FormatSelect.displayName = 'FormatSelect';

export default FormatSelect;
