import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const tabsVariants = cva('w-full');

const tabsListVariants = cva('flex gap-1 border-b overflow-x-auto', {
  variants: {
    variant: {
      default: 'border-gray-200 dark:border-gray-800',
      pills: 'border-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-1',
    },
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const tabsTriggerVariants = cva(
  'flex items-center gap-2 font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-b-2 border-transparent hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 dark:data-[state=active]:border-orange-500 dark:data-[state=active]:text-orange-400',
        pills:
          'rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'md',
        className: '-mb-px',
      },
    ],
  }
);

const tabsContentVariants = cva('mt-4 focus-visible:outline-none');

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsListVariants> {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface TabsListProps extends VariantProps<typeof tabsListVariants> {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps extends VariantProps<typeof tabsTriggerVariants> {
  value: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  className?: string;
}

export interface TabsContentProps {
  value: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

// Root Tabs component
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  return (
    <div className={cn(tabsVariants(), className)}>
      <TabsList variant={variant} size={size}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            activeTab={activeTab}
            onTabChange={onTabChange}
            icon={tab.icon}
            {...(typeof tab.badge !== 'undefined' ? { badge: tab.badge } : {})}
            {...(typeof tab.disabled !== 'undefined' ? { disabled: tab.disabled } : {})}
            variant={variant}
            size={size}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </div>
  );
};

// TabsList
export const TabsList: React.FC<TabsListProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  return (
    <div className={cn(tabsListVariants({ variant, size }), className)} role="tablist">
      {children}
    </div>
  );
};

// TabsTrigger
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  children,
  icon,
  badge,
  disabled = false,
  className,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => !disabled && onTabChange(value)}
      disabled={disabled}
      className={cn(
        tabsTriggerVariants({ variant, size }),
        'text-gray-600 dark:text-gray-400',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {badge !== undefined && (
        <span
          className={cn(
            'px-2 py-0.5 text-xs font-medium rounded-full',
            isActive
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

// TabsContent
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  activeTab,
  children,
  className,
}) => {
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(tabsContentVariants(), className)}
    >
      {children}
    </div>
  );
};

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
