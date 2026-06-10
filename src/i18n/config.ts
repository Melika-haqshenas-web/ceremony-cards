/**
 * Central locale configuration shared across middleware, navigation
 * helpers and the request config. Keep this list as the single source
 * of truth — add a new locale here and a matching messages/<locale>.json.
 */
export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

/** Locales that read right-to-left (drives the <html dir> attribute). */
export const rtlLocales: Locale[] = ['fa'];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
};

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}
