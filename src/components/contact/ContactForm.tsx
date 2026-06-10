'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

/**
 * Contact form with an inline success acknowledgement. Submission is
 * simulated client-side — point at an API route / email service (Resend)
 * to make it real. Dark, editorial styling.
 */
export function ContactForm() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const info = [
    { label: t('email_label'), value: 'hello@meli.cards' },
    { label: t('phone_label'), value: '+98 21 000 0000' },
    { label: t('studio_label'), value: 'Tehran · Spring St.' },
  ];

  const field =
    'w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition focus:border-accent placeholder:text-bone/30';

  return (
    <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-8">
        <label className="flex flex-col gap-2 text-[11px] uppercase tracking-widest text-bone/50">
          {t('name')}
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
        <label className="flex flex-col gap-2 text-[11px] uppercase tracking-widest text-bone/50">
          {t('message')}
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${field} resize-none`}
          />
        </label>

        <button type="submit" className="btn-primary self-start" disabled={sent}>
          <span>{sent ? t('sent') : t('send')}</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </button>

        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-rose-300"
            >
              {t('sent')}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <aside className="flex flex-col gap-8">
        <p className="kicker">{t('infoTitle')}</p>
        {info.map((row) => (
          <div key={row.label} className="border-b border-[color:var(--line)] pb-5">
            <p className="text-[11px] uppercase tracking-widest text-bone/40">
              {row.label}
            </p>
            <p className="mt-2 text-lg text-bone" dir="ltr">
              {row.value}
            </p>
          </div>
        ))}
      </aside>
    </div>
  );
}
