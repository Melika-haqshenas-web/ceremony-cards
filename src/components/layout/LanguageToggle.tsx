'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeLabels, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Switches locale while preserving the current route. Switching to `fa`
 * flips the whole document to RTL (handled in the layout via <html dir>).
 * Styled as a minimal text toggle to suit the editorial chrome.
 */
export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale();

  const switchTo = (next: Locale) => {
    if (next !== active) router.replace(pathname, { locale: next });
  };

  if (compact) {
    const other = locales.find((l) => l !== active)! as Locale;
    return (
      <button
        type="button"
        onClick={() => switchTo(other)}
        className="text-[11px] font-medium uppercase tracking-widest text-bone/70 transition-colors hover:text-accent"
        aria-label={`Switch language to ${localeLabels[other]}`}
      >
        {localeLabels[other]}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === active}
          className={cn(
            'text-sm font-medium uppercase tracking-widest transition-colors',
            l === active ? 'text-accent' : 'text-bone/50 hover:text-bone',
          )}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
