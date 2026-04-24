import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const pageHeaderMiddleVariants = cva('bg-white dark:bg-gray-900')

const pageHeaderContentVariants = cva(
  'px-6 flex flex-col',
  {
    variants: {
      size: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface PageHeaderMiddleProps extends VariantProps<typeof pageHeaderMiddleVariants> {
  /** Page info bar content (left and right sections) */
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
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

/**
 * PageHeaderMiddle provides the middle section of a page header with metadata,
 * status indicators, and toolbar content.
 */
export const PageHeaderMiddle: React.FC<PageHeaderMiddleProps> = ({
  pageInfo,
  metadata,
  status,
  toolbar,
  size = 'md',
  className,
}) => {
  if (!pageInfo?.left && !pageInfo?.right && !metadata && !status && !toolbar) {
    return null
  }

  return (
    <div className={cn(pageHeaderMiddleVariants(), className)}>
      <div className={pageHeaderContentVariants({ size })}>
        {(pageInfo?.left || pageInfo?.right || metadata || status) && (
          <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
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
      </div>
    </div>
  )
}
PageHeaderMiddle.displayName = 'PageHeaderMiddle'
