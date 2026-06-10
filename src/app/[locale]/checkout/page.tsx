import type { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { CheckoutClient } from '@/components/checkout/CheckoutClient';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.checkout' });
  return { title: t('title'), description: t('description') };
}

function Title() {
  const t = useTranslations('checkout');
  return (
    <h1 className="mb-12 border-b border-[color:var(--line)] pb-8 font-display text-5xl font-light uppercase tracking-tight text-bone sm:text-7xl">
      {t('title')}
    </h1>
  );
}

export default function CheckoutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <section className="section pt-32">
      <Title />
      <CheckoutClient />
    </section>
  );
}
