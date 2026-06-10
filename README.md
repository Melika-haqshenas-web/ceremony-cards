# 🌸 Meli — Digital Cards for Every Ceremony

A spring/floral, "princess"-themed storefront for selling **digital cards** for
weddings, birthdays, memorials, parties and more. Built to feel like an
Awwwards-grade marketing site: parallax, scroll reveals, self-drawing line
animations, card-flip hovers, micro-interactions, a blooming preloader — and
full **English / Persian (RTL)** support.

## ✨ Tech stack

| Concern            | Choice                                    |
| ------------------ | ----------------------------------------- |
| Framework          | **Next.js 14** (App Router, RSC)          |
| Language           | **TypeScript** (strict)                   |
| UI library         | **React 18**                              |
| Styling            | **Tailwind CSS** + custom design tokens   |
| Animation          | **Framer Motion**                         |
| i18n + RTL         | **next-intl** (locale-prefixed routing)   |
| State              | **React Context + useReducer** (cart)     |
| Icons              | **lucide-react**                          |
| Fonts              | next/font (Cormorant Garamond, Quicksand, Vazirmatn) |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
```

Other scripts:

```bash
npm run build       # production build (fully static where possible)
npm run start       # serve the production build
npm run lint        # eslint (next/core-web-vitals)
npm run type-check  # tsc --noEmit
```

> The app redirects `/` → `/en`. Persian lives at `/fa` and flips the whole UI
> to right-to-left automatically.

## 📁 Project structure

```
meli-cards/
├─ messages/                 # i18n catalogues (one JSON per locale)
│  ├─ en.json
│  └─ fa.json
├─ src/
│  ├─ middleware.ts          # next-intl locale routing
│  ├─ i18n/                  # locale config, request config, navigation
│  ├─ lib/                   # types, data (categories/templates), utils
│  ├─ hooks/                 # useMounted, useMediaQuery, useLockBodyScroll
│  ├─ context/               # CartContext (Context + useReducer + localStorage)
│  ├─ components/
│  │  ├─ ui/                 # Button, Reveal, SectionHeading, PetalField, FloralDivider
│  │  ├─ layout/             # Navbar, Footer, LanguageToggle, Preloader
│  │  ├─ cards/              # CategoryCard, TemplateCard (flip), modal, grid, artwork
│  │  ├─ home/               # Hero, Stats, Categories, HowItWorks, Featured, …
│  │  ├─ checkout/           # CheckoutClient
│  │  └─ contact/            # ContactForm
│  └─ app/
│     ├─ [locale]/
│     │  ├─ layout.tsx       # <html dir>, fonts, providers, SEO metadata
│     │  ├─ page.tsx         # Home
│     │  ├─ cards/           # Catalogue (filter + search + preview)
│     │  ├─ template/[id]/   # Template details (static per template × locale)
│     │  ├─ checkout/        # Cart + checkout flow
│     │  ├─ about/ contact/  # Marketing pages
│     │  └─ not-found.tsx
│     ├─ not-found.tsx       # global 404
│     ├─ sitemap.ts robots.ts
│     ├─ icon.svg            # favicon
│     └─ globals.css         # theme tokens, utilities, reduced-motion
```

## 🌍 Adding a language

1. Add the locale to `src/i18n/config.ts` (`locales`, `localeLabels`, and
   `rtlLocales` if it's right-to-left).
2. Create `messages/<locale>.json` mirroring the existing keys.

That's it — routing, the language toggle, the sitemap and `<html dir>` all read
from that single config.

## 🎨 Theming

All colours, gradients and keyframes live in `tailwind.config.ts` and
`src/app/globals.css` (as CSS variables). Tweak the pastel palette there and the
whole site follows.

## ⚡ Performance & SEO

- Server Components render static content; interactivity is isolated to
  `'use client'` islands.
- `next/image` with AVIF/WebP + lazy loading for all imagery.
- Per-page localized `<title>`/`<meta>`, Open Graph, `hreflang` alternates,
  sitemap and robots.
- `prefers-reduced-motion` disables animations for accessibility.

## 🔌 Wiring it to real services

The demo simulates the dynamic bits — search for these to make them real:

- **Payments:** `CheckoutClient.onConfirm` → integrate Stripe / Zarinpal.
- **Contact form:** `ContactForm` `onSubmit` → an API route + email provider.
- **Catalogue:** `src/lib/templates.ts` → replace with a CMS/DB query.

---

Made with love & petals. 🌷
# ceremony-cards
# ceremony-cards
