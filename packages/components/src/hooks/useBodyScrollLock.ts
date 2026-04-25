import { useEffect, useRef } from 'react';

/**
 * Global lock count — tracks how many active consumers are requesting body
 * scroll lock. overflow is set to 'hidden' when count goes from 0 → 1, and
 * restored when count goes from 1 → 0.
 */

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function acquireLock(): void {
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  lockCount++;
}

function releaseLock(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
    originalOverflow = '';
    originalPaddingRight = '';
  }
}

const isBrowser = typeof document !== 'undefined';

/**
 * Stack-aware body scroll lock hook.
 *
 * When multiple components (Modal, SlidePanel, ThumbnailLightbox) are open at
 * the same time, only the first one to mount applies `overflow: hidden` and
 * `padding-right` on `<body>`, and only the last one to unmount restores the
 * original values.  This prevents closing one component from accidentally
 * re-enabling scroll behind others that are still open.
 *
 * @param locked - Whether this consumer is actively requesting a scroll lock.
 */
export function useBodyScrollLock(locked: boolean): void {
  // Tracks what the previous effect body committed to the lock state.
  // The cleanup reads this and only releases when the effect that set it
  // still "owns" the lock (no newer effect body has taken over).
  // This correctly handles dependency-change ordering: cleanup (old effect)
  // fires *before* the new effect body, so prevLockedRef still reflects the
  // old effect's intent.  The new effect body then reads the (already-updated)
  // ref and decides whether to acquire/release based on the new `locked` prop.
  const prevLockedRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isBrowser) return;

    const prevLocked = prevLockedRef.current;

    if (locked && prevLocked !== true) {
      // Transitioning from not-locked → locked
      prevLockedRef.current = true;
      acquireLock();
    } else if (!locked && prevLocked === true) {
      // Transitioning from locked → not-locked
      prevLockedRef.current = false;
      releaseLock();
    } else {
      // No change — keep prevLockedRef in sync
      prevLockedRef.current = locked;
    }

    return () => {
      // Cleanup fires on unmount OR before a new effect for the same deps.
      // Only release if we still hold the lock (no subsequent effect took over).
      if (prevLockedRef.current === true) {
        prevLockedRef.current = false;
        releaseLock();
      }
    };
  }, [locked]);
}

export default useBodyScrollLock;
