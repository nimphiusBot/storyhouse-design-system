import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const pageHeaderBottomVariants = cva('bg-white dark:bg-gray-900')

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
)

/** Tab navigation item */
export interface TabItem {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: number | string
}

export interface PageHeaderBottomProps extends VariantProps<typeof pageHeaderBottomVariants> {
  /** Page info bar content */
  pageInfo?: {
    left?: React.ReactNode
    right?: React.ReactNode
  }
  /** @deprecated Use pageInfo.left instead */
  metadata?: React.ReactNode
  /** @deprecated Use pageInfo.right instead */
  status?: React.ReactNode
  /** Toolbar content (filters, additional controls) */
  toolbar?: React.ReactNode
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
 * PageHeaderBottom provides the bottom section of a page header including metadata,
 * toolbar, and tab navigation.
 */
export const PageHeaderBottom: React.FC<PageHeaderBottomProps> = ({
  pageInfo,
  metadata,
  status,
  toolbar,
  tabs,
  activeTab,
  onTabChange,
  size = 'md',
  className,
}) => {
  if (!pageInfo?.left && !pageInfo?.right && !metadata && !status && !toolbar && (!tabs || tabs.length === 0)) {
    return null
  }

  return (
    <div className={cn(pageHeaderBottomVariants(), className)}>
      <div className={pageHeaderContentVariants({ size })}>
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

        {toolbar && <div className="w-full">{toolbar}</div>}

        {tabs && tabs.length > 0 && (
          <div className="flex gap-1 -mb-px overflow-x-auto border-b border-gray-200 dark:border-gray-800">
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
        )}
      </div>
    </div>
  )
}
PageHeaderBottom.displayName = 'PageHeaderBottom'
