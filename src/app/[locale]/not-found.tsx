'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * In-locale 404. Rendered inside the locale layout, so it keeps the
 * navbar, footer, fonts and RTL direction.
 */
export default function NotFound() {
  const t = useTranslations('nav');
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div className="flex flex-col items-center gap-8">
        <p className="font-display text-[28vw] font-light leading-none text-bone/90 sm:text-[16rem]">
          4<span className="text-accent italic">0</span>4
        </p>
        <Link href="/" className="btn-primary">
          <span>{t('home')}</span>
        </Link>
      </div>
    </section>
  );
}
