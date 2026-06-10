import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './config';

/**
 * Locale-aware navigation primitives. Use these everywhere instead of
 * next/link and next/navigation so the current locale prefix (/en, /fa)
 * is preserved automatically on every internal navigation.
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix: 'as-needed' });
