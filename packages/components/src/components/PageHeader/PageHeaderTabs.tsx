import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const pageHeaderTabsVariants = cva(
  'sticky top-[88px] z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'
)

const pageHeaderContentVariants = cva(
  'px-6',
  {
    variants: {
      size: {
        sm: 'pt-2 pb-0',
        md: 'pt-3 pb-0',
        lg: 'pt-4 pb-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

/** Tab navigation item */
export interface TabItem {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: number | string
}

export interface PageHeaderTabsProps extends VariantProps<typeof pageHeaderTabsVariants> {
  /** Tab items */
  tabs?: TabItem[]
  /** Currently active tab value */
  activeTab?: string
  /** Callback when tab selection changes */
  onTabChange?: (value: string) => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

/**
 * PageHeaderTabs provides tab navigation for page headers with optional icons and badges.
 */
export const PageHeaderTabs: React.FC<PageHeaderTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  size = 'md',
  className,
}) => {
  if (!tabs || tabs.length === 0) {
    return null
  }

  return (
    <div className={cn(pageHeaderTabsVariants(), className)}>
      <div className={pageHeaderContentVariants({ size })}>
        <div className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
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
      </div>
    </div>
  )
}
PageHeaderTabs.displayName = 'PageHeaderTabs'
