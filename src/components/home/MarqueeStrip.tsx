'use client';

import { useTranslations } from 'next-intl';
import { Marquee } from '@/components/fx/Marquee';

/** Reads the localized ceremony words and feeds them to the marquee. */
export function MarqueeStrip() {
  const t = useTranslations('home');
  const words = t.raw('marquee') as string[];
  return <Marquee words={words} />;
}
