'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin rose-gold thread pinned to the top edge that fills as the page
 * is read — a quiet progress indicator that reinforces the long-scroll
 * narrative.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[115] h-[2px] origin-left bg-gradient-to-r from-rose-300 via-champagne to-rose-300 rtl:origin-right"
    />
  );
}
