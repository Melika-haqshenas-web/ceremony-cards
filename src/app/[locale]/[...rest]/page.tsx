import { notFound } from 'next/navigation';

/**
 * Catch-all for any unmatched path under a valid locale (e.g.
 * /en/does-not-exist). Triggers the locale-level not-found.tsx, which
 * renders inside the locale layout so the 404 keeps the chrome + RTL.
 */
export default function CatchAllPage() {
  notFound();
}
