'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RevealText } from '@/components/fx/RevealText';
import { Reveal } from '@/components/fx/Reveal';
import { Eyebrow } from '@/components/fx/Eyebrow';

/**
 * Brand manifesto — a single, centred, oversized statement that reveals
 * word-by-word, framed by a large serif quotation mark and a hairline
 * above. Deliberately spacious so it reads as a moment, not a paragraph.
 */
export function Intro() {
  const t = useTranslations('home.intro');

  return (
    <section className="section">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mt-8">
          <Eyebrow center>{t('caption')}</Eyebrow>
        </div>

        {/* Decorative quote mark */}
        <Reveal delay={0.1}>
          <span
            aria-hidden
            className="mt-4 block font-display text-7xl leading-none text-rose-300/70 sm:text-8xl"
          >
            “
          </span>
        </Reveal>

        <RevealText
          as="p"
          text={t('statement')}
          accentWords={[]}
          className="-mt-4 font-display text-[1.8rem] font-light leading-[1.32] text-bone sm:text-4xl md:text-[2.7rem] md:leading-[1.3]"
        />

        <Reveal delay={0.2}>
          <Link
            href="/about"
            className="group mt-12 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-widest text-bone/70 transition hover:text-accent"
          >
            <span className="link-underline">{t('cta')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
