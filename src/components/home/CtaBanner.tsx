'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RevealText } from '@/components/fx/RevealText';

/**
 * Closing call-to-action: a full-bleed parallax image under an oversized
 * kinetic statement and a single outline CTA. The last frame of the
 * narrative.
 */
export function CtaBanner() {
  const t = useTranslations('home.cta');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative flex min-h-[90svh] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 h-[124%]">
        <Image
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/70" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-6 text-center sm:px-10">
        <RevealText
          as="h2"
          text={t('title')}
          accentWords={[]}
          className="mx-auto max-w-4xl font-display text-4xl font-light uppercase leading-[1.02] tracking-tight text-bone sm:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-6 max-w-md text-bone/65"
        >
          {t('subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/cards" className="btn-primary">
            <span>{t('button')}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
