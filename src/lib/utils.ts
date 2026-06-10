/**
 * Tiny class-name combiner — joins truthy class strings together.
 * Avoids pulling in clsx/tailwind-merge for this small project while
 * keeping JSX readable: cn('base', isActive && 'active').
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a price for display. Persian uses Toman with Persian digits;
 * English uses a leading dollar sign. `currency` comes from the i18n
 * `common.currency` string so callers stay locale-agnostic.
 */
export function formatPrice(
  amount: number,
  currency: string,
  locale: string,
): string {
  const value = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(
    amount,
  );
  // Persian convention: amount precedes the unit ("۲۹ تومان").
  return locale === 'fa' ? `${value} ${currency}` : `${currency}${value}`;
}
