'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Section eyebrow / label. Bigger and more deliberate than a plain
 * caption, with a distinctive entrance: the accent rule draws out, the
 * label rises from a clip mask, and a small floret spins in.
 *
 * RTL-safe: the whole label is one block (never split per-letter, which
 * would break Persian's connected script), and letter-spacing is zeroed
 * for RTL in globals.css so Persian glyphs stay joined.
 */
const ease = [0.16, 1, 0.3, 1] as const;

const lineV: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease } },
};
const riseV: Variants = {
  hidden: { y: '120%' },
  visible: { y: '0%', transition: { duration: 0.7, delay: 0.12, ease } },
};
const floretV: Variants = {
  hidden: { scale: 0, rotate: -120, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.28, ease },
  },
};

export function Eyebrow({
  children,
  className,
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={cn(
        'inline-flex items-center gap-3.5',
        center && 'justify-center',
        className,
      )}
    >
      <motion.span
        variants={lineV}
        className="h-px w-12 origin-left bg-rose-300/70 rtl:origin-right"
      />
      <span className="overflow-hidden py-1">
        <motion.span
          variants={riseV}
          className="eyebrow-label inline-block text-sm font-medium uppercase tracking-[0.28em] text-rose-300 sm:text-[0.95rem]"
        >
          {children}
        </motion.span>
      </span>
      <motion.span
        variants={floretV}
        aria-hidden
        className="text-base text-rose-300/80"
      >
        ✦
      </motion.span>
    </motion.span>
  );
}
