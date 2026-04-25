import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X, AlertCircle, CheckCircle2, AlertTriangle, Info, Lightbulb } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const variantConfig = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
    closeHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
    closeIcon: 'text-blue-500 dark:text-blue-400',
    defaultIcon: Info,
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-200',
    message: 'text-green-700 dark:text-green-300',
    closeHover: 'hover:bg-green-100 dark:hover:bg-green-900/50',
    closeIcon: 'text-green-500 dark:text-green-400',
    defaultIcon: CheckCircle2,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
    closeHover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/50',
    closeIcon: 'text-yellow-500 dark:text-yellow-400',
    defaultIcon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
    closeHover: 'hover:bg-red-100 dark:hover:bg-red-900/50',
    closeIcon: 'text-red-500 dark:text-red-400',
    defaultIcon: AlertCircle,
  },
  tip: {
    container: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    title: 'text-purple-900 dark:text-purple-200',
    message: 'text-purple-700 dark:text-purple-300',
    closeHover: 'hover:bg-purple-100 dark:hover:bg-purple-900/50',
    closeIcon: 'text-purple-500 dark:text-purple-400',
    defaultIcon: Lightbulb,
  },
};

export type AlertVariant = keyof typeof variantConfig;

export interface AlertProps {
  /** Visual variant */
  variant?: AlertVariant;
  /** Optional title shown above the message */
  title?: string;
  /** Alert message content */
  children: React.ReactNode;
  /** Custom icon override (or null to hide) */
  icon?: React.ReactNode | null;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Alert
 *
 * Inline notification banners for displaying contextual messages to users.
 * Supports five variants (info, success, warning, error, tip), optional title,
 * custom icon, and dismissible mode.
 *
 * Built with full accessibility — role="alert", proper color contrast, and
 * keyboard-dismissible close button.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Saved!" dismissible>
 *   Your changes have been saved successfully.
 * </Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const config = variantConfig[variant];
  const IconComponent = config.defaultIcon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative flex gap-3 rounded-xl border p-4',
        config.container,
        className
      )}
    >
      {/* Icon */}
      {icon !== null && (
        <div className={cn('flex-shrink-0 mt-0.5', config.icon)}>
          {icon ?? <IconComponent className="h-5 w-5" />}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('text-sm font-semibold mb-1', config.title)}>
            {title}
          </p>
        )}
        <div className={cn('text-sm', config.message)}>
          {children}
        </div>
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 rounded-md p-1 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
            config.closeHover
          )}
          aria-label="Dismiss"
        >
          <X className={cn('h-4 w-4', config.closeIcon)} />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
