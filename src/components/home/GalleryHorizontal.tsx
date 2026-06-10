'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RevealText } from '@/components/fx/RevealText';
import { Eyebrow } from '@/components/fx/Eyebrow';
import { getTemplate } from '@/lib/templates';
import { formatPrice } from '@/lib/utils';

// A small, curated set (variety across ceremonies) so the pinned scroll
// stays short and smooth instead of dragging through the whole catalogue.
const CURATED = ['rosewood', 'golden-hour', 'garden-soiree', 'serene-lily', 'little-petal'];

/**
 * A pinned section whose curated template track slides horizontally as
 * the user scrolls vertically. Section height equals the horizontal
 * overflow so the pin releases exactly when the track ends. RTL-aware.
 */
export function GalleryHorizontal() {
  const t = useTranslations();
  const tTemplates = useTranslations('templates');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const rtl = locale === 'fa';

  const items = CURATED.map(getTemplate).filter(Boolean) as NonNullable<
    ReturnType<typeof getTemplate>
  >[];

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    rtl ? [0, distance] : [0, -distance],
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[88rem] items-end justify-between px-6 sm:px-10">
          <div>
            <Eyebrow className="mb-5">{t('home.gallery.caption')}</Eyebrow>
            <RevealText
              as="h2"
              text={t('home.gallery.title')}
              className="font-display text-3xl font-light uppercase tracking-tight text-bone sm:text-5xl"
            />
          </div>
          <Link
            href="/cards"
            className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-bone/70 transition hover:text-accent sm:inline-flex"
          >
            {t('common.viewAll')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 px-6 sm:gap-8 sm:px-10"
        >
          {items.map((tpl, i) => (
            <Link
              key={tpl.id}
              href={`/template/${tpl.id}`}
              data-cursor="view"
              className="group relative block h-[62vh] w-[80vw] shrink-0 overflow-hidden sm:w-[44vw] lg:w-[32vw]"
            >
              <Image
                src={tpl.image}
                alt={tTemplates(`${tpl.id}.name`)}
                fill
                sizes="(max-width: 640px) 80vw, 40vw"
                className="object-cover transition-transform duration-[1.2s] ease-atelier group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
              {/* Hover frame */}
              <div className="absolute inset-4 border border-bone/0 transition-colors duration-500 group-hover:border-bone/30" />

              <span className="absolute start-5 top-5 font-sans text-xs text-bone/70 tabular-nums">
                0{i + 1} / 0{items.length}
              </span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-3xl font-light text-bone">
                    {tTemplates(`${tpl.id}.name`)}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-bone/55">
                    {t(`categories.${tpl.category}.name`)}
                  </p>
                </div>
                <span className="text-sm text-accent">
                  {formatPrice(tpl.price, tCommon('currency'), locale)}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <p className="mx-auto mt-8 w-full max-w-[88rem] px-6 text-[11px] uppercase tracking-widest text-bone/35 sm:px-10">
          {t('home.gallery.drag')}
        </p>
      </div>
    </section>
  );
}
