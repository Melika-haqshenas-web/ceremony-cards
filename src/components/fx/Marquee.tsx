'use client';

import { useLocale } from 'next-intl';
import { Fragment } from 'react';

/**
 * An infinite horizontal marquee of words separated by a floret. Pure
 * CSS animation (duplicated track translated -50%). Direction respects
 * the active locale so Persian reads naturally.
 */
export function Marquee({ words }: { words: string[] }) {
  const locale = useLocale();
  const rtl = locale === 'fa';
  const track = [...words, ...words];

  return (
    <div className="relative flex overflow-hidden border-y border-bone/10 py-6">
      <div
        className={`flex shrink-0 items-center gap-10 whitespace-nowrap ${
          rtl ? 'animate-marquee-rtl' : 'animate-marquee'
        }`}
      >
        {track.map((wmark, i) => (
          <Fragment key={i}>
            <span className="font-display text-3xl font-light uppercase tracking-widest text-bone/70 sm:text-5xl">
              {wmark}
            </span>
            <span className="text-rose-300" aria-hidden>
              ✦
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
