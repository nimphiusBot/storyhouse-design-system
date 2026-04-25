import React, { useEffect, useRef, useState } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { createPortal } from 'react-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Button sub-component for internal use (avoids circular dependency with @storyhouse/components)
const ModalButton: React.FC<{
  variant: 'primary' | 'outline' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}> = ({ variant, onClick, disabled, loading, children }) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-600',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  };
  return (
    <button
      className={cn(baseStyles, variants[variant], 'px-4 py-2 text-sm')}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

const modalVariants = cva(
  'relative bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col max-h-[90vh]',
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-2xl',
        '2xl': 'w-full max-w-4xl',
        full: 'w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)]',
      },
      variant: {
        default: 'border-t-4 border-t-gray-400 dark:border-t-gray-600',
        danger: 'border-t-4 border-t-red-500',
        success: 'border-t-4 border-t-green-500',
        info: 'border-t-4 border-t-orange-500',
        warning: 'border-t-4 border-t-yellow-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const overlayVariants = cva(
  'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200',
  {
    variants: {
      isAnimating: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  }
);

const contentVariants = cva('transition-all duration-200', {
  variants: {
    isAnimating: {
      true: 'scale-100 opacity-100',
      false: 'scale-95 opacity-0',
    },
  },
});

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showHeader?: boolean;
  header?: React.ReactNode;
  loading?: boolean;
  className?: string;
  overlayClassName?: string;
  zIndex?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showHeader = true,
  header,
  loading = false,
  size,
  variant,
  className = '',
  overlayClassName = '',
  zIndex = 50,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Stack-aware body scroll lock — coordinates with SlidePanel, ThumbnailLightbox, etc.
  // Uses isOpen || shouldRender so the lock is held through the full lifecycle:
  // initial render before shouldRender catches up, panel visible, and close animation.
  useBodyScrollLock(isOpen || shouldRender);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        previousActiveElement.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  // Focus trap — handles Tab cycling, focus redirection, mousedown trapping.
  // autoFocus: true makes the trap auto-focus the last non-dismiss element
  // (primary action in the footer), avoiding the close button.
  useFocusTrap({
    enabled: isOpen && shouldRender,
    containerRef: modalRef,
    autoFocus: true,
  });

  if (!shouldRender) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const headerBorderColor = {
    default: 'border-gray-200 dark:border-gray-700',
    danger: 'border-red-200',
    success: 'border-green-200',
    info: 'border-orange-200',
    warning: 'border-yellow-200',
  }[variant || 'default'];

  const titleColor = {
    default: 'text-gray-900 dark:text-gray-100',
    danger: 'text-red-900',
    success: 'text-green-900',
    info: 'text-orange-900',
    warning: 'text-yellow-900',
  }[variant || 'default'];

  const modalContent = (
    <div
      className={overlayVariants({ isAnimating, className: overlayClassName })}
      onClick={handleOverlayClick}
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        ref={modalRef}
        className={contentVariants({
          isAnimating,
          className: modalVariants({ size, variant, className }),
        })}
      >
        {showHeader && (
          <div
            className={`flex items-start justify-between p-6 border-b ${headerBorderColor}`}
          >
            {header || (
              <div className="flex-1">
                {title && (
                  <h2
                    id="modal-title"
                    className={`text-lg font-semibold ${titleColor}`}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    {description}
                  </p>
                )}
              </div>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Close modal"
                data-dismiss
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
            </div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div
            className={`flex items-center justify-end gap-3 p-6 border-t ${headerBorderColor}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export interface ConfirmModalProps extends Omit<ModalProps, 'footer' | 'children'> {
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  message: React.ReactNode;
  isConfirming?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onClose,
  message,
  isConfirming = false,
  ...props
}) => {
  return (
    <Modal
      {...props}
      onClose={onClose}
      footer={
        <>
          <ModalButton variant="outline" onClick={onClose} disabled={isConfirming}>
            {cancelText}
          </ModalButton>
          <ModalButton
            variant={confirmVariant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={isConfirming}
          >
            {confirmText}
          </ModalButton>
        </>
      }
    >
      <div className="text-sm text-gray-700 dark:text-gray-300">{message}</div>
    </Modal>
  );
};
