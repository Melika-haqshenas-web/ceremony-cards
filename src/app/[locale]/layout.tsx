import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Archivo, Vazirmatn } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';

import { locales, isRtl, type Locale } from '@/i18n/config';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/layout/Preloader';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { Cursor } from '@/components/fx/Cursor';
import { Grain } from '@/components/fx/Grain';
import { ScrollProgress } from '@/components/fx/ScrollProgress';
import '../globals.css';

/* ----- Fonts (self-hosted via next/font, exposed as CSS variables) -----
   Display: Cormorant Garamond (light, set uppercase + tracked for a
   couture, editorial feel). Body/labels: Archivo (refined grotesque). */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});
// Persian: Vazirmatn — the most complete, polished Persian webfont.
// One family, multiple weights (light body, heavier display headings).
const persian = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-persian',
  display: 'swap',
});

/** Pre-render a static page per locale at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Only the locales we generate are valid; anything else 404s. */
export const dynamicParams = false;

/** SEO metadata, localised. */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL('https://meli.example.com'),
    title: {
      default: t('home.title'),
      template: `%s · ${t('siteName')}`,
    },
    description: t('home.description'),
    alternates: {
      languages: { en: '/en', fa: '/fa' },
    },
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      type: 'website',
      locale,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Guard unknown locales and enable static rendering for this request.
  if (!locales.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${display.variable} ${sans.variable} ${persian.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <SmoothScroll />
            <Grain />
            <ScrollProgress />
            <Cursor />
            <Preloader />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
