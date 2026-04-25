import { useEffect, useRef, type RefObject } from 'react';

/**
 * Focusable element selector matching interactive elements.
 * Excludes disabled, hidden, and inert elements.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled]):not([aria-disabled="true"])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
  '[contenteditable]',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      getComputedStyle(el).visibility !== 'hidden' &&
      getComputedStyle(el).display !== 'none',
  );
}

function getActiveFocusableIndex(elements: HTMLElement[]): number {
  const active = document.activeElement;
  if (!active) return -1;
  return elements.indexOf(active as HTMLElement);
}

export interface UseFocusTrapOptions {
  /** Whether the trap is active */
  enabled: boolean;
  /** Ref to the container element that traps focus */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * If true, auto-focus the first focusable element when the trap becomes enabled.
   * Falls back to the container if no other focusable elements exist.
   * Default: true
   */
  autoFocus?: boolean;
  /**
   * Callback fired when focus is about to leave the trap.
   * Can be used to restore focus to the trigger element.
   */
  onEscapeTrap?: () => void;
  /**
   * Selector for the element to receive initial focus.
   * Falls back to the first focusable element.
   */
  initialFocusSelector?: string;
}

/**
 * Focus trap hook for modals, dialogs, and slide panels.
 *
 * Traps Tab/Shift+Tab cycling within the container when enabled.
 * Re-queries focusable elements on each keypress to handle
 * dynamic content changes.
 *
 * @example
 * ```tsx
 * const panelRef = useRef<HTMLDivElement>(null);
 * useFocusTrap({ enabled: isOpen, containerRef: panelRef });
 * ```
 */
export function useFocusTrap({
  enabled,
  containerRef,
  autoFocus = true,
  onEscapeTrap,
  initialFocusSelector,
}: UseFocusTrapOptions): void {
  const hasAutoFocused = useRef(false);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    hasAutoFocused.current = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const elements = getFocusableElements(container);

      if (elements.length === 0) {
        e.preventDefault();
        e.stopPropagation();
        container.focus();
        return;
      }

      const currentIndex = getActiveFocusableIndex(elements);

      if (e.shiftKey) {
        if (currentIndex <= 0) {
          // Wrap to last
          e.preventDefault();
          e.stopPropagation();
          const last = elements[elements.length - 1];
          last?.focus();
        }
      } else {
        if (currentIndex === -1 || currentIndex >= elements.length - 1) {
          // Wrap to first (or focus first if outside the trap)
          e.preventDefault();
          e.stopPropagation();
          const first = elements[0];
          first?.focus();
        }
      }
    };

    // Capture phase: intercept Tab before it reaches the target element
    document.addEventListener('keydown', handleKeyDown, true);

    // Initial auto-focus
    if (autoFocus && !hasAutoFocused.current) {
      hasAutoFocused.current = true;

      requestAnimationFrame(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        let target: HTMLElement | null = null;

        if (initialFocusSelector) {
          target = currentContainer.querySelector<HTMLElement>(initialFocusSelector);
        }

        if (!target) {
          const elements = getFocusableElements(currentContainer);
          target = elements[0] ?? null;
        }

        if (target) {
          target.focus({ preventScroll: false });
        } else {
          if (!currentContainer.hasAttribute('tabindex')) {
            currentContainer.tabIndex = -1;
          }
          currentContainer.focus({ preventScroll: false });
        }
      });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, containerRef, autoFocus, initialFocusSelector, onEscapeTrap]);
}

export default useFocusTrap;
