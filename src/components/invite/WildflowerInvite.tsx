'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Invitation } from '@/lib/invitations';
import {
  Butterfly,
  CornerSpray,
  MeadowStrip,
  Motif,
  OvalWreath,
  ScatterField,
} from './Flora';
import { WaxSeal } from './WaxSeal';

/* A soft rise-in used by every section block. */
const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Live countdown ---------- */

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    if (now === null) return null;
    const diff = Math.max(0, new Date(target).getTime() - now);
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);
    return { d, h, m, s };
  }, [now, target]);
}

function Countdown({ target }: { target: string }) {
  const c = useCountdown(target);
  const cells = [
    { v: c?.d, l: 'Days' },
    { v: c?.h, l: 'Hours' },
    { v: c?.m, l: 'Minutes' },
    { v: c?.s, l: 'Seconds' },
  ];
  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-6">
      {cells.map((cell, i) => (
        <div key={cell.l} className="flex items-center gap-3 sm:gap-6">
          <div className="flex w-14 flex-col items-center sm:w-20">
            <span className="font-display text-4xl font-light text-[color:var(--inv-strong,#b56b80)] tabular-nums sm:text-6xl">
              {cell.v === undefined ? '—' : String(cell.v).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#9a8a82]">{cell.l}</span>
          </div>
          {i < cells.length - 1 && <span className="font-display text-3xl font-light text-[color:var(--inv-soft,#d8a7b4)] sm:text-4xl">·</span>}
        </div>
      ))}
    </div>
  );
}

/* ---------- The wax-seal envelope intro ----------
   Geometry is fixed in pixels (a 360×238 envelope) and only `y`/`scale`/
   `opacity`/`rotateX` are animated — never a transform that would fight the
   layout — so the open sequence stays perfectly aligned:
     1. the seal lifts and dissolves
     2. the flap swings open on its top hinge
     3. the card glides straight up out of the pocket
     4. the whole scene fades to reveal the invitation. */

function EnvelopeIntro({ invite, onOpen }: { invite: Invitation; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 2200);
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease } }}
    >
      {/* warm paper backdrop + soft vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 38%, #f6efe0 0%, #e7dac1 60%, #d3c19c 100%)' }} />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 220px rgba(120,92,40,0.28)' }} />

      <button
        type="button"
        onClick={open}
        aria-label="Open the invitation"
        className="relative flex flex-col items-center"
        style={{ perspective: 1400 }}
      >
        <motion.div
          className="relative scale-[0.82] sm:scale-100"
          style={{ width: 360, height: 238, transformStyle: 'preserve-3d' }}
          animate={opening ? { scale: [null, 1.04], y: -6 } : {}}
          transition={{ delay: 1.7, duration: 0.9, ease }}
        >
          {/* envelope back wall */}
          <div className="absolute inset-0 rounded-[12px]" style={{ background: 'linear-gradient(155deg,#f0e7d4,#d9c8a4)', boxShadow: '0 30px 60px -20px rgba(90,68,28,0.55)' }} />

          {/* the letter card — starts tucked behind the back wall, glides up */}
          <motion.div
            className="absolute z-40 overflow-hidden rounded-[8px] bg-[#fffdf8]"
            style={{ left: 36, top: 22, width: 288, height: 196, boxShadow: '0 18px 40px -14px rgba(90,68,28,0.5)' }}
            initial={{ y: 0, opacity: 0 }}
            animate={opening ? { y: -232, opacity: 1, scale: 1.04 } : { y: 0, opacity: 0 }}
            transition={{ delay: 0.85, duration: 1.05, ease }}
          >
            <ScatterField opacity={0.22} />
            <div className="absolute inset-[10px] rounded-[5px] border border-[#e7cdd3]" />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <Motif kind="sprig" className="h-7 w-7 opacity-80" />
              <span className="mt-1 text-[9px] uppercase tracking-[0.4em] text-[#b08a7e]">You are invited</span>
              <p className="mt-2 font-display text-3xl font-light italic leading-tight text-[#6f4c52]">
                {invite.partnerA}
              </p>
              {invite.partnerB && (
                <>
                  <span className="font-display text-base font-light text-[color:var(--inv-soft,#c98aa0)]">&amp;</span>
                  <p className="font-display text-3xl font-light italic leading-tight text-[#6f4c52]">
                    {invite.partnerB}
                  </p>
                </>
              )}
              <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#9a8a82]">{invite.dateLabel}</span>
            </div>
          </motion.div>

          {/* front pocket (covers the card's lower half so it reads as tucked) */}
          <div
            className="absolute inset-x-0 bottom-0 z-30"
            style={{ height: '70%', clipPath: 'polygon(0 36%, 50% 0, 100% 36%, 100% 100%, 0 100%)', background: 'linear-gradient(165deg,#ece1c9,#d2c09b)', borderRadius: '0 0 12px 12px' }}
          />

          {/* top flap, hinged on its top edge */}
          <motion.div
            className="absolute left-0 top-0 z-20 origin-top"
            style={{ width: 360, height: 150, transformStyle: 'preserve-3d' }}
            animate={opening ? { rotateX: -172, opacity: 0.5 } : { rotateX: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease }}
          >
            <div
              className="h-full w-full"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', background: 'linear-gradient(170deg,#efe5cf,#d8c6a0)', filter: 'drop-shadow(0 4px 6px rgba(90,68,28,0.18))' }}
            />
          </motion.div>

          {/* wax seal at the flap tip */}
          <motion.div
            className="absolute z-50"
            style={{ left: 134, top: 96 }}
            animate={opening ? { scale: [1, 1.16, 0.92], y: [0, -4, 16], opacity: [1, 1, 0], rotate: [0, -3, 6] } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <WaxSeal initials={invite.initials} size={92} />
          </motion.div>
        </motion.div>

        <motion.span
          className="mt-12 text-[11px] uppercase tracking-[0.4em] text-[#806f54]"
          animate={{ opacity: opening ? 0 : [0.35, 1, 0.35] }}
          transition={{ duration: 2.6, repeat: opening ? 0 : Infinity }}
        >
          Tap to open
        </motion.span>
      </button>
    </motion.div>
  );
}

