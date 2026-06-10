'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Eye, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CardArtwork } from './CardArtwork';
import { AddToCartButton } from './AddToCartButton';
import { formatPrice } from '@/lib/utils';
import type { Template } from '@/lib/types';

/**
 * A template card with a real 3D flip: the front shows the cover photo,
 * and on hover it flips to reveal the stylised artwork. Dark, editorial.
 * The flip is pure delight; the action row stays put and clickable.
 */
export function TemplateCard({
  template,
  onPreview,
}: {
  template: Template;
  onPreview: (template: Template) => void;
}) {
  const tTemplates = useTranslations('templates');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      {/* Flip stage */}
      <button
        type="button"
        onClick={() => onPreview(template)}
        data-cursor="view"
        aria-label={`${tCommon('preview')} ${tTemplates(`${template.id}.name`)}`}
        className="relative block aspect-[3/4] w-full [perspective:1600px]"
      >
        <div className="relative h-full w-full transition-transform duration-700 ease-atelier [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">
            <Image
              src={template.image}
              alt={tTemplates(`${template.id}.name`)}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" />

            {template.popular && (
              <span className="absolute left-3 top-3 text-[10px] uppercase tracking-widest text-bone/90">
                ✦ Popular
              </span>
            )}
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 text-[11px] text-bone/90">
              <Star className="h-3 w-3 fill-rose-300 text-rose-300" />
              {template.rating.toFixed(1)}
            </span>
            <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 text-[10px] uppercase tracking-widest text-bone/80">
              <Eye className="h-3.5 w-3.5" /> {tCommon('preview')}
            </span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <CardArtwork template={template} />
          </div>
        </div>
      </button>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-t border-[color:var(--line)] pt-4">
        <div className="min-w-0">
          <Link
            href={`/template/${template.id}`}
            className="link-underline block truncate font-display text-lg font-light text-bone"
          >
            {tTemplates(`${template.id}.name`)}
          </Link>
          <p className="text-xs uppercase tracking-widest text-bone/45">
            {formatPrice(template.price, tCommon('currency'), locale)}
          </p>
        </div>
        <AddToCartButton
          template={template}
          className="shrink-0 px-4 py-2.5 text-[10px]"
        />
      </div>
    </motion.article>
  );
}
