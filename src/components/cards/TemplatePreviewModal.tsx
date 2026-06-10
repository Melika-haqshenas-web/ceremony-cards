'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Star, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CardArtwork } from './CardArtwork';
import { AddToCartButton } from './AddToCartButton';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/utils';
import type { Template } from '@/lib/types';

/**
 * A lightbox preview: the large animated artwork plus key details and
 * the add-to-cart action. Closes on backdrop click or Escape; scroll is
 * locked while open. Dark, editorial surface.
 */
export function TemplatePreviewModal({
  template,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  const t = useTranslations('common');
  const tTemplates = useTranslations('templates');
  const locale = useLocale();
  useLockBodyScroll(Boolean(template));

  return (
    <AnimatePresence>
      {template && (
        <motion.div
          className="fixed inset-0 z-[95] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full max-w-3xl gap-8 border border-bone/10 bg-ink-900 p-5 sm:grid-cols-2 sm:p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition hover:border-accent hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[3/4] overflow-hidden">
              <CardArtwork template={template} />
            </div>

            <div className="flex flex-col justify-center gap-5">
              <span className="inline-flex items-center gap-1.5 self-start text-[11px] uppercase tracking-widest text-bone/60">
                <Star className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
                {template.rating.toFixed(1)}
              </span>
              <h3 className="font-display text-4xl font-light text-bone">
                {tTemplates(`${template.id}.name`)}
              </h3>
              <p className="text-bone/60">{tTemplates(`${template.id}.tagline`)}</p>
              <p className="font-display text-3xl font-light text-accent">
                {formatPrice(template.price, t('currency'), locale)}
              </p>

              <div className="mt-2 flex flex-wrap gap-3">
                <AddToCartButton template={template} />
                <Link href={`/template/${template.id}`} className="btn-ghost" onClick={onClose}>
                  {t('viewDetails')}
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
