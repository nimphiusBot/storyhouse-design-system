import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFocusTrap } from '../../hooks/useFocusTrap';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const slidePanelVariants = cva(
  'fixed bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-300 ease-in-out flex flex-col focus:outline-none',
  {
    variants: {
      position: {
        right: 'top-0 right-0 h-full',
        left: 'top-0 left-0 h-full',
        top: 'top-0 left-0 right-0 w-full',
        bottom: 'bottom-0 left-0 right-0 w-full',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // Right/Left sizes
      { position: ['right', 'left'] as const, size: 'sm', class: 'w-80 max-w-[90vw]' },
      { position: ['right', 'left'] as const, size: 'md', class: 'w-96 max-w-[90vw]' },
      { position: ['right', 'left'] as const, size: 'lg', class: 'w-[32rem] max-w-[90vw]' },
      { position: ['right', 'left'] as const, size: 'xl', class: 'w-[48rem] max-w-[90vw]' },
      { position: ['right', 'left'] as const, size: 'full', class: 'w-full' },
      // Top/Bottom sizes
      { position: ['top', 'bottom'] as const, size: 'sm', class: 'h-64 max-h-[90vh]' },
      { position: ['top', 'bottom'] as const, size: 'md', class: 'h-96 max-h-[90vh]' },
      { position: ['top', 'bottom'] as const, size: 'lg', class: 'h-[32rem] max-h-[90vh]' },
      { position: ['top', 'bottom'] as const, size: 'xl', class: 'h-[48rem] max-h-[90vh]' },
      { position: ['top', 'bottom'] as const, size: 'full', class: 'h-full' },
    ],
    defaultVariants: {
      position: 'right',
      size: 'md',
    },
  },
);

export interface SlidePanelProps extends VariantProps<typeof slidePanelVariants> {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Callback when panel should close */
  onClose: () => void;
  /** Panel title */
  title?: string;
  /** Panel subtitle */
  subtitle?: string;
  /** Panel description */
  description?: string;
  /** Custom header content (overrides title/subtitle/description) */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Panel body content */
  children: React.ReactNode;
  /** Close when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Panel position */
  position?: 'right' | 'left' | 'top' | 'bottom';
  /** Panel size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Additional CSS classes for the panel */
  className?: string;
  /** Additional CSS classes for the overlay */
  overlayClassName?: string;
  /** Prevent body scroll when panel is open */
  preventBodyScroll?: boolean;
  /**
   * Selector for the element to receive initial focus when the panel opens.
   * Falls back to the first focusable element, then the close button.
   */
  initialFocusSelector?: string;
  /**
   * Callback fired when the panel closes. Useful for restoring focus to the
   * trigger element that opened the panel.
   */
  onCloseComplete?: () => void;
}

/**
 * SlidePanel - Animated sliding panel
 *
 * A versatile slide-out/in panel component with support for all four directions,
 * multiple sizes, and smooth animations. Includes focus trapping, keyboard
 * navigation, and body scroll locking.
 *
 * Features:
 * - Four positions: left, right, top, bottom
 * - Five sizes: sm, md, lg, xl, full
 * - Smooth enter/exit animations
 * - Focus trap for accessibility (WCAG 2.4.3 Focus Order)
 * - Escape key to close
 * - Click overlay to close
 * - Body scroll lock
 * - Renders via React portal
 * - Focus restoration on close
 *
 * @example
 * ```tsx
 * <SlidePanel
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Panel Title"
 *   position="right"
 *   size="md"
 * >
 *   <p>Panel content here</p>
 * </SlidePanel>
 * ```
 */
export const SlidePanel: React.FC<SlidePanelProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  header,
  footer,
  children,
  position = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
  preventBodyScroll = true,
  initialFocusSelector,
  onCloseComplete,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimatingState] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle mounting/unmounting with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimatingState(true), 10);
      return () => clearTimeout(timer);
    }
    return;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && shouldRender) {
      setIsAnimatingState(false);
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
        onCloseComplete?.();
      }, 320);
      return () => clearTimeout(unmountTimer);
    }
    return;
  }, [isOpen, shouldRender, onCloseComplete]);

  // Save and restore focus
  useEffect(() => {
    if (isOpen && shouldRender) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
    return () => {
      // Restore focus when component unmounts
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus({ preventScroll: true });
        previousActiveElement.current = null;
      }
    };
  }, [isOpen, shouldRender]);

  // Focus trap
  useFocusTrap({
    enabled: isOpen && shouldRender,
    containerRef: panelRef,
    autoFocus: true,
    initialFocusSelector,
  });

  // Handle escape key (independent hook for cleanup correctness)
  useEffect(() => {
    if (!closeOnEscape || !isOpen || !shouldRender) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, shouldRender, onClose, closeOnEscape]);

  // Handle keydown for all keys - prevent space/enter from triggering outside elements
  useEffect(() => {
    if (!isOpen || !shouldRender) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent keyboard events from reaching elements behind the panel
      if (e.key === ' ' || e.key === 'Enter') {
        const target = e.target as HTMLElement | null;
        if (target && !panelRef.current?.contains(target)) {
          e.stopPropagation();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, shouldRender]);

  // Prevent body scroll when panel is open — save and restore original overflow value
  const originalOverflowRef = useRef<string>('');
  const originalPaddingRightRef = useRef<string>('');

  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen && shouldRender) {
      // Save original values before overwriting
      originalOverflowRef.current = document.body.style.overflow;
      originalPaddingRightRef.current = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore original values instead of clearing unconditionally
      document.body.style.overflow = originalOverflowRef.current;
      document.body.style.paddingRight = originalPaddingRightRef.current;
    }

    return () => {
      document.body.style.overflow = originalOverflowRef.current;
      document.body.style.paddingRight = originalPaddingRightRef.current;
    };
  }, [isOpen, shouldRender, preventBodyScroll]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  if (!shouldRender) return null;

  const getTransformClass = () => {
    if (!isAnimating) {
      switch (position) {
        case 'right':
          return 'translate-x-full';
        case 'left':
          return '-translate-x-full';
        case 'top':
          return '-translate-y-full';
        case 'bottom':
          return 'translate-y-full';
        default:
          return 'translate-x-full';
      }
    }
    return 'translate-x-0 translate-y-0';
  };

  const panelContent = (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop/Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black transition-opacity duration-300',
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0',
          overlayClassName,
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          slidePanelVariants({ position, size }),
          getTransformClass(),
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'slide-panel-title' : undefined}
        aria-describedby={description ? 'slide-panel-description' : undefined}
      >
        {/* Header */}
        {(header || title || showCloseButton) && (
          <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {header || (
              <div className="flex items-start justify-between px-6 py-4">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2
                      id="slide-panel-title"
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
                  )}
                  {description && (
                    <p
                      id="slide-panel-description"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="ml-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    aria-label="Close panel"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">{children}</div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(panelContent, document.body);
};

SlidePanel.displayName = 'SlidePanel';

export default SlidePanel;
