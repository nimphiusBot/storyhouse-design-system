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

/**
 * Find the closest ancestor that acts as a portal container
 * (`.fixed.inset-0.z-50`), which is the wrapper every dialog/panel
 * portal typically renders inside.
 */
function findPortalContainer(child: HTMLElement): HTMLElement | null {
  return child.closest('.fixed.inset-0.z-50');
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
   * Callback fired immediately when the trap is about to be torn down.
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
 * Provides comprehensive focus trapping including:
 * - Tab/Shift+Tab cycling within the container
 * - Auto-focus on first focusable element (or container) on open
 * - Focus redirection back into the trap when focus attempts to escape
 * - Mousedown prevention on elements outside the trap
 * - `aria-hidden` management on siblings outside the portal
 * - Escape trap callback for focus restoration
 *
 * Re-queries focusable elements dynamically on each keypress to handle
 * DOM changes while the trap is active.
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
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    hasAutoFocused.current = false;
    isClosingRef.current = false;

    // ── Handle Tab key cycling ────────────────────────────────

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

    // ── Focus redirection: redirect focus back into the trap ──

    const handleFocusOut = (e: FocusEvent) => {
      // Skip if the trap is being torn down (e.g. panel closing)
      if (isClosingRef.current) return;

      const relatedTarget = e.relatedTarget as HTMLElement | null;

      // relatedTarget is null when focus leaves the document entirely
      // (browser chrome, DevTools, address bar) — do NOT redirect.
      if (!relatedTarget) return;

      // Only redirect if focus moved to an element outside the container.
      if (container && !container.contains(relatedTarget)) {
        const elements = getFocusableElements(container);
        const firstElement = elements[0];
        if (firstElement) {
          firstElement.focus();
        } else {
          container?.focus();
        }
      }

      // Note: if relatedTarget is inside the container, this is a normal
      // Tab/arrow movement and should be allowed to proceed.
    };

    // ── Mousedown trap: prevent focus theft by outside elements ─

    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (isClosingRef.current) return;
      if (!container.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // ── aria-hidden management for siblings ───────────────────

    const hiddenSiblings = new Set<HTMLElement>();
    const portalContainer = findPortalContainer(container);
    if (portalContainer && document.body.contains(portalContainer)) {
      for (const child of document.body.children) {
        if (
          child !== portalContainer &&
          child.getAttribute('aria-hidden') !== 'true'
        ) {
          child.setAttribute('aria-hidden', 'true');
          hiddenSiblings.add(child as HTMLElement);
        }
      }
    }

    // ── Capture phase Tab interception ────────────────────────

    document.addEventListener('keydown', handleKeyDown, true);

    // ── Focusout redirect on container ────────────────────────

    container.addEventListener('focusout', handleFocusOut);

    // ── Mousedown trap on document (capture phase) ────────────

    document.addEventListener('mousedown', handleDocumentMouseDown, true);

    // ── Initial auto-focus ────────────────────────────────────

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
          // Walk backwards to skip elements with [data-dismiss] or aria-label="Close …"
          // so we prefer the primary action (typically a confirm/save button) over a close button.
          for (let i = elements.length - 1; i >= 0; i--) {
            const el = elements[i]!;
            const isDismiss =
              el.hasAttribute('data-dismiss') ||
              (el.getAttribute('aria-label') || '').toLowerCase().startsWith('close');
            if (!isDismiss) {
              target = el;
              break;
            }
          }
          // If every element is a dismiss control, fall back to the first one
          if (!target) {
            target = elements[0] ?? null;
          }
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

    // ── Cleanup ───────────────────────────────────────────────

    return () => {
      isClosingRef.current = true;

      document.removeEventListener('keydown', handleKeyDown, true);
      container.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('mousedown', handleDocumentMouseDown, true);

      // Restore aria-hidden on siblings we modified
      for (const sibling of hiddenSiblings) {
        sibling.removeAttribute('aria-hidden');
      }

      // Clean up tabindex we may have set on the container
      if (container.tabIndex === -1) {
        container.removeAttribute('tabindex');
      }

      // Fire escape trap callback for focus restoration
      onEscapeTrap?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, containerRef, autoFocus, initialFocusSelector, onEscapeTrap]);
}

export default useFocusTrap;
