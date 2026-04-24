import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'py-8 px-4',
        md: 'py-12 px-6',
        lg: 'py-16 px-8',
      },
      variant: {
        'no-data': '',
        'no-results': '',
        error: '',
        'no-permission': '',
        loading: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'no-data',
    },
  }
);

const iconWrapperVariants = cva(
  'rounded-full flex items-center justify-center mb-4',
  {
    variants: {
      size: {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
      },
      variant: {
        'no-data': 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
        'no-results':
          'bg-orange-50 dark:bg-orange-900/30 text-orange-400 dark:text-orange-300',
        error: 'bg-red-50 dark:bg-red-900/30 text-red-400 dark:text-red-300',
        'no-permission':
          'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300',
        loading:
          'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'no-data',
    },
  }
);

const titleVariants = cva('font-semibold text-gray-900 dark:text-gray-100', {
  variants: {
    size: {
      sm: 'text-base mb-1',
      md: 'text-lg mb-2',
      lg: 'text-xl mb-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const descriptionVariants = cva('text-gray-600 dark:text-gray-400', {
  variants: {
    size: {
      sm: 'text-sm mb-4 max-w-xs',
      md: 'text-base mb-6 max-w-md',
      lg: 'text-lg mb-8 max-w-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface EmptyStateProps
  extends VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'no-data',
  size = 'md',
  className,
}) => {
  const renderIcon = () => {
    if (variant === 'loading') {
      const spinnerSize =
        size === 'sm'
          ? 'h-5 w-5'
          : size === 'lg'
            ? 'h-7 w-7'
            : 'h-6 w-6';
      return (
        <div className={cn(iconWrapperVariants({ size, variant }))}>
          <div
            className={cn(
              'animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-t-gray-300',
              spinnerSize
            )}
          />
        </div>
      );
    }

    if (illustration) {
      return <div className="mb-4">{illustration}</div>;
    }

    if (icon) {
      return (
        <div className={cn(iconWrapperVariants({ size, variant }))}>
          {icon}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn(emptyStateVariants({ size, variant }), className)}>
      {renderIcon()}

      <h3 className={cn(titleVariants({ size }))}>{title}</h3>

      {description && (
        <p className={cn(descriptionVariants({ size }))}>{description}</p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {primaryAction && (
            <button
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              onClick={primaryAction.onClick}
            >
              {primaryAction.icon && (
                <span className="mr-2">{primaryAction.icon}</span>
              )}
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              className="inline-flex items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
