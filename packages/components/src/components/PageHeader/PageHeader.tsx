import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Re-export sub-components and types
export { PageHeaderTop } from './PageHeaderTop';
export type { PageHeaderTopProps, BreadcrumbItem, SelectorItem, GreetingConfig } from './PageHeaderTop';
export { PageHeaderMiddle } from './PageHeaderMiddle';
export type { PageHeaderMiddleProps } from './PageHeaderMiddle';
export { PageHeaderTabs } from './PageHeaderTabs';
export type { PageHeaderTabsProps, TabItem } from './PageHeaderTabs';
export { PageHeaderBottom } from './PageHeaderBottom';
export type { PageHeaderBottomProps } from './PageHeaderBottom';

// Import types for internal use
import type { BreadcrumbItem, SelectorItem, GreetingConfig } from './PageHeaderTop';
import type { TabItem } from './PageHeaderTabs';

const pageHeaderVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
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

export interface PageHeaderProps extends VariantProps<typeof pageHeaderVariants> {
  /** The page title */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons rendered on the right */
  actions?: React.ReactNode;
  /** Array of tab items for page-level navigation */
  tabs?: TabItem[];
  /** Currently active tab value */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Icon displayed next to the title */
  icon?: React.ReactNode;
  /** Page info bar: left (metadata/context) and right (status indicators) */
  pageInfo?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  /** @deprecated Use pageInfo.left instead */
  metadata?: React.ReactNode;
  /** @deprecated Use pageInfo.right instead */
  status?: React.ReactNode;
  /** Context selector dropdown */
  selector?: {
    currentItem: SelectorItem;
    items: SelectorItem[];
    onSelect: (item: SelectorItem) => void;
    searchable?: boolean;
    placeholder?: string;
  };
  /** Toolbar with filters and additional controls */
  toolbar?: React.ReactNode;
  /** Greeting configuration for personalized headers */
  greeting?: GreetingConfig;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PageHeader is the main page-level header component that combines:
 * - PageHeaderTop: breadcrumbs, title, description, icon, selector, actions
 * - PageHeaderMiddle: page info bar, toolbar
 * - PageHeaderTabs: horizontal tab navigation
 * - PageHeaderBottom: combined info bar + toolbar + tabs
 *
 * For more granular control, use the sub-components directly.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Dashboard"
 *   description="Welcome back!"
 *   breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
 *   actions={<Button>Create</Button>}
 * />
 * ```
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  tabs,
  activeTab,
  onTabChange,
  size = 'md',
  className,
  icon,
  pageInfo,
  metadata,
  status,
  selector,
  toolbar,
  greeting,
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
    <div className={cn(pageHeaderVariants({ size }), className)}>
      {/* STICKY TOP BAR - Icon, Title, Description, Selector, Actions */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
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

      {/* SCROLLABLE SECTION - PageInfo, Toolbar, Tabs */}
      {((pageInfo?.left || pageInfo?.right || metadata || status) || toolbar || (tabs && tabs.length > 0)) && (
        <div className="bg-white dark:bg-gray-900">
          <div className={pageHeaderContentVariants({ size })}>
            {/* Page Info Bar */}
            {(pageInfo?.left || pageInfo?.right || metadata || status) && (
              <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                  {pageInfo?.left || metadata}
                </div>
                {(pageInfo?.right || status) && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {pageInfo?.right || status}
                  </div>
                )}
              </div>
            )}

            {/* Toolbar */}
            {toolbar && (
              <div className="w-full">
                {toolbar}
              </div>
            )}

            {/* Tabs */}
            {tabs && tabs.length > 0 && (
              <div className="flex gap-1 -mb-px overflow-x-auto" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    role="tab"
                    aria-selected={activeTab === tab.value}
                    onClick={() => onTabChange?.(tab.value)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
                      activeTab === tab.value
                        ? 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                    aria-current={activeTab === tab.value ? 'page' : undefined}
                  >
                    {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                    {tab.label}
                    {tab.badge !== undefined && (
                      <span className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded-full',
                        activeTab === tab.value
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      )}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

PageHeader.displayName = 'PageHeader';

export default PageHeader;
