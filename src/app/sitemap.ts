import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { templates } from '@/lib/templates';
import { invitations } from '@/lib/invitations';

const BASE_URL = 'https://meli.example.com';

/** Build the hreflang alternates map for a locale-agnostic path. */
function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`]));
}

/**
 * Generates a localized sitemap covering every static route, every template
 * detail page, and the curated live invitations, for both locales. Each entry
 * carries hreflang alternates so search engines pair the language variants.
 *
 * Note: template-*derived* invitation previews (`/invite/<templateId>`) are
 * intentionally excluded — they reuse per-category sample copy (duplicate
 * content) and are served `noindex`; the canonical surface is `/template/<id>`.
 * Update BASE_URL for prod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/cards', '/about', '/contact', '/checkout'];
  const templatePaths = templates.map((tpl) => `/template/${tpl.id}`);
  // `invitations` holds only the hand-curated, indexable experiences.
  const invitePaths = invitations.map((inv) => `/invite/${inv.id}`);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
    for (const path of templatePaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: languageAlternates(path) },
      });
    }
    for (const path of invitePaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
