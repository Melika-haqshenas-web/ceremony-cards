'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown } from 'lucide-react';
import { Eyebrow } from '@/components/fx/Eyebrow';
import { isRtl } from '@/i18n/config';

/**
 * Cinematic full-bleed hero. A moody image sits behind oversized, line-
 * by-line kinetic type. On scroll the image zooms/parallaxes while the
 * headline drifts and fades — establishing the long-scroll narrative.
 */
export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const rtl = isRtl(locale);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lines = [t('titleLine1'), t('titleLine2'), t('titleLine3')];

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* Background */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic grading */}
        <div className="absolute inset-0 bg-ink-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/70" />
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[88rem] flex-col justify-center px-6 sm:px-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-7"
        >
          <Eyebrow>{t('kicker')}</Eyebrow>
        </motion.div>

        <h1
          className={
            rtl
              ? 'font-display font-light leading-[1.04] text-bone'
              : 'font-display font-light uppercase leading-[0.86] tracking-tight text-bone'
          }
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className={`clip-line block text-display-sm sm:text-display ${
                rtl ? 'py-[0.06em]' : ''
              }`}
            >
              <motion.span
                className={`inline-block ${
                  i === 2 ? (rtl ? 'text-accent' : 'italic text-accent') : ''
                }`}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  delay: 1.5 + i * 0.14,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.9 }}
          className="mt-8 max-w-md font-sans text-base text-bone/70 sm:text-lg"
        >
          {t('subtitle')}
        </motion.p>
      </motion.div>

      {/* Bottom bar: index + scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex max-w-[88rem] items-end justify-between px-6 sm:px-10"
      >
        <span className="hidden text-[11px] uppercase tracking-widest text-bone/50 sm:block">
          {t('index')}
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-bone/60"
        >
          {t('scroll')}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-accent" strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
