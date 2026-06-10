"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/fx/RevealText";
import { Reveal } from "@/components/fx/Reveal";
import { Eyebrow } from "../fx/Eyebrow";

interface Step {
  title: string;
  description: string;
}

// One colour per step. The line takes each step's colour as it passes,
// and each step's numeral fades up into the same colour.
const STEP_COLORS = ["#e7b2a5", "#c8a86a", "#b9a6e0", "#9fd9c0", "#dd9a8b"];

// A gentle two-curve wave (viewBox 100×1000, stretched to fit). Soft, not busy.
const WAVE_PATH = "M50,2 C26,168 74,332 50,500 C26,668 74,832 50,998";

/**
 * Process timeline. The line is invisible at rest and draws itself from
 * the top as the section scrolls in — very smoothly (a soft spring). The
 * stroke is banded so each step owns a distinct colour, and every step's
 * numeral + underline light up in that colour as the line reaches it.
 */
export function HowItWorks() {
  const t = useTranslations("home.how");
  const steps = t.raw("steps") as Step[];
  const n = steps.length;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.72"],
  });
  // Gentle, soft draw — high damping, low stiffness = calm and smooth.
  const draw = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <section className="section">
      <div className="mb-20 max-w-3xl border-t border-[color:var(--line)] pt-10">
        <div className="mt-8">
          <Eyebrow center>{t("caption")}</Eyebrow>
        </div>
        <RevealText
          as="h2"
          text={t("title")}
          accentWords={[n]}
          className="mt-4 font-display text-4xl font-light uppercase tracking-tight text-bone sm:text-6xl"
        />
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/55">
            {t("subtitle")}
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative ps-16 sm:ps-40">
        {/* The line — invisible until scroll draws it */}
        <div className="absolute inset-y-0 start-0 w-16 sm:w-32">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="step-line"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2="1000"
              >
                {steps.map((_, i) => {
                  const c = STEP_COLORS[i % STEP_COLORS.length];
                  return (
                    <Fragment key={i}>
                      <stop offset={i / n} stopColor={c} />
                      <stop offset={(i + 1) / n} stopColor={c} />
                    </Fragment>
                  );
                })}
              </linearGradient>
            </defs>
            <motion.path
              d={WAVE_PATH}
              stroke="url(#step-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>
        </div>

        <div>
          {steps.map((step, i) => (
            <Node
              key={i}
              index={i}
              count={n}
              step={step}
              draw={draw}
              color={STEP_COLORS[i % STEP_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A single step. Its numeral, underline and a soft glow animate from
 * dim/neutral into the step's colour as the drawing line reaches it.
 */
function Node({
  index,
  count,
  step,
  draw,
  color,
}: {
  index: number;
  count: number;
  step: Step;
  draw: MotionValue<number>;
  color: string;
}) {
  // The line reaches this step around the middle of its band.
  const reach = (index + 0.5) / count;
  const lo = Math.max(0, reach - 0.12);

  const numberColor = useTransform(
    draw,
    [lo, reach],
    ["rgba(243,239,232,0.16)", color],
  );
  const underlineScale = useTransform(draw, [lo, reach], [0, 1]);
  const glow = useTransform(draw, [lo, reach + 0.05], [0, 0.5]);

  return (
    <Reveal delay={index * 0.04}>
      <div className="relative grid grid-cols-1 items-start gap-3 py-12 sm:grid-cols-[auto_1.3fr] sm:gap-14">
        {/* Soft colour glow that blooms when reached */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -start-6 top-6 h-32 w-32 rounded-full blur-3xl"
          style={{ background: color, opacity: glow }}
        />

        <div className="relative flex items-baseline gap-5">
          <motion.span
            style={{ color: numberColor }}
            className="font-display text-6xl font-light leading-none sm:text-8xl"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        <div className="relative">
          <h3 className="font-display text-2xl font-light text-bone sm:text-4xl">
            {step.title}
          </h3>
          {/* Colour underline grows in as the step lights up */}
          <motion.span
            className="mt-3 block h-px w-16 origin-left rtl:origin-right"
            style={{ background: color, scaleX: underlineScale }}
          />
          <p className="mt-5 max-w-md text-bone/55">{step.description}</p>
        </div>
      </div>
    </Reveal>
  );
}
