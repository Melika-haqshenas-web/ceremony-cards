'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Translates its children vertically as they pass through the viewport,
 * at a fraction of scroll speed — depth without a library. `speed` > 0
 * drifts up (foreground), < 0 drifts down (background).
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
