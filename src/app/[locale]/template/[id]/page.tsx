import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Check, Eye, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CardArtwork } from '@/components/cards/CardArtwork';
import { AddToCartButton } from '@/components/cards/AddToCartButton';
import { BuyNowButton } from '@/components/cards/BuyNowButton';
import { Reveal } from '@/components/fx/Reveal';
import { RevealText } from '@/components/fx/RevealText';
import { getTemplate, getRelatedTemplates, templates } from '@/lib/templates';
import { locales } from '@/i18n/config';
import { formatPrice } from '@/lib/utils';

/** Pre-render every template for every locale (fully static, SEO-friendly). */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    templates.map((tpl) => ({ locale, id: tpl.id })),
  );
}

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const template = getTemplate(id);
  if (!template) return {};
  const t = await getTranslations({ locale, namespace: 'templates' });
  const title = t(`${id}.name`);
  const description = t(`${id}.tagline`);
  const path = `/template/${id}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, fa: `/fa${path}` },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      url: `/${locale}${path}`,
      images: [{ url: template.image, width: 1000, height: 1333, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [template.image],
    },
  };
}

function Details({ id }: { id: string }) {
  const t = useTranslations('template');
  const tTemplates = useTranslations('templates');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const template = getTemplate(id)!;
  const includes = t.raw('includes') as string[];

  return (
    <div className="flex flex-col gap-6">
      <span className="inline-flex items-center gap-1.5 self-start text-[11px] uppercase tracking-widest text-bone/60">
        <Star className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
        {template.rating.toFixed(1)}
      </span>

      <RevealText
        as="h1"
        text={tTemplates(`${id}.name`)}
        className="font-display text-5xl font-light text-bone sm:text-6xl"
      />
      <p className="text-lg text-bone/60">{tTemplates(`${id}.tagline`)}</p>
      <p className="font-display text-3xl font-light text-accent">
        {formatPrice(template.price, tCommon('currency'), locale)}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <AddToCartButton template={template} />
        <BuyNowButton template={template} />
        <Link
          href={`/invite/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="btn-ghost inline-flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {t('livePreview')}
        </Link>
      </div>

      <div className="mt-4 border-t border-[color:var(--line)] pt-8">
        <h2 className="kicker mb-6">{t('includesTitle')}</h2>
        <ul className="space-y-4">
          {includes.map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-bone/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-bone/40">{t('customizeNote')}</p>
      </div>
    </div>
  );
}

function Related({ id }: { id: string }) {
  const t = useTranslations('template');
  const tTemplates = useTranslations('templates');
  const template = getTemplate(id)!;
  const related = getRelatedTemplates(template, 3);

  return (
    <section className="section">
      <h2 className="mb-10 border-t border-[color:var(--line)] pt-8 font-display text-2xl font-light uppercase tracking-tight text-bone">
        {t('relatedTitle')}
      </h2>
      <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3">
        {related.map((tpl) => (
          <Link
            key={tpl.id}
            href={`/template/${tpl.id}`}
            data-cursor="view"
            className="group flex flex-col gap-3"
          >
            <div className="aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
              <CardArtwork template={tpl} />
            </div>
            <span className="link-underline self-start font-display text-lg font-light text-bone">
              {tTemplates(`${tpl.id}.name`)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function TemplatePage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(locale);
  const template = getTemplate(id);
  if (!template) notFound();

  return (
    <>
      <section className="section pt-36">
        <Link
          href="/cards"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-bone/50 transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <BackLabel />
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden lg:sticky lg:top-32">
              <CardArtwork template={template} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Details id={id} />
          </Reveal>
        </div>
      </section>

      <Related id={id} />
    </>
  );
}

function BackLabel() {
  const t = useTranslations('common');
  return <>{t('backToCards')}</>;
}
