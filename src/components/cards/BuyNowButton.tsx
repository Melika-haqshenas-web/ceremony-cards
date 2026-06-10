'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/context/CartContext';
import type { Template } from '@/lib/types';

/**
 * Adds the template to the cart (if needed) and jumps straight to
 * checkout — the express path for a single card.
 */
export function BuyNowButton({ template }: { template: Template }) {
  const t = useTranslations('common');
  const router = useRouter();
  const { add, has } = useCart();

  function buyNow() {
    if (!has(template.id)) {
      add({
        templateId: template.id,
        category: template.category,
        price: template.price,
        image: template.image,
      });
    }
    router.push('/checkout');
  }

  return (
    <button type="button" onClick={buyNow} className="btn-primary">
      <Sparkles className="h-4 w-4" />
      {t('buyNow')}
    </button>
  );
}
