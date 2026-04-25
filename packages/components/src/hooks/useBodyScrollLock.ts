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
  // Track whether this hook instance currently holds a lock, so both the
  // transition effect and the unmount cleanup can reliably decide whether
  // to release.
  const ownsLockRef = useRef(false);

  // Acquire/release on transition
  useEffect(() => {
    if (!isBrowser) return;

    if (locked) {
      if (!ownsLockRef.current) {
        acquireLock();
        ownsLockRef.current = true;
      }
    } else if (ownsLockRef.current) {
      releaseLock();
      ownsLockRef.current = false;
    }
  }, [locked]);

  // Release on unmount (only if we still hold the lock)
  useEffect(() => {
    return () => {
      if (ownsLockRef.current) {
        ownsLockRef.current = false;
        releaseLock();
      }
    };
  }, []);
}

export default useBodyScrollLock;
