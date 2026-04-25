import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface CollapsibleProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Trigger content (always visible) */
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Visual variant */
  variant?: 'default' | 'card' | 'ghost';
}

/**
 * Collapsible
 *
 * A simple toggle section that shows/hides content when clicked.
 * Supports controlled and uncontrolled modes, three visual variants,
 * and smooth animation.
 *
 * @example
 * ```tsx
 * <Collapsible trigger="Show details">
 *   <p>Hidden content revealed when trigger is clicked.</p>
 * </Collapsible>
 * ```
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  className,
  variant = 'default',
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const variantClasses: Record<string, string> = {
    default: 'rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm',
    card: 'rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md',
    ghost: '',
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset',
          variant !== 'ghost' && 'rounded-t-xl',
          isOpen && variant !== 'ghost' && 'border-b border-gray-200 dark:border-gray-800 rounded-b-none',
          !isOpen && variant !== 'ghost' && 'rounded-xl',
          'transition-colors'
        )}
        aria-expanded={isOpen}
      >
        <span>{trigger}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          !isOpen && 'max-h-0',
          isOpen && variant !== 'ghost' && 'p-4'
        )}
      >
        <div className={cn('text-sm text-gray-600 dark:text-gray-400', !isOpen && 'hidden')}>
          {children}
        </div>
      </div>
    </div>
  );
};

Collapsible.displayName = 'Collapsible';
