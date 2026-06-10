import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently
 * matches. SSR-safe: returns false on the server and first paint, then
 * updates after mount.
 *
 * @example const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
