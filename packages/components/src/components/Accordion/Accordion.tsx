import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Root context ──────────────────────────────────────────────────────
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  variant: 'default' | 'bordered' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion sub-components must be used within <Accordion>');
  return ctx;
}

// ─── Item context ──────────────────────────────────────────────────────
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(): AccordionItemContextValue {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error('AccordionItem sub-components must be used within <AccordionItem>');
  return ctx;
}

// ─── Root ──────────────────────────────────────────────────────────────
export interface AccordionProps {
  /** Allow only one open item ('single') or multiple ('multiple') */
  type?: 'single' | 'multiple';
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'ghost';
  /** Size of accordion items */
  size?: 'sm' | 'md' | 'lg';
  /** Controlled: current open item value(s) */
  value?: string[];
  /** Uncontrolled: default open item value(s) */
  defaultValue?: string[];
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  variant = 'default',
  size = 'md',
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const openItems = isControlled ? controlledValue : internalValue;

  // Keep refs so toggleItem always reads the latest values without recreating the callback
  const openItemsRef = React.useRef(openItems);
  openItemsRef.current = openItems;

  const typeRef = React.useRef(type);
  typeRef.current = type;

  const isControlledRef = React.useRef(isControlled);
  isControlledRef.current = isControlled;

  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      const current = openItemsRef.current;
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : typeRef.current === 'single'
          ? [itemValue]
          : [...current, itemValue];

      if (!isControlledRef.current) setInternalValue(next);
      onValueChangeRef.current?.(next);
    },
    []
  );

  const variants: Record<string, string> = {
    default: 'divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm',
    bordered: 'divide-y divide-gray-200 dark:divide-gray-800',
    ghost: 'divide-y divide-gray-100 dark:divide-gray-800',
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, variant, size }}>
      <div className={cn(variants[variant], className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';

// ─── Item ──────────────────────────────────────────────────────────────
export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className,
  disabled = false,
}) => {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={cn(
          disabled && 'opacity-50 pointer-events-none',
          '[&:first-child>div:first-child]:rounded-t-[inherit] [&:last-child>div:first-child]:rounded-b-[inherit]',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        data-accordion-value={value}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

AccordionItem.displayName = 'AccordionItem';

// ─── Trigger ───────────────────────────────────────────────────────────
export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  /** Optional icon or element shown before the label */
  icon?: React.ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  icon,
}) => {
  const ctx = useAccordionContext();
  const itemCtx = useAccordionItemContext();

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-3 text-sm gap-2',
    lg: 'px-5 py-4 text-base gap-3',
  };

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(itemCtx.value)}
      className={cn(
        'flex w-full items-center justify-between text-left font-medium transition-colors',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset',
        'text-gray-900 dark:text-gray-100',
        sizeClasses[ctx.size],
        className
      )}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="flex-shrink-0 text-gray-500">{icon}</span>}
        {children}
      </span>
      <ChevronDown
        className={cn(
          'h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200',
          itemCtx.isOpen && 'rotate-180'
        )}
      />
    </button>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';

// ─── Content ───────────────────────────────────────────────────────────
export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const itemCtx = useAccordionItemContext();

  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        itemCtx.isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className
      )}
    >
      <div className="overflow-hidden">
        <div className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionContent.displayName = 'AccordionContent';
