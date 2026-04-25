import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronRight, Home } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Visual variant */
  variant?: 'default' | 'simple' | 'arrow';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Class name override */
  className?: string;
  /** Max items to show before collapsing (0 = no limit) */
  maxItems?: number;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-xs gap-1',
  md: 'text-sm gap-1.5',
  lg: 'text-base gap-2',
};

const separatorIcons: Record<string, React.ReactNode> = {
  default: <ChevronRight className="h-3.5 w-3.5" />,
  arrow: <span className="text-gray-400">→</span>,
  simple: <span className="text-gray-300 dark:text-gray-600">/</span>,
};

/**
 * Breadcrumb
 *
 * Navigation breadcrumbs showing the current page location within the site
 * hierarchy. Supports three visual variants, three sizes, collapsing with
 * ellipsis, and home icon support.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Widget' },
 *   ]}
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'default',
  size = 'md',
  className,
  maxItems = 0,
}) => {
  const separator = separatorIcons[variant];

  const visibleItems = (() => {
    if (!maxItems || items.length <= maxItems) return items;
    const first = items[0]!;
    const last = items[items.length - 1]!;
    const middle = items.slice(1, -1);
    return [
      first,
      ...(middle.length > 0
        ? [{ label: '...' as const, href: undefined }]
        : []),
      last,
    ];
  })();

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex items-center flex-wrap', sizeClasses[size])}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span
                  className="flex-shrink-0 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
              {isLast ? (
                <span
                  className={cn(
                    'font-medium text-gray-900 dark:text-gray-100',
                    variant === 'simple' && 'font-normal'
                  )}
                  aria-current="page"
                >
                  {item.label === '...' ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    <>
                      {index === 0 && (item.icon ?? <Home className="h-3.5 w-3.5 inline -mt-0.5 mr-1" />)}
                      {item.label}
                    </>
                  )}
                </span>
              ) : (
                item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded'
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.label}
                  </span>
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
