import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const pageHeaderTopVariants = cva(
  'sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'
);

const pageHeaderContentVariants = cva(
  'px-6 flex flex-col',
  {
    variants: {
      size: {
        sm: 'gap-2 py-3',
        md: 'gap-3 py-4',
        lg: 'gap-4 py-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const titleVariants = cva(
  'font-semibold text-gray-900 dark:text-gray-100',
  {
    variants: {
      size: {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const descriptionVariants = cva(
  'text-gray-600 dark:text-gray-400',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SelectorItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  metadata?: string;
}

export interface GreetingConfig {
  text: string;
  name?: string;
}

export interface PageHeaderTopProps extends VariantProps<typeof pageHeaderTopVariants> {
  /** The page title */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons rendered on the right */
  actions?: React.ReactNode;
  /** Icon displayed next to the title */
  icon?: React.ReactNode;
  /** Context selector dropdown */
  selector?: {
    currentItem: SelectorItem;
    items: SelectorItem[];
    onSelect: (item: SelectorItem) => void;
    searchable?: boolean;
    placeholder?: string;
  };
  /** Greeting configuration for personalized headers */
  greeting?: GreetingConfig;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * PageHeaderTop renders the top section of a page header including:
 * breadcrumbs, title, description, icon, context selector, and action buttons.
 * This component handles the sticky top bar that remains visible when scrolling.
 */
export const PageHeaderTop: React.FC<PageHeaderTopProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  icon,
  selector,
  greeting,
  size = 'md',
  className,
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close selector dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setSelectorOpen(false);
        setSelectorSearch('');
      }
    };
    if (selectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    return;
  }, [selectorOpen]);

  const filteredSelectorItems = selector?.items.filter(item =>
    !selectorSearch || item.label.toLowerCase().includes(selectorSearch.toLowerCase())
  ) ?? [];

  return (
    <div className={cn(pageHeaderTopVariants(), className)}>
      <div className={pageHeaderContentVariants({ size })}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="text-gray-400 dark:text-gray-600" aria-hidden="true">
                    /
                  </span>
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Main Header Row */}
        <div className="flex items-start justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* Left Section: Title/Description */}
          <div className="flex-1 min-w-0">
            {/* Title Row with Icon */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-0">
                {icon && (
                  <div className={cn(
                    'flex-shrink-0 flex items-center',
                    size === 'sm' && '[&>svg]:w-5 [&>svg]:h-5',
                    size === 'md' && '[&>svg]:w-6 [&>svg]:h-6',
                    size === 'lg' && '[&>svg]:w-7 [&>svg]:h-7'
                  )}>
                    {icon}
                  </div>
                )}
                {greeting && (
                  <span className={cn(descriptionVariants({ size }), 'font-normal')}>
                    {greeting.text}
                    {greeting.name && (
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {', '}{greeting.name}
                      </span>
                    )}
                    {'.'}
                  </span>
                )}
                <h1 className={cn(titleVariants({ size }), greeting && !greeting.name && 'inline')}>
                  {title}
                </h1>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className={cn(descriptionVariants({ size }), 'mt-1')}>
                {description}
              </p>
            )}
          </div>

          {/* Center Section: Selector */}
          {selector && (
            <div ref={selectorRef} className="relative flex-shrink-0">
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700',
                  'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                  'text-sm font-medium text-gray-900 dark:text-gray-100'
                )}
                aria-haspopup="listbox"
                aria-expanded={selectorOpen}
              >
                {typeof selector.currentItem.icon === 'string' ? (
                  <span className="text-lg">{selector.currentItem.icon}</span>
                ) : (
                  selector.currentItem.icon
                )}
                <span className="max-w-[200px] truncate">{selector.currentItem.label}</span>
                <ChevronDown className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  selectorOpen && 'rotate-180'
                )} />
              </button>

              {/* Dropdown */}
              {selectorOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col"
                  role="listbox"
                >
                  {selector.searchable && (
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={selector.placeholder || 'Search...'}
                          value={selectorSearch}
                          onChange={(e) => setSelectorSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                  <div className="overflow-y-auto">
                    {filteredSelectorItems.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                        No results found
                      </div>
                    ) : (
                      filteredSelectorItems.map((item) => (
                        <button
                          key={item.id}
                          role="option"
                          aria-selected={item.id === selector.currentItem.id}
                          onClick={() => {
                            selector.onSelect(item);
                            setSelectorOpen(false);
                            setSelectorSearch('');
                          }}
                          className={cn(
                            'w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left',
                            item.id === selector.currentItem.id && 'bg-orange-50 dark:bg-orange-900/20'
                          )}
                        >
                          {typeof item.icon === 'string' ? (
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                          ) : (
                            item.icon
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                              {item.label}
                            </div>
                            {item.metadata && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.metadata}
                              </div>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Section: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap md:flex-nowrap">
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PageHeaderTop.displayName = 'PageHeaderTop';

export default PageHeaderTop;
