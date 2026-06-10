'use client';

import { useTranslations } from 'next-intl';
import { getCategory } from '@/lib/categories';
import type { Template } from '@/lib/types';

/**
 * A stylised rendering of a card "design" — the flip side of a template
 * card, and the face shown in the preview modal / checkout. Rendered as
 * an elegant dark invitation: the template's accent becomes a soft glow
 * and a thin inner frame, with serif lettering centred inside.
 */
export function CardArtwork({ template }: { template: Template }) {
  const tTemplates = useTranslations('templates');
  const tCommon = useTranslations('common');
  const category = getCategory(template.category);

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-ink-800 p-6 text-center">
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${template.accentFrom}, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-1/2 w-1/2 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${template.accentTo}, transparent 70%)`,
        }}
      />

      {/* Thin inner frame */}
      <div className="absolute inset-3 border border-bone/15" />

      <div className="relative flex flex-col items-center gap-3 px-3">
        <p className="text-[10px] uppercase tracking-kicker text-rose-300">
          {category ? tCommon('preview') : ''}
        </p>
        <span className="text-[10px] uppercase tracking-widest text-bone/45">
          {tTemplates(`${template.id}.tagline`)}
        </span>
        <h4 className="font-display text-3xl font-light italic leading-tight text-bone">
          {tTemplates(`${template.id}.name`)}
        </h4>
        <span className="my-1 h-px w-12 bg-rose-300/60" />
        <span className="font-display text-sm uppercase tracking-[0.4em] text-bone/70">
          Meli
        </span>
      </div>
    </div>
  );
}
