import { useEffect } from 'react';

/**
 * Locks page scrolling while `locked` is true (e.g. when a modal or the
 * mobile menu is open) and restores the previous overflow on cleanup.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
