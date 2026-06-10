import type { Metadata } from 'next';
import Image from 'next/image';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/fx/RevealText';
import { Reveal } from '@/components/fx/Reveal';
import { Parallax } from '@/components/fx/Parallax';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

interface Value {
  title: string;
  description: string;
}

function Values() {
  const t = useTranslations('about');
  const values = t.raw('values') as Value[];
  return (
    <div>
      {values.map((value, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <div className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-[color:var(--line)] py-10 sm:grid-cols-[6rem_1fr_1.4fr] sm:gap-10">
            <span className="font-display text-4xl font-light text-accent sm:text-6xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-2xl font-light text-bone sm:text-3xl">
              {value.title}
            </h3>
            <p className="col-span-2 max-w-md text-bone/55 sm:col-span-1">
              {value.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Story() {
  const t = useTranslations('about');
  const body = t.raw('body') as string[];
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      {body.map((p, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <p className="text-lg leading-relaxed text-bone/70 sm:text-xl">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('about');

  return (
    <>
      <section className="section pt-36">
        <Reveal>
          <p className="kicker mb-6">{t('badge')}</p>
        </Reveal>
        <RevealText
          as="h1"
          text={t('title')}
          accentWords={[4]}
          className="max-w-5xl font-display text-5xl font-light leading-[0.98] tracking-tight text-bone sm:text-7xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-xl text-bone/65">{t('lead')}</p>
        </Reveal>
      </section>

      {/* Full-bleed parallax band */}
      <div className="relative h-[60vh] overflow-hidden">
        <Parallax speed={0.2} className="absolute inset-0 h-[140%]">
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/50" />
        </Parallax>
      </div>

      <section className="section">
        <Story />
      </section>

      <section className="section pt-0">
        <h2 className="mb-12 font-display text-3xl font-light uppercase tracking-tight text-bone sm:text-5xl">
          {t('valuesTitle')}
        </h2>
        <Values />
      </section>
    </>
  );
}
