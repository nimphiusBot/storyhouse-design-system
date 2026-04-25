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
  // Each render generates a new generation counter. The effect body bakes in
  // the generation at the time it runs. The cleanup only releases the lock if
  // its generation still matches (meaning no newer effect body superseded it).
  // This fixes the React deps-change ordering issue: when `locked` changes,
  // cleanup (old gen) fires first but is a no-op because the generation
  // doesn't match, and the new effect body handles the transition correctly.
  const genRef = useRef(0);
  const lockedRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isBrowser) return;

    const currentGen = ++genRef.current;

    // If the previous effect had the lock and we're transitioning out,
    // release it — this runs after the old cleanup has already been
    // suppressed by generation mismatch.
    if (!locked && lockedRef.current === true) {
      lockedRef.current = false;
      releaseLock();
    }

    if (locked && lockedRef.current !== true) {
      lockedRef.current = true;
      acquireLock();
    }

    return () => {
      // Only release if no newer effect body has run (i.e. genuine unmount,
      // not a deps-change superseding). If a newer body ran, it incremented
      // genRef, so the cleanup's gen is stale.
      if (currentGen !== genRef.current) return;
      if (lockedRef.current === true) {
        lockedRef.current = false;
        releaseLock();
      }
    };
  }, [locked]);
}

export default useBodyScrollLock;
