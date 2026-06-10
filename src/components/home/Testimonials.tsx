"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RevealText } from "@/components/fx/RevealText";
import { Eyebrow } from "../fx/Eyebrow";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * A single oversized pull-quote that the reader pages through. Quotes
 * cross-fade with a subtle rise; the index counter and arrows give it a
 * gallery-like, deliberate pace.
 */
export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as Testimonial[];
  const [i, setI] = useState(0);

  const go = (dir: number) =>
    setI((p) => (p + dir + items.length) % items.length);
  const item = items[i];

  return (
    <section className="section">
      <div className="border-t border-[color:var(--line)] pt-10">
        <div className="mt-8">
          <Eyebrow center>{t("caption")}</Eyebrow>
        </div>‍
        <div className="relative min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-4xl font-display text-3xl font-light italic leading-[1.18] text-bone sm:text-5xl">
                “{item.quote}”
              </p>
              <footer className="mt-8 flex items-center gap-4 text-sm">
                <span className="font-semibold uppercase tracking-widest text-bone">
                  {item.author}
                </span>
                <span className="h-px w-8 bg-rose-300/60" />
                <span className="uppercase tracking-widest text-bone/45">
                  {item.role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone/70 transition hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone/70 transition hover:border-accent hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
          <span className="ms-2 font-sans text-sm text-bone/40 tabular-nums">
            {String(i + 1).padStart(2, "0")} —{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
