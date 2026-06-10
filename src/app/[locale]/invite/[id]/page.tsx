import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { WildflowerInvite } from '@/components/invite/WildflowerInvite';
import { getInvitation, invitations } from '@/lib/invitations';
import { getTemplate, templates } from '@/lib/templates';
import { locales } from '@/i18n/config';

/**
 * Pre-render every invitation for every locale: the curated experiences
 * (e.g. `wildflower`) plus a default live preview for every product template
 * (`/invite/<templateId>`). Ids are de-duped so a curated id that also names a
 * template is rendered once.
 */
export function generateStaticParams() {
  const ids = Array.from(
    new Set([...invitations.map((inv) => inv.id), ...templates.map((tpl) => tpl.id)]),
  );
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Metadata {
  const inv = getInvitation(id);
  if (!inv) return {};

  // Single-subject events (a birthday, a memorial) leave partnerB empty — keep
  // the title clean instead of trailing a dangling "&".
  const headline = inv.partnerB ? `${inv.partnerA} & ${inv.partnerB}` : inv.partnerA;
  const title = `${headline} · ${inv.eventName}`;
  const description = inv.welcomeBody;
  const path = `/invite/${id}`;

  // Derived previews (one per template) reuse the same per-category sample copy,
  // so same-category cards would otherwise be duplicate content. Keep them out of
  // the index but still crawlable; curated experiences stay fully indexable.
  const robots = inv.themed ? { index: false, follow: true } : undefined;

  // Use the card's cover image for rich link previews when available.
  const template = getTemplate(id);
  const images = template
    ? [{ url: template.image, width: 1000, height: 1333, alt: headline }]
    : undefined;

  return {
    title,
    description,
    robots,
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
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map((i) => i.url),
    },
  };
}

export default function InvitePage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(locale);
  const inv = getInvitation(id);
  if (!inv) notFound();

  // Only one theme today; the switch keeps room for 627/628/629 later.
  switch (inv.theme) {
    case 'wildflower':
      return <WildflowerInvite invite={inv} />;
    default:
      notFound();
  }
}
