import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

/**
 * next-intl middleware: detects the locale, redirects `/` to the
 * default-locale home (`/en`), and ensures every route is prefixed.
 */
export default createMiddleware({
  locales,
  defaultLocale,
  // Default locale (fa) is served without a prefix; only `en` is prefixed.
  localePrefix: 'as-needed',
  // Always default to fa; never auto-switch to en from the browser's
  // Accept-Language. English appears only when the user picks it.
  localeDetection: false,
});

export const config = {
  // Match all pathnames except for
  //  - API routes
  //  - Next internals (_next)
  //  - static files (anything with a dot, e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
