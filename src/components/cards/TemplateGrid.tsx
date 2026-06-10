'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { templates as allTemplates } from '@/lib/templates';
import { categories } from '@/lib/categories';
import { TemplateCard } from './TemplateCard';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import type { Template } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * The interactive catalogue: category filter chips, a live text search,
 * an animated responsive grid, and the shared preview modal. The active
 * category is seeded from the URL (?type=wedding) so the ceremony menu
 * can deep-link into a pre-filtered view.
 */
export function TemplateGrid() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') ?? 'all';

  const [active, setActive] = useState<string>(initialType);
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<Template | null>(null);

  useEffect(() => setActive(initialType), [initialType]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPreview(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTemplates.filter((tpl) => {
      const matchesType = active === 'all' || tpl.category === active;
      const name = t(`templates.${tpl.id}.name`).toLowerCase();
      const matchesQuery = !q || name.includes(q) || tpl.id.includes(q);
      return matchesType && matchesQuery;
    });
  }, [active, query, t]);

  const filters = [{ id: 'all', label: t('cards.filters.all') }].concat(
    categories.map((c) => ({ id: c.id, label: t(`categories.${c.id}.name`) })),
  );

  return (
    <div>
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-6 border-t border-[color:var(--line)] pt-8">
        <div className="flex flex-wrap gap-x-7 gap-y-3">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={cn(
                'relative pb-1 text-[12px] font-medium uppercase tracking-widest transition-colors',
                active === f.id ? 'text-bone' : 'text-bone/40 hover:text-bone/80',
              )}
            >
              {f.label}
              {active === f.id && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute start-0 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('cards.filters.searchPlaceholder')}
            className="w-full border-b border-bone/20 bg-transparent py-2.5 ps-7 pe-2 text-sm text-bone outline-none transition placeholder:text-bone/40 focus:border-accent"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} onPreview={setPreview} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-bone/50">{t('cards.filters.empty')}</p>
      )}

      <TemplatePreviewModal template={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
