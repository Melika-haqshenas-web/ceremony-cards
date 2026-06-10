'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/context/CartContext';
import { CardArtwork } from '@/components/cards/CardArtwork';
import { getTemplate } from '@/lib/templates';
import { formatPrice } from '@/lib/utils';

const TAX_RATE = 0.09;

/**
 * The full checkout experience: cart line items, a live order summary,
 * a details form, and an animated success state. Single client component
 * because every part reacts to cart state. Payment is simulated — wire
 * `onConfirm` to Stripe / Zarinpal for production.
 */
export function CheckoutClient() {
  const t = useTranslations('checkout');
  const tTemplates = useTranslations('templates');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { items, subtotal, remove, clear } = useCart();

  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  function onConfirm(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    clear();
  }

  const field =
    'w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition focus:border-accent placeholder:text-bone/30';

  /* ---------- Success ---------- */
  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl py-16 text-center"
      >
        <p className="kicker mb-8 justify-center">✦</p>
        <h2 className="font-display text-4xl font-light text-bone sm:text-5xl">
          {t('successTitle')}
        </h2>
        <p className="mt-4 text-bone/60">{t('successSubtitle')}</p>
        <Link href="/" className="btn-primary mt-10">
          {t('continue')}
        </Link>
      </motion.div>
    );
  }

  /* ---------- Empty ---------- */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h2 className="font-display text-4xl font-light text-bone sm:text-5xl">
          {t('emptyTitle')}
        </h2>
        <p className="mt-4 text-bone/60">{t('emptySubtitle')}</p>
        <Link href="/cards" className="btn-primary mt-10">
          {t('browse')}
        </Link>
      </div>
    );
  }

  /* ---------- Cart + form ---------- */
  return (
    <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col gap-12">
        <ul className="flex flex-col">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const tpl = getTemplate(item.templateId)!;
              return (
                <motion.li
                  key={item.templateId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="flex items-center gap-5 border-b border-[color:var(--line)] py-5"
                >
                  <div className="h-24 shrink-0 overflow-hidden" style={{ width: '4.5rem' }}>
                    <CardArtwork template={tpl} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-xl font-light text-bone">
                      {tTemplates(`${item.templateId}.name`)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-bone/45">
                      {formatPrice(item.price, tCommon('currency'), locale)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.templateId)}
                    aria-label={t('remove')}
                    className="grid h-10 w-10 place-items-center text-bone/40 transition hover:text-accent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <form id="checkout-form" onSubmit={onConfirm}>
          <h2 className="kicker mb-8">{t('details')}</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-[11px] uppercase tracking-widest text-bone/50">
              {t('fullName')}
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
            </label>
            <label className="flex flex-col gap-2 text-[11px] uppercase tracking-widest text-bone/50">
              {t('email')}
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </label>
          </div>
        </form>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-bone/10 bg-ink-800/50 p-8 lg:sticky lg:top-32">
        <h2 className="kicker mb-8">{t('summary')}</h2>
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between text-bone/60">
            <dt>{t('subtotal')}</dt>
            <dd>{formatPrice(subtotal, tCommon('currency'), locale)}</dd>
          </div>
          <div className="flex justify-between text-bone/60">
            <dt>{t('tax')}</dt>
            <dd>{formatPrice(tax, tCommon('currency'), locale)}</dd>
          </div>
          <div className="flex justify-between border-t border-[color:var(--line)] pt-4 font-display text-2xl font-light text-bone">
            <dt>{t('total')}</dt>
            <dd className="text-accent">
              {formatPrice(total, tCommon('currency'), locale)}
            </dd>
          </div>
        </dl>
        <button type="submit" form="checkout-form" className="btn-primary mt-8 w-full">
          <span>{t('pay')}</span>
        </button>
      </aside>
    </div>
  );
}
