'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * Couture-style preloader: a counter races 0 → 100 while the wordmark
 * fades in, then the dark curtain lifts away. Shown once per session.
 */
export function Preloader() {
  const t = useTranslations('preloader');
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('meli.preloaded')) {
      setVisible(false);
      return;
    }
    // Pause the smooth scroller while loading.
    document.documentElement.classList.add('lenis-stopped');

    let n = 0;
    const tick = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setCount(n);
      if (n >= 100) clearInterval(tick);
    }, 90);

    const done = setTimeout(() => {
      sessionStorage.setItem('meli.preloaded', '1');
      document.documentElement.classList.remove('lenis-stopped');
      setVisible(false);
    }, 2100);

    return () => {
      clearInterval(tick);
      clearTimeout(done);
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl font-light uppercase tracking-[0.4em] text-bone sm:text-8xl"
          >
            Meli<span className="text-accent">.</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-[11px] uppercase tracking-kicker text-bone/50"
          >
            {t('tagline')}
          </motion.span>

          <span className="absolute bottom-8 right-8 font-display text-5xl font-light text-bone/80 sm:text-7xl">
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
