'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RevealText } from '@/components/fx/RevealText';
import { Eyebrow } from '@/components/fx/Eyebrow';
import { categories } from '@/lib/categories';

/**
 * Ceremony selector as a refined image-card grid. Each card reveals on
 * scroll, zooms its photo on hover, and lifts the title — no cursor-
 * following image. The grid is intentionally asymmetric (the first card
 * spans two columns on large screens) for an editorial rhythm.
 */
export function CeremonyMenu() {
  const t = useTranslations();

  return (
    <section className="section">
      <div className="mb-14 border-t border-[color:var(--line)] pt-10">
        <Eyebrow className="mb-6">{t('home.collection.caption')}</Eyebrow>
        <RevealText
          as="h2"
          text={t('home.collection.title')}
          className="font-display text-4xl font-light uppercase tracking-tight text-bone sm:text-6xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={i === 0 ? 'lg:col-span-2' : ''}
          >
            <Link
              href={`/cards?type=${c.id}`}
              data-cursor="view"
              className="group relative block h-72 overflow-hidden sm:h-80 lg:h-[26rem]"
            >
              <Image
                src={c.image}
                alt={t(`categories.${c.id}.name`)}
                fill
                sizes={i === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
                className="object-cover transition-transform duration-[1.1s] ease-atelier group-hover:scale-105"
              />
              {/* Veil */}
              <div className="absolute inset-0 bg-ink-950/45 transition-colors duration-500 group-hover:bg-ink-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

              {/* Index */}
              <span className="absolute start-5 top-5 font-sans text-xs text-bone/70 tabular-nums">
                0{i + 1}
              </span>
              <ArrowUpRight
                className="absolute end-5 top-5 h-6 w-6 text-bone/70 transition-all duration-500 group-hover:rotate-45 group-hover:text-accent"
                strokeWidth={1}
              />

              {/* Title block */}
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="font-display text-3xl font-light text-bone transition-transform duration-500 ease-atelier group-hover:-translate-y-1 sm:text-4xl">
                  {t(`categories.${c.id}.name`)}
                </h3>
                <p className="mt-1 max-w-xs text-sm text-bone/0 transition-colors duration-500 group-hover:text-bone/70">
                  {t(`categories.${c.id}.description`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
