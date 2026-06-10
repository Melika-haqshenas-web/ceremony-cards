'use client';

import { useTranslations } from 'next-intl';
import { Check, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Template } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Adds a template to the cart and reflects the "already in cart" state.
 * Reused by the preview modal and the template detail page.
 */
export function AddToCartButton({
  template,
  className,
}: {
  template: Template;
  className?: string;
}) {
  const t = useTranslations('common');
  const { add, has } = useCart();
  const inCart = has(template.id);

  return (
    <button
      type="button"
      disabled={inCart}
      onClick={() =>
        add({
          templateId: template.id,
          category: template.category,
          price: template.price,
          image: template.image,
        })
      }
      className={cn(
        inCart
          ? 'btn border border-rose-300/40 text-rose-300'
          : 'btn-primary',
        className,
      )}
    >
      {inCart ? (
        <>
          <Check className="h-4 w-4" /> <span>{t('selected')}</span>
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> <span>{t('addToCart')}</span>
        </>
      )}
    </button>
  );
}
