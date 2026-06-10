import { unstable_setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { CeremonyMenu } from '@/components/home/CeremonyMenu';
import { GalleryHorizontal } from '@/components/home/GalleryHorizontal';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaBanner } from '@/components/home/CtaBanner';

/**
 * Home — a single long-scroll narrative:
 * hero → manifesto → ceremonies → pinned gallery → process → voices → CTA.
 * Each section is a self-contained, animated island.
 */
export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <MarqueeStrip />
      <CeremonyMenu />
      <GalleryHorizontal />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
