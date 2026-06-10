'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { useCart } from '@/context/CartContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/cards', key: 'cards' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => setOpen(false), [pathname]);
  useLockBodyScroll(open);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Live invitations are full-screen, chrome-free experiences.
  if (pathname.startsWith('/invite/')) return null;

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled
            ? 'bg-ink-950/70 py-3 backdrop-blur-xl'
            : 'bg-transparent py-5',
        )}
      >
        <nav className="mx-auto flex max-w-[88rem] items-center justify-between px-6 sm:px-10">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-2xl font-light uppercase tracking-[0.3em] text-bone sm:text-3xl"
          >
            Meli<span className="text-accent">.</span>
          </Link>

          {/* Center nav */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  data-active={isActive(item.href)}
                  className="link-underline text-[11px] font-medium uppercase tracking-widest text-bone/70 transition-colors hover:text-bone"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:block">
              <LanguageToggle compact />
            </div>

            <Link
              href="/checkout"
              aria-label={t('cart')}
              className="group relative flex items-center gap-2 text-bone/80 transition-colors hover:text-bone"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="grid h-4 min-w-4 place-items-center rounded-full bg-rose-300 px-1 text-[10px] font-bold text-ink-950"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Menu toggle (mobile) */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="flex h-6 w-7 flex-col items-end justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  'h-px bg-bone transition-all duration-300',
                  open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6',
                )}
              />
              <span
                className={cn(
                  'h-px bg-bone transition-all duration-300',
                  open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4',
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="font-display text-5xl font-light uppercase tracking-wide text-bone"
                  >
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
