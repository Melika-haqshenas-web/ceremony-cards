# Per-Card Live Preview — Design

**Date:** 2026-06-10
**Status:** Approved (design), pending implementation plan

## Problem

Today only one live, animated invitation experience exists — `wildflower`, served at
`/invite/wildflower`. The 10 product templates (`rosewood`, `blossom-veil`, …) only have a
static flip preview + lightbox modal. We want **every card to have its own default live
preview**, reachable from the card's detail page (`/template/<id>`), rendered with that card's
own palette.

## Goals

- Every template (current and future) automatically gets a live preview at `/invite/<id>`.
- The detail page `/template/<id>` exposes a **"Live preview"** action that opens it.
- Each preview adopts the **palette of its own card** so previews feel distinct.
- No bespoke per-card content required to keep a card working — defaults are derived.

## Non-Goals

- Bespoke, hand-authored copy for all 10 cards (the curated `wildflower` stays as-is).
- A second invite theme/component. We reuse `WildflowerInvite` for all previews for now.
- Embedding the full-screen experience inline in the product page (it locks scroll and has an
  envelope intro — it belongs on its own route).

## Approach (chosen: A — derived defaults)

A generator turns any `Template` into a full `Invitation`, instead of hand-authoring 10
entries. Rejected alternative B (10 static invitations) because it duplicates content and
breaks any new template that lacks a matching entry.

## Architecture

### 1. Data layer — `src/lib/invitations.ts`

- Add `buildDefaultInvitation(template: Template): Invitation`.
  - `id`, `theme: 'wildflower'`.
  - `paletteFrom` / `paletteTo` ← `template.accentFrom` / `template.accentTo`.
  - Content comes from a **category → content** map (see below).
  - `countdownTo`: a fixed future ISO date constant (e.g. `DEFAULT_COUNTDOWN`), not random.
- Add `categoryDefaults(category: CategoryId): CategoryContent` — the per-category copy:
  `coverKicker`, `welcomeTitle`, `welcomeBody`, `eventName`, `dateLabel`, `venueName`,
  `venueAddress`, `partnerA`, `partnerB`, `initials`, `schedule`, `details`, `closingNote`,
  `styleLabel`. This is the meaningful business-logic piece — **implemented by the user**
  (`wedding` pre-filled as the worked example; remaining categories follow its shape).
- Update `getInvitation(id)`:
  1. return a curated invitation if one exists (current `wildflower` behavior), else
  2. if a template with that `id` exists, return `buildDefaultInvitation(template)`, else
  3. `undefined`.

### 2. Theming — `src/components/invite/WildflowerInvite.tsx`

- The root wrapper sets CSS custom properties from the invite palette, e.g.
  `--inv-from`, `--inv-to`, and derived accent vars, via inline `style`.
- Replace the hardcoded wildflower hexes used for accents (titles, countdown numerals,
  section labels, dividers) with `var(--inv-…, <existing-hex-as-fallback>)`. Fallbacks keep
  the curated `wildflower` looking identical to today.
- Scope: accent/decorative colors only — layout, motion, and flora art are untouched.

### 3. Routing — `src/app/[locale]/invite/[id]/page.tsx`

- `generateStaticParams` includes **both** curated invitation ids **and** all template ids,
  for every locale, so each `/invite/<templateId>` is statically rendered.
- `getInvitation` already resolves curated-or-derived, so the page switch needs no change
  beyond using the resolved invite.

### 4. UI — `src/app/[locale]/template/[id]/page.tsx`

- In the `Details` action row (next to Add to cart / Buy now), add a **"Live preview"**
  link/button to `/invite/<id>` with `target="_blank"` (opens in a new tab so the shopper
  keeps their place on the product page). Uses the existing `Link` from `@/i18n/navigation`
  with locale-awareness, styled as a ghost/secondary button with an `Eye` icon.

### 5. i18n — `messages/en.json`, `messages/fa.json`

- Add `template.livePreview`: `"Live preview"` / `"پیش‌نمایش زنده"`.

## Data flow

`/template/<id>` page → "Live preview" link → `/invite/<id>` →
`getInvitation(id)` → curated OR `buildDefaultInvitation(template)` →
`WildflowerInvite` renders with palette CSS vars from the invite.

## Edge cases / error handling

- Unknown id at `/invite/<id>` → `notFound()` (unchanged).
- Curated id collision: a curated invitation id (`wildflower`) is **not** a template id, so
  no clash; curated always wins in `getInvitation`.
- SSR/hydration: countdown already guards `now === null` until mounted — unchanged.

## Testing / verification

- `/invite/blossom-veil` (and a few others across categories) render the live experience with
  that card's palette.
- `/invite/wildflower` looks pixel-identical to before (fallback hexes).
- `/template/<id>` shows the "Live preview" action; it opens the correct invite in a new tab.
- Build passes (`generateStaticParams` produces all template ids × locales).

## Open / user contribution

`categoryDefaults` content for the non-wedding categories (`birthday`, `funeral`, `party`,
`baby`, `graduation`) is implemented by the user — a genuine content/UX decision. `wedding`
is provided as the worked example.
