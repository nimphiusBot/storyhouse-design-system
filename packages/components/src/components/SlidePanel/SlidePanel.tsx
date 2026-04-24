import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const slidePanelVariants = cva(
  'fixed bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-300 ease-in-out flex flex-col',
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
 * - Focus trap for accessibility
 * - Escape key to close
 * - Click overlay to close
 * - Body scroll lock
 * - Renders via React portal
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
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimatingState] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle mounting/unmounting with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      const timer = setTimeout(() => setIsAnimatingState(true), 10);
      return () => clearTimeout(timer);
    } else {
      // Trigger slide-out animation
      setIsAnimatingState(false);
      // Unmount after animation completes
      const unmountTimer = setTimeout(() => setShouldRender(false), 320);
      return () => clearTimeout(unmountTimer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, preventBodyScroll]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    panel.addEventListener('keydown', handleTab);
    // Focus the first focusable element
    firstElement?.focus();

    return () => {
      panel.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

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

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
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
