import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  show?: boolean;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  show = true,
  duration = 3000,
  position = 'top-right',
  onClose,
}) => {
  useEffect(() => {
    if (!show || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50 dark:bg-green-950',
          textColor: 'text-green-800 dark:text-green-200',
          borderColor: 'border-green-200 dark:border-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-500 dark:text-green-400',
        };
      case 'error':
        return {
          bgColor: 'bg-red-50 dark:bg-red-950',
          textColor: 'text-red-800 dark:text-red-200',
          borderColor: 'border-red-200 dark:border-red-800',
          icon: XCircle,
          iconColor: 'text-red-500 dark:text-red-400',
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50 dark:bg-yellow-950',
          textColor: 'text-yellow-800 dark:text-yellow-200',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          icon: AlertCircle,
          iconColor: 'text-yellow-500 dark:text-yellow-400',
        };
      case 'info':
        return {
          bgColor: 'bg-orange-50 dark:bg-orange-950',
          textColor: 'text-orange-800 dark:text-orange-200',
          borderColor: 'border-orange-200 dark:border-orange-800',
          icon: Info,
          iconColor: 'text-orange-500 dark:text-orange-400',
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-900',
          textColor: 'text-gray-800 dark:text-gray-200',
          borderColor: 'border-gray-200 dark:border-gray-700',
          icon: Info,
          iconColor: 'text-gray-500 dark:text-gray-400',
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <div className={`fixed z-[60] ${positionClasses[position]}`}>
      <div className="animate-in fade-in duration-300">
        <div
          className={`rounded-lg shadow-lg p-4 border max-w-sm ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        >
          <div className="flex items-start space-x-3">
            <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToastContext {
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  ToastContainer: React.FC<{ position?: ToastPosition }>;
}

/**
 * Monotonically incrementing counter for unique toast IDs.
 * Ensures every toast gets a unique identifier even when multiple
 * toasts are triggered within the same millisecond — preventing
 * duplicate toasts from being de-duplicated by React keys.
 */
let toastIdCounter = 0;

function generateToastId(): string {
  toastIdCounter += 1;
  return `${Date.now()}-${toastIdCounter}`;
}

export const useToast = (): ToastContext => {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string;
      message: string;
      type: Required<ToastProps>['type'];
      duration?: number;
    }>
  >([]);

  const showToast = React.useCallback(
    (message: string, type: Required<ToastProps>['type'] = 'success', duration: number = 3000) => {
      const id = generateToastId();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const ToastContainer = React.useCallback(
    ({ position = 'top-right' }: { position?: ToastPosition } = {}) => (
      <div className={`fixed z-[60] space-y-2 ${positionClasses[position]}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            position={position}
            {...(typeof toast.duration !== 'undefined' ? { duration: toast.duration } : {})}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    ),
    [toasts, hideToast]
  );

  return { showToast, ToastContainer };
};

Toast.displayName = 'Toast';