/* ---------- Section chrome ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 block text-center text-[11px] uppercase tracking-[0.45em] text-[color:var(--inv-soft,#b08a7e)]">{children}</span>
  );
}

function Title({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-center font-display font-light text-[#6f4c52] ${className}`}>{children}</h2>
  );
}

/* ---------- Main experience ---------- */

export function WildflowerInvite({ invite }: { invite: Invitation }) {
  const [opened, setOpened] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroFloraY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Lock scroll until the envelope is opened.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [opened]);

  // Template-derived invitations recolour the accents from their own palette;
  // curated ones leave these unset so the CSS-var fallbacks (the original
  // wildflower hexes) render exactly as before.
  const themeVars = invite.themed
    ? ({
        '--inv-soft': invite.paletteTo,
        '--inv-strong': `color-mix(in srgb, ${invite.paletteTo} 62%, #6f4c52)`,
        '--inv-tint': `color-mix(in srgb, ${invite.paletteFrom} 24%, #fffdfb)`,
        '--inv-tint-border': `color-mix(in srgb, ${invite.paletteFrom} 45%, #ffffff)`,
      } as React.CSSProperties)
    : {};

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ background: '#fffdfb', color: '#5f474b', ...themeVars }}
    >
      <AnimatePresence>
        {!opened && <EnvelopeIntro key="env" invite={invite} onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {/* ===== 1 · Cover wallpaper ===== */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
        <motion.div style={{ y: heroFloraY, position: 'absolute', inset: 0 }}>
          <ScatterField opacity={0.95} />
        </motion.div>
        <Butterfly className="absolute right-[18%] top-[22%] h-16 w-16 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={opened ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <OvalWreath className="flex h-[430px] w-[320px] items-center justify-center sm:h-[520px] sm:w-[400px]">
            <div className="flex flex-col items-center px-12 text-center">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--inv-soft,#b08a7e)]">{invite.coverKicker}</span>
              <h1 className="mt-6 font-display text-5xl font-light italic leading-tight text-[#6f4c52] sm:text-6xl">
                {invite.partnerA}
              </h1>
              {invite.partnerB && (
                <>
                  <span className="my-2 font-display text-3xl font-light text-[color:var(--inv-soft,#c98aa0)]">&amp;</span>
                  <h1 className="font-display text-5xl font-light italic leading-tight text-[#6f4c52] sm:text-6xl">
                    {invite.partnerB}
                  </h1>
                </>
              )}
              <div className="mt-7 h-px w-16 bg-[color:var(--inv-soft,#d8b3bd)]" />
              <span className="mt-5 text-[12px] uppercase tracking-[0.3em] text-[#9a8a82]">{invite.dateLabel}</span>
            </div>
          </OvalWreath>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[color:var(--inv-soft,#b08a7e)]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* ===== 2 · Welcome ===== */}
      <section className="relative overflow-hidden px-6 py-24">
        <CornerSpray corner="tl" className="opacity-90" />
        <CornerSpray corner="tr" className="opacity-90" />
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>{invite.coverKicker}</SectionLabel>
          <Title className="text-5xl italic sm:text-6xl">{invite.welcomeTitle}</Title>
          <p className="mt-8 font-display text-2xl font-light leading-relaxed text-[#7c5d62] sm:text-[28px]">
            {invite.welcomeBody}
          </p>
        </Reveal>
        <MeadowStrip className="mt-16" height={140} />
      </section>

      {/* ===== 3 · The event ===== */}
      <section className="relative overflow-hidden bg-[color:var(--inv-tint,#fbf4f0)] px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>The Celebration</SectionLabel>
          <Title className="text-4xl italic sm:text-5xl">{invite.eventName}</Title>
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3">
            <Motif kind="lily" className="h-12 w-12" />
            <Motif kind="bloom-pink" className="h-9 w-9" />
            <Motif kind="lily" className="h-12 w-12 -scale-x-100" />
          </div>
          <p className="mt-8 text-[13px] uppercase tracking-[0.3em] text-[#9a8a82]">{invite.dateLabel}</p>
          <p className="mt-3 font-display text-2xl font-light text-[#6f4c52]">{invite.venueName}</p>
          <p className="mt-1 text-sm text-[#9a8a82]">{invite.venueAddress}</p>
        </Reveal>
      </section>

      {/* ===== 4 · The weekend / schedule ===== */}
      <section className="relative overflow-hidden px-6 py-24">
        <Reveal className="text-center">
          <SectionLabel>The Weekend</SectionLabel>
          <Title className="text-4xl italic sm:text-5xl">How it all unfolds</Title>
        </Reveal>
        <div className="relative mx-auto mt-16 max-w-md">
          {/* wavy connector */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#e3bcc8] to-transparent" />
          <div className="flex flex-col gap-12">
            {invite.schedule.map((stop, i) => (
              <Reveal key={stop.title} delay={i * 0.05}>
                <div className={`flex items-center gap-6 ${i % 2 ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="flex-1">
                    <p className="font-display text-2xl font-light text-[#6f4c52]">{stop.title}</p>
                    {stop.detail && <p className="mt-1 text-sm text-[#9a8a82]">{stop.detail}</p>}
                  </div>
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(180,120,140,0.18)]">
                    <Motif kind={i % 2 ? 'bloom-lilac' : 'bloom-pink'} className="absolute h-9 w-9 opacity-80" />
                    <span className="relative text-[11px] font-semibold tracking-widest text-[color:var(--inv-strong,#b56b80)]">{stop.time}</span>
                  </div>
                  <div className="flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
          <Butterfly className="absolute -right-4 top-1/3 h-12 w-12" />
        </div>

        {/* countdown */}
        <Reveal className="mx-auto mt-20 max-w-xl rounded-3xl border border-[color:var(--inv-tint-border,#f0dde2)] bg-white/70 px-6 py-10 text-center backdrop-blur">
          <SectionLabel>Counting down</SectionLabel>
          <Countdown target={invite.countdownTo} />
        </Reveal>
      </section>

      {/* ===== 5 · Details ===== */}
      <section className="relative overflow-hidden bg-[color:var(--inv-tint,#fbf4f0)] px-6 py-24">
        <Reveal className="text-center">
          <SectionLabel>Good to know</SectionLabel>
          <Title className="text-4xl italic sm:text-5xl">The Details</Title>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {invite.details.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white p-7 text-center shadow-[0_8px_30px_rgba(180,120,140,0.1)]">
                <Motif kind={['bloom-gold', 'lily', 'bloom-lilac'][i % 3] as 'bloom-gold'} className="h-14 w-14" />
                <h3 className="mt-4 font-display text-2xl font-light text-[#6f4c52]">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#7c6d6f]">{d.body}</p>
                {d.meta && <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#b08a7e]">{d.meta}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 6 · Closing seal ===== */}
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 py-24">
        <ScatterField opacity={0.35} />
        <Reveal className="relative z-10 flex flex-col items-center">
          <p className="max-w-md text-center font-display text-3xl font-light italic text-[#6f4c52]">
            {invite.closingNote}
          </p>
          <motion.div
            className="mt-12"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <WaxSeal initials={invite.initials} size={116} />
          </motion.div>
          <p className="mt-10 text-[12px] uppercase tracking-[0.4em] text-[#9a8a82]">
            {invite.partnerB
              ? `${invite.partnerA} & ${invite.partnerB}`
              : invite.partnerA}{' '}
            · {invite.dateLabel}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
