import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface SlideOutPanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Panel title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Panel content */
  children: React.ReactNode;
  /** Panel width size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Selector for the element to receive initial focus when the panel opens.
   * Falls back to the first focusable element, then the close button.
   */
  initialFocusSelector?: string;
}

/**
 * SlideOutPanel Component
 *
 * A slide-out side panel (drawer) that appears from the right edge of the screen.
 * Supports focus trap, escape key closing, backdrop click closing, and body scroll locking.
 *
 * @example
 * ```tsx
 * <SlideOutPanel
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Settings"
 *   size="md"
 * >
 *   <p>Panel content here</p>
 * </SlideOutPanel>
 * ```
 */
export const SlideOutPanel: React.FC<SlideOutPanelProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  initialFocusSelector,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap
  useFocusTrap({
    enabled: isOpen,
    containerRef: panelRef,
    autoFocus: true,
    initialFocusSelector,
  });

  // Save and restore focus on open/close
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
    return () => {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus({ preventScroll: true });
        previousActiveElement.current = null;
      }
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Stack-aware body scroll lock — coordinates with Modal, SlidePanel, ThumbnailLightbox, etc.
  useBodyScrollLock(isOpen);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  if (!isOpen) return null;

  const panelContent = (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={panelRef}
          tabIndex={-1}
          className={cn(
            'relative w-screen transform transition-transform duration-300 ease-in-out focus:outline-none',
            sizeClasses[size],
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="slide-out-panel-title"
        >
          <div className="flex h-full flex-col bg-white shadow-xl dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <h2 id="slide-out-panel-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className={cn(
                  'ml-3 flex h-8 w-8 items-center justify-center rounded-md',
                  'text-gray-400 hover:text-gray-500 hover:bg-gray-100',
                  'dark:hover:bg-gray-800 dark:hover:text-gray-300',
                  'focus:outline-none focus:ring-2 focus:ring-orange-500',
                )}
                aria-label="Close panel"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(panelContent, document.body);
};

SlideOutPanel.displayName = 'SlideOutPanel';

export default SlideOutPanel;
