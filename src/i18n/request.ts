import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

/**
 * Loads the message catalogue for the active request locale.
 * Wired into Next via the next-intl plugin in next.config.mjs.
 *
 * Uses the `requestLocale` API (next-intl ≥ 3.22): it returns the locale
 * from the URL segment, which we validate and fall back to default.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
