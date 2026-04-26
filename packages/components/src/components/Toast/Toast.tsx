import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export type ToastPosition = 
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  show?: boolean;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  show = true,
  duration = 3000,
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
          bgColor: 'bg-blue-50 dark:bg-blue-950',
          textColor: 'text-blue-800 dark:text-blue-200',
          borderColor: 'border-blue-200 dark:border-blue-800',
          icon: Info,
          iconColor: 'text-blue-500 dark:text-blue-400',
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
    <div className="animate-in slide-in-from-right duration-300">
      <div
        className={`rounded-lg shadow-lg p-4 border max-w-sm w-full sm:max-w-sm ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium break-words">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Close notification"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface ToastData {
  id: string;
  message: string;
  type: Required<ToastProps>['type'];
  duration?: number;
}

interface ToastContext {
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  ToastContainer: React.FC;
}

export const useToast = (): ToastContext => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const showToast = React.useCallback(
    (message: string, type: Required<ToastProps>['type'] = 'success', duration: number = 3000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const ToastContainer: React.FC = React.useCallback(
    () => (
      <div className={`fixed z-[60] space-y-2 top-4 right-4 max-w-[calc(100vw-2rem)] sm:max-w-sm`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
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
