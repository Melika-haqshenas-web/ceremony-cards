import type { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RevealText } from '@/components/fx/RevealText';
import { Reveal } from '@/components/fx/Reveal';
import { ScatterField } from '@/components/invite/Flora';
import { invitations } from '@/lib/invitations';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'atelier' });
  return { title: t('title'), description: t('subtitle') };
}

function AtelierHeader() {
  const t = useTranslations('atelier');
  return (
    <div className="mb-16">
      <Reveal>
        <p className="kicker mb-6">{t('badge')}</p>
      </Reveal>
      <RevealText
        as="h1"
        text={t('title')}
        accentWords={[1]}
        className="font-display text-5xl font-light uppercase leading-[0.95] tracking-tight text-bone sm:text-7xl"
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-bone/55">{t('subtitle')}</p>
      </Reveal>
    </div>
  );
}

/** A live-invitation preview tile: a miniature of the cover, framed like a
 *  card, that links to the full-screen experience. */
function LiveCard({
  invite,
  cta,
}: {
  invite: (typeof invitations)[number];
  cta: string;
}) {
  return (
    <Reveal>
      <Link href={`/invite/${invite.id}`} className="group block" data-cursor="view">
        <article className="relative flex justify-center overflow-hidden rounded-2xl border border-[color:var(--line)] px-6 py-8"
          style={{ background: 'radial-gradient(120% 90% at 50% 20%, #fbf4f0, #efe2dc)' }}>
          {/* a phone mock-up holding a live miniature of the actual cover */}
          <div className="relative aspect-[9/18.5] w-[64%] overflow-hidden rounded-[1.7rem] border-[5px] border-[#15131c] bg-[#fffdfb] shadow-[0_26px_50px_-18px_rgba(40,30,50,0.6)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
            {/* notch */}
            <div className="absolute left-1/2 top-2 z-20 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#15131c]/70" />
            {/* the cover, mirrored from the live invite */}
            <ScatterField opacity={0.95} />
            <div className="absolute inset-0 flex items-center justify-center px-2">
              {/* soft glow keeps the names legible over the petals */}
              <div className="absolute h-36 w-36 rounded-full bg-white/65 blur-2xl" />
              <div className="relative flex flex-col items-center text-center">
                <span className="text-[6px] uppercase tracking-[0.35em] text-[#b08a7e]">{invite.coverKicker}</span>
                <span className="mt-2 font-display text-xl font-light italic leading-none text-[#6f4c52]">
                  {invite.partnerA}
                </span>
                <span className="my-0.5 font-display text-sm font-light text-[#c98aa0]">&amp;</span>
                <span className="font-display text-xl font-light italic leading-none text-[#6f4c52]">
                  {invite.partnerB}
                </span>
                <span className="mt-2 h-px w-8 bg-[#d8b3bd]" />
                <span className="mt-2 text-[6px] uppercase tracking-[0.25em] text-[#9a8a82]">
                  {invite.dateLabel}
                </span>
              </div>
            </div>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[6px] uppercase tracking-[0.35em] text-[#b08a7e]">
              Tap to open
            </span>
          </div>

          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[10px] uppercase tracking-widest text-[#b08a7e] backdrop-blur">
            ✦ Live
          </span>
        </article>

        {/* meta */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-2xl font-light text-bone">
              {invite.partnerA} &amp; {invite.partnerB}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-bone/45">
              {invite.styleLabel}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-widest text-bone/70 transition group-hover:text-accent">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function AtelierPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('atelier');

  return (
    <section className="section pt-36">
      <AtelierHeader />
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {invitations.map((invite) => (
          <LiveCard key={invite.id} invite={invite} cta={t('cta')} />
        ))}
      </div>
    </section>
  );
}
