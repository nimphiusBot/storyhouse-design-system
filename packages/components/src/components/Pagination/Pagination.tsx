import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Internal button for pagination
const PageButton: React.FC<{
  variant: 'primary' | 'outline';
  size: 'sm' | 'md';
  onClick: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-current'?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ variant, size, onClick, disabled, children, ...rest }) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary:
      'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-600',
    outline:
      'bg-white text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-orange-500',
  };
  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs min-w-[2rem] h-8',
    md: 'px-3 py-2 text-sm min-w-[2.5rem] h-10',
  };
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], rest.className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={rest['aria-label']}
      aria-current={rest['aria-current'] as React.ButtonHTMLAttributes<HTMLButtonElement>['aria-current']}
    >
      {children}
    </button>
  );
};

const paginationVariants = cva('flex items-center gap-1', {
  variants: {
    variant: {
      default: '',
      compact: 'gap-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface PaginationProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showFirstLast?: boolean;
  showPageSize?: boolean;
  showTotal?: boolean;
  showPageInput?: boolean;
  maxPageButtons?: number;
  className?: string;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  variant = 'default',
  showFirstLast = true,
  showPageSize = true,
  showTotal = true,
  showPageInput = false,
  maxPageButtons = 7,
  className,
  disabled = false,
}) => {
  const [inputPage, setInputPage] = React.useState('');

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputPage(value);
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage('');
    }
  };

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [];
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;
    pages.push(1);
    if (showLeftEllipsis) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (showRightEllipsis) pages.push('ellipsis');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size-select"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Show
            </label>
            <select
              id="page-size-select"
              value={pageSize.toString()}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-xs sm:text-sm whitespace-nowrap">per page</span>
          </div>
        )}
        {showTotal && (
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {totalItems === 0 ? (
              'No items'
            ) : (
              <>
                Showing <span className="font-medium">{startItem}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{totalItems}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
        {showPageInput && !isCompact && (
          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
            <label
              htmlFor="page-input-pag"
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
            >
              Go to
            </label>
            <input
              id="page-input-pag"
              type="text"
              value={inputPage}
              onChange={handlePageInputChange}
              placeholder={currentPage.toString()}
              disabled={disabled}
              className="w-12 sm:w-16 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-xs sm:text-sm text-center text-gray-900 dark:text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
        )}

        <div className={paginationVariants({ variant })}>
          {showFirstLast && !isCompact && (
            <PageButton
              variant="outline"
              size={isCompact ? 'sm' : 'md'}
              onClick={() => onPageChange(1)}
              disabled={disabled || currentPage === 1}
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </PageButton>
          )}

          <PageButton
            variant="outline"
            size={isCompact ? 'sm' : 'md'}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            aria-label="Go to previous page"
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            {!isCompact && <span className="hidden sm:inline">Previous</span>}
          </PageButton>

          {!isCompact &&
            pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <div
                    key={`ellipsis-${index}`}
                    className="flex items-center justify-center w-10 h-10"
                    aria-hidden="true"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                );
              }
              return (
                <PageButton
                  key={page}
                  variant={currentPage === page ? 'primary' : 'outline'}
                  size={isCompact ? 'sm' : 'md'}
                  onClick={() => onPageChange(page)}
                  disabled={disabled}
                  aria-label={`Go to page ${page}`}
                  {...(currentPage === page ? { 'aria-current': 'page' as const } : {})}
                  className={cn(
                    'min-w-[2.5rem]',
                    currentPage === page && 'pointer-events-none'
                  )}
                >
                  {page}
                </PageButton>
              );
            })}

          {isCompact && (
            <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </div>
          )}

          <PageButton
            variant="outline"
            size={isCompact ? 'sm' : 'md'}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Go to next page"
            className="flex items-center gap-1"
          >
            {!isCompact && <span className="hidden sm:inline">Next</span>}
            <ChevronRight className="h-4 w-4" />
          </PageButton>

          {showFirstLast && !isCompact && (
            <PageButton
              variant="outline"
              size={isCompact ? 'sm' : 'md'}
              onClick={() => onPageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </PageButton>
          )}
        </div>
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';
