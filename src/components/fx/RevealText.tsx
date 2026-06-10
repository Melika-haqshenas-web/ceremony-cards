'use client';

import { motion, type Variants } from 'framer-motion';
import { createElement, Fragment, type ReactNode } from 'react';

/**
 * Kinetic text reveal. Splits a string into words, each masked in a
 * clip box, then rises them into place with a staggered spring as the
 * element scrolls into view — the signature "the line draws itself"
 * headline motion.
 *
 * Use `accentWords` to tint specific words (by index) with the accent.
 */
const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const word: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface RevealTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  once?: boolean;
  /** Indices of words to render in the accent colour. */
  accentWords?: number[];
  /** Render accent words as outline (stroke-only) instead of filled. */
  outlineAccent?: boolean;
}

export function RevealText({
  text,
  as = 'span',
  className,
  stagger = 0.06,
  once = true,
  accentWords = [],
  outlineAccent = false,
}: RevealTextProps) {
  const words = text.split(' ');

  const inner: ReactNode = (
    <motion.span
      className="inline"
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((w, i) => {
        const accent = accentWords.includes(i);
        const cls = accent
          ? outlineAccent
            ? 'text-outline'
            : 'text-accent italic'
          : '';
        return (
          <Fragment key={`${w}-${i}`}>
            <span
              className="clip-line inline-block align-bottom"
              style={{ paddingBottom: '0.08em' }}
            >
              <motion.span variants={word} className={`inline-block ${cls}`}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        );
      })}
    </motion.span>
  );

  return createElement(as, { className }, inner);
}
