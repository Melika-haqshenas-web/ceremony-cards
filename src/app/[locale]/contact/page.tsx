import type { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/fx/RevealText';
import { Reveal } from '@/components/fx/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description') };
}

function Header() {
  const t = useTranslations('contact');
  return (
    <div className="mb-16">
      <Reveal>
        <p className="kicker mb-6">{t('badge')}</p>
      </Reveal>
      <RevealText
        as="h1"
        text={t('title')}
        accentWords={[3]}
        className="font-display text-5xl font-light leading-[0.95] tracking-tight text-bone sm:text-7xl"
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-bone/55">{t('subtitle')}</p>
      </Reveal>
    </div>
  );
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <section className="section pt-36">
      <Header />
      <ContactForm />
    </section>
  );
}
