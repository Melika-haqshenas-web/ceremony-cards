/**
 * Domain types for the Meli card catalogue.
 *
 * Display text (names, descriptions, taglines) deliberately lives in the
 * i18n message files keyed by `id`, NOT here — this keeps the data layer
 * locale-agnostic and makes adding a language a translation-only change.
 */

/** Ceremony categories a customer can shop by. */
export type CategoryId =
  | 'wedding'
  | 'birthday'
  | 'funeral'
  | 'party'
  | 'baby'
  | 'graduation';

export interface Category {
  id: CategoryId;
  /** Key into the lucide icon map (see components/cards/icon-map.ts). */
  icon: string;
  /** Tailwind gradient classes used for the category's accent. */
  gradient: string;
  /** Hero image for the category card. */
  image: string;
}

export interface Template {
  id: string;
  category: CategoryId;
  /** Price in the smallest sensible unit for the demo (whole dollars). */
  price: number;
  /** Cover image (Next/Image optimised, lazy-loaded). */
  image: string;
  /** Two-stop gradient used by the animated card face. */
  accentFrom: string;
  accentTo: string;
  /** Surfaced in the "Most loved" home section. */
  popular?: boolean;
  rating: number;
}

/** A line item in the shopping cart. */
export interface CartItem {
  templateId: string;
  category: CategoryId;
  price: number;
  image: string;
}
